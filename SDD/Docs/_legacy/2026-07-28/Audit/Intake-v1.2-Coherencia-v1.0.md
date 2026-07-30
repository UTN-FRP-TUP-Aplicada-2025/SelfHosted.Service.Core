# Auditoría de coherencia interna · SOLUTION-INTAKE-SelfHosted-Service-Core v1.2

| Campo | Valor |
|---|---|
| Documento auditado | `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` (3302 líneas, UTF-8, LF) |
| Alcance | Coherencia interna cuerpo–anexos y entre anexos, integridad del esquema relacional de E-9, reglas de negocio y casos de prueba, convivencia de sintaxis, fidelidad a la fuente externa, marcadores, §13 intacto, control de cambios y completitud de §19 |
| Referencias contrastadas | `_legacy/2026-07-27/SOLUTION-INTAKE-…-v1.0.md`; `IA.SDD/SDD/Devs/Rules/Intake-Rules.md`; `IA.SDD/SDD/Devs/Orchestrator/Master-Prompt.md` §10 y §13; `SelfHosted.Service.Core.Documentos/Analisis/Analisis-SaaS-Service/Analisis-Rayway.md`; `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.1.md` |
| Auditor | Auditor independiente (Arquitecto de Soluciones + QA Senior). No participó de la integración de la versión 1.2 |
| Fecha | 2026-07-28 |
| Versión del informe | 1.0 |

---

## 1. Resumen ejecutivo

La integración de las siete decisiones está mayoritariamente bien ejecutada: §13 se verificó intacto por hash contra la 1.0, las once reglas nuevas existen y ninguna de las veinte anteriores fue renumerada, las dieciséis pruebas nuevas existen y cada regla nueva tiene al menos un caso, incluido el del secreto que la heurística no detecta. Pero la propagación quedó incompleta en tres puntos que sí rompen la derivación: el nuevo ejemplo de operación en lote de E-13 contradice a E-5, a E-3, a T-23 y a la regla RN-13 sobre qué contenedores despliega el changeset 331; recicla el identificador de despliegue 5310, que E-8 y E-11 ya asignan a otro servicio de otro proyecto; y un conjunto de decisiones de diseño del integrador —los espacios de nombres de la sintaxis, la forma canónica, el escape y las dos reglas de convivencia con Compose— se presentan como contenido cerrado de la decisión D-6 del agente humano.

Hallazgos: **3 P0**, **6 P1**, **15 P2**, **4 P3**. Veredicto: **RECHAZADO**.

---

## 2. Verificación de las cifras declaradas por el integrador

| # | Cifra declarada | Recuento del auditor | Resultado |
|---|---|---|---|
| 1 | Once reglas de negocio nuevas, RN-21 a RN-31 | E-16 tiene 31 filas `RN-`; la 1.0 tenía 20. Diferencia = 11, numeradas RN-21 a RN-31 sin salto | **Correcta** |
| 2 | Ninguna regla existente renumerada | `diff` de las filas RN-01 a RN-20 entre 1.0 y 1.2: sólo RN-04 y RN-05 cambian texto; ningún número se mueve | **Correcta** |
| 3 | RN-04 y RN-05 extendidas sin romper su enunciado original | RN-04 conserva "canal alcanzable … Aplicación del changeset … Enlace marcado inválido" y agrega el ámbito `host-puerto`; RN-05 conserva enunciado, momento y respuesta | **Correcta** |
| 4 | Dieciséis casos de prueba nuevos, T-31 a T-46 | E-22 tiene 47 filas `T-`; la 1.0 tenía 31 (T-01 a T-30 más T-17b). Diferencia = 16 | **Correcta** |
| 5 | Reescritura de T-17 y T-17b | Ambas filas difieren de la 1.0 y declaran su reescritura por D-2 | **Correcta** |
| 6 | E-22 pasa de 31 a 47 casos | 31 → 47 verificado. §17.4 P.6 cita "los cuarenta y siete casos", coherente | **Correcta** |
| 7 | Una tabla nueva en E-9, `variables_proyecto` | Presente, con `UNIQUE (proyecto_id, clave)` y FK `ON DELETE CASCADE` | **Correcta** |
| 8 | Columnas nuevas en `enlaces`, `variables` y `catalogo_items` | `enlaces`: `tipo`, `clave_destino` (más `puerto_destino` y `protocolo` vueltos condicionales por CHECK). `variables`: `referencia`, `resuelta_en`, más el valor `referencia` en `origen`. `catalogo_items`: `formato_version` | **Correcta** |
| 9 | Dos índices nuevos | `ix_enlaces_destino` e `ix_variables_referencia` | **Correcta en cantidad**; ver hallazgo P1-2 sobre la utilidad real del segundo |
| 10 | Formato de exportación del catálogo sube de versión | `"formato": "selfhosted-catalogo", "version": 2`, con regla de conversión desde 1 | **Correcta** |
| 11 | Formato del manifiesto propio sube de versión | `"formato": "selfhosted-proyecto", "version": 2`, con regla de lectura de la 1 | **Correcta** |
| 12 | Cuatro términos nuevos de glosario | §12 tiene 32 filas; la 1.0 tenía 28. Los cuatro son «Catálogo», «Referencia de variable», «Subgrafo parametrizado» y «Variable compartida del proyecto» | **Correcta** |
| 13 | Dos capacidades nuevas, F-23 y F-24 | §4 tiene 24 filas `F-`; la 1.0 tenía 22 | **Correcta** |
| 14 | Treinta y seis entradas de control de cambios | La tabla tiene **37** filas con versión 1.2. Una de ellas (la nota de archivado de la 1.1) declara explícitamente ser "nota de archivado, no de contenido". La cifra cierra sólo si esa fila se excluye | **Parcialmente correcta**; ver P2-4 |
| 15 | Cuatro endpoints nuevos en E-15 | E-15 pasa de 22 a 26 filas | **Correcta en filas**; ver P2-12 sobre el recuento de endpoints |
| 16 | §13 intacto, verificado por hash contra la 1.0 archivada | Extracción de §13 completa en ambas versiones: `md5 = cfe9b4fab20dab26bd1d38142801765e` en las dos; `diff` vacío | **Correcta. Verificado de forma independiente** |

Cifras que el propio documento declara y que también se verificaron: §19 dice "15 casos límite" (§7 tiene 15 filas `CL-`), "10 riesgos" (§11 tiene 10), "10 historias" (§5 tiene 10), "7 exclusiones" (§9 tiene 7), "4 proyectos" (§13 tiene 4). Todas correctas. La única incorrecta es la de la entrada de control de cambios de §21, que declara "se agregan diez filas" cuando se agregaron nueve (P2-5).

---

## 3. Matriz de coherencia por decisión

| Decisión | Dónde debía aplicarse | Dónde está aplicada | Qué falta o falla |
|---|---|---|---|
| **D-1** · resultado por contenedor | §7 CL-04, E-3, E-13, E-17, E-22 (T-31), RN-31 | Todas. Además E-15 (`GET /operaciones/{id}`) y §17.2 P.6 | El ejemplo nuevo de E-13 contradice a E-5, E-3, T-23 y RN-13 (**P0-1**) y recicla el despliegue 5310 (**P0-2**). El índice de decisiones no lista E-15, donde D-1 sí aparece (P2-14) |
| **D-2** · el secreto se declara | §7 CL-15 y CL-08, §11 (RG-09), §17.3 P.5, E-7 (RA-05, RA-06), E-11, E-20 (C-2), E-21, E-15, E-22 (T-17, T-17b, T-32, T-33), RN-29 | Todas, de forma consistente. §6 flujo 2 incorpora el paso obligatorio | Sin faltantes materiales. El índice de decisiones no lista E-15 (P2-14) |
| **D-3** · IC-05 cerrado | §17.4 P.11, §19, tabla de marcadores `[S]` sin número, §21 | Todas. El marcador pasó de `[S]` a `[D]` correctamente | Sin faltantes |
| **D-4** · arranque parcial confirmado | §7 CL-01, E-8, RN-20 | §7 CL-01 registra la confirmación; E-8 y RN-20 sin cambios, como corresponde a una confirmación sin cambios | Sin faltantes |
| **D-5** · variable compartida | §4 F-23, §12, §17.3 P.5, E-1, E-2, E-5, E-9, E-10, E-14, E-15, RN-27, RN-28, E-22 (T-41, T-42) | Todas | E-1, E-2 y E-5 no coinciden en el valor ni en el estado de `TZ` (**P1-4**). `variables_proyecto` no admite referencias, lo que deja parte de RN-22 sin materializar (**P1-1**) |
| **D-6** · referencia entre variables | §4 F-24, §12, §17.3 P.5, §17.4 P.11, E-1, E-2, E-4, E-5, E-9, E-13, E-14, E-21, RN-21 a RN-26, E-22 | Todas, y con la especificación más extensa del cambio | Decisiones de diseño del integrador presentadas como contenido de D-6 (**P0-3**). El índice de consulta rápida por igualdad no sirve para la referencia interpolada que el propio E-2 ejemplifica (**P1-2**). La convivencia con Compose deja el sentido de exportación sin cubrir (**P1-3**). El índice de decisiones atribuye RN-21 a RN-27 a D-6, contra E-16 (P2-3) |
| **D-7** · catálogo como cuarta vía | §4 F-14, §12, §16, E-6, E-10, E-15, RN-30, E-22 (T-43) | Todas | El ítem multi-servicio anida `{{ slug }}` dentro de `${{ … }}`, contra la forma canónica de E-4 y contra la afirmación de no colisión del propio E-6 (**P1-6**). No hay endpoint de exportación ni de importación de catálogo pese a que D-7 versiona ese formato (P2-13) |

---

## 4. Coherencia cuerpo–anexos y entre anexos

**Lo que resuelve bien.** Las cadenas de citas del material nuevo resuelven: §7 CL-15 → E-7 (RA-05, RA-06) → E-11 → E-20 (C-2) → T-17/T-32 cierra sin cabos sueltos; §17.4 P.11 → E-4 → E-1 (arista 9003) → E-2 (`DB_USER`) → E-9 (`enlaces.tipo`) es consistente en identificadores y valores; F-14 → E-6 → E-10 (paso 2) → RN-30 → T-43 también. Los veintidós identificadores E-1 a E-22 están citados desde el cuerpo y ninguno queda huérfano.

**Identidad de los objetos entre anexos.** El proyecto 12 y los servicios 101 (`api`), 102 (`cache`) y 103 (`db`) mantienen la misma identidad en E-1, E-2, E-3, E-4, E-5, E-13 y E-14. El servicio 305 (`print-server`, proyecto 7) mantiene identidad en E-7, E-8, E-11 y E-21, salvo por la ruta del montaje, que difiere (P2-10).

**Lo que falla.** Tres roturas, dos de ellas introducidas por la 1.2:

- El identificador de despliegue **5310** designa a dos despliegues distintos de dos proyectos distintos (P0-2).
- La operación en lote del changeset 331 tiene tres composiciones distintas según el anexo (P0-1).
- La variable compartida `TZ` tiene dos valores simultáneos según el anexo (P1-4).

---

## 5. Integridad del esquema relacional de E-9

**Lo verificado y correcto.**

- Las decisiones de esquema preexistentes que §17.3 P.4 exige sostener siguen intactas: `reservas_ip` con la dirección como columna indexada y `UNIQUE (servicio_id, numero_replica)`; `despliegues` sin borrado; `eventos_auditoria` presente. Ninguna se rompió al agregar las tablas y columnas nuevas.
- `variables_proyecto` es coherente con E-1: `id`, `clave`, `valor` nulo cuando `secreta`, `referencia_secreto`, `descripcion`. El ejemplo 701/702 de E-1 encaja campo por campo.
- Los cuatro `CHECK` de `enlaces` son coherentes entre sí y con los ejemplos: 9002 (`host-puerto`, `puerto_destino` 5432, `clave_destino` nulo) y 9003 (`referencia`, `clave_destino` `POSTGRES_USER`, `puerto_destino` nulo) satisfacen los cuatro.
- `variables.CHECK (referencia IS NOT NULL OR resuelta_en IS NULL)` es coherente con las nueve variables de E-2.
- `catalogo_items.formato_version` con `CHECK (formato_version IN (1, 2))` es coherente con la regla de conversión de E-6.
- Orden de creación: el comentario que justifica crear `enlaces` antes que `servicios` sigue siendo válido con las columnas nuevas.

**Lo que no cierra.**

- `variables_proyecto` no tiene columna `referencia` ni `resuelta_en`, de modo que una variable compartida sólo puede contener un literal. RN-22 declara ciclos de resolución "que pasan por una variable compartida del proyecto": con este esquema esa clase de ciclo no puede existir (**P1-1**).
- El índice `ix_variables_referencia ON variables(referencia)` está declarado para resolverse "por igualdad gracias a la forma canónica de la expresión", pero `variables.referencia` almacena el valor completo cuando la referencia va interpolada —E-2 guarda `"http://api:${{ PUERTO_HTTP }}/salud"`—, y E-4 admite explícitamente más de una referencia en el mismo valor. La igualdad no encuentra esos casos (**P1-2**).
- `enlaces.origen_servicio_id` y `destino_servicio_id` siguen sin `REFERENCES` declarado, con la nota de que EF Core los agrega en la migración. Es preexistente y está justificado en el propio anexo; no se reporta como hallazgo nuevo.

---

## 6. Reglas de negocio y casos de prueba

**Cobertura regla → caso de prueba.** Las once reglas nuevas tienen caso:

| Regla | Casos | Regla | Casos |
|---|---|---|---|
| RN-21 | T-34, T-35, T-46 | RN-27 | T-41 |
| RN-22 | T-36 | RN-28 | T-42 |
| RN-23 | T-37 | RN-29 | T-17, T-17b, T-32, T-33 |
| RN-24 | T-38 | RN-30 | T-43 |
| RN-25 | T-39 | RN-31 | T-31 |
| RN-26 | T-40 | — | — |

El caso que motivó D-2 —secreto en una variable que la heurística no detecta— está explícitamente cubierto por **T-17** (la heurística no la sugiere y sin clasificación no hay servicio), **T-32** (el usuario la marca y queda cifrada, con `marcadasPorElUsuario: ["ClaveMaestra"]`) y **T-33** (confirmar sin clasificación devuelve `422`). Cada uno con entrada concreta y resultado esperado. Este punto está bien resuelto.

**Momento de validación y respuesta.** Las once reglas nuevas declaran ambos campos. RN-24, RN-25, RN-26, RN-30 y RN-31 declaran "Invariante" como respuesta, coherente con el criterio que ya usaban RN-09, RN-12, RN-14, RN-16 y RN-17.

**Contradicciones entre reglas.** No hay contradicción entre el enunciado de una regla nueva y una anterior. La única excepción declarada —RN-21 exceptúa a la arista `referencia` de RN-04— está explicitada en las dos reglas y en la tabla comparativa de E-4, y su caso de prueba (T-46) se contrasta con T-11.

**Contradicciones entre casos.** Sí las hay: T-23 y T-31 dan resultados opuestos sobre el mismo changeset 331 (P0-1).

**Casos sin regla asociada.** El escape `$${{` declarado en E-4 no tiene regla en E-16 ni caso en E-22 (parte de P1-3).

---

## 7. Convivencia de sintaxis con Docker Compose

El análisis de convivencia es el punto mejor argumentado del cambio: RN-25 (la exportación nunca emite `${{ … }}`), RN-26 (la importación nunca crea referencias), la fila de E-21 para la ocurrencia literal de `${{`, y los casos T-39 y T-40. La dirección **Compose → modelo** queda cerrada.

La dirección **modelo → Compose** queda incompleta en dos casos que ninguna regla cubre:

1. Una variable cuyo valor literal contiene `${{` —exactamente la que RN-26 y E-21 mandan importar "como texto, sin interpretarse"— se exporta tal cual, porque RN-25 sólo gobierna las referencias. Por el propio argumento del documento ("emitirla produciría un archivo que no levanta"), la ida y vuelta de E-21 a E-14 puede producir un Compose que no levanta.
2. Una variable cuyo valor literal contiene `$` o `${VAR}` como texto no tiene regla de escape a `$$` en la exportación. Compose la interpolaría al levantar. El documento declara el escape `$${{` para el sentido contrario, pero no el escape en la emisión.

Ninguno de los dos casos tiene regla ni caso de prueba (**P1-3**).

---

## 8. Fidelidad a la fuente externa y autocontención

- La transcripción del bloque de *reference variables* de `Analisis-Rayway.md` §3.5 en E-4 es **fiel línea por línea** al original (verificado contra las líneas 269–281 de la fuente), salvo la pérdida de tildes en los comentarios del bloque de código, coherente con la convención del intake de no acentuar dentro de bloques de código pero declarada como transcripción textual (P3-3).
- La cita de §7 —*"Reference variable `${{svc.VAR}}` → Resolución en el backend antes de crear el contenedor + arista en el grafo. Es lo que alimenta las aristas del canvas"*— corresponde a una fila de la tabla de §7, con sus tres celdas concatenadas. La correspondencia es exacta y la atribución de sección es correcta.
- La cita de la definición de `Template` es literal y **está en §3.2**, correctamente atribuida.
- **Atribución incorrecta:** §4 (nota de F-14) y E-6 atribuyen a "`Analisis-Rayway.md` §3.2 y §4.3" la afirmación de que el producto de referencia lista `Template` en el menú de creación de servicio junto a `Docker Image` y `GitHub Repository`. Esa enumeración de menú está en **§3.2** (a partir de `Captura-01.png`); **§4.3 no menciona `Template`**: nombra New Project, Project Canvas, Add a Service, Docker Image, Deploy y Generate Domain. Además §4.3 no figura entre las secciones que la tabla de procedencia declara tomar de esa fuente (**P2-8**).
- **Autocontención:** la tabla de procedencia declara tomar de esa fuente cuatro secciones —§3.2, §3.5, §3.6 y §7—. De §3.6 (invariantes del modelo) **no hay una sola cita ni transcripción** en el intake, y el ítem de autocontención de §19 enumera sólo tres cosas (sintaxis, definición de plantilla y momento de resolución), sin cubrir §3.6. O la procedencia sobredeclara o falta la transcripción (**P2-7**).
- Salvo ese punto, la regla de autocontención se cumple: nada del material nuevo se respalda únicamente en el archivo externo.

---

## 9. Marcadores [E] / [D] / [S]

Se revisaron los 24 usos de `[S]` del documento. Ninguno de los siete cambios de la 1.2 introdujo un marcador `[S]`: todo lo incorporado por D-1 a D-7 lleva `[D]` con fecha y origen. El marcador `[S]` de IC-05 pasó correctamente a `[D]`. Los dos `[S]` que quedan abiertos —matriz de navegadores en §17.1 P.9 y latencia de la API en §17.1 P.10— son preexistentes y están declarados como tales.

El problema no es el marcador en sí sino **la autoría que ese marcador afirma**: la sección «Decisiones del agente humano incorporadas en la versión 1.2» establece que lo marcado `[D]` con fecha 2026-07-28 y origen "agente humano del proyecto" **son datos cerrados y no propuestas de este intake**. Bajo ese banner se incorporó material que excede el alcance declarado de las decisiones (**P0-3**).

---

## 10. §13 intacto

Verificado de forma independiente. §13 completa (encabezado, párrafo introductorio, tabla de cuatro proyectos, nota del grafo acíclico, nota de proyectos de prueba, perfil de convención y nombres resultantes) es **byte a byte idéntica** entre la 1.0 archivada y la 1.2: `md5 = cfe9b4fab20dab26bd1d38142801765e` en ambas, `diff` vacío. La afirmación del integrador es correcta.

Consecuencia derivada, fuera del intake: el `SOLUTION-MANIFEST-…-v1.1.md` sigue siendo válido —§13 no cambió, no corresponde re-derivar según `Master-Prompt.md` §13.7—, pero su campo «Intake (origen)» apunta a `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`, archivo que ya no existe en ninguna ubicación. Se anota en P2-15.

---

## 11. Hallazgos

### P0 — bloqueantes

**P0-1 · La operación en lote de E-13 contradice a E-5, a E-3, a T-23 y a RN-13.**
Ubicación: §20.13 (E-13, cuerpo `op-a41f7`, líneas 2152–2166) y §20.22 (T-31, línea 3083), contra §20.5 (E-5, líneas 1491–1495), §20.3 (E-3, línea 1307), §20.16 (RN-13, línea 2385) y §20.22 (T-23, línea 3075).
Evidencia:

- E-5, changeset 331: `"impacto": { "serviciosARedesplegar": ["api", "cache"], "serviciosSinImpacto": ["db"], … }`.
- RN-13: *"Aplicar el changeset redespliega **sólo** los servicios afectados"*.
- T-23: *"Changeset de E-5, con cambios en `api` y alta de `cache`" → "Redespliega sólo `api` y `cache`; `db` no se toca"*.
- E-3: *"Los dos despliegues pertenecen al mismo changeset 331 y a la misma operación"* (5471 y 5472).
- E-13 (nuevo): `"changesetId": 331` con `resultadoPorContenedor` de **tres** contenedores, incluido `{ "servicioId": 103, "servicio": "db", … "estado": "activo" }`.
- T-31 (nuevo): *"Aplicar el changeset 331 de E-5, que despliega `api`, `cache` y `db`"* → *"`api` y `db` quedan `activo`"*.

Impacto: la categoría `08-Calidad-Y-Pruebas` derivaría dos casos de prueba mutuamente excluyentes sobre el mismo fixture, y `02-Especificacion-Funcional` derivaría un comportamiento de aplicación de changeset que viola RN-13.
Recomendación: quitar `db` del `resultadoPorContenedor` de `op-a41f7` y de la entrada de T-31, dejando la operación en dos contenedores; o bien, si se quiere un ejemplo de tres contenedores, construirlo sobre una operación de arranque de proyecto (`POST /proyectos/{id}/arrancar`) y no sobre el changeset 331, que ya tiene impacto declarado.

**P0-2 · Identificador de despliegue 5310 reciclado entre dos servicios de dos proyectos distintos.**
Ubicación: §20.13 (E-13, línea 2162) contra §20.8 (E-8, línea 1724) y §20.11 (E-11, línea 2079).
Evidencia:

- E-8: `"ocupadaPor": { "id": 305, "nombre": "print-server", "proyectoId": 7, … "despliegueId": 5310, "estado": "activo" }`.
- E-11: servicio 305, `"estadoActual": { "estado": "activo", "despliegueId": 5310, … }`.
- E-13 (nuevo): `{ "servicioId": 103, "servicio": "db", "numeroReplica": 1, "despliegueId": 5310, "estado": "activo", … }` dentro del proyecto 12.

`despliegues.servicio_id` es NOT NULL y la clave primaria es el `id`: un mismo `id` no puede pertenecer al servicio 305 y al 103. La entrada de control de cambios de §20.1 declara para E-1 *"Identificadores nuevos, sin reciclar los existentes"*; en E-13 no se respetó el mismo criterio.
Impacto: fixtures de siembra y de prueba con colisión de clave primaria; el juego de datos de SM-03 y las pruebas de integración no se pueden construir tal como están descriptos.
Recomendación: asignar a `db` un identificador de despliegue nuevo del rango 54xx (por ejemplo 5473), coherente con 5471 y 5472 de E-3.

**P0-3 · Decisiones de diseño del integrador presentadas como contenido cerrado de las decisiones del agente humano.**
Ubicación: §20.4 (E-4, bloque «Segundo origen de arista», líneas 1345–1413), §20.16 (RN-25 y RN-26), §20.13 (líneas 2150 y 2168), §20.15 (nota de `POST /proyectos/{id}/adoptar`, línea 2365).
Evidencia. El índice de decisiones declara el alcance de D-6 como *"referencia entre variables en tres formas —al propio servicio, a una compartida del proyecto y a otro servicio del mismo proyecto—, con la sintaxis `${{ … }}` tomada del análisis de la plataforma de referencia"*. Bajo el rótulo **"[D], D-6 del 2026-07-28"** se incorporan además, sin distinguir autoría:

- Los espacios de nombres reservados `proyecto.` y `servicios.`. La fuente citada usa `shared.` y el nombre de servicio pelado; el intake los cambia y además **descarta explícitamente la forma de la fuente**: *"Se descarta la forma sin prefijo para otro servicio —`${{ db.CLAVE }}`, que es la de la plataforma de referencia—, porque colisiona…"*. Es una decisión de gramática del integrador, argumentada, no una decisión del agente humano.
- La forma canónica de persistencia (`${{`, espacio, camino sin espacios internos, espacio, `}}`), que condiciona el esquema (`ix_variables_referencia`).
- El escape `$${{`, que define el contrato con el contenedor.
- **RN-25 y RN-26**, dos reglas de negocio normativas que fijan comportamiento observable del producto en importación y exportación de Compose, materia sobre la que D-6 no dice nada.
- En D-1: *"El código de respuesta de una operación en lote es `202 Accepted` … Un `5xx` se reserva para el caso en que el propio administrador no pudo llevar adelante la operación"*.
- En D-2: el `422` ante una adopción confirmada sin clasificación y el corolario de versionado de API (*"el cambio debe entrar antes de la primera publicación de la versión 1 de la API o abrir `/api/v2`"*).

El propio intake fija el estándar que se incumple: §19 registra cinco puntos como pendientes explicando que *"son decisiones que las siete no cubren, que cambian el comportamiento observable del producto y que por lo tanto este intake **no toma**"*. Los ítems de arriba cumplen exactamente esa definición y sí fueron tomados, con la firma del agente humano.
Impacto: `02-Especificacion-Funcional` y `05-Arquitectura-Tecnica` derivarían como requisito cerrado del cliente lo que es una propuesta de diseño no confirmada, sin posibilidad de discutirla. Es el mismo defecto que la versión 1.1 corrigió con los supuestos S-01 a S-06.
Recomendación: no rediseñar. Separar la autoría: mantener `[D]` pero declarar en cada bloque qué parte es la decisión del agente humano y qué parte es especificación del integrador derivada de ella, o registrar los puntos de gramática y de convivencia como pendientes de confirmación en §19, con el mismo criterio que los otros cinco.

### P1 — altos

**P1-1 · RN-22 declara una clase de ciclo que el esquema no puede producir.**
Ubicación: §20.16 (RN-22, línea 2394) contra §20.9 (`variables_proyecto`, líneas 1805–1816).
Evidencia: RN-22 dice *"Las referencias no pueden formar un ciclo de resolución, incluidas las que ocurren dentro del mismo servicio y las que **pasan por una variable compartida del proyecto**"*. `variables_proyecto` no tiene columna `referencia` ni `resuelta_en` ni `origen`: una variable compartida sólo admite literal o referencia a secreto, de modo que ningún ciclo puede atravesarla. La regla enuncia un comportamiento que ningún anexo materializa.
Recomendación: o agregar `referencia`/`resuelta_en` a `variables_proyecto` y su caso de prueba, o acotar el enunciado de RN-22 a los ciclos entre variables de servicio.

**P1-2 · El índice `ix_variables_referencia` no resuelve el caso que el propio E-2 ejemplifica.**
Ubicación: §20.9 (comentario de `variables` y del índice, líneas 1870–1878 y 1987–1992) y §20.4 (línea 1376) contra §20.2 (línea 1143) y §20.4 (línea 1377).
Evidencia: E-9 y E-4 declaran que la forma canónica *"es lo que permite responder «quién referencia a esta variable» con una igualdad sobre el índice `ix_variables_referencia`"*, y E-9 agrega que esa consulta *"es la única forma de propagar el cambio de una variable compartida del proyecto"*. Pero E-4 admite que *"una referencia puede aparecer **interpolada dentro de un valor más largo** y puede haber más de una en el mismo valor"*, y E-2 persiste `"referencia": "http://api:${{ PUERTO_HTTP }}/salud"`. Una consulta de igualdad sobre esa columna no encuentra la referencia interpolada.
Impacto: el campo `referenciadaPor` del cambio 4 de E-5, RN-27 (`409` al eliminar una variable referenciada) y el marcado de "requiere redespliegue" de §17.4 P.11 quedan sin mecanismo declarado para el caso interpolado.
Recomendación: declarar el mecanismo real (tabla de aristas de referencia también para las compartidas, o tabla de ocurrencias, o búsqueda por `LIKE` con su costo asumido) y ajustar el comentario del índice.

