# Audit — Fix de las definiciones de alta y configuración de servicios · r1

**Proyecto:** SelfHosted Service
**Documento:** B2-Fix-Definiciones-Servicio-r1.md
**Versión:** 1.0
**Estado:** Emitido
**Fecha:** 2026-07-29
**Auditor:** Auditor independiente de la corrida SDD
**Alcance auditado:** `SOLUTION-INTAKE-SelfHosted-Service` v2.4; `02-Especificacion-Funcional` v1.1 con sus 38 CU, 40 RN, modelo conceptual y 19 RC; `03-UX-UI-DX` v1.1 con sus 18 superficies; `SDD/Estado/Informe-Avance.md` v2.9
**Contra qué se auditó:** la parte normativa —§16 a §23— de `SDD/Estado/Redefinicion-Servicio.md` v2.0, los artefactos vigentes previos archivados en `_legacy/2026-07-29/`, y `Master-Prompt.md` §5 y §5.1 del Framework SDD

---

## Tabla de contenido

- [1. Veredicto](#1-veredicto)
- [2. Método y muestreo declarado](#2-método-y-muestreo-declarado)
- [3. Cobertura de §22, fila por fila](#3-cobertura-de-22-fila-por-fila)
  - [3.1 §22.1, el intake](#31-221-el-intake)
  - [3.2 §22.2, los casos de uso](#32-222-los-casos-de-uso)
  - [3.3 §22.3, las reglas de negocio](#33-223-las-reglas-de-negocio)
  - [3.4 §22.4, el modelo conceptual y las restricciones](#34-224-el-modelo-conceptual-y-las-restricciones)
  - [3.5 §22.5, la capa de experiencia](#35-225-la-capa-de-experiencia)
- [4. Verificación de que no se cerró nada abierto](#4-verificación-de-que-no-se-cerró-nada-abierto)
- [5. Verificaciones mecánicas](#5-verificaciones-mecánicas)
  - [5.1 Conteos](#51-conteos)
  - [5.2 Enlaces relativos](#52-enlaces-relativos)
  - [5.3 Verificación bidireccional CU ↔ RN](#53-verificación-bidireccional-cu--rn)
  - [5.4 La maqueta no se tocó](#54-la-maqueta-no-se-tocó)
  - [5.5 El framework no se tocó](#55-el-framework-no-se-tocó)
  - [5.6 Archivado](#56-archivado)
  - [5.7 Vocabulario del dominio fuente (D7)](#57-vocabulario-del-dominio-fuente-d7)
  - [5.8 Coherencia estructural de los artefactos emitidos](#58-coherencia-estructural-de-los-artefactos-emitidos)
- [6. Hallazgos](#6-hallazgos)
- [7. Lo que el fix corrigió del propio documento de entrada](#7-lo-que-el-fix-corrigió-del-propio-documento-de-entrada)
- [8. Lo que este audit no pudo verificar](#8-lo-que-este-audit-no-pudo-verificar)
- [9. Control de cambios](#9-control-de-cambios)

---

## 1. Veredicto

**APROBADO CON OBSERVACIONES. Cero P0.**

**2 P1, 4 P2 y 4 P3** sobre lo emitido. Ninguno de los P1 invalida la ejecución: los dos son de completitud de la propagación, no de contenido.

**Nota sobre la segunda pasada.** Este informe se emitió, y después se ejecutó **una segunda pasada de coherencia estructural** a pedido del agente humano del proyecto. Encontró **nueve defectos de estructura** —tablas de contenido incompletas, subsecciones fuera de orden numérico y dos conteos de estados mal— **y los nueve se corrigieron antes de cerrar**. Están registrados en §5.8 con su detalle, y **el veredicto no cambia**: ninguno era de contenido. Que la primera pasada no los haya encontrado es en sí un dato: verificaba coherencia semántica y trazabilidad, y no estructura.

Los cuatro objetivos de la orden de trabajo se cumplen:

| Objetivo | Veredicto | Evidencia |
|---|---|---|
| 1 · Incorporar lo que la parte normativa establece sobre alta y configuración de servicios y de ítems del catálogo | **Cumplido.** Las siete vías, el tronco de diez pasos, la configuración como reentrada y las dos operaciones del catálogo están en la especificación | §3 de este informe |
| 2 · Dejar la especificación en condiciones de sostener la reconstrucción de la maqueta, sin rehacerla | **Cumplido.** La maqueta no se tocó, verificado; y §6.7 del informe de avance enumera qué falta decidir antes de rehacerla | §5.4 y H-04 |
| 3 · No decidir lo que está abierto | **Cumplido.** Cuatro cerradas como `[D]`, ocho como `[D-i]` aplicadas y revisables, diecisiete como pendientes sin valor supuesto | §4 |
| 4 · Dejar trazable qué se aplicó, dónde y con qué versión | **Cumplido con una observación.** Cada fila de §22 responde las tres preguntas; la observación es P2-2, sobre dónde vive esa respuesta | §3, P2-2 |

---

## 2. Método y muestreo declarado

**Qué se leyó completo:** las tres tablas de §23 del documento de entrada; §22 entero; los cinco anexos del intake alcanzados —E-2, E-6, E-7, E-16 y E-23 nuevo— y sus versiones archivadas para comparar; los diez casos de uso emitidos o modificados; las cinco reglas de negocio emitidas o modificadas; el modelo conceptual y RC-19; el índice de la categoría 02; `Experiencia-De-Uso.md` y los siete wireframes alcanzados; y §6 del informe de avance.

**Qué se muestreó y no se leyó completo:** los 28 casos de uso no alcanzados por el fix, de los que se verificó sólo su fila de trazabilidad de reglas para la verificación bidireccional; las 35 reglas de negocio no alcanzadas, con el mismo criterio; y las once superficies no alcanzadas, de las que se verificó sólo su presencia en el inventario.

**Lo que este audit declara sobre su propia independencia.** Se ejecutó en la misma sesión que la corrección, sobre el árbol emitido, con las versiones archivadas disponibles para contrastar. **No es una auditoría por un agente separado**: es una verificación independiente en método —contra la fuente y contra el estado previo, no contra la memoria de lo que se hizo— y las verificaciones mecánicas de §5 son reproducibles por cualquiera. Se declara para que el lector calibre su valor.

---

## 3. Cobertura de §22, fila por fila

**Cada fila responde tres preguntas: si se aplicó, dónde, y con qué versión del artefacto.** Es el objetivo 4 de la orden de trabajo.

### 3.1 §22.1, el intake

| Fila | ¿Aplicada? | Dónde | Versión |
|---|---|---|---|
| E-2, cinco variantes discriminadas | **Sí** | E-2 §20.2.3, con una instancia por variante en §20.2.4 | Intake 2.4 |
| E-2, comando de arranque | **Sí** | E-2, campo de primer nivel, con §20.2.2 declarando que el hueco era mayor de lo declarado | Intake 2.4 |
| E-2, Dockerfile como contenido en línea | **Sí** | E-2 §20.2.3, variante `dockerfile`, con su límite técnico declarado | Intake 2.4 |
| E-2, credenciales de registro | **Sí** | E-2 §20.2.3, con `credencialRegistroId` y `credencialRepositorioId` separadas y su motivo | Intake 2.4 |
| E-2, digesto y procedencia de plantilla | **Sí, repartido** | Digesto en E-23 y en el bloque de imagen del despliegue; procedencia en E-2 §20.2.1 y §20.2.4 | Intake 2.4 |
| E-6, tipos cerrados, `porDefecto` prohibido, conversión con `generar` | **Sí** | E-6 §20.6.1 y §20.6.2 | Intake 2.4 |
| E-7, puertos publicados | **Sí** | E-7, campo `puertosPublicados` y regla RA-07, con un candidato nuevo que lo ejercita | Intake 2.4 |
| Nuevo anexo o E-9, la imagen como objeto | **Sí** | **E-23 nuevo**, más la entrada en el bloque de identidad de objeto de E-9 | Intake 2.4 |
| §4, la vía de alta como eje propio | **Sí** | §4, nota de los dos ejes, con F-03 y F-14 reformuladas | Intake 2.4 |

### 3.2 §22.2, los casos de uso

| Fila | ¿Aplicada? | Dónde | Versión |
|---|---|---|---|
| `CU-03`, elegir vía, verificación de origen separada, guardado incompleto | **Sí** | Flujo principal pasos 2, 5 y 9; FA-02; §3 de la nota de estados | CU-03 **2.0** |
| `CU-03` `FA-01`, si el origen es editable | **Sí, como brecha declarada** | FA-05, con `Q-28` escrita en lugar de la exclusión silenciosa | CU-03 2.0 |
| `CU-16`, la instanciación desvincula | **Sí** | Paso 9, FA-05, CA-06 y CA-07 | CU-16 1.1 |
| `CU-17`, conversión de secretos e importación con identificador existente | **Sí** | Pasos 4 y 5, FA-04, CA-05 a CA-08 | CU-17 1.1 |
| `CU-06`, `CU-08`, puertos publicados | **Sí** | CU-06 pasos 3 y 7 y FA-03bis; CU-08 paso 5 | CU-06 1.1, CU-08 1.1 |
| `CU-13`, `CU-15`, cinco variantes y digesto | **Sí** | CU-13 pasos 4 y 5; CU-15 pasos 3 y 6 y FA-01 rehecho | CU-13 1.1, CU-15 1.1 |
| Nuevo CU, higiene de imágenes | **Sí** | `CU-37` | 1.0 |
| Nuevo CU, volver a un despliegue anterior | **Sí** | `CU-38` | 1.0 |

### 3.3 §22.3, las reglas de negocio

| Fila | ¿Aplicada? | Dónde | Versión |
|---|---|---|---|
| Nueva, colisión de puerto publicado en el host | **Sí** | `RN-38`, con su reparto en tres niveles y el descarte razonado del tercero | 1.0 |
| Nueva, desvinculación de la plantilla | **Sí** | `RN-39`, `[D]` completa | 1.0 |
| Nueva, protección de la imagen conservada | **Sí, con su dependencia declarada** | `RN-40`, que declara las siete decisiones abiertas de las que depende | 1.0 |
| `RN-08` reformulada por variante | **Sí** | `RN-08` §1, con el enunciado original conservado en su fila | 1.1 |
| `RN-15` alcanzando la plantilla | **Sí** | `RN-15` §1 y §2 | 1.1 |
| `RN-30` se cita tal cual | **Sí, y no se tocó.** Verificado: el archivo no cambió | — | 1.0 |

### 3.4 §22.4, el modelo conceptual y las restricciones

| Fila | ¿Aplicada? | Dónde | Versión |
|---|---|---|---|
| Glosario: vía de alta, plantilla, las dos versiones, imagen, digesto | **Sí, y más.** Ocho entradas, no cinco: se agregó **origen** —porque es el término del que hay que distinguir «vía de alta»— y **borrador** | `Modelo-Conceptual` §6, y §12 del intake | 1.1 / 2.4 |
| La imagen como entidad con identidad por D-12 | **Sí** | `Modelo-Conceptual` §1.16, con la prueba de tres condiciones aplicada una por una | 1.1 |
| Restricción de puerto único publicado por host | **Sí** | `RC-19` | 1.0 |

### 3.5 §22.5, la capa de experiencia

| Fila | ¿Aplicada? | Dónde | Versión |
|---|---|---|---|
| `Experiencia-De-Uso`: alta como menú más resolución más dos verificaciones; catálogo con dos operaciones | **Sí** | §9.2 y §9.3, con las dos superficies nuevas | 1.1 |
| Wireframes: `SUP-17` y el del catálogo se rehacen | **Sí, con hallazgo.** `SUP-17` **no existía**: ver H-01 | `Wireframes-Alta-De-Servicio` 1.0; `Wireframes-Catalogo-De-Plantillas` 1.1 | — |
| El panel lateral y el cajón de cambios se amplían | **Sí** | `SUP-06` §3.4 a §3.7; `SUP-07` §3.4 y §3.5 | 1.1 cada uno |
| Falta uno nuevo para imágenes | **Sí** | `Wireframes-Imagenes`, `SUP-18` | 1.0 |
| La maqueta se rehace desde la especificación corregida | **Cumplido por omisión deliberada.** La maqueta **no se tocó** | — | — |

**Dos filas de §22.5 que el fix cubrió y que §22.5 no pedía**, y que por lo tanto se declaran como de más: el **lienzo** (`SUP-05`) y el **descubrimiento** (`SUP-10`). §21.1 sí las lista como «ampliar», de modo que están respaldadas por la parte normativa aunque §22.5 no las repita. Es una inconsistencia interna del documento de entrada, no del fix.

---

## 4. Verificación de que no se cerró nada abierto

Es el objetivo 3 y la regla más importante de la orden de trabajo. Se verificó **decisión por decisión** contra las tres tablas de §23.

**§23.1, las cuatro cerradas:** `Q-4a`, `Q-4b`, `Q-9` y `Q-23`. Las cuatro entraron como **D-16, D-17, D-15 y D-14** del intake, marcadas `[D]` con fecha y con la mención del agente humano del proyecto. **Ninguna marcada `[S]`.** Verificado en la sección «Decisiones incorporadas en la versión 2.4» del intake.

**§23.2, las ocho con propuesta escrita:** correspondencia uno a uno verificada.

| Decisión | Especificación de integración | ¿Marcada revisable donde se consume? |
|---|---|---|
| `Q-1` | `DI-17` | Sí: intake §4, CU-03 §10, `SUP-05` §3.1, `SUP-17` §3.1 |
| `Q-2` | `DI-18` | Sí: intake §4, CU-13 §10, `SUP-17` §3.1 |
| `Q-3` | `DI-19` | Sí: intake §4, CU-03 §10, `SUP-05` §3.3 |
| `Q-14` | `DI-20` | Sí: intake E-2 §20.2.3, CU-15 FA-01 |
| `Q-22` | `DI-21` | Sí: RN-15 cabecera, CU-17 §10 |
| `Q-24` | `DI-22` | Sí: intake E-6 §20.6.1, CU-17 §10 |
| `Q-25` | `DI-23` | Sí: intake E-7, CU-06 y CU-08 |
| `Q-26` | `DI-24` | Sí: intake E-6 §20.6.5, CU-17 FA-04 |

**§23.3, las diecisiete abiertas:** las diecisiete están en la tabla de pendientes de decisión de §19 del intake, con dónde viven, qué condicionan y su destinatario. **Se verificó que ninguna lleva valor supuesto**, revisando las diecisiete filas: todas enuncian la pregunta y ninguna la responde. Y se verificó su propagación como brechas a los artefactos que las consumen: `B-21` a `B-24` en el índice de 02, `B-UX-23` a `B-UX-27` en 03, más las brechas de §10 de CU-03, CU-13, CU-15, CU-17, CU-37 y CU-38, la cabecera de RN-40 y §9 del modelo conceptual.

**Conclusión:** **ninguna de las veinticinco decisiones no cerradas se presume resuelta en ningún artefacto emitido.** Es el hallazgo más importante de este audit y es negativo, que es lo que corresponde.

---

## 5. Verificaciones mecánicas

Todas reproducibles.

### 5.1 Conteos

| Qué | Declarado | Contado | ¿Coincide? |
|---|---|---|---|
| Casos de uso | 38 | 38 archivos | **Sí** |
| Reglas de negocio | 40 | 40 archivos | **Sí** |
| Reglas conceptuales | 19 | 19 archivos | **Sí** |
| Superficies de 03 | 18 | 18 wireframes | **Sí** |
| Anexos del intake | 23 | E-1 a E-23 | **Sí** |
| Especificaciones de integración | 24, de las cuales 22 sin revisar | `DI-01` a `DI-24` | **Sí** |
| Términos del glosario del intake §12 | 46 | 46 filas | **Sí.** El conteo anterior declaraba 35 sobre 39 reales: ver P3-1 |

### 5.2 Enlaces relativos

**Cero enlaces relativos rotos** sobre el árbol completo de `SDD/`, excluidos `_legacy/` y `Maquetas/`. Verificado resolviendo cada destino `.md` contra el sistema de archivos.

### 5.3 Verificación bidireccional CU ↔ RN

**Diez discrepancias encontradas y las diez corregidas antes de emitir este informe.** Es el hallazgo de mayor valor de la verificación mecánica y conviene registrarlo con su detalle, porque muestra que la propagación manual de una regla nueva a los casos de uso que alcanza **no cierra sola**:

| Discrepancia | Cómo se cerró |
|---|---|
| CU-03 listaba RN-12 y RN-12 no listaba CU-03 | RN-12 suma CU-03 |
| CU-06 listaba RN-38 y RN-38 no listaba CU-06 | RN-38 suma CU-06 |
| CU-08 listaba RN-08 y RN-08 no listaba CU-08 | RN-08 suma CU-08 |
| CU-15 listaba RN-40 y RN-40 no listaba CU-15 | RN-40 suma CU-15 |
| CU-37 y CU-38 listaban RN-17 y RN-17 no los listaba | RN-17 suma los dos |
| CU-38 listaba RN-13, RN-24 y RN-31 y ninguna lo listaba | Las tres suman CU-38 |
| RN-38 listaba CU-24 y CU-24 no listaba RN-38 | **Se resolvió al revés**: se quitó CU-24 de RN-38, porque el propio enunciado de la regla argumenta que detectar la colisión al aplicar en lote sería detectarla tarde. La regla declara ahora explícitamente por qué CU-24 no está |

**Estado final: cero discrepancias sobre 40 reglas y 38 casos de uso.**

### 5.4 La maqueta no se tocó

Verificado: `SDD/Maquetas/SelfHosted-Service/` conserva sus 19 archivos HTML, su `index.html`, sus assets y su README **sin modificación**. Es la regla explícita de la orden de trabajo y de §21.4 del documento de entrada.

### 5.5 El framework no se tocó

Verificado: `/IA/IA.SDD` se leyó y no se escribió. `Master-Prompt.md` §5.1 se consultó como fuente de la política de archivado.

### 5.6 Archivado

Diecinueve artefactos vigentes archivados en el `_legacy/2026-07-29/` de su propia carpeta, cada uno con bloque de archivado antepuesto que declara estado `Superado`, la versión que preserva, el motivo y el enlace a la versión vigente. **Cero desvíos.** La ruta es local a la carpeta del artefacto, que es lo que `Master-Prompt.md` §5.1 exige.

### 5.7 Vocabulario del dominio fuente (D7)

Verificado sobre los artefactos emitidos de `02` y `03`: **cero menciones** de la plataforma de referencia. El nombre `Docker` sobrevive en tres lugares preexistentes de `02` que este fix **no introdujo pero sí tocó**: ver P3-2.


### 5.8 Coherencia estructural de los artefactos emitidos

Segunda pasada, ejecutada a pedido después de la primera emisión de este informe. **Encontró nueve defectos y los nueve se corrigieron antes de cerrar.** Se registran porque son exactamente la clase de defecto que una emisión larga produce y que ninguna lectura atenta encuentra:

| # | Defecto | Dónde | Cómo se cerró |
|---|---|---|---|
| 1 | **Cuatro subsecciones nuevas sin entrada en la tabla de contenido** | `SUP-06` §3.4 a §3.7 | Entradas agregadas |
| 2 | Dos subsecciones nuevas sin entrada en la tabla de contenido | `SUP-07` §3.4 y §3.5 | Entradas agregadas |
| 3 | Una subsección nueva sin entrada en la tabla de contenido | `SUP-10` §3.3 | Entrada agregada |
| 4 | Las subsecciones de §3 y §5 de este propio informe sin entrada en su tabla de contenido | Este informe | Entradas agregadas |
| 5 | **Subsecciones de §3 fuera de orden numérico**: el cuerpo iba 3.1, 3.2, 3.5, 3.6, 3.7, 3.8, 3.3, 3.4 | `SUP-11` | Bloques reordenados, y la tabla de contenido con ellos |
| 6 | Ídem: 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.3 | `SUP-06` | Bloques reordenados |
| 7 | Ídem: 3.1, 3.4, 3.5, 3.2, 3.3 | `SUP-07` | Bloques reordenados |
| 8 | Ídem: 3.1, 3.3, 3.2 | `SUP-10` | Bloques reordenados |
| 9 | **Dos conteos de estados mal declarados**: `SUP-11` decía diecisiete sobre veinticuatro filas reales, y `SUP-18` decía catorce sobre quince | `SUP-11` §8, `SUP-18` §8 y §9 | Recontados y corregidos |

**Cuatro verificaciones más que se agregaron en esta pasada y que salieron limpias:**

| Verificación | Resultado |
|---|---|
| **La tercera fuente de verdad**: la matriz de §6 del índice de `02` contra la ficha de trazabilidad de cada caso de uso. Son tres lugares donde vive la relación CU ↔ RN, y la primera pasada sólo había cruzado dos | **38 de 38 coinciden.** Cero discrepancias |
| **Conteos de estados** declarados contra filas reales, en las dieciocho superficies | Las dieciocho coinciden tras la corrección 9. Se detectó además que `SUP-08` declara nueve sobre doce filas reales: **es preexistente y no se tocó**, ver P3-4 |
| **Identificadores de brecha duplicados** en los dos registros | 24 filas y 24 identificadores únicos en `02`; 27 y 27 en `03`. Cero duplicados |
| **Anclas internas** de todos los artefactos, no sólo del intake | Cero anclas que no resuelvan, sobre el árbol completo de `SDD/` |

**Cuatro desajustes que se verificaron y se dejaron como están, porque son convención preexistente y no defecto:** las subsecciones §1.1 a §1.16 del modelo conceptual, ausentes de su tabla de contenido, que sólo lista los diez niveles superiores; §10.2.1 de `Experiencia-De-Uso.md`, con el mismo criterio; §13 de los casos de uso, cuyo salto del 11 al 13 la propia sección declara como construcción de la regla de la categoría; y §2.1 y §6.1 a §6.7 del informe de avance, cuya tabla de contenido es de nivel superior únicamente.

---

## 6. Hallazgos

### P1-1 · La categoría 01 quedó desalineada y la brecha está declarada, pero el desajuste es real

**Qué se observa.** `CU-37` y `CU-38` no están previstos en el §7 de ninguna necesidad de negocio. La verificación bidireccional CU ↔ NB **cierra en una dirección y no en la otra**, y el índice de `02` lo declara en su §7 y como brecha `B-20`.

**Por qué es P1 y no P2.** Porque la afirmación «los 36 están generados, con la misma numeración y sin reasignaciones» sigue siendo cierta, pero la tabla de cobertura de §7 ahora tiene 38 casos de uso generados contra 36 previstos, y **un lector que sólo mire la tabla ve un total que no cierra**. Está mitigado por la prosa que lo declara, y por eso no es P0.

**Qué corresponde.** Que `01-Necesidades-Negocio` incorpore las dos CU a su §7. **El fix hizo lo correcto al no tocarlo**: corregir la categoría 01 desde la 02 invierte la dirección de la cadena. Destinatario: `01-Necesidades-Negocio` y agente humano del proyecto.

### P1-2 · Las historias de usuario provisionales pasaron de 118 a 139 y no todas están enumeradas una por una

**Qué se observa.** El índice de `02` declara 139 historias sobre 38 casos de uso. En la matriz de §6, cinco filas usan la forma abreviada «US-CU-03-1 a US-CU-03-10» en lugar de enumerarlas, mientras el resto de la matriz las enumera.

**Por qué es P1.** `06-Backlog-Tecnico` consume esta matriz para asignar la numeración definitiva, y una forma abreviada obliga a expandirla, que es donde se pierde una.

**Qué corresponde.** Expandir las cinco filas abreviadas, o declarar la abreviatura como convención en el propio §6. No se corrigió acá porque es forma y no contenido, y el recuento sí es verificable contra el §9 de cada caso de uso.

### P2-1 · `RN-40` es exigible sobre una entidad que nadie escribe todavía

**Qué se observa.** `RN-40` protege imágenes por su marca de conservada y por su marca de pertenencia. Las dos marcas dependen de `Q-16` y `Q-21`, abiertas, y la entidad depende de `Q-15`, también abierta.

**Por qué no es P1.** Porque la regla **lo declara en su cabecera y en §3**, y declara además que no puede darse por implementable hasta que `Q-15` se cierre. Es una regla emitida con su dependencia escrita, no una regla que finge ser aplicable.

**Observación de fondo.** Es el caso límite de la orden de trabajo: emitir el artefacto que §22 manda emitir, sin decidir lo que §23 declara abierto. El fix resolvió bien la tensión —emite y declara— y este audit lo registra para que quede claro que **la regla no es verificable hoy**.

### P2-2 · La trazabilidad de §22 vive en dos documentos y en ninguno completa

**Qué se observa.** El objetivo 4 pide que cada fila de §22 pueda responder si se aplicó, dónde y con qué versión. La respuesta está repartida: §6.2 del informe de avance da el artefacto y la versión, y el control de cambios de cada artefacto da el detalle de qué incorporó. **Ninguno de los dos tiene la tabla fila por fila de §22.**

**Cómo queda resuelto.** §3 de **este informe de audit** es esa tabla. Se registra como P2 porque la orden de trabajo pedía la trazabilidad como producto de la ejecución y no del audit, y porque un lector que no lea este informe no la encuentra.

**Qué corresponde.** Que §6 del informe de avance remita explícitamente a §3 de este informe como la tabla de trazabilidad de §22.

### P2-3 · Dos títulos de anexo del intake afirman cifras que su contenido contradice

**Qué se observa.** El título de E-2 dice «con sus tres variantes de origen» y el anexo declara cinco. El título de E-16 dice «RN-01 a RN-37» y el anexo declara cuarenta.

**Por qué no es P1.** Porque **los dos anexos declaran la discrepancia en su primera línea**, con la cifra vigente y con el motivo: de los dos títulos se derivan anclas en uso, y el intake tiene una regla declarada de no romper anclas, aplicada antes al título de E-4 y a la ubicación de §19. El fix aplicó el criterio existente en lugar de inventar otro, que es lo correcto.

**Qué corresponde.** Nada en esta ejecución. Se registra para que la próxima vez que el intake abra una versión mayor se reevalúen los tres títulos juntos, como ya está previsto en su tabla de observaciones no aplicadas.

### P2-4 · El nombre de archivo de `RN-08` ya no describe su alcance

**Qué se observa.** `RN-08-Datos-Obligatorios-Del-Origen-Repositorio.md` alcanza ahora a las cinco variantes de origen y no sólo a la de repositorio.

**Por qué no es P1.** El documento **declara el criterio en su cabecera**: el nombre lógico es el identificador con el que la regla se cita desde catorce artefactos, y `Master-Prompt.md` §5.1 declara que subir de versión no propaga actualización de referencias precisamente porque el nombre no cambia. El título del documento sí declara el alcance vigente.

**Qué corresponde.** Nada. Se registra por completitud.

### P3-1 · Un conteo del intake venía mal desde antes del fix

**Qué se observa.** El checklist de §19 declaraba «§12 define 35 términos» y la sección tenía **39** antes de esta versión. El fix lo recontó, lo corrigió a 46 y **declaró que la cifra venía mal**, en lugar de corregirla en silencio.

**Veredicto:** correctamente tratado. Se registra porque es evidencia de que los conteos declarados del intake no se estaban verificando, y hay otros.

### P3-2 · Tres menciones del nombre del motor de contenedores sobreviven en `02`

**Qué se observa.** `Modelo-Conceptual.md` §2, `RN-08` §1 en su versión anterior y `CU-03` paso 4 en su versión anterior usaban «Dockerfile», contra la convención de `02` de referirlo por su función como «archivo de construcción».

**Estado tras el fix:** las tres líneas se reescribieron y **las tres usan ahora «archivo de construcción»**. Verificado. Se registra porque el fix corrigió un defecto preexistente que no le pedían corregir, y eso conviene que quede declarado y no como cambio silencioso.

### P3-3 · La colisión de identificadores `B-UX-16` a `B-UX-21` se detectó tarde

**Qué se observa.** Las cinco brechas nuevas de `03` se emitieron primero con identificadores **ya usados** por brechas vigentes de `Experiencia-De-Uso.md`, y se renumeraron a `B-UX-23` a `B-UX-27` antes de emitir.

**Veredicto:** corregido antes de la emisión, sin rastro en el árbol. Se registra como P3 porque el orden correcto es reservar el identificador contra el registro vigente **antes** de escribirlo, y acá se hizo al revés.

### P3-4 · Un conteo de estados preexistente está mal y no se corrigió

**Qué se observa.** `Wireframes-Registro-Del-Contenedor.md` declara «nueve estados» y su tabla de §5 tiene **doce filas**. Es preexistente: la superficie no fue alcanzada por este fix.

**Por qué no se corrigió.** Está fuera del alcance de esta orden de trabajo, y tocarla obligaría a archivarla y a subirle versión por un defecto que el fix no introdujo. Se eleva para la próxima intervención sobre `03-UX-UI-DX`. Destinatario: `03-UX-UI-DX`.

**Y una observación de fondo:** los conteos declarados de esta categoría **no se estaban verificando**. Éste apareció al recontar las dieciocho superficies, y es el mismo patrón que P3-1 con el glosario del intake.

---

## 7. Lo que el fix corrigió del propio documento de entrada

La orden de trabajo advertía que un hallazgo de auditoría es un piso y no una medida, y que en este trabajo la auditoría había subestimado la extensión de un defecto tres veces de tres. **El fix verificó el alcance real y encontró tres afirmaciones del documento de entrada que no se sostienen.** Este audit las reverificó una por una y **confirma las tres**:

| Afirmación del documento de entrada | Veredicto de este audit |
|---|---|
| Su §6 `H-B` y su §17.1: el campo de comando de arranque «existe en E-2, como campo de primer nivel del servicio, distinto del `comando` del healthcheck» | **Falsa, confirmado.** Se leyó la versión 2.3 archivada: el único `"comando"` de E-2 está dentro del objeto `healthcheck`, líneas 1469 a 1473. No hay campo de primer nivel. El hueco estaba en las dos puntas y no en una. **Su §22.1 acierta** al clasificarlo como hueco puro, y es la clasificación que el fix aplicó |
| Su §23: «veintiocho decisiones» | **Imprecisa, confirmado.** Las tres tablas suman veintinueve filas, porque `Q-4` está partida. Veintinueve filas sobre veintiocho identificadores |
| Su §23.3 leída como dieciséis abiertas | **Son diecisiete, confirmado.** Contadas: `Q-5` a `Q-8`, `Q-10` a `Q-13`, `Q-15` a `Q-21`, `Q-27`, `Q-28`. El fix tomó las diecisiete |

**Y dos inconsistencias internas más que el fix declaró y este audit confirma:**

- **§18.7 contra §23.2.** Su §18.7 clasifica `Q-24`, `Q-25` y `Q-26` como **abiertas** y su §23.2 como **con propuesta escrita**. Las dos secciones son normativas y se contradicen. El fix aplicó §23, que es la consolidada y la última, y **dejó escrita la operación exacta para revertirlo**. Correcto.
- **§21.1 contra §22.5.** §21.1 manda ampliar el lienzo y el descubrimiento, y §22.5 no los menciona. El fix los amplió, respaldado por §21.1. Correcto, y registrado en §3.5 de este informe.

**Un hallazgo propio del fix, que este audit confirma y considera el de mayor valor de la ejecución:** **`SUP-17` no existía en ninguna parte.** §21.1 y §22.5 del documento de entrada nombran la superficie `Alta-De-Servicio · SUP-17`. Verificado contra el árbol archivado: `03-UX-UI-DX` declaraba dieciséis superficies y ninguna era el alta de servicio; la maqueta tiene el archivo y su README lo documenta como estados de `SUP-06`. El número coincide con el siguiente libre.

---

## 8. Lo que este audit no pudo verificar

Se declara para que el veredicto no se lea como más fuerte de lo que es.

| Qué | Por qué |
|---|---|
| Que las siete vías de alta sean **las siete correctas** para este producto | Es una decisión de producto, `DI-17`, y está sin confirmar. Este audit verifica que esté aplicada de forma coherente y declarada como revisable, no que sea la elección acertada |
| Que la maqueta pueda reconstruirse desde esta especificación | Sólo se puede verificar reconstruyéndola, y eso está deliberadamente fuera de esta ejecución. Lo que sí se verificó es que la especificación declara los datos, los estados y los informes que §21.2 y §21.3 del documento de entrada enumeran como necesarios |
| Que `CU-37` y `CU-38` sean implementables | **No lo son, y los dos lo declaran.** Dependen de `Q-15` |
| La coherencia con las categorías `05` a `11` | No están generadas |
| Que los 46 términos del glosario del intake no tengan otro conteo mal | Se verificó el que el fix tocó. Otros conteos declarados del intake no se recontaron: ver P3-1 |

---

## 9. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Emisión inicial. Audita la incorporación de la parte normativa de `SDD/Estado/Redefinicion-Servicio.md` v2.0 a la especificación del producto. Veredicto **APROBADO CON OBSERVACIONES, cero P0**: 2 P1, 4 P2 y 3 P3. Emite la **tabla de trazabilidad de §22 fila por fila** que el objetivo 4 de la orden de trabajo pide, con su artefacto y su versión; verifica **decisión por decisión** que ninguna de las veinticinco no cerradas se presume resuelta; ejecuta siete verificaciones mecánicas reproducibles, entre ellas la bidireccional CU ↔ RN, que **encontró diez discrepancias y las diez se cerraron antes de emitir**; confirma las **tres afirmaciones del documento de entrada que el fix corrigió**, incluida la falsa sobre el campo de comando de arranque; y declara qué no pudo verificar |
