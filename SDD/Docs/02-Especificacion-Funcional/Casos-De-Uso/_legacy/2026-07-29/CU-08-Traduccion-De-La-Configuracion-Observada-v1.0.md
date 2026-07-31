> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `CU-08-Traduccion-De-La-Configuracion-Observada.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../CU-08-Traduccion-De-La-Configuracion-Observada.md`. El cuerpo de este snapshot no se modifica.

# CU-08 — Traducción de la configuración observada al modelo de servicio

**Proyecto:** SelfHosted Service
**Documento:** CU-08-Traduccion-De-La-Configuracion-Observada.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-02](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §6 flujo 2, las seis dimensiones; anexo E-11 (el servicio resultante de la importación); anexo E-20 (las seis configuraciones reales ofuscadas); anexo E-21 (la correspondencia campo por campo y sus reglas de traducción); anexo E-19 (los patrones del parque real); E-16 RN-01, RN-07, RN-15, RN-26, RN-29

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

Traducir la configuración que el motor de contenedores reporta de un contenedor existente a las dimensiones del modelo de servicio, campo por campo, de modo que lo importado sea fiel y que toda pérdida de traducción quede declarada en lugar de ocurrir en silencio.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Módulo de traducción | Primario | Aplica las reglas de correspondencia sobre la configuración observada y produce el servicio equivalente |
| Motor de contenedores | Sistema | Aporta la configuración observada del contenedor |
| Administrador de la solución | Secundario | Recibe el resultado de la traducción y clasifica sus variables (CU-07) |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el contenedor observado y su configuración es legible por el motor (CU-06).
- El proyecto SelfHosted destino está declarado (CU-01).

## 4. Flujo principal

1. El módulo de traducción recibe la configuración observada del contenedor.
2. Deriva el nombre del servicio, verificando el formato y la unicidad dentro del proyecto SelfHosted (RN-01).
3. Deriva el origen: imagen de registro con su etiqueta y su política de actualización, que se deduce de si la etiqueta es explícita o flotante; o construcción desde un archivo local con su contexto y sus argumentos.
4. Deriva la red: modo, alias, dirección fija, interfaz padre, subred y pasarela, distinguiendo el caso en que el proyecto crea la red del caso en que la consume como externa.
5. Deriva los puertos, respetando que un servicio en macvlan no publica puertos en el host (RN-07).
6. Deriva los montajes, los dispositivos, las capacidades, los límites de recursos, las réplicas, la política de reinicio, la marca de efímero y la verificación de salud.
7. Deriva las variables, sin crear ninguna referencia a partir de la interpolación propia del formato de composición (RN-26), y las entrega al paso de clasificación (RN-29).
8. Declara en el informe de traducción todo elemento que no se pudo representar en el modelo.

## 5. Flujos alternativos

**FA-01 — Dependencia explícita del archivo de composición.**
Disparador: el archivo declara una dependencia explícita entre dos servicios.
Pasos: si una variable del origen ya lleva el host y el puerto del destino, la dependencia se reexpresa como referencia sobre esa variable; si ninguna la lleva, se crea una arista sin variable y con espera declarada, sin inyectar variables que el archivo no tenía (RN-26, RN-34).
Punto de retorno: paso 8.

**FA-02 — Signo de expansión escapado.**
Disparador: el archivo trae un signo de expansión duplicado o una ocurrencia literal de la expresión propia del modelo.
Pasos: el duplicado se importa como carácter literal y la ocurrencia literal se importa como texto, persistida escapada, sin crear ninguna referencia (RN-26).
Punto de retorno: paso 8.

**FA-03 — Elemento sin correspondencia.**
Disparador: el contenedor declara un elemento que el modelo no representa.
Pasos: el módulo lo declara en el informe de traducción y continúa con el resto.
Punto de retorno: paso 8.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| Pérdida de traducción | Un elemento observado no tiene correspondencia en el modelo | Se declara en el informe de traducción. Sin ese informe cualquier pérdida sería silenciosa, que es lo que el intake declara inaceptable |
| `422` sobre el nombre | El nombre derivado no cumple el formato o colisiona dentro del proyecto SelfHosted | Rechazo con el campo señalado (RN-01) |
| `422` de puerto en macvlan | La configuración observada declara un puerto publicado sobre un servicio en macvlan | Rechazo (RN-07) |

## 7. Postcondiciones

**En caso de éxito:** existe un servicio equivalente a la configuración observada en imagen, red, dirección, dispositivos, montajes, límites y política de reinicio; ninguna referencia se derivó de la interpolación del formato de composición; el informe de traducción declara lo que no se pudo representar.

**En caso de fallo:** no se produce ningún servicio y el informe declara la causa; el contenedor observado no se modifica en ningún caso.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El caso C-3 del parque real, en macvlan con dirección `192.168.1.139`, con dispositivo anclado, montaje de directorio y límite de 512 MB | El módulo traduce su configuración observada | El servicio resultante conserva imagen, red, dirección, dispositivo, montaje, límite y política de reinicio, y volver a exportarlo produce un archivo equivalente al de partida |
| CA-02 | Un archivo de composición cuyo entorno usa interpolación propia de ese formato | El módulo traduce sus variables | De la interpolación no sale ninguna referencia del modelo: se aplican las reglas de correspondencia declaradas |
| CA-03 | Un archivo donde un servicio declara una dependencia explícita hacia otro y ninguna de sus variables lo menciona | El módulo traduce la dependencia | Se crea una arista sin variable y con espera declarada, y no se inyecta en el origen ninguna variable que el archivo no tenía |
| CA-04 | Un archivo cuyo entorno trae valores con signo de expansión duplicado | El módulo traduce esas variables | Se importan como literales, sin crear ninguna referencia ni ninguna variable secreta |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-02](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) |
| Reglas de negocio aplicables | RN-01, RN-07, RN-15, RN-26, RN-29, RN-34. Reglas conceptuales: RC-02, RC-07, RC-08, RC-16 |
| Historias de usuario a generar en 06 | US-CU-08-1 (traducir la configuración observada a las dimensiones del servicio), US-CU-08-2 (traducir la dependencia explícita sin pérdida), US-CU-08-3 (recibir el informe de lo que no se pudo representar) |
| Componentes esperados en 05 | Capa `Infrastructure`, `Contenedores` y `Exportacion`, donde viven las reglas de correspondencia; capa `Application`, módulo de descubrimiento y adopción; capa `Domain`, agregado `Servicios`. Referencia tentativa. La NB-02 asigna este caso de uso a la capa de infraestructura |
| Tests previstos en 08 | T-30 (ida y vuelta del caso C-3); T-40 (interpolación e importación de dependencia explícita); T-48 (signo de expansión escapado); T-54 (dependencia explícita sin variable que la mencione) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El informe de traducción es lo que hace declarada y no silenciosa toda pérdida. El intake lo declara para la importación de archivos de composición y el mismo criterio aplica a la configuración observada de un contenedor.
- RN-26 lleva marcador `[D-i]` completo y sigue sin revisar; se consume declarándola revisable.
- Las seis dimensiones que NB-02 exige verificar en la fidelidad de lo importado son las del intake §6 flujo 2 y no se amplían acá.
- La correspondencia campo por campo vive en el anexo E-21 y no se transcribe: este caso de uso declara qué debe traducirse y con qué garantía, no cómo se implementa.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