**P1-3 · La convivencia con Compose deja el sentido de exportación sin cubrir.**
Ubicación: §20.4 (tabla de convivencia, líneas 1383–1388), §20.16 (RN-25, RN-26), §20.21 (fila de la ocurrencia literal de `${{`, línea 3041).
Evidencia: RN-26 y E-21 mandan importar una ocurrencia literal de `${{` *"como texto, sin interpretarse"*. RN-25 gobierna sólo la emisión de **referencias**. Ninguna regla dice qué se emite cuando el valor literal de una variable contiene `${{`, ni cómo se escapa un `$` o un `${VAR}` literal al exportar. E-4 afirma que *"la secuencia `${{` **no es una interpolación válida de Compose**, que espera un nombre de variable después de la llave y falla si encuentra otra llave"*: el propio documento establece que emitirla rompe el archivo. Además el escape `$${{` que E-4 declara no tiene regla en E-16 ni caso en E-22.
Recomendación: extender RN-25 (o agregar una regla) para el literal en la exportación y para el escape `$$`, con su caso de prueba, cerrando el cuadrado de las cuatro combinaciones (referencia/literal × importación/exportación).

**P1-4 · E-1, E-2 y E-5 no coinciden en el valor ni en el estado de la variable compartida `TZ`.**
Ubicación: §20.1 (línea 1074), §20.2 (línea 1139) y §20.5 (cambio 4, líneas 1479–1489).
Evidencia: el cambio 4 de E-5 pertenece al changeset 331, cuyo `estado` es `"pendiente"`, y declara `"antes": { "clave": "TZ", "valor": "UTC" }`. Pero E-1, que es el mismo proyecto 12, ya muestra `{ "id": 701, "clave": "TZ", "valor": "America/Argentina/Buenos_Aires", … }`, y E-2 muestra la variable `TZ` de `api` resuelta a ese mismo valor con `"resueltaEn": "2026-07-26T09:02:09-03:00"`, anterior al `creadoEn` del changeset (`10:02:00`). Con el cambio pendiente, E-1 debería seguir mostrando `UTC`.
Recomendación: dejar `TZ = "UTC"` en E-1 y ajustar el valor resuelto de E-2, o cambiar el `antes` del cambio 4 a otro par de valores que no colisione con el estado aplicado.

**P1-5 · §19 afirma una equivalencia entre dos tablas que no se cumple.**
Ubicación: §19 (línea 3215) contra la sección «Supuestos registrados por este intake y su estado» (tabla de las líneas 70–73).
Evidencia: §19 dice *"Esta tabla y la de la sección «Supuestos registrados por este intake y su estado» enumeran el mismo conjunto y deben mantenerse coherentes entre sí"*. §19 enumera **seis** pendientes abiertas; la tabla de marcadores `[S]` sin número de la otra sección enumera **dos filas**, una abierta (matriz de navegadores) y una cerrada (IC-05). Cinco de las seis pendientes de §19 no tienen contraparte allí. La afirmación se incorporó en la 1.2 y es falsa en el mismo documento que la enuncia.
Recomendación: reformular la frase (las dos tablas tienen alcances distintos: una es de marcadores `[S]`, la otra de pendientes de decisión) o incorporar las cinco pendientes nuevas a la tabla de marcadores.

**P1-6 · El ítem multi-servicio de E-6 anida sintaxis de parámetro dentro de sintaxis de referencia, contra la forma canónica de E-4.**
Ubicación: §20.6 (líneas 1565, 1575, 1588 y 1621) contra §20.4 (línea 1376).
Evidencia: la plantilla escribe `"referencia": "${{ proyecto.{{ slug }}_DB_PASSWORD }}"`, es decir un `{{ … }}` anidado dentro de un `${{ … }}`. E-4 exige que la expresión se persista en forma canónica con *"el camino sin espacios internos"*; el camino `proyecto.{{ slug }}_DB_PASSWORD` contiene dos espacios. Y el propio E-6 afirma que las tres sintaxis *"no colisiona[n]… son tres formas distinguibles a simple vista y ninguna es prefijo de otra"*, cuando el ejemplo muestra una embebida dentro de otra, con dos cierres `}}` consecutivos ambiguos.
Atenuante verificado: la sustitución ocurre al instanciar y *"a partir de ahí no queda ningún `{{ }}` en la base"*, de modo que la forma canónica de `variables.referencia` no se viola en la persistencia final. Lo que se contradice es la afirmación de no colisión y la regla de parseo declarada.
Recomendación: declarar explícitamente el orden de sustitución (parámetros primero, referencias después) y una forma no ambigua para el caso anidado, por ejemplo `"${{ proyecto.__SLUG___DB_PASSWORD }}"` con sustitución previa, o agregar a E-4 la excepción de la plantilla con su regla de resolución.

### P2 — medios

| # | Ubicación | Hallazgo | Recomendación |
|---|---|---|---|
| P2-1 | §17.1 P.10, fila «Observabilidad» (línea 625) | La fila tiene **3 celdas** en una tabla de 4 columnas (`Categoría`, `Métrica`, `Umbral`, `Origen`): falta la celda de origen. Rompe el renderizado de la tabla. Preexistente, reportado por el integrador y **no corregido** | Agregar la celda de origen (`**[E]**`, como las demás filas de origen documental) |
| P2-2 | §20.13 (E-13) frente a §20.3 (E-3) | La misma operación del changeset 331 tiene dos y tres contenedores según el anexo. Derivado de P0-1, se anota aparte porque también afecta la coherencia narrativa de E-3 | Alinear al corregir P0-1 |
| P2-3 | Índice de decisiones, fila D-6 (línea 50) frente a E-16 (línea 2405) | El índice atribuye a D-6 "RN-21 a RN-27"; E-16 atribuye RN-27 y RN-28 a D-5 y RN-21 a RN-26 a D-6 | Corregir el índice a "RN-21 a RN-26" |
| P2-4 | Control de cambios | La tabla tiene 37 filas de versión 1.2 frente a las 36 declaradas. La diferencia es la nota de archivado, que el propio documento declara "no de contenido" | Declarar el recuento como "36 entradas de contenido más una nota de archivado" |
| P2-5 | Control de cambios, entrada de §21 (línea 3300) | Declara *"se agregan diez filas a la matriz de cobertura"*; se agregaron **nueve** (verificado por `diff` contra la 1.0) | Corregir la cifra |
| P2-6 | Control de cambios, entrada de §17.4 (línea 3280) | Una sola entrada cubre §17.4 P.6, P.10 y P.11. `Master-Prompt.md` §13 regla 5 exige *"una sola sección por entrada"* | Partir en tres entradas |
| P2-7 | Tabla de procedencia (línea 29) y §19 (línea 3197) | Se declara tomar de `Analisis-Rayway.md` sus *"invariantes del modelo (§3.6)"*, pero no hay ninguna cita ni transcripción de §3.6 en el intake, y el ítem de autocontención de §19 sólo enumera tres de las cuatro secciones declaradas | Quitar §3.6 de la procedencia, o transcribir lo que se toma de ella y citarlo |
| P2-8 | §4 nota de F-14 (línea 151) y §20.6 (línea 1510) | Atribución incorrecta: la enumeración del menú de creación de servicio con `Template` está en §3.2 de la fuente (a partir de `Captura-01.png`); §4.3 no menciona `Template`. Además §4.3 no está declarada en la tabla de procedencia | Citar sólo §3.2, o incorporar §4.3 a la procedencia y ajustar la afirmación |
| P2-9 | §20.14 (E-14) frente a §20.2 (E-2) | El Compose exportado del proyecto 12 y su archivo de variables **omiten por completo** la variable secreta `API_KEY_EXTERNA` del servicio 101, y `secretosRequeridos` sólo lista `DB_PASSWORD`. RN-15 y la propia tabla de correspondencia mandan emitirla como `${CLAVE}` con la entrada vacía, no suprimirla. Preexistente; E-14 se reescribió en la 1.2 sin corregirlo | Agregar `API_KEY_EXTERNA: ${API_KEY_EXTERNA}` al Compose, su línea vacía al `.env` y la clave a `secretosRequeridos` |
| P2-10 | §20.11 (línea 2062) y §20.7 (línea 1652) frente a §20.21 (línea 3008) | El mismo servicio 305 tiene el montaje en `/srv/print-server/data` en E-7 y E-11, y en `/srv/despliegues/print-server/data` en E-21. Preexistente | Unificar la ruta ofuscada |
| P2-11 | §20.1 (línea 1096) frente a §20.5 | E-1 declara `"cambiosPendientes": 0` para el proyecto 12, mientras E-5 declara para ese mismo proyecto el changeset 331 en estado `pendiente` con cuatro cambios. Preexistente, agravado porque el cambio 4 es nuevo | Poner `"cambiosPendientes": 4` en E-1 |
| P2-12 | §17.1 P.3 (línea 515) y §20.15 | Se afirman "veintiséis endpoints"; E-15 tiene 26 filas, pero dos de ellas contienen dos endpoints cada una (`GET`/`POST /catalogo` y `GET`/`PUT /proyectos/{id}/variables`), de modo que los endpoints son 28. Patrón preexistente, arrastrado al nuevo recuento | Declarar "veintiséis filas" o desagregar las filas dobles |
| P2-13 | §20.15 (E-15) frente a §4 F-14, §12 y §20.6 | No hay endpoint de exportación ni de importación de catálogo, pese a que F-14 y el glosario declaran el catálogo "exportable e importable" y a que D-7 versiona ese formato de exportación a 2. E-15 se declara la superficie de la API | Agregar `GET`/`POST /api/v1/catalogo/exportar` e `importar`, con su ámbito |
| P2-14 | Índice de decisiones, filas D-1 y D-2 (líneas 45 y 46) | Ninguna de las dos lista E-15, donde hay un endpoint marcado explícitamente con cada decisión (`GET /operaciones/{id}` con "[D], D-1"; `GET /descubrimiento/contenedores/{id}/variables` con "[D], D-2") | Completar el «Dónde vive» de ambas |
| P2-15 | `SOLUTION-MANIFEST-…-v1.1.md` (fuera del intake) | Su campo «Intake (origen)» apunta a `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.1.md`, archivo inexistente (la 1.1 no quedó archivada, hecho ya declarado). §13 no cambió, de modo que el manifiesto sigue siendo válido, pero su trazabilidad no resuelve | Actualizar la referencia del manifiesto a la 1.2, declarando que §13 no cambió |

### P3 — bajos

| # | Ubicación | Hallazgo |
|---|---|---|
| P3-1 | Estructura del documento | §19 está ubicada después de §20 y §21, al final del archivo. Numeración fuera de orden. Preexistente |
| P3-2 | §20.18 (E-18, líneas 2493 y 2503) | Uso de emojis (`🗗`, `🐳`) contra el invariante de estilo "sin emojis". Preexistente |
| P3-3 | §20.4 (líneas 1349–1361) | El bloque se declara *"transcripto textualmente"* pero pierde las tildes del original ("Dominio publico"). Coherente con la convención del intake de no acentuar en bloques de código, pero incompatible con la palabra "textualmente" |
| P3-4 | §21 (líneas 3145 y 3151–3157) | La fila *"Secreto embebido … y su enmascarado al importarlo"* conserva la redacción anterior a D-2 (el tratamiento ya no es enmascarado por heurística sino clasificación) y no cita T-32. Además la matriz no cubre RN-22 ni T-36, únicos de la tanda nueva sin fila propia |

---

## 12. Estado de las incoherencias preexistentes y de los pendientes declarados

### 12.1 Incoherencias preexistentes

Se rastrearon contra la versión 1.0 archivada. Las que sobreviven en la 1.2 y su decisión de reporte:

| Incoherencia preexistente | Estado en la 1.2 | ¿Se reporta? |
|---|---|---|
| §17.1 P.10, fila «Observabilidad» con una celda faltante | **Sigue presente.** Verificado: 3 celdas en tabla de 4 columnas | Sí, **P2-1**. Rompe el renderizado y §19 declara el checklist verdadero |
| E-1 `cambiosPendientes: 0` frente al changeset 331 pendiente de E-5 | Sigue presente, y se agravó: el cambio 4 (nuevo) suma un cambio más a ese changeset | Sí, **P2-11** |
| E-5 changeset 331 en estado `pendiente` con `creadoEn 10:02:00`, mientras E-3 registra despliegues de ese changeset iniciados a las `09:02:11` | Sigue presente | Se anota dentro de **P2-11** y **P0-1**; el material nuevo de E-13 y T-31 se apoya en ese ejemplo inconsistente |
| E-14 omite la variable secreta `API_KEY_EXTERNA` en la exportación | Sigue presente. E-14 se reescribió en la 1.2 sin corregirlo | Sí, **P2-9** |
| Ruta del montaje del servicio 305 distinta entre E-7/E-11 y E-21 | Sigue presente | Sí, **P2-10** |
| Recuento de endpoints (filas frente a endpoints) en §17.1 P.3 | Sigue presente, y el número se actualizó de 22 a 26 arrastrando el mismo criterio | Sí, **P2-12** |
| §19 ubicada después de §20 y §21 | Sigue presente | Sí, **P3-1** (bajo) |
| Emojis en E-18 | Sigue presente | Sí, **P3-2** (bajo) |

No se identificó ninguna incoherencia preexistente que la 1.2 haya corregido silenciosamente sin declararlo. Todas las que se rastrearon siguen abiertas, de modo que la corrección declarada por el integrador —"tocó sólo una"— no se pudo localizar entre las anteriores; si fue una corrección de redacción menor, no afecta este veredicto.

### 12.2 Pendientes declarados en §19

Las seis pendientes de §19 están efectivamente registradas, con su ubicación y su consumidor downstream identificado. Las cinco nuevas se corresponden con puntos de diseño reales que las siete decisiones no cubren y **ninguna fue tomada por el intake**: se verificó que la colisión de nombre en la instanciación (contra RN-01), la colisión de clave de variable compartida (contra RN-28), la distinción visual de los dos orígenes de arista, el maquetado del paso de clasificación y de la pantalla de variables del proyecto, y la asignación de F-23/F-24 a un alcance no aparecen resueltas en ninguna parte del documento. En eso el integrador cumplió.

**Pero la disciplina no fue uniforme.** Los puntos enumerados en P0-3 —gramática de espacios de nombres, forma canónica, escape, RN-25 y RN-26, política de códigos HTTP de la operación en lote— cumplen la misma definición que §19 usa para justificar por qué no toma las otras cinco (*"cambian el comportamiento observable del producto"*) y sí fueron tomados, presentados como decisión cerrada del agente humano. Ese es el hallazgo P0-3.

Adicionalmente, §19 no enumera las aperturas para el Sprint 0 que el cuerpo declara —DA-06 en §17.1 P.11, la forma del contrato de `IContenedorEngine` en §17.2 P.11, el destino del respaldo externo y los límites de concurrencia de SQLite en §17.3 P.11—, ni las resoluciones parciales de CL-09 y CL-10. Es un criterio preexistente (§19 lista pendientes de intake, no aperturas técnicas de Sprint 0) y se anota sin elevarlo a hallazgo.

### 12.3 Completitud de §19 contra `Intake-Rules.md`

Los mínimos de `Intake-Rules.md` §5 se siguen cumpliendo después de los cambios: 6 casos límite mínimos (hay 15, todos con respuesta), 3 métricas SMART (hay 4), 3 exclusiones (hay 7), 3 riesgos (hay 10), 5 términos de glosario (hay 32), 3 historias y 2 roles (hay 10 y 2), un stakeholder por categoría (hay tres categorías cubiertas). Los campos bloqueantes de §2 están todos presentes y sin placeholder: §13 completa y derivable, y P.6, P.7, P.8, P.9 y P.10 presentes en los cuatro bloques de §17. No hay `project_type` fuera del conjunto D8, no hay filas de ejemplo sin sustituir, no hay NFR no numéricos donde la regla exige número. La única falla formal es la celda faltante de §17.1 P.10 (P2-1), que hace que el ítem del checklist "P.10 expresa NFR con métricas numéricas" se declare verdadero sobre una tabla que no renderiza completa.

### 12.4 Invariantes de estilo

Español rioplatense neutro técnico: cumplido, sin voseo ni coloquialismos. Tildes y eñes en el cuerpo: cumplido; la ausencia de tildes está confinada a bloques de código y a los ejemplos ofuscados, coherente con la convención del propio documento. Fechas ISO 8601: cumplido en todo el material nuevo (2026-07-28 y marcas de tiempo con desplazamiento `-03:00`). Codificación UTF-8 y terminación LF: verificado, cero `CR`. Negritas decorativas: uso intensivo pero siempre semántico (marcadores, énfasis normativo). Emojis: dos ocurrencias preexistentes en E-18 (P3-2). Tablas sin placeholders: cumplido, salvo la celda faltante de P2-1.

---

## 13. Veredicto final y condiciones para promover

**Veredicto: RECHAZADO.**

Fundamento: tres hallazgos P0. Dos son incoherencias de datos entre anexos que derivarían mal la documentación (la composición de la operación en lote del changeset 331 y el identificador de despliegue reciclado), y el tercero es la presentación de decisiones de diseño del integrador como datos cerrados del agente humano, que es exactamente el defecto que la versión 1.1 corrigió para los supuestos S-01 a S-06 y que el propio §19 declara evitar.

Corresponde señalar lo que sí quedó bien, porque acota el trabajo de corrección: §13 está intacto y verificado por hash de forma independiente; las cifras declaradas son correctas salvo dos recuentos menores; ninguna regla existente fue renumerada; las once reglas nuevas declaran momento de validación y respuesta; cada regla nueva tiene caso de prueba con entrada y resultado concretos, incluido el caso que motivó D-2; el control de cambios cubre todas las secciones efectivamente modificadas y no declara ninguna que no haya cambiado; y ningún marcador `[S]` se coló en el material nuevo.

**Condiciones para promover a APROBADO CON OBSERVACIONES:**

1. Resolver **P0-1**: dejar una única composición de la operación del changeset 331, coherente entre E-3, E-5, E-13, T-23, T-31 y RN-13.
2. Resolver **P0-2**: asignar un identificador de despliegue nuevo al contenedor de `db` en E-13.
3. Resolver **P0-3**: separar la autoría del material que excede el alcance declarado de D-1, D-2 y D-6, ya sea declarando explícitamente qué es especificación del integrador, ya sea registrando esos puntos como pendientes en §19 con el mismo criterio que los otros cinco. No se pide rediseñar: se pide no firmarlo como decisión cerrada del cliente.
4. Agregar una entrada de control de cambios por cada sección tocada en la corrección, atómica según `Master-Prompt.md` §13 regla 5, y archivar la versión 1.2 en `SDD/Intake/_legacy/<fecha>/` antes de sobrescribir, según la regla 6.

**Condiciones para promover a APROBADO:** además de lo anterior, cerrar los seis P1, en particular P1-1 y P1-2, que son los que dejan a RN-22 y a la propagación de RN-27 sin mecanismo declarado, y P1-3, que deja un caso de la ida y vuelta con Compose sin regla.

Los P2 y P3 se documentan y no bloquean, con la excepción recomendada de **P2-1**, cuya corrección es de una celda y evita que la tabla de NFR del proyecto principal se derive incompleta.

---

---

# 14. Verificación de cierre — segunda corrida

