# CU-17 — Mantenimiento del catálogo de plantillas

**Proyecto:** SelfHosted Service
**Documento:** CU-17-Mantenimiento-Del-Catalogo.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-14; anexo E-6 (el ítem, su envoltorio versionado y la conversión de formatos); anexo E-15, endpoints de listado, alta, exportación e importación del catálogo; E-16 RN-15, RN-30; §12, entrada de glosario del catálogo

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

Permitir que el administrador mantenga el catálogo de plantillas reutilizables —listarlo, agregar ítems, guardarlos desde algo ya resuelto, exportarlo e importarlo—, para que resolver una configuración una vez alcance y el activo se pueda llevar a otra instalación.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Lista, agrega, exporta e importa ítems del catálogo |
| Módulo de catálogo | Sistema | Persiste los ítems con su versión de formato, emite el envoltorio de exportación y convierte los formatos al importar |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El administrador tiene sesión iniciada (CU-30).
- Para guardar un servicio como plantilla, existe el servicio ya configurado (CU-03).

## 4. Flujo principal

1. El administrador abre el catálogo.
2. El sistema lista los ítems declarados con su nombre, su categoría y su versión de contenido. El catálogo arranca vacío en una instalación nueva.
3. El administrador agrega un ítem, o guarda como plantilla un subgrafo ya resuelto en un proyecto SelfHosted.
4. El sistema persiste el ítem con su plantilla, sus parámetros y su versión de formato.
5. El administrador solicita exportar el catálogo completo.
6. El sistema emite el archivo con el envoltorio versionado declarado.
7. El administrador aporta un catálogo exportado para importarlo.
8. El sistema convierte de forma determinista los ítems de la versión de formato anterior a la vigente, envolviendo la plantilla en un subgrafo de un nodo.
9. El sistema registra el evento de auditoría de cada operación de escritura (RN-17).

## 5. Flujos alternativos

**FA-01 — Catálogo vacío.**
Disparador: la instalación es nueva y nadie pobló el catálogo.
Pasos: el sistema lista el catálogo vacío. El producto no se distribuye con contenido precargado.
Punto de retorno: paso 3.

**FA-02 — Importación de un catálogo de formato anterior.**
Disparador: el archivo aportado contiene ítems de la versión de formato previa.
Pasos: la conversión es determinista y sin pérdida; el ítem convertido queda con la versión de formato vigente.
Punto de retorno: paso 9.

**FA-03 — Edición de un ítem existente.**
Disparador: el administrador modifica un ítem ya publicado.
Pasos: se incrementa la versión de contenido del ítem, que es distinta de la versión de formato.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de formato no admitido | El ítem declara una versión de formato distinta de las dos admitidas | Rechazo (RC-14) |
| Importación con pérdida | Un ítem del archivo no puede convertirse | El sistema lo declara en lugar de descartarlo en silencio. El intake declara la conversión como determinista y sin pérdida para el formato anterior; cualquier otro caso se declara |
| Secreto en la plantilla | Una plantilla llegara a contener un valor secreto | RN-15 prohíbe escribir un secreto en una exportación. **El intake no declara el tratamiento del secreto dentro de una plantilla del catálogo** y se declara brecha en §10 |

## 7. Postcondiciones

**En caso de éxito:** el catálogo refleja los ítems vigentes con su versión de contenido y su versión de formato; el archivo exportado lleva el envoltorio versionado; los ítems importados quedan en la versión de formato vigente; cada escritura dejó su evento de auditoría.

**En caso de fallo:** el catálogo queda en su estado previo y el rechazo identifica el ítem y la causa.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Una instalación nueva | El administrador abre el catálogo | El catálogo aparece vacío: el producto no se distribuye con contenido precargado |
| CA-02 | Un proyecto SelfHosted con dos servicios y su arista ya resueltos | El administrador los guarda como plantilla | El catálogo incorpora un ítem cuyo subgrafo tiene los dos nodos y la arista entre ellos |
| CA-03 | Un catálogo con tres ítems | El administrador lo exporta | El archivo emitido lleva los tres ítems dentro del envoltorio versionado declarado |
| CA-04 | Un archivo de catálogo con ítems de la versión de formato anterior | El administrador lo importa | Cada ítem queda convertido a la versión vigente, con su plantilla envuelta en un subgrafo de un nodo y sin pérdida |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-15, RN-17, RN-30. Reglas conceptuales: RC-14 |
| Historias de usuario a generar en 06 | US-CU-17-1 (listar el catálogo), US-CU-17-2 (guardar un subgrafo resuelto como plantilla), US-CU-17-3 (exportar el catálogo completo), US-CU-17-4 (importar un catálogo exportado) |
| Componentes esperados en 05 | Capa `Web`, página del catálogo y controladores de sus recursos; capa `Application`, módulo de catálogo; capa `Domain`, agregado `Catalogo`; capa `Infrastructure`, `Persistencia` y `Exportacion`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas. El anexo E-22 no declara casos propios del mantenimiento del catálogo; el anexo E-6 declara la regla de conversión que hay que verificar |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- La exportación y la importación del catálogo son endpoints que el intake incorporó porque la capacidad F-14 los declaraba desde su primera versión sin que la superficie los tuviera.
- La versión de formato del ítem es distinta de la versión de contenido que el usuario publica, y se persiste para poder convertir un catálogo importado sin adivinar su forma.
- **Brecha declarada:** el intake no declara si una plantilla del catálogo puede contener material secreto ni con qué tratamiento. RN-15 prohíbe escribirlo en una exportación, y el catálogo es exportable. Destinatario: agente humano del proyecto.
- La presentación del catálogo pertenece a 03-UX-UI-DX.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