| Campo | Valor |
|---|---|
| Objeto verificado | El mismo `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, ahora de 3472 líneas (antes 3302), tras las correcciones del integrador |
| Alcance | Estado de cierre de los 3 P0 y 6 P1; verificación independiente de los recuentos declarados; defectos nuevos introducidos por la corrección; aplicación completa y consistente del marcador `[D-i]`; exhaustividad de la tabla DI; estado de los 15 P2 y 4 P3; §13 intacto |
| Fecha | 2026-07-28 |
| Veredicto de esta corrida | **APROBADO CON OBSERVACIONES** |

## 14.1 Sobre el criterio de absorber la corrección dentro de la misma versión 1.2

**Se comparte el criterio.** La corrección no abre una 1.3 y no archiva una 1.2 previa, y eso es correcto por tres razones verificadas: la 1.2 no fue consumida por ningún artefacto downstream (la única derivación, el manifiesto, deriva de §13, que no cambió); las veintidós entradas de corrección están registradas de forma atómica y cada una cita el identificador del hallazgo que cierra, de modo que la trazabilidad audit → corrección es reconstruible entrada por entrada; y la 1.0 sigue archivada en `_legacy/2026-07-27/`, que es la única línea base contra la que este informe verifica §13. Es el mismo criterio con el que los documentos de la Fase A absorbieron sus correcciones post-audit.

Observación, no hallazgo: el efecto colateral es que el estado que la 1.2 tuvo **antes** de esta auditoría deja de ser reconstruible, igual que ocurrió con la 1.1. Es una limitación ya declarada por el propio documento en su nota de archivado, aplicada de forma consistente, y el control de cambios preserva las entradas de las dos rondas sin pisarlas: las treinta y nueve entradas originales siguen describiendo lo que hicieron, y las veintidós de corrección describen el delta. La historia es legible aunque el estado intermedio no sea recuperable.

Verificación colateral favorable: el manifiesto fue regenerado como `SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.2.md`, apunta a la 1.2 como intake de origen, declara que §13 no cambió, y la v1.1 quedó archivada en `_legacy/2026-07-28/`. Cierra **P2-15**.

## 14.2 Estado de los nueve hallazgos P0 y P1

| # | Estado | Evidencia verificada |
|---|---|---|
| **P0-1** | **CERRADO** | `op-a41f7` (E-13, líneas 2248–2264) tiene ahora dos entradas en `resultadoPorContenedor`, 5471 (`api`, activo) y 5472 (`cache`, fallido), y un campo nuevo `serviciosNoAlcanzados` con `{ "servicioId": 103, "servicio": "db", "motivo": "sin-impacto-en-el-changeset" }`. El párrafo previo declara explícitamente que la operación toca dos contenedores "porque RN-13 exige redesplegar sólo los servicios afectados" y remite a E-5 como anexo canónico del changeset. T-31 (línea 3197) se reescribió contra RN-31 **y RN-13**: `db` "**no se toca** y conserva su despliegue anterior, coherente con RN-13 y con T-23". Los cinco puntos —E-3, E-5, E-13, T-23, T-31— y RN-13 dicen ahora lo mismo. Se verificó además que no queda ninguna otra mención de una operación de tres contenedores atada al changeset 331: la única ocurrencia de "tres contenedores" es la frase genérica de E-17 sobre el sincronizador, que no cita ese changeset |
| **P0-2** | **CERRADO** | El identificador 5310 aparece exactamente tres veces en el documento: E-8 línea 1797 y E-11 línea 2173, ambas del servicio 305 (`print-server`, proyecto 7), más una mención en el texto de la entrada de control de cambios que registra la corrección. Ya no aparece en E-13. Barrido independiente de los identificadores del proyecto 12 (5471, 5472, 5480, 9001, 9002, 9003, 331, 701, 702, 101, 102, 103): ninguna colisión con los del proyecto 7 ni del 9. El nuevo `serviciosNoAlcanzados` no inventa un identificador de despliegue para `db`, que era el camino por el que reaparecía la colisión |
| **P0-3** | **CERRADO, con dos residuos P2** | Las tres piezas declaradas existen y funcionan: (1) el marcador `[D-i]` está definido en «Procedencia» (línea 37) con su diferencia frente a `[S]` argumentada en un párrafo aparte (línea 40); (2) la subsección «Qué decidió el agente humano y qué derivó el integrador» (líneas 56–73) reparte autoría punto por punto, con la desviación respecto de la fuente declarada en su propia fila; (3) §19 lleva la tabla DI-01 a DI-10. En E-4 la desviación de sintaxis está declarada con su argumento en una columna nueva de la tabla de formas («En la fuente»: *"**Distinto:** la fuente usa `shared.`"* y *"**Distinto:** la fuente usa el nombre del servicio pelado"*) y en un bloque titulado «Desviación deliberada respecto de la fuente, con su argumento [D-i]». Ninguna decisión de integración quedó presentada como dato cerrado del cliente. Residuos: ver **N-1** y **N-3** |
| **P1-1** | **CERRADO** | RN-22 acotada: *"no pueden formar un ciclo de resolución **entre variables de servicio** … Ningún ciclo puede atravesar el nivel proyecto: una variable compartida contiene siempre un literal o material secreto, nunca una referencia, y el esquema lo hace cumplir por ausencia de columna (anexo E-9)"*. E-9 lo declara del lado del esquema (líneas 1879–1884) y E-4 punto 2 aporta el argumento en tres razones —inversión de la dependencia, instanciación del catálogo y acotamiento del ciclo—, más la declaración de que es una restricción y no una capacidad, de modo que levantarla no rompe nada. La regla y el esquema dicen lo mismo |
| **P1-2** | **CERRADO** | El índice se reemplazó: `CREATE INDEX ix_variables_con_referencia ON variables(servicio_id) WHERE referencia IS NOT NULL` (índice parcial). El comentario de E-9 (líneas 1958–1972) declara el mecanismo real en dos pasos —el índice acota el conjunto, sobre él se parsean las ocurrencias con el mismo parser de la resolución— y explica por qué la igualdad no sirve, citando el caso interpolado de E-2. E-4 corrigió la afirmación: la forma canónica *"**No** sirve para localizar referencias por igualdad de columna, porque una referencia puede ir interpolada"*. Los tres lugares que dependían del mecanismo —E-5 (`referenciadaPor`), §17.4 P.11 y E-4— fueron reescritos con la misma redacción («enumeración indexada de las variables con referencia y el parseo de sus ocurrencias»). No queda ninguna mención del índice viejo ni de la búsqueda por igualdad |
| **P1-3** | **CERRADO** | RN-25 extendida al escape del `$` literal (*"todo `$` que forme parte de un **valor literal** … se emite **escapado como `$$`**"*) y RN-26 al desescapado y a la persistencia escapada del `${{` literal. E-4 incorpora la tabla de las cuatro combinaciones de referencia y literal por sentido (líneas 1436–1441), y declara el escape `$${{` como el único del modelo. Dos casos de prueba nuevos: T-47 (exportar un literal con `${{ x }}` y otro con `${VAR}`, esperando `$${{ x }}` y `$${VAR}`) y T-48 (importar `$$HOME/datos` y `$${{ x }}`, con ida y vuelta que reproduce el archivo de partida). Se verificó la coherencia aritmética del escape en los dos sentidos: el valor persistido `$${{ x }}` y el emitido coinciden en forma, y la ida y vuelta es idempotente |
| **P1-4** | **CERRADO** | El cambio 4 de E-5 se invirtió: `antes: America/Argentina/Buenos_Aires → despues: UTC`, con el `resumen` corregido en el mismo sentido. El párrafo explicativo declara ahora por qué: el changeset está pendiente, el estado aplicado es el `antes`, y por eso E-1, E-2 y E-14 muestran `America/Argentina/Buenos_Aires`, mientras `UTC` "no aparece en ningún otro anexo justamente porque todavía no se aplicó". Verificado que los cuatro anexos coinciden |
| **P1-5** | **CERRADO** | La afirmación falsa desapareció. En su lugar §19 declara **tres registros disjuntos** con sus alcances: supuestos `[S]` (información que faltaba en las fuentes), pendientes de decisión (lo que nadie tomó, seis) y especificaciones de integración `[D-i]` (lo que el orquestador sí tomó, diez), cada uno con su ubicación y con la instrucción de cómo debe tratarlo un artefacto downstream. Verificado que los tres conjuntos son efectivamente disjuntos: ningún ítem figura en dos de ellos |
| **P1-6** | **CERRADO** | El anidamiento desapareció: la variable compartida de la plantilla `cat-api-con-base` se llama `DB_PASSWORD` sin parametrizar, y las dos referencias quedan `${{ proyecto.DB_PASSWORD }}`, canónicas. E-6 agrega la tabla de las tres formas con quién interpreta cada una y cuándo (instanciador del catálogo / resolutor de referencias / Docker Compose), la prohibición explícita de anidar un hueco de parámetro dentro de una expresión de referencia, y el orden estricto por etapas. La contrapartida —colisión de clave en el proyecto destino— se remite a la pendiente que §19 ya registraba, sin resolverla. T-43 se actualizó en consecuencia: instancia "en un proyecto que no tiene la clave `DB_PASSWORD`" y espera que "ninguna expresión persistida contiene un `{{ }}` de parámetro" |

**Nueve de nueve cerrados.** No queda ningún P0 ni ningún P1 abierto.

## 14.3 Verificación independiente de los recuentos declarados

| Cifra declarada por el integrador | Recuento del auditor | Resultado |
|---|---|---|
| 49 casos de prueba | E-22 tiene 49 filas `T-` (T-01 a T-48 más T-17b). T-31 a T-48 = 18 casos nuevos, coherente con el texto de cierre del anexo, que dice "los dieciocho casos T-31 a T-48" | **Correcta** |
| 31 reglas de negocio | E-16 tiene 31 filas, RN-01 a RN-31 sin salto ni duplicado. El recuento por expresión regular simple da 24 porque siete identificadores llevan ahora el sufijo `**[D-i]**` en su celda; contadas por identificador son 31 | **Correcta** |
| 32 términos de glosario | §12 tiene 32 filas | **Correcta** |
| 30 endpoints en 28 filas | E-15 tiene 28 filas; el conteo de pares método + ruta dentro de esas filas da exactamente 30 (dos filas agrupan dos métodos). §17.1 P.3 declara ahora "los **treinta endpoints**, agrupados en las veintiocho filas", y E-15 abre con una nota «Cómo leer el recuento» que explica la diferencia | **Correcta** |
| 10 entradas DI | §19 tiene 10 filas DI-01 a DI-10 | **Correcta en la tabla**; incompleta respecto de las marcas in situ, ver **N-1** |
| 36 marcas `[D-i]` in situ | 36 ocurrencias del literal `[D-i]` en el documento | **Correcta** |
| 61 entradas de control de cambios de la 1.2, 22 de esta ronda | 61 filas con versión 1.2; 22 de ellas empiezan por «Corrección de …» y citan el hallazgo que cierran. 61 − 22 = 39, que son las 37 de la primera ronda más las dos que esta ronda agregó al partir la entrada de §17.4 en tres | **Correcta** |
| 14 P2 aplicados y 2 P3 aplicados | Verificado uno por uno en §14.5: 14 P2 cerrados y 2 P3 cerrados | **Correcta** |
| 3 no aplicados con motivo declarado | Los tres no aplicados se identifican (P2-4, P3-1 y P3-2), pero **el motivo no está declarado en el documento**: no hay ninguna entrada de control de cambios ni nota que registre la decisión de no aplicarlos. Ver **N-4** | **Parcialmente correcta** |

Cifras adicionales verificadas de forma independiente, no declaradas por el integrador: 24 capacidades `F-`, 15 casos límite `CL-`, 22 anexos E-1 a E-22, 10 riesgos, 4 proyectos. Todas correctas y sin cambios.

## 14.4 Defectos nuevos introducidos por la corrección

Ninguno de nivel P0 ni P1. Los tres primeros son consecuencia directa de la corrección de P0-3, es decir del propio mecanismo `[D-i]`.

**N-1 · P2 · Dos marcas `[D-i]` no figuran en la tabla DI, contra la exhaustividad que el propio documento declara.**
Ubicación: «Procedencia», línea 37, contra §20.6 línea 1693 y §20.9 línea 1958.
Evidencia: la definición del marcador afirma *"Toda marca `[D-i]` está enumerada en §19, en la tabla «Especificaciones de integración pendientes de confirmación»"*, y §19 refuerza que los tres registros son disjuntos y completos. Dos marcas no están enumeradas:

- **E-6, línea 1693:** *"**Un hueco de parámetro no puede aparecer dentro de una expresión de referencia [D-i].**"* Es la regla que cerró P1-6 y es una decisión de integración con efecto observable sobre la sintaxis de las plantillas del catálogo. Ninguna fila DI la menciona, y **la columna «Dónde vive» de la tabla DI no nombra a E-6 ni una sola vez** (nombra E-4, E-9, E-13, E-14, E-15, E-16, E-21, E-22 y §17.4 P.11).
- **E-9, líneas 1958–1972:** *"Como se localiza quien referencia a una variable dada [D-i]"*, con el mecanismo de dos pasos y el índice parcial `ix_variables_con_referencia`. Es la decisión que cerró P1-2. DI-02 cubre la forma canónica y DI-04 la doble persistencia, pero el texto corregido separa explícitamente la forma canónica del mecanismo de búsqueda (*"**No** sirve para localizar referencias por igualdad… cómo se resuelve realmente esa búsqueda está declarado en el anexo E-9"*), de modo que ninguna de las dos filas lo cubre.

Impacto: un artefacto downstream que use la tabla DI como lista de lo revisable —que es exactamente el uso que §19 le prescribe— tratará esas dos especificaciones como cerradas.
Recomendación: agregar DI-11 (prohibición de anidar hueco de parámetro dentro de una referencia, D-7/D-6, E-6) y DI-12 (mecanismo de localización de referencias en dos pasos con índice parcial, D-5/D-6, E-9), o incorporarlas a DI-02 ampliando su enunciado y su columna «Dónde vive».

**N-2 · P2 · RN-04 y RN-05 se declaran `[D-i]` en prosa pero sus filas no llevan el marcador.**
Ubicación: §20.16, línea 2518, contra las filas de RN-04 y RN-05 (líneas 2484 y 2485).
Evidencia: el cierre de E-16 dice *"RN-04 y RN-05 ampliaron su enunciado sin cambiar su comportamiento para el enlace de host y puerto; esa ampliación es también **[D-i]**, derivada de la decisión de modelar una única arista con dos orígenes"*. Pero la celda de identificador de ambas filas es `| RN-04 |` y `| RN-05 |`, sin sufijo, mientras las siete reglas derivadas sí lo llevan (`| RN-21 **[D-i]** |`, etc.). El criterio de marcado queda aplicado de forma desigual dentro de la misma tabla, que es la tabla que `08-Calidad-Y-Pruebas` y `02-Especificacion-Funcional` leen regla por regla.
Recomendación: o marcar la ampliación en las dos filas de forma acotada (por ejemplo `| RN-04 (ampliación **[D-i]**) |`), o quitar la afirmación del párrafo de cierre y dejar la ampliación cubierta sólo por DI-05, que ya la menciona.

**N-3 · P2 · Sobrecorrección: parte del contenido declarado de D-6 quedó atribuida al integrador.**
Ubicación: §20.16 (RN-21, línea 2501), §19 (DI-08, línea 3366), la subsección de reparto (fila «Integridad de las referencias», línea 68) y §17.4 P.11 (línea 1037).
Evidencia: el índice de decisiones declara que D-6 es *"la **referencia entre variables** en tres formas —al propio servicio, a una compartida del proyecto y a otro servicio del mismo proyecto—"*. El enunciado de RN-21 es precisamente ese ámbito: *"debe resolver a una variable existente y de ámbito válido: del propio servicio, compartida del proyecto, o de otro servicio **del mismo proyecto**"*. La regla quedó marcada `[D-i]` en su totalidad, DI-08 la atribuye al integrador como "ámbito y resolubilidad de la referencia", y la fila de reparto correspondiente pone `—` en la columna «Qué decidió el agente humano», cuando el ámbito es literalmente lo que decidió. Lo mismo, en menor grado, en §17.4 P.11 línea 1037: que la arista de referencia ordene el arranque se marca `[D-i]` como corolario de DI-05, mientras E-4 punto 3 mantiene `[D], D-6` para el hecho de que la referencia genere arista; siendo que ordenar el arranque es el efecto sobre el grafo que D-6 declara.
Es el error en la dirección opuesta al P0-3 original y su gravedad es menor —subdeclara lo que el cliente decidió en lugar de inventar un requisito—, pero produce el mismo síntoma aguas abajo: una regla que el cliente sí fijó se presenta como revisable.
Recomendación: separar RN-21 en su parte `[D]` (el ámbito de las tres formas y la invalidez de cruzar el límite del proyecto) y su parte `[D-i]` (el `422`, la enumeración de causas y la excepción de canal alcanzable), y completar la columna «Qué decidió el agente humano» de la fila de reparto.

**N-4 · P3 · Los tres hallazgos no aplicados no declaran su motivo en el documento.**
Ubicación: control de cambios y §19.
Evidencia: P2-4, P3-1 y P3-2 no se aplicaron. No hay ninguna entrada de control de cambios, nota al pie ni fila de §19 que registre esa decisión ni su motivo. Una búsqueda por «no se aplica», «no aplicado», «se desestima» y por los identificadores de los tres hallazgos no devuelve ninguna coincidencia en el intake. El motivo puede ser correcto —los tres son de bajo impacto— pero no queda asentado en la cadena.
Recomendación: agregar una entrada de control de cambios que registre los tres con su motivo, o anotarlos en §19 como observaciones aceptadas.

## 14.5 Estado de los quince P2 y los cuatro P3

| # | Estado | Verificación |
|---|---|---|
| P2-1 | **Cerrado** | §17.1 P.10: la fila «Observabilidad» tiene ahora 4 celdas, igual que las once restantes. Verificado por conteo de separadores en toda la tabla |
| P2-2 | **Cerrado** | Subsumido en P0-1: E-3 y E-13 declaran los mismos dos despliegues de la misma operación |
| P2-3 | **Cerrado** | El índice de decisiones, fila D-6, dice ahora «RN-21 a RN-26», coherente con la atribución de E-16 |
| P2-4 | **Sin objeto** | El recuento de entradas nunca estuvo declarado dentro del documento; era una cifra del informe del integrador. Con 61 entradas y 22 de corrección, ambas verificadas, no queda nada que corregir en el intake |
| P2-5 | **Cerrado** | La entrada de §21 dice ahora «se agregan nueve filas» |
| P2-6 | **Cerrado** | La entrada de §17.4 se partió en tres, una por bloque P.6, P.10 y P.11, según `Master-Prompt.md` §13 regla 5 |
| P2-7 | **Cerrado** | §17.4 P.2 incorpora la transcripción completa de las ocho invariantes de `Analisis-Rayway.md` §3.6, con una columna que declara qué se hizo con cada una: adoptada, adaptada o descartada, incluida la descartada I5 (`Environment`) con su motivo. El ítem de autocontención de §19 pasa a enumerar las cuatro secciones |
| P2-8 | **Cerrado** | §4 (F-14) y E-6 atribuyen ahora la enumeración del menú y la definición de `Template` únicamente a §3.2, con la aclaración de que esa sección la enumera a partir de la captura de la interfaz real. §4.3 ya no se cita |
| P2-9 | **Cerrado** | E-14 exporta `API_KEY_EXTERNA: ${API_KEY_EXTERNA}` en el Compose, con su línea vacía en el archivo de variables y la clave en `secretosRequeridos`, más un párrafo que declara que los dos secretos del servicio viajan igual y ninguno se omite |
| P2-10 | **Cerrado** | La ruta del montaje del servicio 305 es `/srv/despliegues/print-server/data` en los tres anexos. Cero ocurrencias de la ruta antigua |
| P2-11 | **Cerrado** | E-1 declara `"cambiosPendientes": 4`, con una nota que explica que los valores del anexo son los aplicados y no los del borrador |
| P2-12 | **Cerrado** | §17.1 P.3 y E-15 distinguen filas de endpoints, con la nota «Cómo leer el recuento» |
| P2-13 | **Cerrado** | E-15 incorpora `GET /api/v1/catalogo/exportar` y `POST /api/v1/catalogo/importar`, este último declarando la conversión de formato 1 a 2 |
| P2-14 | **Cerrado** | Las filas D-1 y D-2 del índice de decisiones citan ahora sus endpoints de E-15 |
| P2-15 | **Cerrado** | Manifiesto regenerado como v1.2, apuntando al intake v1.2 y declarando que §13 no cambió; la v1.1 quedó archivada en `_legacy/2026-07-28/` |
| P3-1 | **Abierto** | §19 sigue ubicada después de §20 y §21 (línea 3281). Sin motivo declarado. Aceptable: es de orden, no de contenido |
| P3-2 | **Abierto** | E-18 conserva las dos ocurrencias de emoji. Sin motivo declarado |
| P3-3 | **Cerrado** | E-4 declara ahora que la transcripción "es literal en la sintaxis y en la estructura del bloque; los comentarios van sin tildes por la convención de este intake …, que es la única divergencia respecto del original" |
| P3-4 | **Cerrado** | §21 reescribió la fila del secreto embebido contra D-2 y ahora cita T-32, y agregó dos filas: una para el ciclo de resolución dentro del mismo servicio (RN-22, T-36) y otra para el escape del `$` literal (RN-25, RN-26, T-47, T-48). RN-22 deja de ser la única regla nueva sin fila propia |

Recuento: **14 P2 cerrados**, 1 sin objeto, **2 P3 cerrados**, 2 P3 abiertos sin motivo declarado.

## 14.6 §13 intacto — segunda verificación

Se repitió la verificación por hash sobre el documento corregido. §13 completa (líneas 331 a 357 de la 1.2 corregida) contra §13 de la 1.0 archivada (líneas 262 a 288): `md5 = cfe9b4fab20dab26bd1d38142801765e` en ambas, `diff` vacío. La corrección **no tocó §13**. La derivación del manifiesto sigue siendo válida sin re-derivar, y el manifiesto v1.2 lo declara así.

Invariantes de formato revalidadas sobre el documento corregido: UTF-8, cero retornos de carro, fechas ISO 8601 en todo el material nuevo, sin placeholders, sin negritas decorativas, y ninguna tabla con filas de celdas irregulares.

## 14.7 Veredicto final del intake

**APROBADO CON OBSERVACIONES.**

Los tres P0 y los seis P1 están cerrados con evidencia verificable, y las correcciones no se limitaron a tapar el síntoma: P0-1 se cerró declarando el anexo canónico del changeset y agregando un campo que hace auditable qué **no** se tocó; P1-2 y P1-3 se cerraron cambiando el mecanismo y agregando los casos de prueba que faltaban, no reescribiendo la afirmación incómoda; y P0-3 se cerró introduciendo un marcador que el framework no tenía y que resuelve un problema real de autoría, con su definición, su diferencia frente a `[S]`, su reparto punto por punto y su registro en §19. Catorce de los quince P2 quedaron cerrados, incluidas las cinco incoherencias preexistentes desde la 1.0 que la primera corrida había dejado abiertas.

Los cuatro defectos nuevos son P2 y P3, todos del mecanismo `[D-i]` recién introducido, y ninguno afecta un dato del modelo: dos marcas sin enumerar en la tabla que se declara exhaustiva, un criterio de marcado desigual en dos filas de E-16, una sobrecorrección de autoría en RN-21 y cuatro anotaciones sin motivo declarado. Ninguno impide derivar la documentación; todos hacen que un lector downstream trate como cerrado algo revisable, o al revés.

**El intake puede promoverse y la cadena puede consumirlo.** Condiciones recomendadas, no bloqueantes, para el próximo toque del documento:

1. Cerrar **N-1** agregando las dos entradas DI faltantes, porque es lo único que rompe una afirmación que el propio documento hace sobre sí mismo.
2. Cerrar **N-3** devolviendo a `[D]` la parte de RN-21 que D-6 sí fijó.
3. Cerrar **N-2** unificando el criterio de marcado en E-16.
4. Registrar **N-4**, los tres hallazgos no aplicados, con su motivo.
5. Si en algún momento se abre una 1.3 por otro motivo, aprovechar para reubicar §19 antes de §20 (**P3-1**) y quitar los dos emojis de E-18 (**P3-2**).

---

# 15. Auditoría de la segunda pasada sobre D-6

| Campo | Valor |
|---|---|
| Objeto auditado | El mismo `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, ahora de 3572 líneas (3302 → 3472 → 3572) |
| Naturaleza del cambio | No es corrección de hallazgos: es la decisión D-6 reespecificada sobre otra base, autorizada por el agente humano del proyecto el 2026-07-28. Sustituye la sintaxis propia por la de la fuente, introduce las variables provistas por el sistema y elimina el discriminador de tipo de arista |
| Alcance de esta auditoría | Restos del discriminador, referencias a lo eliminado, reglas y casos que perdieron objeto, cobertura de ciclos, invariancia del comportamiento observable del enlace trazado, integridad del esquema tras las bajas de columnas, fidelidad a la fuente, reparto del marcador `[D-i]` tras la renumeración, recuentos, §13 |
| Fecha | 2026-07-28 |
| Veredicto de esta corrida | **RECHAZADO** |

## 15.1 Resumen

La simplificación es correcta de fondo y está bien argumentada: el argumento que se cae —que el nombre de servicio pelado obliga a conocer la lista de servicios— efectivamente se cae contra la transcripción de `Analisis-Rayway.md` §3.5 que el propio intake contiene, y la pieza que faltaba (las variables provistas) es la que permite que un mecanismo alcance donde antes hacían falta dos. El barrido de restos dio limpio en lo mecánico: **cero ocurrencias** de `host-puerto`, de `enlaceId`, de `plantillaVariable`, de `variableGenerada` y de `{destino.puerto}`; el esquema quedó sin columnas, claves ni índices colgados; los siete casos de prueba que cambiaron de objeto cambiaron de verdad y los cinco nuevos cubren lo que hacía falta.

Pero la simplificación **sí dejó restos, y en los tres lugares donde más caro sale**: la sección normativa de decisiones de modelo del proyecto Domain (§17.4 P.11), la regla de importación desde Compose (E-21) y el manifiesto de exportación (E-14). Dos de ellos son contradicciones directas con el esquema y con las reglas.

Hallazgos de esta corrida: **2 P0**, **4 P1**, **5 P2**, **2 P3**.

## 15.2 Verificación de los recuentos declarados

| Cifra declarada | Recuento del auditor | Resultado |
|---|---|---|
| 32 reglas de negocio | 32 identificadores únicos, RN-01 a RN-32, sin salto | **Correcta** |
| Ninguna regla eliminada | RN-01 a RN-31 siguen presentes; RN-32 es la única incorporación. Verificado por comparación de identificadores contra la corrida anterior | **Correcta** |
| 54 casos de prueba | 54 filas: T-01 a T-53 más T-17b. Los cinco nuevos son T-49 a T-53 | **Correcta** |
| 13 entradas de especificación de integración | 13 filas DI-01 a DI-13, con el mapeo de la renumeración declarado y las dos bajas explicadas | **Correcta en la tabla**; falla el mapeo con el cuerpo, ver **P2-1** |
| 33 términos de glosario | 33 filas; el término nuevo es «Variable provista por el sistema» | **Correcta** |
| 84 entradas de control de cambios de la 1.2 | 84 filas con versión 1.2 | **Correcta**; una de ellas registra un cambio que no ocurrió, ver **P1-4** |
| §13 intacto | `md5 = cfe9b4fab20dab26bd1d38142801765e` en §13 de la 1.2 actual y de la 1.0 archivada; `diff` vacío | **Correcta. Verificado de forma independiente por tercera vez** |

Cifras adicionales verificadas: 30 endpoints en 28 filas de E-15 (conteo de pares método + ruta), 24 capacidades `F-`, 15 casos límite, 22 anexos, 7 pendientes de decisión en §19 (era 6; la nueva es la del servicio con más de un puerto), 53 marcas `[D-i]` in situ. Todas coherentes con lo que el documento declara.

## 15.3 Barrido de restos del discriminador

| Qué se buscó | Ocurrencias | Lectura |
|---|---|---|
| `host-puerto` (valor del discriminador) | **0** | Limpio |
| `enlaceId` / `enlace_id` como campo | **0** como campo; 1 mención en el comentario de E-9 que explica por qué ya no está, y 1 en control de cambios | Limpio |
| `plantillaVariable` / `plantilla_variable` | **0** como campo; 1 en control de cambios | Limpio |
| `variableGenerada` | **0** | Limpio |
| `puertoDestino` / `protocolo` en el enlace | **0** como campo; sólo la línea de E-4 que declara su baja y dos de control de cambios | Limpio |
| `{destino.host}` / `{destino.puerto}` (llaves simples) | `{destino.puerto}` **0**. `{destino.host}` aparece 5 veces, todas explicando su desaparición o el traslado de su tabla de resolución a `SELFHOSTED_HOST`, más 2 en control de cambios | Aceptable; ver **P3-1** |
| «dos orígenes» / «dos tipos de arista» / «discriminador» en prosa viva | Todas las ocurrencias en el cuerpo explican la eliminación, salvo **una**: la pendiente de §19 | Ver **P1-1** |

En lo mecánico el barrido está bien hecho. Lo que quedó no son campos huérfanos sino **prosa normativa que sigue razonando con el modelo viejo**, que es más difícil de detectar con una búsqueda de texto y es exactamente donde aparecieron los P0.

## 15.4 Cobertura de ciclos

Se verificaron las cuatro clases posibles contra las dos reglas que el integrador nombra:

| Clase de ciclo | Ejemplo | ¿Lo cubre RN-05 (arranque)? | ¿Lo cubre RN-22 (valor)? | Veredicto |
|---|---|---|---|---|
| Ciclo de referencias de red | `a.X = ${{ b.SELFHOSTED_HOST }}` y `b.Y = ${{ a.SELFHOSTED_HOST }}` | **Sí**, ambas aristas están en el grafo de arranque | No, y correctamente: las provistas son terminales y no encadenan | Cubierto, sin solape |
| Ciclo de valor entre servicios, por referencias de dato | `a.X = ${{ b.Y }}` y `b.Y = ${{ a.X }}` | No, y correctamente | **Sí** (T-52) | Cubierto |
| Ciclo de valor dentro de un servicio | `A = ${{ B }}`, `B = ${{ A }}` | No | **Sí** (T-36) | Cubierto |
| «Ciclo» de aristas de dato sin ciclo de valor | `a.X = ${{ b.Y }}` y `b.Z = ${{ a.W }}`, con `Y` y `W` literales | No | No | **Correctamente no rechazado**: resuelve y arranca en cualquier orden (T-45) |

**No queda ninguna clase sin cubrir y las dos reglas no se solapan de forma contradictoria.** El reparto es limpio porque las variables provistas son terminales en la resolución: una referencia de red nunca puede formar un ciclo de valor, y por eso ninguna configuración cae en las dos reglas a la vez. La cuarta fila es el caso que justifica toda la decisión y está probado. El punto que el brief señalaba como el más riesgoso de la simplificación **está bien resuelto**.

Una precisión sobre la redacción de RN-05: dice que un ciclo de referencias de dato *"sí lo alcanza RN-22 **si además** es un ciclo de valor"*. El condicional es correcto, no una escapatoria: la cuarta fila de la tabla muestra que hay ciclos de aristas que no son ciclos de nada operativo, y no rechazarlos es el comportamiento deseado.

## 15.5 Invariancia del comportamiento observable del enlace trazado

El integrador sostiene que el enlace que el usuario traza queda sujeto exactamente a lo mismo que antes. Se contrastó contra los casos preexistentes:

| Caso | Antes | Ahora | ¿Cambia? |
|---|---|---|---|
| T-11 · bridge → macvlan sin puerto publicado | Enlace inválido, bloquea el arranque | Referencia de red a `SELFHOSTED_HOST`, enlace inválido, bloquea el arranque | **No** |
| T-12 · `ia-webui` → `ia-api`, misma red | Válida, variable `http://ia-api:11434` por alias DNS | Válida, el sistema escribe `http://${{ ia-api.SELFHOSTED_HOST }}:${{ ia-api.SELFHOSTED_PORT }}`, que resuelve a lo mismo | **No** en el resultado |
| T-14 · orden de arranque de C-5 | `ia-api`, `ia-video`, `ia-webui` | Igual: la dependencia es de red | **No** |
| E-10 paso 6 · aplicar el changeset | Crea la red, despliega `db`, espera salud, despliega `api` | Igual: `api` referencia `SELFHOSTED_HOST` de `db` | **No** |

**La afirmación se sostiene.** El enlace trazado sigue ordenando el arranque y exigiendo canal alcanzable, porque lo que el azúcar escribe son referencias de red. Lo que cambió es qué se persiste, no qué se valida.

## 15.6 Integridad del esquema tras las bajas

Verificado y correcto: `enlaces` quedó con `id`, `proyecto_id`, `origen_servicio_id`, `destino_servicio_id`, `clave_variable`, `clave_destino`, `estado` y `creado_en`, sin columnas huérfanas; los tres `CHECK` que dependían de `tipo` desaparecieron con él y quedó sólo el de autorreferencia; `ix_enlaces_destino` se redefinió sobre `(destino_servicio_id, clave_destino)` en lugar de sobre el `tipo` eliminado, de modo que no quedó ningún índice colgado; y `variables` perdió `enlace_id` sin dejar clave foránea suelta.

La clave única nueva —`UNIQUE (origen_servicio_id, clave_variable, destino_servicio_id, clave_destino)`— **es coherente con lo que el modelo ahora permite**: una variable con dos referencias al mismo destino produce dos filas que se distinguen por `clave_destino`, que es exactamente el caso de `ConnectionStrings__Default` (aristas 9002 y 9005) y de `REDIS_URL` (9001 y 9004) en E-1. Sin `clave_destino` en la clave, esas filas colisionarían. Está bien pensada.

El único problema del esquema no está en el esquema sino en un anexo que declara un caso que el esquema no admite: ver **P0-2**.

## 15.7 Fidelidad a la fuente y estado de la desviación

La tabla de formas de E-4 declara ahora `${{ CLAVE }}`, `${{ shared.CLAVE }}` y `${{ <nombre-servicio>.CLAVE }}`, y su columna «En la fuente» dice **«Igual»** en las tres filas, contrastable línea por línea contra el bloque transcripto de `Analisis-Rayway.md` §3.5 que el mismo anexo contiene tres párrafos más arriba. **La sintaxis volvió a coincidir con la fuente.**

**No queda ninguna declaración de desviación describiendo una desviación inexistente.** El bloque «Desviación deliberada respecto de la fuente, con su argumento» desapareció. Las menciones al prefijo `servicios.` que quedan son cuatro y todas son históricas: la que explica por qué el argumento anterior era falso, la que enumera los tres cambios, la que menciona «el temor que motivaba el prefijo `servicios.`» y una entrada de control de cambios. Ninguna afirma una desviación vigente.

## 15.8 Reparto del marcador `[D-i]` tras la renumeración

Correcto en la dirección principal: la sintaxis volvió a la columna del agente humano. El punto 1 de E-4 se titula **«Sintaxis adoptada [D], D-6 segunda pasada»**, la fila de sintaxis de la tabla de reparto pasó a la columna `[D]` con las tres formas y sus identificadores, y la vieja DI-01 —los identificadores propios— desapareció de la tabla con su baja declarada en el mapeo. **La sintaxis no quedó marcada como derivada en ningún lugar.** Lo que sí sigue `[D-i]`, y corresponde, es la regla de decisión por cantidad de segmentos y la reserva del nombre `shared` (DI-01 nueva).

En la dirección inversa el mapeo falla en un punto: ver **P2-1**.

## 15.9 Hallazgos

### P0

**P0-1 · §17.4 P.11 declara que el grafo completo de aristas detecta los ciclos de arranque, contra RN-05, contra E-4 y contra T-45.**
Ubicación: §17.4 P.11, fila 4 (línea 1055).
Evidencia. La fila dice: *"El grafo de aristas define la detección de ciclos de arranque, y el **subgrafo de las referencias de red** define el orden topológico"*. Las otras tres fuentes dicen lo contrario:

- RN-05: *"El **grafo de arranque** no puede tener ciclos. El grafo de arranque es el subgrafo de las **referencias de red**; un ciclo formado sólo por referencias de dato no es un ciclo de arranque y no lo rechaza esta regla"*.
- E-4 punto 4: *"Como el grafo de arranque pasa a ser el subgrafo de las referencias de red, RN-05 deja de ver los ciclos formados sólo por referencias de dato"*.
- T-45: dos referencias de dato en sentidos opuestos → *"**Aceptado.** No es un ciclo de arranque"*.

Si el grafo completo detectara los ciclos de arranque, T-45 sería rechazado y la justificación entera de la segunda pasada —el punto 1 de E-4, «ordenar de más rechaza configuraciones legítimas»— quedaría anulada. §17.4 P.11 es la sección de decisiones de modelo pre-tomadas del proyecto Domain: es de donde `05-Arquitectura-Tecnica` y `02-Especificacion-Funcional` derivan el detector de ciclos.
Es un resto exacto del modelo viejo: cuando había dos orígenes unificados, el grafo de aristas y el grafo de arranque eran el mismo, y la frase era verdadera. Al separarlos, sólo se actualizó la segunda mitad de la oración.
Recomendación: reescribir la fila como «El **subgrafo de las referencias de red** define tanto la detección de ciclos de arranque como el orden topológico; los ciclos de valor los cubre RN-22 sobre el grafo completo de referencias».

**P0-2 · E-21 declara una arista sin variable asociada, que el esquema de E-9 no admite y que contradice la definición del modelo.**
Ubicación: §20.21, fila `depends_on:` (línea 3214), contra §20.9 (`CREATE TABLE enlaces`), E-4 y §12.
Evidencia. La fila dice: *"qué variable la sostiene se deduce de la que en el Compose apunta al destino, y **si no hay ninguna la arista se importa sin variable asociada** y el lienzo la muestra como dependencia de arranque declarada"*. Pero:

- `enlaces` declara `clave_variable TEXT **NOT NULL**` y `clave_destino TEXT **NOT NULL**`, y las dos forman parte de la clave única. Una arista sin variable asociada **no es persistible**.
- E-4 declara: *"toda arista nace de una referencia a una variable de otro servicio"*.
- §12, «Arista o enlace»: *"**Toda arista nace de una referencia de variable**"*.
- Y si la arista no tiene `clave_destino`, el predicado `esReferenciaDeRed` —que E-4 deduce de `claveDestino`— no se puede evaluar, de modo que esa arista no podría decidir si ordena el arranque, que es justamente para lo que se la importa.

Es el resto más costoso de la eliminación del discriminador: con el modelo viejo, un `depends_on` sin variable se importaba como arista de tipo `host-puerto`, que no exigía variable. Al desaparecer el tipo, ese caso quedó sin representación y la fila lo resolvió inventando un estado que el resto del documento prohíbe.
Recomendación: decidir el caso de forma implementable —por ejemplo, materializar el `depends_on` sin variable escribiendo la referencia a `SELFHOSTED_HOST` del destino, que es lo que el azúcar del lienzo ya hace y deja la arista bien formada— o registrarlo como pendiente de decisión en §19 en lugar de declararlo resuelto.

### P1

**P1-1 · La pendiente de §19 sobre distinción visual de aristas perdió su objeto y arrastra una afirmación que su sección de referencia ya no hace.**
Ubicación: §19, tabla de pendientes de decisión, fila «Distinción visual entre los dos orígenes de arista en el lienzo» (línea 3421).
Evidencia: el título y el cuerpo siguen redactados sobre el modelo anterior — *"la forma concreta de distinguir una **arista de host y puerto** de una **de referencia** no está decidida. El modelado sí lo está: **son un único tipo con dos orígenes** (§17.4 P.11)"*—. Ya no hay aristas de host y puerto, ya no hay dos orígenes, y §17.4 P.11 ya no dice eso: dice lo contrario, que hay un único mecanismo. Es la única mención viva del discriminador en todo el documento fuera de los pasajes que explican su eliminación.
Agravante: la distinción que **sí** existe ahora —referencia de red frente a referencia de dato— tiene consecuencia funcional visible (una ordena el arranque y exige canal, la otra no) y por lo tanto es más necesaria en el lienzo que la anterior, y ninguna pendiente la cubre. `03-UX-UI-DX` derivaría un requisito para distinguir dos cosas que no existen y no derivaría el que hace falta.
Recomendación: reescribir la pendiente sobre red frente a dato, citando la tabla del punto 4 de E-4.

**P1-2 · El manifiesto propio de E-14 dejó de preservar las expresiones de las variables que sostienen aristas, contra RN-25 y contra su propia tabla de correspondencia.**
Ubicación: §20.14 (bloque del manifiesto, su párrafo explicativo y su tabla de correspondencia) y §20.22 (T-39).
Evidencia. Tras la segunda pasada, `ConnectionStrings__Default` y `REDIS_URL` dejaron de ser variables de enlace con plantilla y pasaron a ser referencias con expresión propia (E-2): `"Host=${{ db.SELFHOSTED_HOST }};Port=${{ db.SELFHOSTED_PORT }};Database=portal"` y `"${{ cache.SELFHOSTED_HOST }}:${{ cache.SELFHOSTED_PORT }}"`. Pero:

- El array `referencias` del manifiesto sigue listando **cuatro** expresiones —`TZ`, `DB_USER`, `DB_PASSWORD`, `SALUD_URL`— y **no incluye a esas dos**.
- El array `enlaces` sí las registra, pero sólo como pares `claveVariable` + `claveDestino`: de ahí **no se puede reconstruir** el texto literal que las rodea (`Host=…;Port=…;Database=portal`). La información se pierde.
- RN-25 declara como invariante verificable por prueba que *"la expresión sin resolver se preserva en el manifiesto propio"*, y la tabla de correspondencia de E-14 lo repite: *"Referencia `${{ … }}` … Se pierde la expresión. **Se preserva en el manifiesto propio, en `referencias`**"*.
- El párrafo explicativo de E-14 sigue diciendo *"las cuatro variables incorporadas al servicio `api`: `TZ`, `DB_USER`, `PUERTO_HTTP` y `SALUD_URL`"*, donde `PUERTO_HTTP` no es una referencia sino un literal, y donde faltan las dos nuevas.
- T-39 asserta como resultado esperado que *"el manifiesto propio, de `version: 2`, lleva **las cuatro** expresiones sin resolver"*, cuando el servicio tiene seis (así lo cuenta T-38: *"seis referencias"*).

Antes de la segunda pasada la expresión de esas dos variables vivía en `plantilla_variable` del enlace; al eliminar esa columna, el contenido no se trasladó a `referencias`. Es un resto de baja, no un descuido de redacción: el manifiesto ya no cumple lo que la regla promete y la prueba que debería detectarlo está escrita con el número viejo.
Recomendación: agregar las dos expresiones a `referencias`, corregir el párrafo (quitar `PUERTO_HTTP`, sumar las dos) y actualizar T-39 a seis.

**P1-3 · §17.4 P.11 sigue definiendo la arista como consumo de dirección y puerto, que ahora es sólo uno de los dos casos.**
Ubicación: §17.4 P.11, fila 2 (línea 1053), contra la fila 3 de la misma tabla, contra §12 y contra E-4.
Evidencia: la fila define *"Una arista del lienzo representa que el servicio origen consume, vía variable de entorno, **la dirección interna y el puerto** del servicio destino"*. Dos filas más abajo, la misma tabla declara el mecanismo único, donde una arista puede nacer de una referencia a **cualquier** variable del destino; el glosario ya lo corrigió y distingue red de dato. La fila quedó describiendo únicamente la referencia de red como si fuera la definición de arista, en la sección normativa del modelo de dominio.
Atenuante: la fila está marcada `[E]` y es transcripción del análisis integrado, que es anterior al concepto de referencia de dato. Eso explica su origen pero no resuelve la contradicción para quien deriva de ella.
Recomendación: mantener la transcripción y agregarle la nota de alcance, como se hizo con RN-04 y RN-05, que sí declaran su ampliación.

**P1-4 · El control de cambios registra la incorporación a §19 de una tabla que no existe.**
Ubicación: control de cambios (línea 3555) contra §19.
Evidencia: la entrada declara *"Incorporación a §19 de la tabla «Observaciones de auditoría aceptadas y deliberadamente no aplicadas», con los cuatro señalamientos que este documento no corrige y el motivo de cada uno: P2-15 por quedar fuera del alcance del archivo…"*. Una búsqueda del título, de la frase «deliberadamente no aplicadas» y de «Observaciones de auditoría» en todo el documento devuelve **una sola coincidencia: esa misma entrada del control de cambios**. La tabla no está en §19 ni en ninguna otra parte.
Es el defecto inverso al de una entrada faltante y está tipificado igual: el control de cambios declara un cambio que no ocurrió. Además deja abierto, sin registro, el señalamiento N-4 de la corrida anterior, que esa tabla venía a cerrar.
Recomendación: incorporar la tabla a §19 con sus cuatro filas, o eliminar la entrada.

### P2

| # | Ubicación | Hallazgo | Recomendación |
|---|---|---|---|
| P2-1 | §20.15 (nota de `POST /adoptar`, línea 2534) contra §19 (DI-09 y DI-11) | **El mapeo `[D-i]` falla en la dirección inversa.** DI-11 declara vivir en E-15, y **E-15 no contiene ninguna marca `[D-i]`**: la nota de adopción está rotulada `[D], D-2` completa, incluyendo las dos porciones que la tabla DI declara derivadas —el `422` (DI-09) y el corolario *"el cambio debe entrar antes de la primera publicación de la versión 1 de la API o abrir `/api/v2`"* (DI-11)—. La renumeración no alcanzó ese pasaje | Repartir la nota como se hizo con RN-21 y RN-29: enunciado `[D]`, exigibilidad y corolario `[D-i]` |
| P2-2 | §20.16 | **RN-32 está listada antes de RN-31**, rompiendo el orden del catálogo justo en el tramo que `08-Calidad-Y-Pruebas` recorre regla por regla | Mover RN-32 después de RN-31 |
| P2-3 | §21, filas 13 y 22 | Vocabulario muerto en la matriz de cobertura: *"Arista del lienzo y **variable generada** según modo de red (RN-04)"* usa un concepto eliminado, y *"Orden topológico de arranque deducido **del grafo** (RN-14)"* omite que ahora es el subgrafo de red. Las filas nuevas de la segunda pasada sí están bien redactadas, de modo que la matriz se contradice consigo misma | Actualizar las dos filas |
| P2-4 | §17.4 P.11, fila 5 (línea 1056) | *"Si cambia la dirección o el puerto del destino, **todos** los servicios origen de aristas entrantes quedan marcados como requieren redespliegue"*. Con el modelo nuevo, una arista entrante de dato —`${{ db.POSTGRES_USER }}`— no consume la dirección y no debería marcarse por un cambio de dirección. La regla marca de más | Acotar a las aristas de red, coherente con la fila siguiente, que sí distingue por valor referenciado |
| P2-5 | §20.14 (manifiesto, `canvas.nodos`) | El manifiesto exporta un solo nodo (`api`) cuando E-1 declara tres, y el manifiesto es lo que preserva el layout. Preexistente desde la 1.0 y no tocado en ninguna de las tres pasadas, pero E-14 volvió a reescribirse sin corregirlo | Completar los tres nodos |

### P3

| # | Ubicación | Hallazgo |
|---|---|---|
| P3-1 | §20.4, líneas 1467 y 1472 | La tabla de claves provistas y su tabla de resolución se explican por referencia a una sintaxis que ya no existe: *"Es lo que antes resolvía la plantilla `{destino.host}`"*, *"Es la misma tabla que este anexo ya declaraba para `{destino.host}`"*. Es didáctico para quien vio la versión anterior y ruido para quien no, dentro de un anexo normativo |
| P3-2 | §19 y §20.18 | Siguen abiertos, de la primera corrida, la ubicación de §19 después de §20 y §21, y los dos emojis de E-18. La entrada de control de cambios que decía registrar su no aplicación con motivo remite a una tabla inexistente (**P1-4**), de modo que continúan sin motivo declarado |

## 15.10 Estado de las seis inconsistencias que el integrador reporta

Las cuatro que declara corregidas se verificaron y están corregidas: la ausencia de endpoint de exportación de catálogo (E-15 lo incorpora con su nota de origen), la marca `[D-i]` de RN-04 y RN-05 que faltaba en la celda de identificador (ahora dicen `(ampliación [D-i])`), el reparto interno de RN-21 entre enunciado y exigibilidad, y la afirmación falsa de que los tres registros de §19 son disjuntos —efectivamente lo era, porque la matriz de navegadores figura a la vez como marcador `[S]` sin número y como pendiente de decisión, y ahora está declarado—. Esta última es una autocorrección de una corrección mía de la corrida anterior, y es correcta: mi P1-5 pedía declarar tres registros y el integrador descubrió que la declaración de disyunción que introdujo era falsa. Bien detectado.

La que declara registrada como pendiente —cómo se referencia el puerto de un servicio con más de un puerto de contenedor— está efectivamente en la tabla de pendientes de §19, citada desde E-4 punto 2 y con caso de prueba que verifica el `422` de ambigüedad (T-50). Correcto.

Las dos preexistentes no tocadas se corresponden con P2-5 de esta sección (nodos del manifiesto) y con la ubicación de §19. Se reportan arriba.

**Ninguna de las seis se reporta como hallazgo nuevo**, salvo por el hecho de que el registro del motivo de las no aplicadas apunta a una tabla ausente, que es P1-4.

## 15.11 Lectura sobre si la simplificación dejó restos

Sí, pero de una clase distinta a la que el barrido de texto encuentra. **En campos, columnas, sintaxis e identificadores el trabajo está completo**: no quedó un solo `tipo`, ni un `enlaceId`, ni una `plantillaVariable`, ni un `{destino.puerto}`; el esquema quedó consistente y la clave única nueva está bien pensada; los siete casos que cambiaron de objeto cambiaron de verdad y los cinco nuevos cubren el prefijo reservado, la limitación del puerto, el nombre `shared`, el ciclo de valor entre servicios y el azúcar del lienzo.

Los restos quedaron en **prosa que razona con el modelo viejo y que sigue siendo verdadera de leer pero falsa de aplicar**: una fila que dice que el grafo completo detecta ciclos de arranque, porque antes los dos grafos eran el mismo (P0-1); una regla de importación que resuelve un caso inventando una arista sin variable, porque antes ese caso lo absorbía el tipo `host-puerto` (P0-2); un manifiesto que dejó de preservar lo que la columna eliminada preservaba (P1-2); una pendiente que pide distinguir visualmente dos cosas que se fusionaron, mientras la distinción que nació no tiene quien la pida (P1-1). Los cuatro comparten un patrón: **son los lugares donde el modelo viejo tenía dos objetos y el nuevo tiene uno, y donde algo que colgaba del objeto eliminado no encontró dueño.**

Ninguno invalida la decisión. El modelo nuevo es más chico, está mejor fundado y es fiel a la fuente. Lo que falta es terminar de mudar lo que vivía en la pieza que se sacó.

## 15.12 Veredicto y condiciones

**RECHAZADO**, por los dos P0. Son contradicciones entre partes del documento que derivarían mal: una reimplantaría el defecto que la pasada vino a eliminar, la otra especifica un registro que el esquema rechaza.

Condiciones para promover a APROBADO CON OBSERVACIONES:

1. **P0-1**: reescribir la fila 4 de §17.4 P.11 para que el subgrafo de referencias de red sea el que detecta los ciclos de arranque, coherente con RN-05, E-4 punto 4 y T-45.
2. **P0-2**: dar a la arista importada desde un `depends_on` sin variable una representación que el esquema admita, o registrar el caso como pendiente de decisión.
3. Registrar las dos correcciones en el control de cambios, atómicas y citando el hallazgo.

Condiciones adicionales para APROBADO: cerrar los cuatro P1, en particular **P1-2**, que es el único que rompe una invariante declarada verificable por prueba, y **P1-4**, que es el único defecto de trazabilidad del control de cambios que esta cadena ha tenido hasta ahora.

Se deja constancia de que §13 sigue intacto por tercera verificación independiente, de que ninguna de las treinta y una reglas anteriores fue eliminada ni renumerada, y de que la cobertura de ciclos —el punto que el brief señalaba como el más riesgoso— quedó completa y sin solapes contradictorios.

---

# 16. Verificación de cierre de la segunda pasada y veredicto final del intake

| Campo | Valor |
|---|---|
| Objeto verificado | `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3622 líneas (3302 → 3472 → 3572 → 3622) |
| Alcance | Cierre de los 2 P0, 4 P1, 5 P2 y 2 P3 de la sección 15; verificación independiente de recuentos; auditoría de la decisión de P0-2; **verificación independiente de las 102 entradas de control de cambios**; defectos nuevos; restos remanentes del patrón; lectura sobre el título de E-4; veredicto final |
| Fecha | 2026-07-28 |
| Veredicto de esta corrida | **RECHAZADO** por un P0 de alcance acotado |

## 16.1 Estado de cierre de los seis

| # | Estado | Evidencia verificada |
|---|---|---|
| **P0-1** | **CERRADO** | §17.4 P.11 fila 4 dice ahora: *"El **subgrafo de las referencias de red** define tanto la detección de ciclos de arranque como el orden topológico; los ciclos de **valor** los cubre RN-22 sobre el grafo completo de referencias, que es otra cosa"*. Coincide palabra por palabra con RN-05, con E-4 punto 4 y con el resultado esperado de T-45 |
| **P0-2** | **CERRADO** | Resuelto en dos casos, con la arista siempre bien formada. Ver el análisis dedicado en §16.3 |
| **P1-1** | **CERRADO** | La pendiente de §19 se retituló «Distinción visual entre **referencia de red** y **referencia de dato** en el lienzo» y su cuerpo argumenta desde la consecuencia funcional —una ordena el arranque, la otra no—, sin mencionar orígenes ni tipos |
| **P1-2** | **CERRADO** | El array `referencias` del manifiesto lleva ahora **seis** entradas, incluidas `ConnectionStrings__Default` con su literal completo y `REDIS_URL`. T-39 se reescribió: *"que tiene seis referencias … el manifiesto propio … lleva **las seis** expresiones sin resolver"*. La expresión ya no se pierde en la ida y vuelta |
| **P1-3** | **CERRADO** | §17.4 P.11 fila 2 conserva la transcripción `[E]` y le agrega la «Ampliación **[D-i]**, D-6 segunda pasada» que declara que ese enunciado *"describe hoy sólo la referencia de red, que es un caso de arista y no su definición"*. Es el mismo mecanismo con el que RN-04 y RN-05 declaran su ampliación: coherente con el criterio ya aplicado |
| **P1-4** | **CERRADO en cuanto al contenido** | La tabla «Observaciones de auditoría aceptadas y deliberadamente no aplicadas» existe en §19 con sus cuatro filas —P2-15, P2-4, P3-1 y P3-2— y el motivo de cada una. Queda un defecto de ubicación, ver **N-2** |

Los cinco P2 de la sección 15 están cerrados: la nota de adopción de E-15 se repartió (`[D], D-2` el enunciado; `[D-i]` el `422` con DI-09 y el corolario de versionado con DI-11, que era la única entrada DI sin marca en el cuerpo); RN-31 y RN-32 quedaron en orden; las dos filas de §21 se reescribieron sobre la referencia a las variables provistas y sobre el subgrafo de red; la fila de marcado por cambio de dirección se acotó a las aristas de red; y el manifiesto exporta los tres nodos con su grupo. Los dos P3 quedaron declarados con su motivo en la tabla nueva de §19.

## 16.2 Verificación independiente de los recuentos

| Cifra declarada | Recuento del auditor | Resultado |
|---|---|---|
| 32 reglas | 32 identificadores únicos, RN-01 a RN-32, **en orden** | **Correcta** |
| 55 casos de prueba | 55 filas: T-01 a T-54 más T-17b. El nuevo es T-54. E-22 declara «los veinticuatro casos T-31 a T-54», que es exacto | **Correcta** |
| 14 entradas DI | 14 filas DI-01 a DI-14, con el mapeo de renumeración declarado | **Correcta** |
| 33 términos de glosario | 33 filas | **Correcta** |
| 102 entradas de control de cambios de la 1.2 | 102 filas con versión 1.2 | **Correcta** |
| §13 intacto | `md5 = cfe9b4fab20dab26bd1d38142801765e` en §13 de la 1.2 actual y de la 1.0 archivada; `diff` vacío | **Correcta. Cuarta verificación independiente** |

## 16.3 Auditoría de la decisión de P0-2

Es la parte más interesante de esta ronda y se la revisó punto por punto.

**La resolución en dos casos es correcta y el modelo resultante es consistente.** El caso de reexpresión produce una arista con `clave_variable` y `clave_destino` llenas, que es lo que la tabla `enlaces` exige; el predicado `esReferenciaDeRed` se puede evaluar porque `clave_destino` es `SELFHOSTED_HOST`; y la arista ordena el arranque, que es exactamente lo que el `depends_on` pedía. El caso de pérdida no crea nada, de modo que no hay registro inválido posible. **No queda ningún camino por el que la importación produzca una arista que el esquema rechace**, que era el defecto.

**La reexpresión no viola ninguna regla, y se verificó contra las que podrían haberse roto:**

- **RN-25 y T-30 (ida y vuelta).** La variable reexpresada exporta su valor resuelto, que es idéntico al literal de partida (`http://ia-api:11434`). El archivo reexportado reproduce el `environment` original. El argumento del integrador para descartar la creación de variable —que inyectaría en el contenedor una variable que el archivo no tenía y rompería T-30— es correcto y está bien elegido: es la única de las tres salidas que preserva la equivalencia.
- **RN-04.** La arista resultante es de red y exige canal alcanzable. En el caso que la ejercita (C-5, tres servicios en `ia-net`) el canal existe. Consecuencia asumida no declarada: si alguien importara un Compose donde el origen alcanza al destino por una vía que el modelo considera inalcanzable, la importación produciría un proyecto que no arranca. Es un borde estrecho y el comportamiento es el que el modelo prescribe, de modo que no se reporta como hallazgo, pero conviene tenerlo presente.
- **RN-24 y RN-21.** La expresión reexpresada apunta a una variable provista del mismo proyecto, que siempre existe. No hay forma de que la reexpresión genere una referencia no resoluble.

**La excepción a RN-26 está bien acotada y no abre una puerta más ancha de la necesaria.** La regla se reescribió con precisión quirúrgica: pasa de *"nunca crea referencias"* a *"nunca **deriva referencias de la interpolación de Compose**"*, y declara que *"la **única** referencia que la importación crea es la que reexpresa un `depends_on` explícito sobre una variable cuyo literal ya coincide con el host y el puerto del destino"*. Tres cierres: la fuente es un `depends_on` explícito y no una interpolación, no se inventa valor ni variable, y la condición exige coincidencia previa del literal. No hay forma de estirar esa excepción a `${VAR}`, que es lo que la regla protege.

**El descarte de la tercera salida es sólido.** Admitir una dependencia de arranque sin arista obligaría a `clave_variable` anulable o a una segunda entidad, que es la complejidad que la segunda pasada eliminó; y el argumento de que la plataforma de referencia tampoco tiene forma de declarar orden de arranque sin una referencia de por medio es verificable contra `Analisis-Rayway.md` §3.5, que declara que sólo uno de los dos vínculos es explícito y que es la referencia de variable.

**Los casos de prueba prueban lo que dicen probar.** T-54 aserta las tres cosas que importan del caso de pérdida —no hay arista, no hay variable, el informe lista el par— y agrega la aserción que cierra el descarte: *"volver a exportar reproduce el `environment` de partida"*. T-40 se reescribió sobre C-5, que es el único caso real del intake con `depends_on`, y aserta que de la interpolación no sale ninguna referencia **y** que la única creada es la reexpresión de `API_BASE_URL`. Las dos aserciones juntas son exactamente el enunciado de la RN-26 nueva. Bien construido.

**Dónde falla.** La pérdida de traducción está declarada en E-21, en T-54, en DI-14 y en RN-26, pero el artefacto que la comunica al usuario —el «informe de importación»— no existe fuera de esos dos anexos, ver **N-3**. Y tres copias de la regla vieja sobrevivieron, ver **N-1**, que es el P0 de esta corrida.

## 16.4 Verificación independiente del control de cambios

Se rehízo el control sobre las **102** entradas, con un método distinto del que el integrador describe, para no heredar sus puntos ciegos. Procedimiento: se separó el cuerpo del documento (líneas 1 a 3508) de la tabla de control de cambios (3509 en adelante) y se contrastó contra el cuerpo **todo** identificador citado por una entrada, en tres extracciones independientes.

| Extracción | Universo | Ausentes del cuerpo | Evaluación |
|---|---|---|---|
| Tokens entre comillas invertidas (nombres de tabla, columna, índice, archivo, sintaxis, ruta) | 153 tokens | 7 | Todos explicables: `puerto_destino` ×2 e `ix_variables_referencia` son artefactos que una entrada agregó y otra posterior dio de baja, y la entrada describe correctamente lo que hizo en su momento; `Domain/Proyectos/` y `SDD/Intake/_legacy/` son notación compacta de rutas que existen en el árbol de §16 y en el disco; `Master-Prompt.md` es un archivo externo que existe; `${{ <servicio>.CLAVE }}` es variante notacional de `${{ <nombre-servicio>.CLAVE }}`, que sí está |
| Títulos entre comillas angulares (el patrón que falló en la entrada 67) | 37 títulos | 2 | Ambos en la entrada 100, que **cita entre comillas la redacción que reemplaza** («del grafo de aristas», «grafo de aristas»). Es correcto que no estén: la corrección las eliminó |
| Identificadores `RN-`, `T-`, `DI-`, `F-`, `DA-`, `RA-`, `SM-`, `CL-`, `IC-`, `PT-`, `S-` | 68 identificadores únicos | **0** | Todos existen en el cuerpo |

**Ninguna de las 102 entradas declara un cambio inexistente.** La entrada 67 —la que la sección 15 reportó como P1-4— quedó respaldada: la tabla que declara incorporar existe en §19 con sus cuatro filas. La cuenta del integrador (una sola falsa, cinco falsos positivos) coincide con la mía en el resultado, y mi extracción por comillas angulares, que es la que habría detectado el caso 67 de origen, no encuentra ninguno más.

Se deja constancia del punto ciego que este método conserva: verifica que lo citado exista, no que las afirmaciones cuantitativas de cada entrada sean exactas. Se controlaron por muestreo las que declaran cifras verificables —«se agregan nueve filas» a §21, «de RN-01 a RN-32», «el recuento de casos de prueba de 49 a 54», «renumera a DI-01 a DI-13»— y todas resultaron correctas contra el estado del documento en el momento que describen.

## 16.5 Defectos nuevos de esta ronda

**N-1 · P0 · Tres afirmaciones absolutas de que la importación nunca crea referencias sobrevivieron a la excepción que las contradice, y citan la regla que ya no lo dice.**
Ubicación: §20.4 punto 5, tabla de convivencia, fila «Compose → modelo» (línea 1534); §20.14, «Regla de la importación inversa» (línea 2503); §20.21, fila `environment:` con `${VAR}` (línea 3223).
Evidencia:

- E-4, en el bloque que **es** la especificación de D-6 y del que RN-25 y RN-26 derivan: *"**Una importación nunca crea referencias.**"*, con «RN-26» en su columna de regla.
- E-14: *"La importación **no crea referencias** (RN-26)"*.
- E-21: *"la importación no crea referencias (RN-26)"*.
- Contra RN-26, reescrita en esta misma ronda: *"nunca **deriva referencias de la interpolación de Compose** … La **única** referencia que la importación crea es la que reexpresa un `depends_on` explícito"*.
- Y contra la fila `depends_on:` del propio E-21, contra T-40 (*"La **única** referencia creada es la reexpresión de `API_BASE_URL`"*) y contra DI-14.

Que RN-26 haya cambiado su apertura de «nunca crea referencias» a «nunca deriva referencias de la interpolación» demuestra que el cambio de alcance se identificó correctamente; lo que faltó fue propagarlo a las tres copias. Un subagente que derive el importador de E-4 —que es el anexo normativo de la sintaxis y el que la trazabilidad de §19 declara como insumo de `02-Especificacion-Funcional`— construiría un importador que nunca reexpresa, es decir el que el P0-2 vino a descartar; uno que lo derive de RN-26 y E-21 construiría el otro. Son dos importadores incompatibles.
Es exactamente el patrón que esta cadena de auditorías viene reportando: una afirmación que era verdadera antes del cambio y que quedó en pie porque el cambio se aplicó en el lugar donde se pensó, no en todos los lugares donde se afirmaba.
Recomendación: reformular las tres sobre el enunciado de RN-26. En E-4 y E-21 alcanza con acotar a la interpolación; en E-14 conviene además remitir a la fila `depends_on:` de E-21, porque es la única de las tres que habla de la importación en general y no de `${VAR}`.

**N-2 · P2 · La tabla restaurada se insertó entre la tabla DI y su párrafo de cierre, que ahora refiere a la tabla equivocada.**
Ubicación: §19, líneas 3451 a 3479.
Evidencia: la tabla DI-01 a DI-14 termina en la línea 3466; sigue la nota de renumeración (3468); sigue la tabla «Observaciones de auditoría aceptadas y deliberadamente no aplicadas» con sus cuatro filas (3470 a 3477); y recién entonces, en 3479, aparece *"Tres notas sobre **esta tabla**. Ninguna de **las catorce** contradice la decisión que la origina…"*, que es el cierre de la tabla DI. Leído en orden, «esta tabla» apunta a la de observaciones, que tiene cuatro filas y ninguna decisión que la origine.
Es notable porque es **el mismo modo de falla que el integrador declara haber registrado como reincidible** al explicar cómo se perdió la tabla en la ronda anterior: reemplazo de un bloque contiguo por rango, que arrastra lo que estaba pegado. Reapareció en la corrección de ese mismo defecto.
Recomendación: mover el párrafo de las tres notas inmediatamente después de la nota de renumeración, dejando la tabla de observaciones al final de §19.

**N-3 · P2 · El «informe de importación» se declara en dos anexos y no existe en la superficie de la API ni en el glosario.**
Ubicación: §20.21 (línea 3235) y §20.22 (T-54), contra §20.15 y §12.
Evidencia: la resolución de la pérdida de traducción descansa en que *"el informe de importación lista el par origen–destino como dependencia de arranque no representada, y la interfaz lo advierte"*, y T-54 lo aserta como resultado esperado. Pero la fila de E-15 sigue diciendo, sin cambios, *"`POST /api/v1/proyectos/importar/compose` · Importa un Compose como proyecto nuevo"*, sin mencionar que la respuesta lleva un informe; E-14, en su regla de importación inversa, tampoco lo menciona; y el glosario no lo define. E-15 se declara la superficie de la API y §17.1 P.3 la cita como tal.
Es el mismo defecto que esta auditoría tipificó en su criterio de coherencia cuerpo–anexos: un artefacto declarado en un anexo y ausente de la superficie que se declara completa. Sin él, la garantía de que la pérdida es *declarada* —que es lo que la hace aceptable— no tiene dónde materializarse.
Recomendación: ampliar la descripción del endpoint de importación con el informe y su contenido mínimo, y agregar el término al glosario.

**N-4 · P3 · La nota del título de E-4 se declara hermana de las observaciones de §19 pero no figura en esa tabla.**
Ubicación: §20.4 (línea 1379) y §19 (tabla de observaciones no aplicadas).
Evidencia: la nota cierra con *"Se reevalúa si alguna vez se abre una versión 1.3, junto con las otras dos observaciones de orden registradas en §19"*. La tabla de §19 tiene cuatro filas —P2-15, P2-4, P3-1 y P3-2— y ninguna es el título de E-4. La decisión queda declarada sólo en el anexo, no en el registro que el propio documento designa para las decisiones de no aplicar.
Recomendación: agregar la quinta fila.

## 16.6 Restos remanentes del patrón

Se repitió el barrido con los seis giros que caracterizan el modelo anterior. Resultado tras esta ronda:

| Expresión | Ocurrencias vivas | Estado |
|---|---|---|
| `host-puerto`, `enlaceId`, `plantillaVariable`, `variableGenerada`, `puertoDestino`, `{destino.puerto}` | 0 | Limpio |
| «variable de enlace» | 1, en el glosario, redefinida explícitamente como *"no es una clase aparte de variable"* | Correcto |
| «variable generada» | 2: el título de E-4 y la nota que declara la discrepancia | Deliberado, ver §16.7 |
| «enlace de host y puerto», «tipo de arista», «dos orígenes» | Todas en pasajes que explican la eliminación o en el mapeo de renumeración de la tabla DI | Correcto |
| «la importación no crea referencias» | **3** | **Vivo y contradictorio: N-1** |

Los tres restos que el integrador encontró por su cuenta —el orden de arranque «del grafo de aristas» en E-10 y dos pasajes del caso C-5 en E-20— están efectivamente corregidos, y son del mismo patrón que esta auditoría describió. Que los haya buscado sin que se los pidieran es la práctica correcta. El que quedó, N-1, no es de la misma clase: no es prosa explicativa que envejeció, es una **regla enunciada tres veces** en anexos normativos.

## 16.7 Lectura sobre el título de E-4

**Se comparte la decisión de conservarlo, y por una razón que va más allá del costo del enlace roto.**

El argumento del ancla es válido pero no decisivo por sí solo: los enlaces internos se podrían reparar en la misma operación. Lo que inclina la balanza es que el intake ya está siendo leído por artefactos generados —`00-Contexto` y `01-Necesidades-Negocio` existen y fueron auditados— y que el criterio de no romper anclas **ya se aplicó y se registró** para P3-1, la ubicación de §19. Cambiar el título de E-4 mientras se conserva la ubicación de §19 por el mismo motivo sería incoherente: o el criterio vale para los dos casos o no vale para ninguno. La consistencia del criterio importa más que la elección concreta.

El riesgo de conservarlo es real pero acotado y ya está mitigado en el lugar donde muerde: un subagente que llegue al anexo lee la nota en el primer párrafo, antes de cualquier contenido, y el cuerpo entero del anexo usa «referencia» sin excepción. El caso peligroso —que alguien tome el término del índice sin abrir el anexo— se cubre con dos gestos baratos que recomiendo, y que son la condición con la que endoso la decisión:

1. **Agregar «variable generada» al glosario** como término retirado, con la remisión a «Referencia de variable». Es el lugar donde un subagente busca un término que no entiende, y hoy no lo encuentra.
2. **Registrarlo como quinta fila** de la tabla de observaciones no aplicadas de §19 (que es **N-4**), para que la decisión viva en el registro y no sólo en el anexo.

Con esos dos gestos, conservar el título deja de ser una deuda y pasa a ser una decisión declarada, que es la diferencia que esta cadena de auditorías viene marcando.

## 16.8 Veredicto final del intake

**RECHAZADO**, por el P0 de N-1.

Corresponde ser preciso sobre lo que eso significa, porque la distancia entre el estado del documento y su aprobación es la más corta de las cuatro corridas. Los seis defectos de la sección 15 están cerrados y verificados; la decisión de P0-2 es correcta, está bien argumentada, descartó las dos alternativas por razones verificables y no viola ninguna regla; las 102 entradas de control de cambios resistieron una verificación independiente con tres extracciones distintas sin una sola afirmación falsa; §13 sigue intacto por cuarta vez; y el barrido de restos dio limpio salvo en un punto. El P0 es **tres oraciones que quedaron sin actualizar**, en un cambio que el integrador identificó bien y aplicó bien en la regla.

Pero es un P0 y no otra cosa: dos anexos normativos afirman lo contrario de la regla que citan, sobre el comportamiento del importador, que es justamente lo que la ronda anterior resolvió. Aprobarlo dejaría que la cadena derive dos importadores incompatibles según de qué anexo lea.

**Condición única para promover a APROBADO CON OBSERVACIONES:** reformular las tres afirmaciones de E-4, E-14 y E-21 sobre el enunciado vigente de RN-26, con su entrada de control de cambios. Es una corrección de alcance cerrado y sin efecto sobre el modelo.

**Condiciones para APROBADO:** además, cerrar N-2 (mover el párrafo de cierre de la tabla DI), N-3 (declarar el informe de importación en E-15 y en el glosario) y N-4 con los dos gestos de §16.7.

Ninguna de las cuatro toca una decisión del agente humano ni el modelo. El intake está, en lo sustantivo, terminado.

---

# 17. Verificación final y promoción del intake

| Campo | Valor |
|---|---|
| Objeto verificado | `SDD/Intake/SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3632 líneas |
| Alcance | Cierre de N-1 a N-4 de la sección 16; consistencia lógica de las tres reformulaciones y de la disyunción que las sostiene; barrido de una cuarta ocurrencia del patrón absoluto; vecindario e integridad tras el movimiento de la tabla; recuentos; cumplimiento de las dos condiciones del endoso del título de E-4 |
| Fecha | 2026-07-28 |
| Veredicto | **APROBADO** |

## 17.1 Estado de los cuatro

| # | Estado | Evidencia |
|---|---|---|
| **N-1** | **CERRADO** | Las tres reformuladas, cada una con redacción propia y las tres acotando el universal a la interpolación. E-4: *"**La interpolación de Compose nunca produce una referencia** … La **única** referencia que la importación crea es la reexpresión de un `depends_on` explícito … no nace de una interpolación ni inventa un valor"*. E-14: *"**La interpolación de Compose no produce referencias** (RN-26) … no alcanza a ninguna forma de `${VAR}`"*. E-21: *"**de una interpolación nunca sale una referencia** (RN-26). La única excepción de la regla no pasa por acá, porque no nace de una interpolación sino de un `depends_on` explícito"* |
| **N-2** | **CERRADO** | El orden de §19 es ahora: tabla DI-01 a DI-14 → nota de renumeración → «Tres notas sobre esta tabla … las catorce» → tabla de observaciones no aplicadas. Ninguna tabla se interpone entre el párrafo de cierre y la tabla a la que refiere |
| **N-3** | **CERRADO** | La fila de `POST /api/v1/proyectos/importar/compose` en E-15 declara que *"devuelve el **informe de importación**, que además de lo creado declara lo que no se pudo representar: en particular los `depends_on` que quedaron sin arista"*, y §12 incorpora el término con su definición |
| **N-4** | **CERRADO** | La tabla de observaciones no aplicadas tiene cinco filas y la nueva es «Título de E-4», con el argumento del criterio de anclas |

## 17.2 Consistencia lógica de las tres reformulaciones

Es lo que sostiene todo el cierre y se verificó como proposición, no como redacción.

**Forma lógica.** Universal: *toda interpolación de Compose (`${VAR}`, `$VAR`) no produce referencia*. Particular: *existe exactamente una referencia que la importación crea, la reexpresión de un `depends_on` explícito sobre una variable cuyo valor literal ya coincide con el host y el puerto del destino*. Los dos conjuntos son disjuntos **por construcción**, porque `depends_on` es una clave de Compose y no una interpolación: no hay ningún objeto del archivo que pertenezca a los dos. La afirmación del integrador se sostiene.

**El borde que podría haberla roto, y no la rompe.** Si una variable llevara un valor interpolado y su servicio declarara además `depends_on` —por ejemplo `API_BASE_URL: http://${IA_API_HOST}:11434` con `depends_on: ia-api`—, un lector podría preguntarse cuál de las dos reglas gobierna. No hay ambigüedad: la excepción está condicionada en los cuatro textos a *"una variable cuyo **valor literal** ya coincide"*, y un valor interpolado no es un literal que coincida, de modo que ese caso cae bajo el universal y no bajo la excepción. La palabra «literal» es la que cierra la disyunción, y está presente en RN-26, en E-4, en E-14 y en la tabla de dos casos de E-21.

**Coherencia con la regla de record.** Las tres coinciden con RN-26 en el universal y en el particular, ninguna afirma más ni menos, y las tres citan la regla correcta. T-40 y T-54 siguen asertando las dos mitades. **Ningún lector puede derivar dos importadores incompatibles.**

## 17.3 Barrido de una cuarta ocurrencia

Se buscó el patrón absoluto con seis variantes —«no crea referencias», «nunca crea referencias», «no crea ninguna referencia», «no genera referencias», «sin crear referencias», «no produce referencias»— sobre el documento completo. **Cero ocurrencias en texto normativo.** La única superviviente está en una entrada de control de cambios de una ronda anterior que describe lo que esa ronda hizo en su momento, y está explícitamente superada por la entrada de corrección de esta ronda. Es historiografía correcta, no un resto.

## 17.4 Integridad tras el movimiento de la tabla

Tercera vez que este modo de falla toca el documento, de modo que se verificó el vecindario en los dos extremos y la integridad de la sección completa. §19 conserva sus seis bloques en orden —estado de la validación, lo que se cerró, lo que sigue abierto con sus siete pendientes, las catorce especificaciones de integración, la nota de renumeración y las cinco observaciones no aplicadas—, el checklist conserva sus ítems y la sección «Trazabilidad downstream» sigue inmediatamente después. **Nada se desplazó ni se perdió con el movimiento.**

## 17.5 Recuentos

| Cifra declarada | Recuento | Resultado |
|---|---|---|
| 32 reglas | 32, RN-01 a RN-32, en orden | **Correcta** |
| 55 casos | 55, T-01 a T-54 más T-17b | **Correcta** |
| 14 entradas DI | 14, DI-01 a DI-14 | **Correcta** |
| 35 términos, uno retirado | 35 filas; «Variable generada» declarada término retirado | **Correcta** |
| 5 observaciones no aplicadas | 5 filas | **Correcta** |
| 109 entradas de control de cambios | 109; siete nuevas en esta ronda, atómicas y citando cada una su hallazgo | **Correcta** |
| §13 intacto | `md5 = cfe9b4fab20dab26bd1d38142801765e`, idéntico a la 1.0 archivada | **Correcta. Quinta verificación** |

Se controlaron además, de forma cruzada contra el cuerpo, las nueve afirmaciones numéricas del checklist de §19: 35 términos, 15 casos límite, 10 historias, 10 riesgos, 7 exclusiones, 4 métricas, 4 proyectos, 22 anexos y RN-01 a RN-32. **Las nueve coinciden con el contenido real.** La última entrada de esta ronda corrige además el recuento de glosario del checklist, que había quedado en 32 desde antes de la segunda pasada: es una deriva que ninguna auditoría había señalado y que el integrador detectó por su cuenta.

## 17.6 Condiciones del endoso del título de E-4

Las dos se cumplieron como fueron planteadas. «Variable generada» está en §12 como **término retirado**, con la remisión a «Referencia de variable» y a «Variable de enlace», que es lo que necesita un lector que encuentre la expresión en el índice y no la entienda. Y la decisión está registrada como quinta fila de la tabla de observaciones no aplicadas, con el argumento del criterio de anclas, de modo que vive en el registro y no sólo en el anexo. **El endoso queda firme.**

## 17.7 Veredicto final

**APROBADO.**

No queda ningún hallazgo abierto de ninguno de los cuatro niveles. Los quince P0, los dieciséis P1 y el resto de los señalamientos levantados a lo largo de las cinco corridas de esta auditoría están cerrados o registrados con su motivo en la tabla de observaciones no aplicadas de §19, que es el mecanismo correcto para lo que se decide no corregir.

Lo que sostiene el veredicto, más allá del recuento: §13 se verificó intacto cinco veces contra la versión 1.0 archivada, de modo que el manifiesto derivado sigue siendo válido sin re-derivar; las siete decisiones del agente humano están aplicadas de forma consistente en cuerpo y anexos, con la segunda pasada sobre D-6 incluida; lo que el integrador decidió por su cuenta está separado con el marcador `[D-i]` y enumerado en catorce entradas trazables; lo que nadie decidió está en siete pendientes con su consumidor downstream identificado; y las 109 entradas de control de cambios resistieron una verificación independiente sin una sola afirmación falsa.

**Sobre la Fase B.** El intake está en condiciones de sostenerla: las doce categorías por proyecto tienen su insumo transcripto y autocontenido, las treinta y dos reglas llevan momento de validación, respuesta y al menos un caso de prueba con entrada y resultado concretos, y las siete pendientes abiertas están acotadas a `03-UX-UI-DX`, `07-Plan-Sprint` y dos puntos de `02-Especificacion-Funcional`, ninguna bloqueante para arrancar. La única precaución que corresponde trasladar a los subagentes es que las catorce especificaciones `[D-i]` se consuman declarándolas revisables y no como requisito cerrado del cliente, que es exactamente lo que §19 les indica.

---

# 18. Auditoría de la tercera pasada (D-8 a D-11)

| Campo | Valor |
|---|---|
| Objeto auditado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3752 líneas |
| Línea base del diff | `_legacy/2026-07-28/SOLUTION-INTAKE-…-v1.2-pre-D8-D11.md`, 3632 líneas. **Primera pasada con punto de partida disponible**, lo que permitió diferenciar lo tocado de lo intacto en lugar de inferirlo |
| Alcance | Coherencia de las dos formas de la expresión; reversión completa de la reserva de `shared`; las cuatro combinaciones de espera × referenciar el host; el índice único parcial; eliminación de la variable de proyecto; barrido propio de restos; integridad del mecanismo de la segunda pasada; recuentos; renumeraciones declaradas; observación sobre `SELFHOSTED_SERVICE_NAME` |
| Fecha | 2026-07-28 |
| Veredicto | **RECHAZADO** |

## 18.1 Resumen

Las cuatro decisiones están bien fundadas y bien aplicadas en el núcleo. El método —donde la fuente calla, especular sobre qué mecánica vuelve innecesaria la aclaración— produjo tres correcciones que mejoran el modelo: D-8 elimina de raíz una ambigüedad que se estaba pagando con una prohibición, D-9 quita una variable que la fuente no tiene y que el usuario ya conoce, y D-11 desacopla dos ejes que la especificación anterior había fusionado por parecido. El esquema, las reglas y los casos de prueba materializan las cuatro con precisión, y el mecanismo de la segunda pasada quedó intacto.

El problema es el mismo de siempre, y es el **cuarto episodio consecutivo**: prosa que quedó razonando con el modelo anterior. Esta vez alcanzó a la tabla de reparto de autoría y a la sección de decisiones de modelo del proyecto Domain, que son dos de los lugares normativos del documento.

**1 P0 · 2 P1 · 4 P2 · 0 P3.**

## 18.2 Verificación de las cifras

| Cifra declarada | Recuento | Resultado |
|---|---|---|
| 34 reglas | 34, RN-01 a RN-34, **en orden** | **Correcta** |
| 58 casos | 58: T-01 a T-57 más T-17b. Los nuevos son T-55, T-56 y T-57 | **Correcta** |
| 16 entradas de especificación | 16, DI-01 a DI-16 | **Correcta** |
| 35 términos | 35 filas | **Correcta** |
| 6 pendientes | 6. La del puerto múltiple se cerró con D-9, que eliminó la variable | **Correcta** |
| 127 entradas de control de cambios | 127 filas de versión 1.2 | **Correcta** |
| §13 intacto | `md5 = cfe9b4fab20dab26bd1d38142801765e`, idéntico a la 1.0 archivada. **Sexta verificación** | **Correcta** |

## 18.3 Lo que se verificó y está bien

**Las dos formas de la expresión (D-8).** El reparto por contexto es consistente en todo el documento y ningún ejemplo usa la forma equivocada: la **vinculada** aparece exactamente donde la especificación dice que se persiste —`variables.referencia` en E-2 (`Host=${{ db#103.SELFHOSTED_HOST }};…`), el ejemplo de E-4 y el comentario de E-9— y la **legible** donde corresponde: la tabla explicativa de E-2, el manifiesto propio de E-14 (que debe ser portable a otra instalación), la plantilla de catálogo de E-6, la prosa de E-21 y los casos de prueba, que describen lo que el usuario escribe. El anexo declara además el comportamiento de las cinco operaciones —escribir, renombrar, mostrar, exportar, comparar— y T-55 verifica la que sostiene todo: renombrar no rompe nada y no produce cambio pendiente porque la comparación es por forma vinculada.

**La reversión de `shared` es completa.** RN-01 volvió a su enunciado sin la prohibición; T-51 se invirtió y ahora espera **aceptación**, con la explicación de por qué ninguna expresión queda ambigua; DI-01 perdió la mitad que reservaba el nombre. No queda ningún lugar prohibiéndolo ni ningún caso esperando el rechazo.

**Las cuatro combinaciones de espera × referenciar el host están cubiertas y ninguna queda prohibida:** espera con host (T-53, T-11), host sin espera (T-44, servicio con reintentos), espera sin host (T-46), y ni una ni otra (T-45, arista 9003 de E-1). RN-04 lo declara explícitamente —*"se puede esperar sin referenciar el host y referenciar el host sin esperar"*— y las dos exigencias quedaron en reglas separadas: RN-04 el canal, RN-05 y RN-14 el orden. Es la separación que el predicado único no podía expresar, y está bien hecha.

**El índice único parcial cierra el caso y no rompe nada.** `UNIQUE (origen_servicio_id, clave_variable, destino_servicio_id, clave_destino)` efectivamente no impedía dos aristas de espera sin variable entre el mismo par, porque SQLite trata cada nulo como distinto; `CREATE UNIQUE INDEX ux_enlaces_espera_sola ON enlaces(origen_servicio_id, destino_servicio_id) WHERE clave_variable IS NULL` lo cierra, y al ser **parcial** sobre las filas sin variable no altera la unicidad de las aristas con variable, que sigue a cargo de la clave de tabla. Los dos `CHECK` nuevos son coherentes entre sí: las dos claves van juntas o no van, y una arista sin variable obliga a espera. T-56 y T-57 los prueban.

**La eliminación de `SELFHOSTED_PROJECT_NAME` es completa:** sus cuatro ocurrencias son la evaluación que la elimina, DI-05 y dos entradas de control de cambios. Ninguna en ejemplos, reglas ni casos. Lo mismo para `SELFHOSTED_PORT`.

**El mecanismo de la segunda pasada sigue intacto:** un solo tipo de vínculo, la forma legible idéntica a la fuente, la resolución en el backend antes de crear el contenedor, y la convivencia con Compose en los dos sentidos, con las tres afirmaciones acotadas a la interpolación tal como quedaron en la corrida anterior.

**Las dos renumeraciones están declaradas con su mapeo**, la de la segunda pasada y la de ésta, con las bajas identificadas una por una. Una referencia a un número viejo se puede resolver.

**El `depends_on` sin variable dejó de ser pérdida de traducción** —D-11 lo admite como arista con espera— y el cambio se propagó a E-21, T-54, RN-34, DI-14, al glosario y a la fila del endpoint de E-15, que acotó su redacción en lugar de eliminarla.

## 18.4 Hallazgos

### P0

**P0-1 · §17.4 P.11 declara que referenciar la dirección o el puerto arrastra el orden de arranque, que es exactamente el acoplamiento que D-11 rompió.**
Ubicación: §17.4 P.11, fila 2, texto de la «Ampliación **[D-i]**, D-6 segunda pasada».
Evidencia: la fila dice *"cuando el dato es la dirección o el puerto, la arista es de red y **arrastra el orden de arranque** y RN-04"*. Contra:

- RN-14: *"el orden topológico del **grafo de arranque**, que es el subgrafo de las aristas que **declaran espera** al destino"*.
- RN-04: *"**La exigencia de canal es independiente de la espera**: se puede esperar sin referenciar el host y referenciar el host sin esperar"*.
- T-44: arista que referencia el host con la espera desmarcada → *"`api` y `db` arrancan en **cualquier orden**"*.
- Y «el puerto» ya no es referenciable: D-9 eliminó `SELFHOSTED_PORT`.

Son dos errores en una oración: mantiene el acoplamiento que D-11 corrigió y menciona una variable que D-9 eliminó. §17.4 P.11 es la tabla de decisiones de modelo pre-tomadas del proyecto Domain y la trazabilidad de §19 la declara insumo de `05-Arquitectura-Tecnica` y de `02-Especificacion-Funcional`: derivar de ella reimplantaría la heurística que la tercera pasada existe para eliminar, y el modelo resultante rechazaría el caso de T-44.
Es la misma sección y el mismo tipo de defecto que la sección 15 de este informe reportó como P0, y se califica igual por consistencia.
Recomendación: reescribir el final de la ampliación como «cuando el dato es la dirección, la arista arrastra RN-04; el orden de arranque no lo decide qué se referencia sino la propiedad de espera (RN-14)».

### P1

**P1-1 · La tabla de reparto de autoría conserva dos filas que la tercera pasada dejó sin efecto.**
Ubicación: «Qué decidió el agente humano y qué derivó el integrador», filas «Sintaxis de la referencia» (primera) y «Variables provistas por el sistema».
Evidencia. El diff contra la línea base confirma que las dos son **byte a byte idénticas** a la versión previa a D-8/D-11, y que sólo se actualizó la fila «Efecto en el grafo»:

- Fila 1 sigue declarando como derivado del integrador *"la **reserva del nombre `shared`** para servicios, que es la ampliación de RN-01"*. D-8 revirtió esa reserva, RN-01 ya no la tiene y DI-01 la dio de baja: la tabla atribuye una especificación que ya no existe.
- Fila 5 sigue declarando como decidido por el agente humano que las variables provistas incluyen *"el host interno **y el puerto** entre ellas"*. D-9 eliminó la variable de puerto.

Es la tabla cuya única función es decir quién decidió qué, y en las dos filas dice algo que el documento contradice en otras cinco partes.
Recomendación: alinear las dos filas con DI-01, DI-05 y el punto 2 de E-4.

**P1-2 · E-10 deriva el orden de arranque del subgrafo de las referencias de red y cita RN-14 para eso.**
Ubicación: §20.10, párrafo «Qué hay que entender del ejemplo».
Evidencia: *"el orden de arranque no se configura a mano, **se deduce del subgrafo de las referencias de red** (RN-14)"*. RN-14 dice hoy que ese subgrafo es el de las aristas que declaran espera. E-10 es el anexo del flujo 1, el recorrido más frecuente, citado desde §6 y desde §21.
Agravante: E-10 es **uno de los anexos que el integrador declara haber barrido** en la ronda anterior por este mismo motivo, y el pasaje sobrevivió a los dos barridos.
Recomendación: reemplazar por «se deduce del subgrafo de las aristas que declaran espera (RN-14)».

### P2

| # | Ubicación | Hallazgo | Recomendación |
|---|---|---|---|
| P2-1 | §19, nota de renumeración | *"Entran cuatro: DI-06 con la forma del vínculo (D-8), y DI-15 y DI-16…"* enumera **tres**. La aritmética cierra con tres —14 entradas, menos la vieja DI-06, más tres nuevas, igual 16—, de modo que la cifra es la que está mal. Es el mapeo del que depende resolver una cita a un número viejo | Corregir a «Entran tres» |
| P2-2 | E-1, E-4 y E-9 | El campo se llama `esperaAlDestino` en el JSON y `espera_destino` en el esquema. §17.4 P.4 declara la convención `snake_case` en base y `camelCase` en la API, y **todos los demás pares del documento mapean 1:1** —`clave_variable`↔`claveVariable`, `clave_destino`↔`claveDestino`, `puerto_destino`↔`puertoDestino`, `numero_replica`↔`numeroReplica`—. Éste es el único que no, y la correspondencia la tiene que sostener a mano la configuración de EF Core (§17.4 P.12) | Unificar como `esperaDestino` o como `espera_al_destino` |
| P2-3 | §17.4 P.11, fila 5 | La acotación sigue hablando de *"aristas entrantes **de red**"* y *"arista **de dato**"* como clases del modelo. El predicado sigue siendo correcto en el fondo —lo que se marca ante un cambio de dirección es lo que referencia el host— pero el vocabulario es el que la tercera pasada reemplazó, y en la misma tabla donde está el P0-1 | Reformular sobre «las aristas que referencian el host» |
| P2-4 | §20.4, evaluación de las claves restantes | La observación sobre `SELFHOSTED_SERVICE_NAME` que el integrador dejó abierta. Ver §18.5 | Registrar como pendiente o como consecuencia asumida |

## 18.5 Sobre la observación de `SELFHOSTED_SERVICE_NAME`

**Coincido en que no es una incoherencia del documento, y disiento en el resto.** El planteo es que esa clave es la única provista cuyo valor el usuario también puede escribir a mano, de modo que dos servicios pueden tener el mismo dato por caminos distintos y sólo uno sigue al renombrado.

Tres observaciones:

1. **La premisa es inexacta.** No es la única: en modo `bridge` —el modo por defecto de un proyecto nuevo (DA-03)— `SELFHOSTED_HOST` resuelve al alias DNS del servicio, que por I8 **es** su nombre. Un usuario que escriba `db` a mano obtiene hoy el mismo valor que `${{ db.SELFHOSTED_HOST }}`, con la misma consecuencia ante un renombrado. La propiedad alcanza a las dos claves provistas, no a una.
2. **La consecuencia es real y no está declarada en ninguna parte.** Un literal que duplica un valor provisto queda obsoleto en silencio al renombrar, que es exactamente el defecto que RN-33 existe para eliminar y el dolor que §1 declara como problema de origen. El documento no tiene regla, advertencia ni caso de prueba para ese camino.
3. **Pero no es contradicción entre dos partes**, y el modelo no puede impedirlo sin prohibir literales: por eso no llega a P1.

**Mi lectura: merece hallazgo, de nivel P2, y la salida barata es declararlo.** Alcanza con una consecuencia asumida en el punto 2 de E-4 —«un literal que duplica un valor provisto no sigue al renombrado; la interfaz puede sugerir la referencia al detectar la coincidencia, y decidirlo queda pendiente»— o una fila en las pendientes de §19. Lo que no corresponde es dejarlo sólo como comentario del integrador: es una consecuencia observable de D-8 y la cadena la va a encontrar cuando especifique el renombrado.

## 18.6 Barrido propio de restos

Se barrieron los cuatro giros que el brief señala, separando el cuerpo del control de cambios:

| Patrón | Ocurrencias vivas en texto normativo | Estado |
|---|---|---|
| `SELFHOSTED_PORT` | 0 fuera de la declaración que la elimina | Limpio |
| `SELFHOSTED_PROJECT_NAME` | 0 fuera de la evaluación que la elimina | Limpio |
| Reserva de `shared` | 1: fila 1 de la tabla de reparto | **P1-1** |
| «referencia de red / de dato» como clases | 3: §17.4 P.11 filas 2 y 5, y E-10 | **P0-1, P1-2, P2-3** |
| Pérdida de traducción del `depends_on` | 0 sin acotar; las menciones vivas declaran que dejó de serlo | Limpio |

Los nueve pasajes que el integrador corrigió por su cuenta están efectivamente corregidos y ninguno fue pedido por auditoría, lo que es la práctica correcta. Pero el barrido volvió a quedar incompleto en los mismos dos lugares de siempre: **§17.4 P.11 y la prosa explicativa de un anexo de flujo**. Es el cuarto episodio. La observación que corresponde hacer, más allá de los hallazgos: el barrido por expresión de texto no alcanza para este documento, porque los restos no repiten el término eliminado sino **la relación** que el término expresaba. Un barrido que busque «referencia de red» encuentra tres de los cuatro; el que se le escapó a la ronda anterior —«arrastra el orden de arranque»— no contiene ninguno de los términos buscados. Para la próxima pasada conviene barrer por **afirmación**: listar las relaciones que la decisión cambia y buscar cada una por su predicado, no por su sustantivo.

## 18.7 Veredicto

**RECHAZADO**, por P0-1.

Como en la corrida anterior, la distancia hasta la aprobación es corta y el defecto es de propagación, no de diseño: las cuatro decisiones son correctas, están bien argumentadas contra la fuente y están bien materializadas en el esquema, en las reglas y en los casos. Lo que falta es que tres pasajes de prosa y dos filas de una tabla digan lo mismo que el resto del documento.

**Condición para promover a APROBADO CON OBSERVACIONES:** corregir P0-1, la ampliación de la fila 2 de §17.4 P.11.

**Condiciones para APROBADO:** además, alinear las dos filas de la tabla de reparto (P1-1) y el párrafo de E-10 (P1-2), y resolver los cuatro P2, de los cuales el único que exige una decisión y no una redacción es P2-4, la consecuencia del literal que duplica un valor provisto.

---

# 19. Verificación de cierre de la tercera pasada

| Campo | Valor |
|---|---|
| Objeto verificado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3768 líneas |
| Alcance | Cierre de los siete hallazgos de la sección 18; verificación independiente de las seis cifras; **barrido por afirmación propio**; defectos nuevos; declaración de la consecuencia del literal y formulación de la séptima pendiente; veredicto |
| Fecha | 2026-07-28 |
| Veredicto | **RECHAZADO** |

## 19.1 Estado de los siete

| # | Estado | Evidencia |
|---|---|---|
| **P0-1** | **CERRADO** | §17.4 P.11 fila 2 declara ahora los dos ejes por separado con negación explícita del acoplamiento: *"**referenciar el host** exige canal alcanzable (RN-04) y **declarar espera** ordena el arranque (RN-14). **Referenciar no arrastra el orden y esperar no arrastra el canal.** El puerto ya no se referencia: se escribe literal y la arista lo registra (D-9, D-10)"*. La mención del puerto quedó fuera |
| **P1-1** | **CERRADO** | Las dos filas de la tabla de reparto se actualizaron: la de sintaxis incorpora *"En la tercera, **D-8 agregó que la referencia se vincula…**"* y la de variables provistas dice ahora *"con el host interno entre ellas… En la tercera pasada, **D-9 eliminó la…**"*, sin el puerto |
| **P1-2** | **CERRADO** | E-10 dice ahora *"se deduce del subgrafo de las aristas que declaran espera"* |
| **P2-1** | **CERRADO** | La nota de renumeración dice «Entran **tres**» |
| **P2-2** | **CERRADO** | `esperaAlDestino` desapareció (0 ocurrencias) y el campo se llama `esperaDestino` (15), que mapea 1:1 con `espera_destino` (7), como todos los demás pares |
| **P2-3** | **CERRADO** | §17.4 P.11 fila 5 se reformuló sobre *"las aristas que **referencian el host** del destino, y a las que **registran su puerto** en `puerto_destino`"*, sin las clases red/dato |
| **P2-4** | **CERRADO, y bien** | La consecuencia está declarada en E-4 punto 2 como *"Consecuencia asumida: un literal que duplica un valor provisto no sigue al renombrado"*, adoptando la corrección: *"el caso no es marginal: en modo `bridge`, que es el de un proyecto nuevo por DA-03, `SELFHOSTED_HOST` resuelve al alias DNS del servicio, que…"*. Y la séptima pendiente está bien formulada: separa la parte que es decisión —si la interfaz detecta y señala la coincidencia, y con qué forma— de la consecuencia, que ya está asumida; cita E-4 punto 2 y RN-33 como origen y `03-UX-UI-DX` y `02-Especificacion-Funcional` como consumidores |

**Siete de siete cerrados.** Los dos restos que el integrador encontró por su cuenta en §17.4 P.11 y los tres que reporta haber encontrado con el barrido por afirmación están efectivamente corregidos: la cabecera de E-4 ya no afirma que todas las aristas nacen de una referencia, el acoplamiento de E-4 desapareció y la reserva de `shared` quedó distinguida.

## 19.2 Verificación independiente de las cifras

| Cifra declarada | Recuento | Resultado |
|---|---|---|
| 34 reglas | 34, RN-01 a RN-34, en orden | **Correcta** |
| 58 casos | 58, T-01 a T-57 más T-17b | **Correcta** |
| 16 entradas DI | 16, DI-01 a DI-16 | **Correcta** |
| 35 términos | 35 filas | **Correcta** |
| 7 pendientes | 7 | **Correcta** |
| 136 entradas de control de cambios | 136 filas de versión 1.2 | **Correcta** |
| §13 intacto | `md5 = cfe9b4fab20dab26bd1d38142801765e`. **Séptima verificación** | **Correcta** |

## 19.3 La distinción de `shared`, verificada con detalle

Es el resto que el brief marca como más sutil, y **quedó bien resuelto en las dos mitades**. Se revisaron las trece menciones vivas de `shared` fuera del control de cambios:

- **El espacio de nombres sigue reservado**, y lo declaran DI-01 —*"`shared.` **sin vínculo** es compartida, un segmento vinculado es un servicio"*— y la tabla de gramática de E-4, que distingue *"Dos, con `shared` primero **y sin vínculo**"* de *"Dos, con un segmento **vinculado** primero"*. La reserva del **espacio** nunca se levantó y sigue enunciada donde corresponde.
- **El nombre de servicio dejó de estar reservado**, y lo declaran RN-01 (que volvió a su enunciado sin la prohibición), RN-33 (*"Un servicio puede llamarse `shared` sin que ninguna expresión quede ambigua"*) y T-51, que se invirtió a **Aceptado** con la explicación de por qué: las referencias al servicio llevan `#id` y las del proyecto no.
- Las menciones restantes son de la tabla comparativa «Antes / Con el vínculo» de D-8 y del argumento de por qué se eligió esa vía, las dos con marco histórico explícito.

No queda ningún lugar prohibiendo el nombre ni ningún lugar que confunda las dos reservas.

## 19.4 Barrido por afirmación propio

Se corrió de forma independiente, enumerando primero las **relaciones** que las cuatro decisiones cambian y buscando cada una por su predicado sobre el cuerpo del documento, excluida la tabla de control de cambios.

| # | Relación cambiada | Afirmación prohibida buscada | Resultado |
|---|---|---|---|
| R1 | D-11: el orden de arranque lo decide la **espera declarada** | que el orden dependa de qué se referencia, o que referenciar el host ordene | **1 superviviente**, ver §19.5 · P1-1. Los demás aciertos son declaraciones de la regla nueva o marco histórico |
| R2 | D-11/RN-04: el canal lo exige **referenciar el host**, independiente de la espera | que esperar exija canal, o que referenciar implique esperar | Limpio |
| R3 | D-8: el vínculo es al servicio; el **nombre** de servicio no está reservado, el **espacio** sí | que `shared` esté prohibido como nombre de servicio, o que el espacio haya dejado de estarlo | Limpio, ver §19.3 |
| R4 | D-9/D-10: el puerto **no es variable provista**; es literal y dato de la arista | que exista una variable de puerto, o que el puerto se referencie | Limpio |
| **R5** | **D-11: una arista puede existir sin variable** | **que toda arista nazca de una referencia, o que `clave_variable` sea obligatoria** | **2 supervivientes**, ver §19.5 |

**R5 es la relación que faltaba en la enumeración del integrador.** La identificó como instancia —su resto número 1, la cabecera de E-4— pero no la incorporó a la lista de predicados a barrer: corrigió el caso con el que tropezó en lugar de barrer la afirmación. Las dos supervivientes son de esa relación.

Se corrió además el barrido inverso, buscando las afirmaciones **permitidas** para comprobar que están donde deben: RN-34 declara la arista sin variable, E-1 la materializa en la arista 9006, T-54, T-56 y T-57 la prueban, el esquema tiene las dos columnas nullable con sus dos `CHECK`, y el glosario y E-1 dicen *"casi siempre"* y *"también puede existir sin variable"*. La relación está bien instalada; lo que sobrevive son dos negaciones suyas.

## 19.5 Defectos nuevos

**P0-1 · §17.4 P.11 afirma que toda arista nace de una referencia de variable, que la arista sin variable desmiente.**
Ubicación: §17.4 P.11, fila 3 (línea 1080).
Evidencia: *"**Un único mecanismo de vínculo**: **toda arista nace de una referencia de variable**, y el enlace que el usuario traza en el lienzo es azúcar de interfaz…"*. Contra:

- RN-34: *"Toda arista debe aportar un vínculo: o **referencia** una variable del destino…, o **declara espera** al destino, o ambas cosas"*.
- E-9: `clave_variable` y `clave_destino` son **nullable**, con `CHECK (clave_variable IS NOT NULL OR espera_destino = 1)`.
- E-1: la arista 9006 tiene `"claveVariable": null, "claveDestino": null, "esperaDestino": true`.
- El glosario: *"Casi siempre nace de una referencia de variable …, y **también puede existir sin variable**"*.
- E-1 en su prosa, ya corregida: *"**Casi todas** las aristas nacen de una referencia"*.

Es **la misma afirmación que el integrador corrigió en la cabecera de E-4, en E-1 y en el glosario**, en la única de las cuatro ubicaciones que no revisó. §17.4 P.11 es la tabla de decisiones de modelo de Domain y es de donde se deriva el modelo de entidades: derivar de ella produciría columnas obligatorias y ninguna representación para el `depends_on` importado.
Es el tercer P0 consecutivo alojado en esa misma sección, lo que sugiere tratarla como zona de revisión obligatoria en cualquier pasada futura.
Recomendación: reemplazar por «casi toda arista nace de una referencia de variable, y las que no la tienen existen para declarar espera (RN-34)», conservando el resto de la fila.

**P1-1 · El preámbulo del `depends_on` en E-21 declara en presente que una arista sin variable no es persistible, y la tabla que le sigue crea una.**
Ubicación: §20.21, párrafo «Cómo se importa un `depends_on`» (línea 3332).
Evidencia: *"**Hoy** toda arista es una referencia y la tabla `enlaces` exige `clave_variable` y `clave_destino`, de modo que **una arista sin variable no es persistible**"*. Dos líneas más abajo, el segundo caso de su propia tabla importa *"sin variable si no la hay"*, T-54 lo prueba y DI-14 lo declara. El esquema tiene las dos columnas nullable desde esta pasada.
El párrafo conserva además la atribución *"[D-i], D-6 segunda pasada"* cuando el contenido lo fija D-11.
Es la segunda superviviente de R5, y la más visible: la contradicción está a dos líneas de distancia dentro del mismo bloque.
Recomendación: reescribir el preámbulo en pasado —el caso que la segunda pasada no podía representar— y reatribuirlo a D-11.

No se encontraron otros defectos. En particular se verificó que la reformulación de la fila 5 de §17.4 P.11 no introdujo error: marcar por cambio de dirección las aristas que referencian el host y por cambio de puerto las que lo registran en `puerto_destino` es coherente con D-10, que convirtió el puerto en dato de la arista precisamente para poder marcarlo con precisión.

## 19.6 Lectura sobre si la técnica agota el problema

**Movió la frontera de forma sustantiva, pero no agota el problema, y el motivo es instructivo.**

Lo que sí logró: los tres restos que el integrador encontró con ella son reales, ninguno contiene un término eliminado y **ninguna auditoría los había listado**, incluida la mía. Barrer por término no los habría encontrado nunca. La técnica funciona.

Lo que no resuelve: **el barrido por afirmación es tan completo como la enumeración de relaciones sobre la que se corre.** El integrador enumeró cuatro relaciones —orden de arranque, canal, puerto y `shared`— y las barrió bien: en esas cuatro mi barrido independiente no encontró nada que él no hubiera visto. Pero D-11 cambió una quinta que quedó fuera de la lista: **la aridad de la arista**, es decir que puede existir sin variable. La encontró como instancia suelta en E-4 y la corrigió ahí, sin promoverla a predicado y sin barrerla; por eso sobrevivieron sus dos copias, una de ellas en la sección que ya había alojado los dos P0 anteriores.

De modo que el problema se desplazó de «enumerar los términos» a «enumerar las relaciones», que es un problema más chico y mejor acotado, pero sigue siendo una enumeración a mano. La contramedida que recomiendo para la próxima pasada, si la hay: **derivar la lista de relaciones de la propia decisión antes de aplicarla** —cada decisión que elimina algo cambia al menos una relación por cada cosa eliminada— y dejar esa lista escrita en la entrada de control de cambios, de modo que el barrido sea auditable contra ella y no contra la memoria de quien lo corrió. En esta pasada la lista habría tenido cinco filas: tres por lo que D-9 y D-11 quitaron —variable de puerto, acoplamiento orden/referencia, obligatoriedad de la variable— y dos por lo que D-8 quitó y agregó.

Si esas dos correcciones se aplican y un barrido sobre R5 no devuelve nada más, sería la primera pasada en que los restos se agotan, y corresponde asentarlo entonces, no ahora.

## 19.7 Veredicto

**RECHAZADO**, por P0-1.

Es el cuarto rechazo por el mismo patrón y, como en los tres anteriores, el defecto es de propagación y no de diseño: las cuatro decisiones de la tercera pasada son correctas, están bien fundadas contra la fuente y están bien materializadas en el esquema, en las reglas y en los casos; los siete hallazgos previos están cerrados y dos de ellos —la consecuencia del literal y la séptima pendiente— quedaron mejor resueltos de lo que la observación pedía.

**Condiciones para promover a APROBADO CON OBSERVACIONES:** corregir P0-1, la fila 3 de §17.4 P.11.

**Condiciones para APROBADO:** además, corregir P1-1, el preámbulo de E-21, y correr un barrido de R5 sobre el documento completo para confirmar que no queda una tercera copia.

**Sobre la Fase B.** No corresponde emitir todavía la lectura de aptitud que se emitió al cierre de la segunda pasada: las dos afirmaciones supervivientes están exactamente en los dos insumos de los que la Fase B deriva el modelo de entidades y el contrato de importación, que son de los primeros artefactos que se generan. Con las dos correcciones aplicadas, el intake vuelve a la posición en la que estaba al cierre de la sección 17 —en condiciones de sostenerla— y el resto del juicio emitido allí sigue siendo válido: las doce categorías tienen su insumo transcripto, las treinta y cuatro reglas llevan momento de validación, respuesta y caso de prueba, y las siete pendientes están acotadas y no bloquean el arranque.

---

# 20. Cierre de la tercera pasada y veredicto final del intake

| Campo | Valor |
|---|---|
| Objeto verificado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3785 líneas |
| Alcance | Cierre de los dos hallazgos de la sección 19; barrido propio sobre la quinta relación; completitud y formulación de la tabla de relaciones; cifras; veredicto final y aptitud para la Fase B |
| Fecha | 2026-07-28 |
| Veredicto | **APROBADO** |

## 20.1 Estado de los dos

| # | Estado | Evidencia |
|---|---|---|
| **P0-1** | **CERRADO** | §17.4 P.11 fila 3 dice ahora: *"no hay dos clases de arista, hay una sola entidad. **Casi toda** arista nace de una referencia de variable …, y desde D-11 una arista también puede existir **sin variable**, cuando su única razón de ser es la espera que declara. En los dos casos es la misma entidad, sin discriminador de tipo"*. Conserva la decisión del mecanismo único y le agrega el caso que D-11 habilitó, sin reintroducir el discriminador |
| **P1-1** | **CERRADO** | El preámbulo de E-21 dice ahora: *"**D-11 se la devolvió:** desde que la espera es una propiedad declarada de la arista, `clave_variable` y `clave_destino` admiten ausencia y una arista sin variable **es persistible**, siempre que declare espera (RN-34, anexo E-9)"*, y explica por qué cambió. La atribución pasó a *"D-6 segunda pasada, **rehecho por D-11 en la tercera**"* |

## 20.2 Barrido propio sobre la quinta relación

Se corrió de forma independiente, con cinco consultas por predicado, sobre el cuerpo del documento **excluyendo** la tabla de control de cambios y el bloque de referencia de las líneas 96 a 108, cuya columna «Antes decía» cita las afirmaciones prohibidas por diseño y dispara cualquier barrido. El aviso del integrador sobre ese punto es correcto y se verificó: las cinco celdas de esa columna son la lista de referencia, no restos.

| Consulta | Hits | Resultado |
|---|---|---|
| De qué **nace** una arista | 4 | Los cuatro correctamente cuantificados: §17.4 P.11 («Casi toda»), E-1 («Casi todas»), E-4 («Casi todas nacen») y el comentario de E-9, que dice *"**Casi siempre** nace de una referencia …; desde la tercera pasada tambien puede existir SIN variable"* |
| Universales sobre aristas (**toda / todas / cada / siempre**) | 11 | Todos legítimos. Los dos universales verdaderos están bien acotados: RN-04 *"Toda arista **que referencia el host**…"* y RN-34 *"Toda arista debe aportar un vínculo: o referencia…, o declara espera"*. El resto son el subgrafo de espera, el marcado por cambio de dirección, DI-15, T-57 y la definición del lienzo |
| Qué **exige** una arista para existir, o si es persistible | 5 | Ninguno afirma obligatoriedad de la variable. El único que habla de persistibilidad es el preámbulo corregido de E-21, que ahora afirma lo contrario |
| Arista y referencia como **sinónimos** | **0** | Limpio |
| Columnas **obligatorias** del enlace | 2 | El `CHECK (clave_variable IS NOT NULL OR espera_destino = 1)` y el preámbulo corregido. Ninguna declaración de `NOT NULL` sobre las dos claves |

Se re-corrieron además las otras cuatro relaciones con sus predicados: **R1** —que referenciar determine o arrastre el orden— cero supervivientes; **R2** —variable de puerto— sólo las declaraciones que la eliminan y el glosario, que dice *"Son dos: su host interno y su nombre"*; **R3** —que el nombre identifique la referencia— cero; **R4** —`shared` prohibido como nombre de servicio— sólo la explicación histórica de por qué el argumento anterior era falso.

**Mi barrido no encontró nada que el integrador no hubiera visto.**

## 20.3 La tabla de relaciones

Está completa y bien formulada. Las cinco filas cubren exactamente las relaciones que las cuatro decisiones cambiaron, y se verificó que cada «Ahora dice» es lo que el documento efectivamente sostiene:

| # | «Ahora dice» | Dónde lo sostiene el documento |
|---|---|---|
| R1 | Declarar espera determina el orden de arranque | RN-05, RN-14, §17.4 P.11 fila 4, E-4 punto de la espera, T-44 |
| R2 | El puerto se escribe literal y la arista lo registra | E-4 punto 2 (D-9), `puerto_destino` en E-9, E-2 con `:5432` y `:6379` literales, E-1 |
| R3 | El vínculo identifica la referencia; el nombre se muestra | E-4 punto 1 (las dos formas), RN-33, T-55, `db#103` en E-2 y E-9 |
| R4 | Un servicio puede llamarse `shared` | RN-01 sin la prohibición, RN-33, T-51 invertido a Aceptado |
| R5 | Casi toda arista nace de una referencia, y una puede existir sin variable si declara espera | RN-34, columnas nullable y los dos `CHECK` de E-9, arista 9006 de E-1, glosario, T-54, T-56, T-57 |

El enunciado del método es correcto y la regla operativa —*"La primera parada de cualquier barrido es §17.4 P.11"*, con el fundamento de que alojó el defecto principal de las tres últimas correcciones— es la lección exacta que esta cadena de auditorías produjo. Que quede escrita en el documento y no en el informe de auditoría es lo que la hace utilizable por quien venga después.

## 20.4 Cifras

| Cifra | Recuento | Resultado |
|---|---|---|
| 34 reglas | 34, RN-01 a RN-34, en orden | **Correcta** |
| 58 casos | 58, T-01 a T-57 más T-17b | **Correcta** |
| 16 entradas DI | 16 | **Correcta** |
| 35 términos | 35 | **Correcta** |
| 7 pendientes | 7 | **Correcta** |
| Control de cambios | 139 entradas de versión 1.2; las tres nuevas corresponden a P0-1, a P1-1 y a la incorporación del bloque de método, cada una citando su origen | **Correcta** |
| §13 intacto | `md5 = cfe9b4fab20dab26bd1d38142801765e`. **Octava verificación** | **Correcta** |

## 20.5 Defectos nuevos

**Ninguno.**

## 20.6 ¿Se agotaron los restos?

**Sí. Los restos se agotaron esta vez.** Es la primera pasada de las tres en que eso ocurre, y corresponde asentarlo con las palabras que quedaron comprometidas en la sección 19: se promovió la quinta relación a predicado, se barrió, y un barrido independiente sobre esa relación no devolvió nada más.

Vale precisar qué se agotó y qué no, porque la afirmación tiene alcance. Se agotó **la propagación de las cuatro decisiones de la tercera pasada**: las cinco relaciones que cambiaron están enunciadas de una sola manera en todo el documento, y ninguna afirmación viva las contradice. Lo que no se puede afirmar —y ninguna técnica lo permitiría— es que el documento esté libre de restos de decisiones futuras que todavía no se tomaron. La garantía es sobre lo aplicado, no sobre lo que venga.

El diagnóstico del integrador sobre por qué falló la ronda anterior coincide con el mío y es correcto: el problema no fue el barrido sino la enumeración. Encontró las tres instancias sueltas, pero al no promover la relación, el único lugar que no revisó quedó sin cubrir, y era justamente §17.4 P.11. Eso es lo que la regla de la primera parada obligatoria previene de ahora en más.

## 20.7 Veredicto final del intake

**APROBADO.**

No queda ningún hallazgo abierto de ningún nivel. A lo largo de las siete corridas de esta auditoría se levantaron veintitrés hallazgos de nivel P0 y P1 y una cantidad mayor de P2 y P3; todos están cerrados o registrados con su motivo en la tabla de observaciones no aplicadas de §19, que es el mecanismo correcto para lo que se decide no corregir.

Lo que sostiene el veredicto: §13 se verificó intacto **ocho veces** contra la versión 1.0 archivada, de modo que el manifiesto derivado sigue siendo válido sin re-derivar; las once decisiones del agente humano —las siete originales más las cuatro de la tercera pasada— están aplicadas de forma consistente en cuerpo y anexos; lo que el integrador decidió por su cuenta está separado con el marcador `[D-i]` en dieciséis entradas trazables, con las dos renumeraciones del día mapeadas; lo que nadie decidió está en siete pendientes con su consumidor identificado; y el documento incorporó el método de propagación que estas auditorías produjeron, con su tabla de relaciones y su regla de primera parada, de modo que la próxima pasada no arranca de cero.

## 20.8 Aptitud para la Fase B

**El intake está en condiciones de sostener la Fase B.** Es la lectura que quedó reservada en la sección 19 y ahora corresponde emitirla, porque las dos afirmaciones que la bloqueaban estaban exactamente en los dos insumos de los que la Fase B deriva primero —el modelo de entidades y el contrato de importación— y las dos están cerradas.

Concretamente: las doce categorías por proyecto tienen su insumo transcripto y autocontenido; las treinta y cuatro reglas llevan momento de validación, respuesta y al menos un caso de prueba con entrada y resultado concretos, y los cincuenta y ocho casos cubren las once decisiones; el esquema de E-9 es coherente consigo mismo y con los ejemplos que lo usan, con sus restricciones e índices verificados uno por uno; y §17.4 P.11, que es de donde el proyecto de dominio deriva su modelo, quedó revisada fila por fila contra la lista de relaciones.

Dos precauciones para trasladar a los subagentes, ninguna bloqueante:

1. Las dieciséis especificaciones `[D-i]` se consumen **declarándolas revisables**, no como requisito cerrado del cliente, que es lo que §19 les indica.
2. Las siete pendientes acotan a `03-UX-UI-DX`, `07-Plan-Sprint` y tres puntos de `02-Especificacion-Funcional`: conviene que el subagente que llegue a cada una la declare como brecha en lugar de resolverla por su cuenta, que es el error que esta cadena corrigió tres veces.

---

# 21. Auditoría de la cuarta pasada (terminología)

| Campo | Valor |
|---|---|
| Objeto auditado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3822 líneas |
| Línea base | `_legacy/2026-07-28/…-v1.2-pre-terminologia.md`, 3785 líneas |
| Alcance | Falsos positivos de la desambiguación; menciones al agente humano; formas cortas en §13 a §17; exhaustividad del sentido de código; identificadores técnicos; anclas; que el modelo no se haya movido; mitigación tipográfica |
| Fecha | 2026-07-28 |
| Veredicto | **APROBADO CON OBSERVACIONES** |

**0 P0 · 1 P1 · 3 P2.**

## 21.1 El hallazgo de las seis clases, verificado

El reencuadre del problema es correcto y es lo que salvó la pasada. Se verificó que las tres clases que un reemplazo mecánico habría arruinado existen y quedaron intactas:

- **Identificadores técnicos:** se contrastaron trece formas contra la línea base —`proyecto_id`, `proyectoId`, `/api/v1/proyectos`, `Nombre-Proyecto`, `nombre-proyecto-codigo`, `proyectos(`, `Proyectos/`, `CREATE TABLE proyectos`, `project_type` y los cuatro nombres de proyecto de código—. **Ninguna cambió de forma**; las once que suben en uno lo hacen por una ocurrencia nueva en el bloque de la cuarta pasada o en el control de cambios, como se declara.
- **«Agente humano del proyecto»:** el conteo por forma exacta es idéntico entre la línea base y el actual, con +1 en cada una de las dos variantes, ambas en los bloques nuevos. **Ninguna de las 36 originales fue calificada.**
- **«Proyecto Compose»:** la única mención de E-19 sigue en pie y el documento la declara explícitamente como tercer sentido que no se toca.

## 21.2 Verificación de falsos positivos

Es el riesgo dominante de la pasada y se verificó **exhaustivamente, no por muestra**. Se reconstruyó el diff línea a línea contra la línea base: 85 líneas sustituidas, 3 bloques insertados —el bloque de decisión, una línea en §21 y las entradas de control de cambios— y **cero bloques borrados**. De las 85 líneas se extrajeron los 102 cambios de palabra y se inspeccionó cada uno contra su sección y su contexto.

| Sentido aplicado | Cambios | Resultado |
|---|---|---|
| A «proyecto SelfHosted» | 31 | **Los 31 correctos.** Todos en contextos de producto inequívocos: adopción de contenedores (§1, §3, §12), alta y listado (F-02), historias de usuario, flujo 1, CL-01, la métrica de adopción de §8, el modo de red por defecto de DA-03, las invariantes I1 e I7 de §17.4 P.2, el conflicto de IP de E-8, RN-01, la pantalla del lienzo de E-18 y la fila de §21 |
| A «proyecto de código» | 65 | **Los 65 correctos.** Todos designan unidades de compilación: los títulos de la Parte C, de §17 y de los cuatro P.2, las cabeceras de tabla de §14 y §16.1, «este proyecto de código debe respetar/sostener/pasar» en los cuatro bloques, «los cuatro proyectos de código» de P.7, «un proyecto de código por adaptador» de §17.3 P.2 y las cinco filas de trazabilidad |
| Otros | 6 | Reescritura de las dos entradas de glosario, la declaración de exclusividad de §13 y de §14, y un «Ningún proyecto» → «Ninguno» para evitar repetición. Ninguno altera significado |

**No se encontró una sola inversión de sentido.** Se prestó atención particular a los dos casos que más se prestaban: §17.1 P.10 «Nodos por proyecto SelfHosted» —correcto, es la escala de datos del producto— y §17.2 P.10 «arrancar un proyecto SelfHosted de hasta 30 servicios» —correcto, es la validación de conflicto de IP—, los dos dentro de bloques titulados con un nombre de proyecto de código.

## 21.3 Formas cortas, exhaustividad y modelo

**Formas cortas en §13 a §17.** Se enumeraron las 45 que caen en ese rango y se revisó cada una. Todas quedan fijadas por su contexto: las de §13, §14 y §16 caen bajo la declaración de exclusividad que esas secciones ahora llevan —§14 dice *"Como §13, esta sección habla de **proyectos de código**"*—; las de §17.3 y §17.4 son del producto y el sentido lo fija la frase misma (I1, I7, I8, I10, «la red es por proyecto», «variable compartida del proyecto»); y las de §15 y §15.1 están dentro de transcripciones **[E]** que no corresponde editar, por el mismo criterio con el que se conservaron los emojis de E-18. **Ninguna quedó en contexto mixto.**

**Exhaustividad del sentido de código.** El barrido de menciones a las cuatro unidades sin calificar devuelve **una sola**, la de la línea 17, que es el hallazgo P2-1.

**El modelo no se movió.** Se normalizó toda variante de «proyecto» a un token único y se comparó el conjunto de filas de reglas, casos de prueba, especificaciones de integración, capacidades, casos límite, riesgos y decisiones entre la línea base y el actual: **los siete conjuntos dan hash idéntico**. Ninguna regla, ningún caso y ninguna decisión cambió de contenido. La tabla de §13 —las cuatro filas con `Nombre-Proyecto`, `project_type`, rol, dependencias y `redistribuible`— es byte a byte idéntica.

## 21.4 Hallazgos

### P1

**P1-1 · El manifiesto derivado afirma que §13 nunca fue tocada, y esta pasada la tocó.**
Ubicación: `SDD/Intake/SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.2.md`, nota de encabezado, contra §13 del intake.
Evidencia: el manifiesto declara *"**Ninguna de las dos tocó §13**, verificado por comparación directa contra la versión 1.0 archivada"*. La cuarta pasada modificó §13 en cinco lugares: el **título** de la sección (`## §13 Proyectos de la solución` → `## §13 Proyectos de código de la solución`), la frase del proyecto principal, la nota de los proyectos de prueba, la fila del prefijo de redistribuibles, y agregó el párrafo de exclusividad. El hash de §13 contra la 1.0 archivada, que ocho corridas de esta auditoría verificaron idéntico, **ya no coincide**.
Alcance real del defecto: la segunda mitad de la afirmación del manifiesto sigue siendo cierta y es la que gobierna —ninguna fila de la tabla, ningún `project_type`, ninguna dependencia y ningún nombre de código cambió—, de modo que **no corresponde re-derivar** el manifiesto según `Master-Prompt.md` §13.7 y la derivación sigue siendo válida. Lo que falla es la afirmación verificable: el manifiesto sostiene un hecho que dejó de serlo, y ni el control de cambios del intake ni el del manifiesto lo reconcilian.
Recomendación: actualizar la nota del manifiesto para declarar que la cuarta pasada modificó la prosa y el título de §13 sin tocar los campos de los que deriva, con su entrada de control de cambios. Es el mismo cierre que tuvo P2-15 en su momento.

### P2

| # | Ubicación | Hallazgo | Recomendación |
|---|---|---|---|
| P2-1 | Línea 17, cita de encabezado del documento | *"Este documento captura qué quiere el cliente, cómo se compone la solución y cómo se construye **cada proyecto**"*. Es el sentido de código —«cómo se construye» remite a §17— y quedó sin calificar, contra la afirmación de que no queda ninguna mención a las cuatro unidades sin calificar. Está en la segunda línea visible del documento y fuera de todas las secciones que el control de cambios enumera como revisadas | Calificar a «cada proyecto de código» |
| P2-2 | La mitigación tipográfica | **Está reportada pero no declarada ni aplicada.** No hay en el documento ninguna regla sobre monoespaciado ni sobre el guion; y los cuatro títulos de bloque de §17 —`### §17.1 SelfHosted-Web` y sus tres hermanos, que son el caso que el propio integrador señala como el más expuesto— **no llevan monoespaciado**, ni lo llevan las menciones de §13, §14 y §16. Lo que distingue de hecho los dos términos es el **guion y el sufijo** (`SelfHosted-Web` frente a «proyecto SelfHosted»), no la tipografía | Declarar la regla que efectivamente opera, o aplicar el monoespaciado en los cuatro títulos |
| P2-3 | Títulos de §13, de la Parte C, de §17 y de los cuatro §17.x.P.2 | Siete títulos cambiaron, y con ellos su ancla. Se verificó que **nada se rompe**: ningún enlace interno del intake apunta a esas anclas —sólo los anexos se citan así— y ningún artefacto de `SDD/Docs/` enlaza al intake por fragmento. Pero el criterio de no romper anclas, que la cadena aplicó a E-4, a §19 y ahora a los títulos de los veintidós anexos, no se aplicó acá y la asimetría no está declarada, aunque su premisa efectivamente no se cumple para las secciones | Agregar la asimetría a la fila de observaciones no aplicadas: los títulos de sección se calificaron porque no se citan por ancla, los de anexo no porque sí |

## 21.5 Verificación de las cifras

Las cifras declaradas se verificaron por estructura y resultan **consistentes**, con una advertencia de método: dependen de dónde se corte el universo. Sobre el cuerpo del documento excluyendo el bloque de decisión nuevo y el control de cambios, el censo propio da 490 ocurrencias de «proyecto», de las cuales 96 calificadas —31 de producto y 65 de código—, 84 identificadores técnicos, 30 menciones al agente humano y 280 en forma corta. Incluyendo el bloque nuevo, que concentra menciones calificadas de las dos clases, los valores convergen a los declarados: 500 totales, 101 calificadas —33 y 68—, 94 identificadores, 36 al agente humano y 290 cortas. **La proporción y la estructura coinciden; la diferencia es de encuadre y no de contenido.** El glosario pasó de 35 a 36 términos, como se declara, y la tabla de observaciones no aplicadas pasó a seis filas con la de los títulos de los anexos.

## 21.6 Lectura sobre la mitigación tipográfica

**La distinción alcanza, pero no por el mecanismo que se le atribuye, y por eso conviene reescribir la mitigación en lugar de darla por buena.**

Lo que efectivamente separa los dos términos es **el guion y el sufijo**: `SelfHosted-Web`, `SelfHosted-Application`, `SelfHosted-Infrastructure` y `SelfHosted-Domain` son cuatro nombres propios cerrados, y «proyecto SelfHosted» nunca lleva guion ni sufijo. Esa diferencia es léxica, no tipográfica, y está presente en las quinientas ocurrencias sin excepción. Es una separación sólida.

El monoespaciado, en cambio, **no hace el trabajo que se le asigna**: no está aplicado en los cuatro títulos de §17, que son el caso más expuesto, ni en §13, ni en §14, ni en §16, y la regla no está escrita en ninguna parte del documento. Una mitigación que no está declarada no es una mitigación: es una costumbre.

**Dónde puede fallar.** No encontré ningún lugar donde la lectura se invierta. El riesgo residual no está en el texto actual sino en el **texto futuro**: nada impide que un subagente que derive de §17 escriba «el proyecto SelfHosted-Web» o «SelfHosted project», y ahí los dos términos sí colapsan. La contramedida es una línea de regla, no una convención tácita.

**Cómo registrarla: consecuencia asumida, no pendiente.** Una pendiente implica que alguien tiene que decidir algo, y acá no queda nada por decidir —la elección del término se tomó, se discutió y se reafirmó—. Lo que falta es escribir la regla que ya opera. Corresponde una consecuencia asumida en §12, junto a la entrada «Proyecto SelfHosted», con la forma: los cuatro nombres de proyecto de código se escriben siempre con guion y sufijo y en monoespaciado; el término del producto se escribe siempre en prosa, sin guion; y ninguna prosa combina los dos.

## 21.7 Veredicto

**APROBADO CON OBSERVACIONES.**

La pasada está bien ejecutada en lo que más podía romperse: no hay una sola inversión de sentido en 101 calificaciones, las tres clases que un reemplazo mecánico habría arruinado quedaron intactas, el modelo no se movió —siete conjuntos de filas normativas con hash idéntico— y las formas cortas que quedaron están fijadas por su contexto o protegidas por ser transcripción. El reencuadre de dos sentidos a seis clases es lo que hizo posible ese resultado y merece registrarse como el acierto de la pasada.

Ninguno de los cuatro hallazgos bloquea. El único que toca la cadena es **P1-1**, y su corrección vive fuera del intake: el manifiesto tiene que dejar de afirmar que §13 nunca fue tocada, sin que eso implique re-derivarlo, porque los campos de los que deriva no cambiaron. Los tres P2 son de declaración, no de contenido.

**La lectura de aptitud para la Fase B de la sección 20 se mantiene**: nada de lo que esta pasada tocó afecta las reglas, los casos de prueba, el esquema ni las decisiones, y la desambiguación mejora la derivación en lugar de comprometerla — un subagente que lea §17 ya no tiene que inferir de qué proyecto se le habla. Con P1-1 cerrado, el intake vuelve a estar íntegramente aprobado.

---

# 22. Cierre de la cuarta pasada y veredicto final

| Campo | Valor |
|---|---|
| Objeto verificado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3849 líneas, y `SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.3.md` |
| Alcance | Cierre de los tres P2; completitud y decidibilidad de la regla léxica; barrido de fusiones y de títulos; decisión sobre las cuatro filas de identidad; cifras; veredicto |
| Fecha | 2026-07-28 |
| Veredicto | **APROBADO** |

**0 P0 · 0 P1 · 0 P2 · 1 P3.**

## 22.1 Estado de los tres

| # | Estado | Evidencia |
|---|---|---|
| **P2-1** | **CERRADO** | La cita de encabezado dice *"cómo se construye cada proyecto de código"*. La explicación de por qué se había escapado es correcta y vale registrarla: el bloque de cita anterior a §1 no pertenece a ninguna sección numerada, de modo que una clasificación por secciones no lo alcanza |
| **P2-2** | **CERRADO, y bien** | La regla está en §12 con sus cuatro partes: la tabla de formas, la degradación del monoespaciado a ayuda de lectura, la prohibición explícita y la consecuencia asumida. Además **se aplicó** lo que faltaba: los cuatro títulos de bloque son ahora `### §17.1 \`SelfHosted-Web\`` y sus hermanos, en monoespaciado |
| **P2-3** | **CERRADO** | La asimetría está declarada con su criterio operativo —*"no se rompe un ancla en uso por una mejora de redacción"*—, con la distinción entre los siete títulos calificados y los veintitrés que no, y con su coherencia frente a las dos decisiones previas sobre E-4 y §19. La tabla de observaciones no aplicadas conserva sus seis filas |

## 22.2 La regla léxica

Se la probó como regla, no como redacción, porque es lo que van a leer once categorías de subagentes.

**Es decidible por la forma, como afirma.** El discriminador real es la presencia de sufijo de rol: el término del producto es `SelfHosted` desnudo precedido de «proyecto»; un nombre de unidad de compilación siempre lleva separador y sufijo. Ninguna cadena del documento satisface las dos formas a la vez, de modo que un parser —o un subagente— decide sin contexto. La verificación sobre las quinientas ocurrencias no encontró ningún caso ambiguo.

**La prohibición cubre el riesgo que se había identificado.** El riesgo residual que señalé en la sección 21 no estaba en el texto actual sino en el futuro: que un artefacto downstream escribiera «el proyecto SelfHosted-Web». La prohibición lo nombra literalmente, prohíbe también la construcción simétrica «el proyecto de código SelfHosted» y da la forma correcta de reemplazo. Está dirigida explícitamente al artefacto downstream, que es donde el riesgo vive. Es el cierre correcto.

**Barrido verificado.** La única coincidencia de una construcción fusionada en todo el cuerpo es **la prohibición misma**, que cita los dos ejemplos prohibidos por diseño —el mismo patrón que la columna «Antes decía» de la tabla de relaciones—. Cero fusiones reales. Y los únicos títulos que contienen un nombre de código son los cuatro bloques de §17, ahora monoespaciados, más el título del documento, que es el nombre del archivo. Las dos afirmaciones del integrador se confirman.

## 22.3 Hallazgo

**P3-1 · La regla enuncia el separador como «guion» y el documento usa dos.**
Ubicación: §12, tabla de formas y el párrafo que le sigue.
Evidencia: la regla dice que un nombre de proyecto de código lleva *"`SelfHosted` **con guion y con sufijo** de rol"* y que *"el guion y el sufijo están presentes en las cuatro formas del nombre de código **sin excepción**"*. Pero el documento usa dos formas de nombre para las mismas cuatro unidades: el `Nombre-Proyecto` con guion —`SelfHosted-Web`— y el `nombre-proyecto-codigo` con punto —`SelfHosted.Web`—, que §13 declara en su perfil de convención y que aparece en §16, en los cuatro bloques de §17 y en los espacios de nombres. La afirmación de que el guion está sin excepción es inexacta.
Alcance: **no compromete la decidibilidad ni la separación**, porque lo que distingue del término del producto es el sufijo y no el separador, y `SelfHosted.Web` tampoco puede confundirse con «proyecto SelfHosted». Es una imprecisión en la única frase de la regla que se presenta como exhaustiva, en un texto escrito para ser aplicado literalmente por otro.
Recomendación: decir «con separador —guion en el `Nombre-Proyecto`, punto en el `nombre-proyecto-codigo`— y sufijo de rol».

## 22.4 Sobre las cuatro filas de identidad

**Comparto el argumento, y agregaría que la línea que trazó es exactamente la correcta.**

El razonamiento es sólido: la fila de identidad de cada bloque de §17 declara el mismo campo y el mismo valor que la tabla de §13, y esa tabla es la fuente literal de la que se deriva el manifiesto —se verificó que sus cuatro filas siguen siendo **byte a byte idénticas** a las de la versión 1.0—. Poner monoespaciado sólo en §17 haría que dos declaraciones del mismo dato difirieran en su forma, y el riesgo concreto no es cosmético: un subagente podría propagar las comillas invertidas a un campo cuyo valor es `SelfHosted-Web` y no `` `SelfHosted-Web` ``. Cambiar una inconsistencia visible e inocua por una divergencia invisible entre dos declaraciones del mismo dato es un mal negocio, y descartarlo es correcto.

Lo que quiero destacar es **dónde trazó la línea**, porque es lo que hace que la decisión no sea una excusa: formateó los cuatro **títulos** de bloque, que son texto de encabezado y no declaran ningún campo, y dejó sin formatear las cuatro **celdas de valor**, que son el dato espejado de §13. Es la separación exacta entre lo que es presentación y lo que es declaración. Si hubiera dejado también los títulos sin formatear, la decisión sería indistinguible de no haber hecho nada.

No prefiero la alternativa. La única mejora posible es la que ya aplicó: declararlo en §12 junto a la regla, que es donde un lector se pregunta por qué el mismo nombre aparece de dos maneras.

## 22.5 Cifras y estabilidad

34 reglas, 58 casos, 16 entradas DI, **36 términos** de glosario, 7 pendientes, 6 observaciones no aplicadas y 150 entradas de control de cambios. El modelo sigue inmóvil: normalizando la terminología, los conjuntos de filas de reglas, casos, especificaciones, capacidades y casos límite dan **hash idéntico** contra la línea base previa a la cuarta pasada. La tabla de proyectos de §13 y el perfil de convención conservan sus valores, con el único cambio ya reportado en la nota explicativa de una fila.

**Sobre el manifiesto v1.3**, que revisé aunque no era obligatorio: la redacción no tiene hueco. Separa correctamente *"qué cambió en §13 —cómo nombra— y qué no —qué declara—"*, sostiene la afirmación fuerte donde corresponde —*"las tres primeras actualizaciones no tocaron §13 en absoluto, verificado ocho veces"*— y acota la cuarta a la terminología; y justifica la no re-derivación por el criterio de `Master-Prompt.md` §13.7 con el hecho verificable de que los campos derivados son idénticos byte a byte a los de la versión 1.0. Lo confirmé de forma independiente. **P1-1 queda cerrado.**

## 22.6 Veredicto final

**APROBADO.**

No queda ningún hallazgo abierto de nivel P0, P1 ni P2. El único P3 es una imprecisión de una frase, no bloquea y se corrige con seis palabras.

La cuarta pasada cierra bien: resolvió una ambigüedad que el glosario venía advirtiendo sin resolver desde la versión 1.0, no movió el modelo —verificado por hash sobre cinco conjuntos de filas normativas—, no invirtió un solo sentido en 101 calificaciones, y produjo además una regla léxica con prohibición explícita dirigida a los artefactos downstream, que es más de lo que la desambiguación requería.

## 22.7 Aptitud para la Fase B

**El intake sigue en condiciones de sostener la Fase B, y esta pasada mejora su posición.**

La lectura emitida en la sección 20 se mantiene íntegra: las doce categorías tienen su insumo transcripto y autocontenido, las treinta y cuatro reglas llevan momento de validación, respuesta y caso de prueba concreto, el esquema es coherente consigo mismo y con los ejemplos, y §13 conserva intactos los campos de los que deriva el manifiesto.

Lo que agrega esta pasada es que un subagente que lea §17 ya no tiene que inferir de qué proyecto se le habla, y que la regla léxica de §12 le dice cómo escribir los dos términos en lo que produzca. Las tres precauciones a trasladar son las dos de la sección 20 —consumir las dieciséis especificaciones `[D-i]` declarándolas revisables, y declarar como brecha cada una de las siete pendientes en lugar de resolverla— más una tercera que esta pasada habilita: **respetar la prohibición de §12**, no fusionar los dos términos en los artefactos generados.

---

# 23. Auditoría de la quinta pasada (D-12 identidad de objeto, D-13 higiene)

| Campo | Valor |
|---|---|
| Objeto auditado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 3986 líneas |
| Línea base | `_legacy/2026-07-28/…-v1.2-pre-identidad-objeto.md`, 3865 líneas |
| Alcance | Límite de alcance frente a la Fase C; consecuencia 3 contra el esquema; aplicabilidad de la prueba objeto/atributo; prioridad de F-25; cierre de los dos conflictos; barrido propio de restos; inmovilidad del modelo anterior; cifras |
| Fecha | 2026-07-28 |
| Veredicto | **APROBADO CON OBSERVACIONES** |

**0 P0 · 1 P1 · 3 P2.**

## 23.1 El límite de alcance — verificación principal

**El límite se respetó.** Es lo que más importaba y conviene ser explícito sobre qué se verificó.

El diff de E-9 contiene exactamente dos cosas. La primera es la **eliminación** del `UNIQUE (proyecto_id, clave)` de `variables_proyecto`, que es la consecuencia 3 hecha visible: quitar una restricción es declarar una consecuencia observable, no diseñar un esquema. La segunda es un bloque de comentario que abre literalmente con `-- PRINCIPIO DE IDENTIDAD DE OBJETO (D-12) -- LIMITE DE ALCANCE` y declara *"Este esquema refleja **QUE** los siguientes elementos son objetos con identidad; **CÓMO** se persiste cada uno es materia de la Fase C… **Acá no se diseñan sus columnas, sus claves ni su migración**"*.

Verificado contra el DDL: **no hay ninguna tabla nueva, ninguna columna nueva, ninguna clave foránea nueva y ningún índice nuevo** para el secreto ni para la red del proyecto. `referencia_secreto` sigue siendo `TEXT`, `proyectos.red_json` sigue siendo `TEXT`, y ninguno de los dos recibió estructura. Los índices declarados son los mismos diez de la pasada anterior. **No hubo exceso.**

**Sobre `referencia_secreto`: comparto que dejarlo es respetar el límite, y con énfasis.** Convertirlo en una clave foránea es precisamente la decisión de mapeo relacional que se excluyó: exige resolver si el secreto es una tabla propia, si lleva versión para la rotación que el propio principio invoca, cómo migra el valor `"sec-011"` existente y qué pasa con las exportaciones que hoy lo emiten como texto. Ninguna de esas cuatro se decide bien mirando ejemplos de instancia; las cuatro se deciden con el modelo de dominio delante. Cerrarlo acá habría sido el exceso, no la prolijidad. Y quedó **declarado**, que es lo que distingue una deuda registrada de un descuido.

## 23.2 La consecuencia 3 contra el esquema

La contradicción que el integrador reporta haber encontrado y corregido —el comentario anunciando la baja de la clave única con el `UNIQUE` todavía en el DDL dos bloques más abajo— **está efectivamente corregida**: `variables_proyecto` termina en `modificado_en TEXT NOT NULL` sin restricción de unicidad, con un comentario que explica por qué y remite a RN-28 y RN-37.

Barrido de afirmaciones de unicidad que contradijeran el principio: **cero**. RN-28 fue reformulada al enunciado inverso, T-42 pasó de *"Rechazado `422`, clave duplicada"* a *"**Aceptado**… se crea un objeto nuevo, distinguible por identidad"*, y RN-01 conserva la unicidad del nombre de servicio pero ahora con su fundamento —es el alias DNS que el motor resuelve— en lugar de por identificación. Las dos únicas unicidades que el modelo exige son las dos que la consecuencia 2 declara.

## 23.3 La prueba objeto/atributo

**Es aplicable y sus tres condiciones son verificables:** que algo se referencie, que sobreviva a su contenedor y que tenga ciclo de vida propio son las tres comprobables contra el propio documento, sin juicio. La clasificación de los once elementos que ya son objeto es correcta, y la de secreto y red del proyecto está bien argumentada contra las tres condiciones.

Hay **un elemento mal clasificado según la propia prueba**, que es el P2-2 de abajo.

## 23.4 Los dos conflictos y la prioridad de F-25

**Los dos conflictos están cerrados por modelo, no sólo declarados.** El de la clave compartida desaparece —la tabla de §19 lo declara *"**Desaparece.** Con la consecuencia 3 de D-12, la clave de una compartida no exige unicidad"*— y el del nombre de servicio se resuelve con sufijo automático más aviso en RN-36, con T-60 verificándolo. El barrido de las tres salidas anteriores —rechazar, sufijar, reusar como alternativas a elegir— **no devuelve ninguna regla, caso ni pendiente que siga ofreciendo la elección**: la única mención de «reusar» viva es la de RN-37, donde es un aviso posterior y no una pregunta previa. Las pendientes bajaron de siete a cinco, que es exactamente lo declarado.

**Comparto el argumento de la prioridad de F-25.** El criterio MoSCoW de este intake es la pertenencia a un alcance, y F-25 no figura entre los diez cortes verticales del Alcance 1, igual que F-23 y F-24; el escalón adicional hacia Could está bien fundado en que ningún flujo de usuario depende de ella —las cinco detecciones informan, ninguna condiciona una operación— mientras F-23 y F-24 sí resuelven el dolor que §1 declara como problema de origen. La ubicación es coherente con F-16 y F-17, las otras dos Could. Lo único que falta es el registro de su asignación, que es el P2-3.

## 23.5 Hallazgos

### P1

**P1-1 · La consecuencia 1 está declarada y no está aplicada en ningún ejemplo.**
Ubicación: §20.2 (E-2, cuatro referencias persistidas), §20.4 (E-4, tabla de gramática y ejemplo de enlace) y §20.9 (comentario de `variables`), contra la subsección de la quinta pasada, la fila «Forma vinculada» de E-4 y RN-33.
Evidencia. La decisión declara que la referencia pasa a vincular también la variable, y la fila «Forma vinculada» de E-4 lo muestra: `${{ db#103.POSTGRES_USER#77 }}`, con los dos identificadores. Pero **todos los ejemplos que persisten una referencia siguen llevando sólo el del servicio**:

- E-2: `"referencia": "Host=${{ db#103.SELFHOSTED_HOST }};Port=5432;Database=portal"`, `"${{ cache#102.SELFHOSTED_HOST }}:6379"` y `"${{ db#103.POSTGRES_USER }}"`, más el párrafo explicativo que repite la primera.
- E-4: la fila de gramática *"Dos, con un segmento vinculado primero → `${{ db#103.SELFHOSTED_HOST }}`"* y el ejemplo de enlace de la línea 1574.
- E-9: el comentario de `variables`, que ilustra con `${{ db#103.SELFHOSTED_HOST }}`.

El caso más visible es `${{ db#103.POSTGRES_USER }}` de E-2: es **literalmente la expresión que la decisión cita como el estado anterior** —*"Hasta esta pasada, `${{ db#103.POSTGRES_USER }}` vinculaba el servicio y dejaba la clave como texto"*—, y sigue en pie en el anexo canónico de las referencias persistidas.
Queda además **sin declarar** si una variable **provista** por el sistema lleva identificador: `SELFHOSTED_HOST` no es una fila que el usuario cree, de modo que es plausible que no lo lleve y que las tres ocurrencias con provistas sean correctas; pero el documento no lo dice en ninguna parte, y es exactamente lo que un subagente de la Fase C necesita para implementar el resolutor.
Impacto: `08-Calidad-Y-Pruebas` y `02-Especificacion-Funcional` derivarían la forma persistida de los ejemplos, que es la anterior a D-12, y T-58 —que verifica el renombrado de variable— no tiene ningún ejemplo cuya forma lo sostenga.
Recomendación: aplicar la forma vinculada completa a las referencias a variables declaradas de los seis lugares, y declarar en el punto 2 de E-4 si las provistas llevan identificador o no.

### P2

| # | Ubicación | Hallazgo | Recomendación |
|---|---|---|---|
| P2-1 | §20.9, `variables_proyecto` | Al quitar el `UNIQUE (proyecto_id, clave)` se quitó **el único índice que servía la consulta declarada** sobre esa tabla. El comentario dice ahora *"la consulta habitual es siempre dentro de un proyecto, de modo que alcanza con un índice por `proyecto_id`"*, pero **ese índice no está en el DDL**: la lista de índices no cambió. La afirmación del comentario no tiene respaldo en el esquema que la acompaña | Agregar `CREATE INDEX ix_variables_proyecto_proyecto ON variables_proyecto(proyecto_id)`, que es la contrapartida de la restricción que se quitó y no diseña nada nuevo |
| P2-2 | La prueba objeto/atributo, primera fila | Clasifica **montajes** como atributo con la justificación de que *"no sobreviven a su servicio"*. El propio documento afirma lo contrario en tres lugares: I6 —*"los datos persistentes viven en el volumen o montaje adjunto al servicio y **sobreviven a la parada**"*—, RN-09 —al detener, los montajes no se tocan— y RN-10, que al **eliminar** el servicio ofrece conservar los volúmenes. Un montaje cumple la segunda condición de la prueba y queda clasificado como atributo por no cumplirla. El veredicto puede seguir siendo correcto, pero el fundamento escrito es el que la Fase C va a aplicar | Separar el **montaje** —declaración del servicio, atributo— del **volumen** —recurso del motor que sobrevive—, o acotar la condición a «sobrevive y además se referencia o se comparte» |
| P2-3 | §19, tabla de pendientes | F-25 entra al MoSCoW sin alcance asignado, en la misma situación que F-23 y F-24, y la nota de §4 lo reconoce explícitamente —*"no figura entre los diez cortes verticales del Alcance 1… igual que F-23 y F-24"*—. Pero la pendiente que registra esa brecha sigue nombrando sólo a F-23 y F-24. La condición está reconocida en prosa y no registrada donde §19 declara que viven las decisiones que nadie tomó | Extender la pendiente a F-25 |

## 23.6 Barrido propio y estabilidad del modelo anterior

Se corrió el barrido por afirmación sobre las cinco relaciones que la pasada declara, con sus predicados:

| Relación | Afirmación prohibida | Resultado |
|---|---|---|
| R1 · la referencia vincula servicio **y** variable | que la clave viaje como texto | **Seis supervivientes**, que son el **P1-1** |
| R2 · unicidad sólo donde cumple función | que la clave compartida sea única | Limpio: RN-28 invertida, T-42 invertido, `UNIQUE` retirado |
| R3 · secreto y red son objetos | presentarlos como cadena o JSON de forma terminal | Limpio: las cuatro menciones vivas describen el estado actual dentro del bloque que declara que va a cambiar |
| R4 · la colisión se resuelve creando separado | ofrecer elegir entre rechazar, sufijar o reusar | Limpio |
| R5 · el sistema observa y advierte | que no observe el estado del modelo | Limpio |

**El modelo anterior no se movió de más.** Se contrastaron las filas de reglas contra la línea base: de las treinta y cuatro anteriores cambiaron **exactamente tres** —RN-01 gana su fundamento, RN-28 se reformula y RN-33 se amplía—, las tres declaradas y las tres coherentes con D-12. De los cincuenta y ocho casos cambió **uno**, T-42, cuya inversión es la consecuencia 3, y se agregaron seis, T-58 a T-63. Las decisiones de las cuatro pasadas anteriores —el mecanismo único de vínculo, la sintaxis alineada con la fuente, la espera declarada, el vínculo al servicio, la terminología— están intactas.

## 23.7 Cifras

37 reglas —RN-01 a RN-37, en orden—, 64 casos —T-01 a T-63 más T-17b—, 25 capacidades, 16 entradas DI, 38 términos de glosario, 5 pendientes, 6 observaciones no aplicadas y 162 entradas de control de cambios. **Las tres cifras declaradas son correctas.**

## 23.8 Veredicto y aptitud para la Fase B

**APROBADO CON OBSERVACIONES.** Ninguno de los cuatro hallazgos bloquea, y el límite de alcance —que era el riesgo declarado de esta pasada— se respetó sin excepciones.

La pasada está bien concebida: convierte dos conflictos que llevaban tres rondas como pendientes en consecuencias de un principio, y lo hace declarando el principio con una prueba que impide que degenere. El acierto de método es haber derivado las cinco relaciones **antes** de aplicar, según la regla que la tercera pasada dejó asentada; y el que ese barrido haya dejado pasar R1 en los ejemplos, y no en las reglas, muestra dónde queda el punto ciego: el barrido cubre afirmaciones en prosa y no **formas en ejemplos de instancia**, que es donde vive P1-1.

**El intake sigue en condiciones de sostener la Fase B**, con una precisión sobre P1-1: no bloquea el arranque —las reglas y la subsección de decisión dicen lo correcto y son el insumo normativo—, pero conviene cerrarlo antes de que se genere `02-Especificacion-Funcional` de SelfHosted-Web y `08-Calidad-Y-Pruebas`, que son las dos categorías que derivan de los ejemplos y no sólo de las reglas. Las tres precauciones de la sección 22 se mantienen, y se agrega una cuarta: **la Fase C recibe dos objetos declarados y no diseñados** —secreto y red del proyecto— más la prueba con la que decidir, y debe tratarlos como trabajo propio y no como un dato ya resuelto por el intake.

---

# 24. Cierre de la quinta pasada

| Campo | Valor |
|---|---|
| Objeto verificado | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md`, 4004 líneas |
| Alcance | Cierre de los cuatro hallazgos; barrido por forma corrido de forma independiente; reformulación de la condición de la prueba; hallazgo del volumen; cifras; veredicto y aptitud para la Fase B |
| Fecha | 2026-07-28 |
| Veredicto | **APROBADO CON OBSERVACIONES** |

**0 P0 · 1 P1 · 2 P2 · 1 P3.**

## 24.1 Estado de los cuatro

| # | Estado | Evidencia |
|---|---|---|
| **P1-1** | **CERRADO** | Las seis referencias persistidas llevan la forma vinculada completa: `${{ db#103.POSTGRES_USER#731 }}`, `${{ shared.TZ#701 }}`, `${{ shared.DB_PASSWORD#702 }}`, `${{ PUERTO_HTTP#718 }}` y las dos a variables provistas. Las variables de E-2 exhiben su identificador, de modo que el vínculo es trazable contra el objeto que apunta |
| **P2-1** | **CERRADO** | `CREATE INDEX ix_variables_proyecto_proy ON variables_proyecto(proyecto_id)`. Los índices pasan de diez a once y la afirmación del comentario queda respaldada |
| **P2-2** | **CERRADO, y mejor de lo pedido** | Ver §24.3 y §24.4 |
| **P2-3** | **CERRADO** | La pendiente nombra ahora a F-23, F-24 **y F-25** |

## 24.2 Barrido por forma, corrido de forma independiente

Se escribió una consulta propia sobre las **122** ocurrencias de `${{ … }}` del cuerpo, aislando las que aparecen en **contexto de persistencia** —campo `"referencia"` o mención de `variables.referencia`—, que son quince, y verificando en cada una la presencia del vínculo.

| Resultado | Ocurrencias | Lectura |
|---|---|---|
| Con vínculo | 10 | Correctas |
| Sin vínculo | 5 | **Las cinco legítimas**, ninguna es resto |

Las cinco sin vínculo son: tres en las plantillas del catálogo de E-6, una en el flujo de interfaz de E-10 —los tres sitios que el integrador declaró— y **una cuarta clase que su enumeración no cubre**: `${{ SELFHOSTED_HOST }}` en el `SALUD_URL` de E-2, que es una variable provista del **propio** servicio. Esa está declarada, pero en otro bullet —*"el servicio propio no necesita identificarse"*— y no en el que enumera las excepciones. Es el P3 de abajo.

**Confirmo las dos afirmaciones del integrador:** las seis eran todas, y los tres sitios que declaró legítimos lo son. La distinción entre plantilla, flujo y persistencia **no tiene hueco**: en la plantilla el objeto apuntado no existe hasta instanciar, en el flujo se muestra lo que ve el usuario, y las dos razones son verificables contra el modelo y no meramente plausibles.

**Su lección secundaria es correcta y vale generalizarla.** Que su primera consulta puntuara mal un caso legítimo y lo llevara a marcar un resto inexistente es el riesgo propio de este paso: una consulta de forma tiene falsos positivos por construcción, porque la forma correcta depende del contexto. Calibrarla contra los casos legítimos **antes** de creerle es la disciplina que corresponde, y es la misma que la tabla de relaciones aplicó cuando declaró que su columna «Antes decía» dispara el barrido por diseño.

## 24.3 La reformulación de la condición

La corrección del vocabulario es **acertada y bien argumentada**: en este documento «contenedor» significa contenedor Docker, y con esa lectura un montaje sobrevive a su contenedor, de donde la prueba concluiría que es objeto contra I6, RN-09 y RN-10. «Sobrevive al objeto que lo contiene» dice lo que la prueba pregunta.

**Verificada la clasificación con la palabra nueva: los seis elementos quedan bien y ninguno se invirtió.** Recursos, healthcheck y layout no sobreviven al servicio que los declara → atributo; la declaración de montaje desaparece con su servicio → atributo; el volumen sobrevive → objeto; los ocho ya modelados, el secreto y la red del proyecto conservan su veredicto. La palabra nueva además **corrige de paso** una clasificación que la anterior habría estropeado: bajo «sobrevive a su contenedor», el layout del lienzo —que no vive en ningún contenedor— también habría dado objeto.

**Pero la reformulación se aplicó a la prueba y no a las otras cinco instancias del mismo enunciado**, que es el P1 de abajo.

## 24.4 El hallazgo del volumen

**Comparto que es real y que corresponde a la Fase C.** Es un hallazgo genuino, no una formalidad: el documento declara en tres lugares que el volumen sobrevive —I6 lo enuncia, RN-09 lo protege al detener y RN-10 ofrece conservarlo al eliminar el servicio— y el modelo sólo guarda su **nombre** dentro del JSON del montaje. La consecuencia que el integrador señala es exacta y verificable: un volumen conservado tras eliminar su servicio queda en el motor sin ninguna entidad del modelo que lo represente, de modo que el producto pierde de vista un recurso que él mismo decidió preservar. Es la clase de omisión que sólo aparece cuando se aplica una prueba explícita, y que la separación entre «declaración de montaje» y «volumen apuntado» hace visible.

Y corresponde a la Fase C por el mismo argumento con el que corresponden el secreto y la red: modelarlo exige decidir si el volumen es entidad propia, si se adopta al descubrir volúmenes huérfanos, cómo se relaciona con el montaje que lo declara y qué pasa con los montajes de directorio, que no son volúmenes del motor. Ninguna de esas cuatro se decide mirando ejemplos de instancia. **Cerrarlo acá habría sido el exceso que esta pasada evitó dos veces.**

## 24.5 Hallazgos

### P1

**P1-1 · La condición corregida se aplicó a la prueba y no a las otras cinco instancias del mismo enunciado, incluida la regla de negocio.**
Ubicación: RN-35 (§20.16), §12 «Objeto con identidad», el índice de decisiones (fila D-12), el enunciado del principio y la tabla de reparto de autoría, contra la prueba de la quinta pasada.
Evidencia: la prueba dice ahora *"lo que **sobrevive al objeto que lo contiene**"* y explica en el párrafo siguiente que enunciarla como «sobrevive a su contenedor» *"diría otra cosa —un montaje sobrevive al contenedor, y de ahí saldría que es objeto, **contra I6, RN-09 y RN-10**—"*. Las cinco instancias restantes conservan la formulación que ese mismo párrafo declara defectuosa:

- **RN-35**, la regla de record: *"Todo elemento que se referencia, que **sobrevive a su contenedor** o que tiene ciclo de vida propio es un objeto con identidad"*.
- §12, «Objeto con identidad»: idéntica.
- El enunciado del principio D-12, el índice de decisiones y la tabla de reparto: idénticas.

Impacto: RN-35 es la regla que la Fase C va a aplicar a **elementos nuevos**, que es justamente donde la prueba tiene que funcionar; la clasificación de los seis elementos ya conocidos está dada explícitamente y no se ve afectada, pero un elemento nuevo evaluado con el enunciado de RN-35 puede clasificarse mal, y el documento declara doscientas líneas antes que se clasificaría mal.
Es el mismo patrón que esta cadena viene reportando, en una variante nueva: no es prosa que envejeció ni una forma en un ejemplo, es **un enunciado canónico replicado en cinco registros y corregido en uno**.
Recomendación: propagar la formulación a las cinco. La localización es barata: las cinco citan D-12.

### P2 y P3

| # | Ubicación | Hallazgo | Recomendación |
|---|---|---|---|
| P2-1 | §20.4, fila «Forma vinculada» | El ejemplo se actualizó a `${{ db#103.POSTGRES_USER#731 }}` y **la prosa de la misma celda sigue diciendo** *"Los `#103` y `#77` son los identificadores"*. `#77` no aparece en ninguna otra parte del documento. Es la celda que **define** la forma | Cambiar `#77` por `#731` |
| P2-2 | §20.4, punto 2 | Sigue **sin declararse** si una variable provista de **otro** servicio lleva identificador. Las seis referencias persistidas muestran `${{ db#103.SELFHOSTED_HOST }}` —servicio vinculado, variable sin vínculo— y la única declaración existente cubre el caso del **propio** servicio, que es distinto. La inferencia correcta está disponible —una provista no es una fila de `variables`, de modo que no hay identidad que vincular— pero es inferencia, y el resolutor de la Fase C la necesita escrita | Agregar una frase al punto 2: las claves provistas no llevan vínculo porque no son objetos del modelo, y el vínculo al servicio alcanza para resolverlas |
| P3-1 | §20.4, bullet de las excepciones | Dice *"**Dos lugares** usan la forma legible aunque parezcan persistir una referencia"* y hay **tres clases**: plantilla, flujo y variable provista del propio servicio. La tercera está declarada en otro bullet, de modo que no hay hueco de cobertura, pero sí de enumeración: quien calibre una consulta de forma contra ese bullet —que es exactamente lo que el integrador recomienda hacer— marcará el `SALUD_URL` de E-2 como resto | Sumar la tercera clase al bullet |

## 24.6 Cifras

37 reglas, 64 casos, 25 capacidades, 38 términos, 5 pendientes, **11 índices** y 168 entradas de control de cambios. Todas verificadas y coherentes con lo declarado.

## 24.7 ¿Cubre el método las dos superficies, o queda una tercera?

**Queda una tercera, y es la que produjo el P1 de esta corrida.**

Las dos que el método ya cubre son distintas entre sí y las dos hicieron falta: el **barrido por afirmación** encuentra prosa que sigue sosteniendo una relación derogada, y el **barrido por forma** encuentra ejemplos de instancia escritos con una forma anterior. La tercera no es ninguna de las dos, porque sus instancias son prosa y están todas correctas *como prosa*: es el **enunciado canónico replicado**. Una misma afirmación —la condición de la prueba— vive en cinco registros distintos: la regla de negocio, el glosario, el índice de decisiones, la tabla de reparto de autoría y la subsección de la decisión. Corregirla en uno la deja inconsistente en cuatro, y ningún barrido por relación la detecta, porque la relación no cambió: lo que cambió fue **cómo se enuncia**.

Es una superficie estructural del documento y no un descuido: el intake replica deliberadamente sus enunciados para que cada registro sea legible por sí solo, que es lo que lo hace autocontenido. El costo es que cada enunciado tiene N copias.

**La contramedida es barata y el documento ya tiene el mapa:** cada réplica cita la decisión que la origina, de modo que el conjunto de réplicas de un enunciado es recuperable buscando su identificador —`D-12` devuelve las cinco—. La disciplina que recomiendo, y que sugiero incorporar al método junto a las dos anteriores: **al cambiar cómo se enuncia algo, y no sólo qué se afirma, enumerar las réplicas por el identificador de la decisión y verificar que las N digan lo mismo.**

**Y una advertencia para la Fase B**, que es donde esto se vuelve caro: el problema de las réplicas escala con la cantidad de artefactos, y la Fase B multiplica por doce categorías y por cuatro proyectos de código. Un enunciado del intake que hoy tiene cinco copias internas va a tener además copias en `02`, `05` y `08` de cada proyecto. Conviene que la trazabilidad downstream —que ya existe y ya mapea sección a categoría— se use en ese sentido también: no sólo para saber qué deriva de qué, sino para saber **qué hay que revisar cuando un enunciado del intake cambia de forma**.

## 24.8 Veredicto y aptitud para la Fase B

**APROBADO CON OBSERVACIONES.** Ninguno de los cuatro bloquea. Los cuatro hallazgos de la sección 23 están cerrados, dos de ellos mejor de lo pedido: el montaje se resolvió corrigiendo la palabra en lugar del veredicto —que era el diagnóstico correcto— y de paso separó dos cosas que estaban fundidas y destapó el volumen sin modelar.

**El intake sigue en condiciones de sostener la Fase B.** La precisión que corresponde hacer es la misma de la sección 23, ahora desplazada: lo que conviene cerrar antes de generar es **P1-1**, porque RN-35 es insumo directo de `02-Especificacion-Funcional` y de `05-Arquitectura-Tecnica` de SelfHosted-Domain, y es la regla con la que la Fase C va a clasificar los elementos que hoy no están modelados —el secreto, la red del proyecto y ahora el volumen—. Es una corrección de cinco líneas y no toca ninguna decisión.

Las cuatro precauciones acumuladas se mantienen, y la cuarta se amplía: la Fase C recibe **tres** objetos declarados y no diseñados —secreto, red del proyecto y volumen—, más la prueba con la que decidir, que conviene que reciba en su formulación corregida.

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-28 | Auditoría inicial de coherencia interna del `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.2.md` tras la integración de las siete decisiones D-1 a D-7. Verificación independiente de las dieciséis cifras declaradas por el integrador, matriz de coherencia por decisión, integridad del esquema relacional de E-9, cobertura regla–caso de prueba, convivencia de sintaxis con Docker Compose, fidelidad a `Analisis-Rayway.md`, marcadores, verificación por hash de §13, atomicidad y cobertura del control de cambios, y completitud de §19 contra `Intake-Rules.md`. 3 P0, 6 P1, 15 P2 y 4 P3. Veredicto RECHAZADO. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 14, verificación de cierre de la segunda corrida, sobre el mismo documento corregido (3472 líneas). Se verifica el cierre de los 3 P0 y los 6 P1 con evidencia, se revalidan de forma independiente los ocho recuentos declarados por el integrador, se audita la aplicación del marcador nuevo `[D-i]` en sus dos direcciones y la exhaustividad de la tabla DI, se releva el estado de los 15 P2 y los 4 P3, y se repite la verificación por hash de §13. Nueve de nueve cerrados; 4 defectos nuevos (3 P2 y 1 P3); 14 P2 y 2 P3 cerrados. Veredicto APROBADO CON OBSERVACIONES. Las secciones 1 a 13 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 15, auditoría de la segunda pasada sobre la decisión D-6 (documento de 3572 líneas): sintaxis realineada con la plataforma de referencia, variables provistas por el sistema y eliminación del discriminador de tipo de arista. Se audita el barrido de restos del discriminador y de lo eliminado, las reglas y casos que perdieron objeto, la cobertura de las cuatro clases de ciclo entre RN-05 y RN-22, la invariancia del comportamiento observable del enlace trazado, la integridad del esquema tras las bajas de columnas y la coherencia de la clave única nueva, la fidelidad a `Analisis-Rayway.md` §3.5, el reparto del marcador `[D-i]` tras la renumeración a DI-01 a DI-13 en sus dos direcciones, los siete recuentos declarados y el estado de las seis inconsistencias reportadas por el integrador; se repite por tercera vez la verificación por hash de §13. 2 P0, 4 P1, 5 P2 y 2 P3. Veredicto RECHAZADO. Las secciones 1 a 14 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 16, verificación de cierre de la segunda pasada y veredicto final del intake (documento de 3622 líneas). Se verifica el cierre de los 2 P0, 4 P1, 5 P2 y 2 P3 de la sección 15; se auditan en detalle la decisión de P0-2 —consistencia del modelo resultante, no violación de RN-04, RN-24, RN-25 y T-30, acotamiento de la excepción a RN-26 y valor probatorio de T-40 y T-54—; se rehace de forma independiente la verificación de las 102 entradas de control de cambios con tres extracciones distintas; se repite el barrido de restos y la verificación por hash de §13. 1 P0, 0 P1, 2 P2 y 1 P3. Veredicto RECHAZADO por un P0 de alcance acotado, con condición única de promoción. Incluye la lectura solicitada sobre el título del anexo E-4. Las secciones 1 a 15 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 17, verificación final del intake (3632 líneas): cierre de N-1 a N-4 de la sección 16, consistencia lógica de las tres reformulaciones y de la disyunción entre el universal sobre la interpolación y el particular sobre el `depends_on` incluido su borde, barrido de una cuarta ocurrencia del patrón absoluto, integridad de §19 tras el movimiento de la tabla, siete recuentos más las nueve afirmaciones numéricas del checklist, y cumplimiento de las dos condiciones del endoso del título de E-4. Quinta verificación por hash de §13. Cero hallazgos abiertos. **Veredicto final: APROBADO.** Las secciones 1 a 16 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 18, auditoría de la tercera pasada sobre el modelo de vínculo (decisiones D-8 a D-11; documento de 3752 líneas), primera corrida con la línea base previa disponible en `_legacy/2026-07-28/`. Se auditan la coherencia de las dos formas de la expresión por contexto, la reversión de la reserva de `shared`, las cuatro combinaciones de espera por referenciar el host, el índice único parcial sobre las aristas sin variable, la eliminación de las dos claves provistas, la integridad del mecanismo de la segunda pasada, los siete recuentos, las dos renumeraciones declaradas y un barrido propio de restos. Sexta verificación por hash de §13. 1 P0, 2 P1, 4 P2. Veredicto RECHAZADO. Incluye la lectura solicitada sobre la observación de `SELFHOSTED_SERVICE_NAME`. Las secciones 1 a 17 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 19, verificación de cierre de la tercera pasada (documento de 3768 líneas): cierre de los siete hallazgos de la sección 18, verificación independiente de las seis cifras, revisión detallada de la distinción entre el espacio de nombres `shared` y el nombre de servicio, y **barrido por afirmación propio** sobre cinco relaciones cambiadas, con el barrido inverso de las afirmaciones permitidas. Séptima verificación por hash de §13. 1 P0 y 1 P1 nuevos, los dos de la relación que la enumeración del integrador no incluyó: que una arista puede existir sin variable. Veredicto RECHAZADO. Incluye la lectura solicitada sobre si el barrido por afirmación agota el problema. Las secciones 1 a 18 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 20, cierre de la tercera pasada y **veredicto final del intake** (documento de 3785 líneas): cierre de los dos hallazgos de la sección 19, barrido propio sobre la quinta relación con cinco consultas por predicado más la reverificación de las otras cuatro, validación de la tabla de las cinco relaciones y del método incorporado al documento, y las siete cifras. Octava verificación por hash de §13. Cero defectos nuevos y cero hallazgos abiertos. Se asienta que los restos se agotaron. **Veredicto final: APROBADO**, con la lectura de aptitud para la Fase B que quedó reservada. Las secciones 1 a 19 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 21, auditoría de la cuarta pasada, de terminología (documento de 3822 líneas), con la línea base previa disponible en `_legacy/2026-07-28/`. Se verifican de forma exhaustiva y no por muestra los 102 cambios de palabra contra su contexto, la intangibilidad de los identificadores técnicos y de las menciones al agente humano, las 45 formas cortas de §13 a §17, la exhaustividad del sentido de código, las anclas de los siete títulos modificados y la inmovilidad del modelo por hash normalizado de siete conjuntos de filas normativas. Cero inversiones de sentido. 1 P1 —el manifiesto afirma que §13 nunca fue tocada y esta pasada la tocó, sin que corresponda re-derivarlo— y 3 P2. Veredicto APROBADO CON OBSERVACIONES. Incluye la lectura solicitada sobre la mitigación tipográfica. Las secciones 1 a 20 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 22, cierre de la cuarta pasada y **veredicto final** (documento de 3849 líneas): cierre de los tres P2, prueba de la regla léxica de §12 como regla —decidibilidad por la forma, alcance de la prohibición y barrido de fusiones y de títulos—, lectura sobre la decisión de las cuatro filas de identidad, cifras y verificación independiente del manifiesto v1.3, que cierra P1-1. Cero hallazgos P0, P1 y P2; un P3 de precisión sobre el separador. **Veredicto final: APROBADO**, con la aptitud para la Fase B confirmada. Las secciones 1 a 21 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 23, auditoría de la quinta pasada (D-12 identidad de objeto y D-13 higiene del modelo; documento de 3986 líneas), con la línea base previa disponible. Se verifica el límite de alcance frente a la Fase C —E-9 no diseña columnas, claves ni índices de los dos objetos nuevos—, la corrección de la consecuencia 3 contra el DDL, la aplicabilidad de la prueba objeto/atributo, el cierre por modelo de los dos conflictos de instanciación, la prioridad de F-25, un barrido propio sobre las cinco relaciones y la inmovilidad del modelo anterior. 1 P1 —la consecuencia 1 declarada y no aplicada en seis ejemplos— y 3 P2. Veredicto APROBADO CON OBSERVACIONES, con la aptitud para la Fase B mantenida. Las secciones 1 a 22 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
| 1.0 | 2026-07-28 | Se agrega la sección 24, cierre de la quinta pasada (documento de 4004 líneas): cierre de los cuatro hallazgos, **barrido por forma corrido de manera independiente** sobre las 122 ocurrencias de `${{ … }}` con aislamiento de las quince en contexto de persistencia, verificación de la clasificación bajo la condición reformulada, lectura sobre el hallazgo del volumen y las cifras. 1 P1 —la reformulación aplicada a la prueba y no a las otras cinco réplicas del mismo enunciado, incluida RN-35—, 2 P2 y 1 P3. Veredicto APROBADO CON OBSERVACIONES. Incluye la respuesta a la pregunta de método: queda una tercera superficie, el enunciado canónico replicado, con su contramedida y su advertencia para la Fase B. Las secciones 1 a 23 no se modifican. | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
