# Auditoría de migración normativa · M4 corte 4 · `03-UX-UI-DX`

## 1 · Cabecera

| Campo | Valor |
| --- | --- |
| Fase | **M4**, corte **4 y último**, de la migración normativa del conjunto SDD **4.1 → 6.0** (`Master-Prompt-Migracion.md` §8) |
| Producto | SelfHosted Service |
| Proyecto de código | `SelfHosted-Service` · `tipo_proyecto_codigo` = `web-monolith` · variante **UX/UI** · categoría de **nivel proyecto de código** |
| Alcance auditado | Los **25** documentos de `SDD/Docs/03-UX-UI-DX/` en versión **2.0**: `Experiencia-De-Uso.md`, `Glosario-UX.md`, `README.md`, 4 en `Representaciones/` y 18 en `Wireframes/` |
| Línea de base | `_legacy/2026-07-30/` de **cada carpeta**: 3 en la raíz, 4 en `Representaciones/`, 18 en `Wireframes/` |
| Normativa aplicada | `Rules-UX-UI-DX` **4.0** §2.1, §2.2, §3.1 a §3.5, §4.1, §4.2, §4.2.1, §4.2.2, §4.3, §4.4 y §6 · `Vocabulario-Rules` **2.1** §9 y §10 · `Migracion-Rules` **1.0** §4 y los catorce criterios de §6 con sus seis P0 · `Master-Prompt` §10 · `Master-Prompt-Migracion` §10 · `Deriva-Rules` (nombres canónicos) · `SDD-Development-Guide` §VI.2 |
| Insumos upstream | `00-Contexto/Vision-Producto.md` §9 (glosario raíz), `02-Especificacion-Funcional/Glosario-Funcional.md`, los 101 documentos de 02, `PRODUCT-INTAKE-SelfHosted-Service.md` v3.0 §12 y §20 E-18, `PRODUCT-MANIFEST-SelfHosted-Service.md` v2.0 |
| Plan | `Audit/Plan-Migracion-4.1-a-6.0.md` 1.1, §3.5 con su Paso 2.b, §4 (25 filas), §8 y §8.1 |
| Informes previos consultados | `M4-00-Contexto-r1`, `M4-01-Necesidades-Negocio-r1`, `M4-02-Especificacion-Funcional-r1` y `-r2`. **Ninguno se modificó.** Sus afirmaciones se trataron como hipótesis a verificar |
| Auditor | Auditor independiente, perfil Arquitecto de Soluciones + QA Senior, invocado desde cero, sin participación en la migración |
| Fecha | 2026-07-30 |
| Ronda | 1 |

### 1.1 Declaración del muestreo

**Cobertura del 100 % por script**, en todo lo mecánico. Lo corrido y su resultado bruto:

| Verificación | Universo | Cobertura |
| --- | --- | --- |
| Cabecera y **orden de campos** de §4.1 | 25 documentos | 100 % |
| Campo `Versión`, `Estado`, `Fecha`, `Variante` | 25 | 100 % |
| Archivado del estado previo en el `_legacy/` de **su propia carpeta**, con sufijo `-v<X.Y>` | 25 pares vivo/archivado | 100 % |
| Filas de control de cambios comparadas **celda por celda** contra el archivado | **51 filas históricas** + 25 nuevas = 76 | 100 % |
| **Bloques ASCII entre cercas, byte a byte** contra el archivado | 21 bloques en 21 documentos (4 no tienen) | 100 % |
| Enlaces relativos que resuelven en disco | 428 | 100 % |
| Anclas de sección **cross-file** que resuelven contra los encabezados del destino | 35 | 100 % |
| Anclas de tabla de contenido y cobertura de secciones de primer y segundo nivel | 316 entradas en 25 tablas | 100 % |
| Secciones obligatorias (§4.2 once, §4.2.1 nueve, §4.2.2 siete) | 25 | 100 % |
| Barridos léxicos del plan §3.5 Paso 4 | los 5, sobre los 25 | 100 % |
| Censo de «proyecto de código» y de «proyecto*» en cuerpo, vivo contra archivado | 36 y 457 ocurrencias | 100 % |
| Conteo de «resolución» por documento, cuerpo y archivo completo, vivo contra archivado | 25 documentos | 100 % |
| Identificadores `SUP-01` a `SUP-18` en README, `Experiencia-De-Uso.md` §9.2 y §1 de cada wireframe | 18 × 3 | 100 % |
| Ausencia de `CMP-XX`, `EST-XX`, `NAV-XX`, `DM-XX` | 25 | 100 % |
| Fila «CU origen» del §8 de cada wireframe contra §9.2 | 18 | 100 % |
| Conteos de la columna «Artefactos de 03» del glosario | los 63 términos | 100 % (medición propia) |
| Candidatos descartados de §9.1: ¿viven en un solo artefacto? | 28 de los 32 con forma literal comprobable | 88 % |
| Colisión de nombre de término contra `Glosario-Funcional.md` y el glosario raíz | 63 × 2 | 100 % |
| Transición 39 → 63 términos, y supervivencia de los 39 de origen | 100 % | 100 % |
| D1/D2: encoding, emojis, vocabulario de stack prohibido | 25 | 100 % |

**Muestreo declarado en la prosa**, elegido por riesgo:

1. **Las 7 promociones a «proyecto de código»: 100 %**, una por una contra el archivado. Es el punto crítico del corte y no admite muestreo.
2. **13 de las 26 definiciones nuevas del glosario (50 %)**, rastreadas frase por frase contra el uso de los artefactos hermanos: *regla de continuidad del lazo, región de estado, grilla de tarjetas, insignia, par de color, etiqueta textual, presentación del par de estado, estado de deriva, advertencia de corte, anchos de verificación, disclosure, punto de quiebre, variante de la banda de resultado*. Criterio de selección: las de mayor grado de abstracción respecto del texto de origen, es decir las que más se parecerían a una redacción propia si lo fueran.
3. **Lectura íntegra** de `Glosario-UX.md` (365 líneas), del diff completo de cuerpo de `Experiencia-De-Uso.md` y de `README.md`, y de las **25 filas nuevas de control de cambios** con su declaración de fuente de contenido.
4. **Cuatro wireframes y dos representaciones leídos en las secciones de riesgo**: `Wireframes-Lienzo-Del-Proyecto` §5 y §5.1 (la premisa falsa del orquestador), `Wireframes-Alta-De-Servicio` §5 (18 estados), `Wireframes-Informe-De-Conflicto-De-Direcciones` §3 a §5 (37 de las 59 «resolución» de cuerpo), `Wireframes-Panel-Lateral-Del-Servicio` §8, `Representacion-Lenguaje-Visual-De-Estados` §1 a §3.3 y `Representacion-Banda-De-Resultado` §3.

**Lo que no se auditó y por qué.** Los 101 documentos de `02-Especificacion-Funcional` y los 6 de `00-Contexto` se leyeron **como upstream**, solo en los puntos que 03 cita: los dos glosarios completos, `Vision-Producto.md` §9 y las anclas citadas. Su propia conformidad la cerraron los cortes 1 y 3.

---

## 2 · Resumen ejecutivo

**Cero hallazgos P0.** Los seis P0 propios de una migración normativa se verificaron uno por uno y ninguno se cumple. El corte 4 es el más conservador de los cuatro: **los 21 bloques ASCII son byte a byte idénticos al archivado**, las 51 filas históricas de control de cambios están intactas, y el volumen de cambio de cuerpo de los 22 wireframes y representaciones va de 4 a 9 líneas por documento —vocabulario de nivel superior y cabecera, nada más—.

**El punto crítico se resolvió sin daño.** «Proyecto de código» aparece 36 veces en cuerpo: 25 son el campo de cabecera nuevo, 2 venían del archivado, 2 son entradas nuevas del glosario que declaran la familia, y **7 son promociones**, exactamente las que los lotes declararon. Las siete caen sobre el referente del framework —el catálogo de diseño y la extensión de configuración aplicados «por proyecto de código»— y **ninguna sobre la entidad del dominio**, que en esta categoría es dominante y da nombre a tres archivos. Las 449 ocurrencias restantes de «proyecto» quedaron donde estaban.

**Las «resolución» sobrevivieron todas.** El dato del orquestador verifica exactamente: **60 en el cuerpo de los 25 al abrir el corte y 89 al cerrar**, con el aumento en `Glosario-UX.md` (+28, la entrada de polisemia) y en `README.md` (+1). **Ningún documento perdió ninguna**, documento por documento. Cero «reproducto» reales: las dos ocurrencias del barrido están entrecomilladas dentro de filas de control de cambios que citan el daño evitado, y contarlas habría sido defecto de este informe.

**El glosario es el entregable de fondo del corte y está bien construido.** Pasó de 39 a 63 términos con definición propia; los 39 de origen sobreviven —37 en su lugar y 2 convertidos en referencia a `Glosario-Funcional.md`, que es lo que §3.3 ordena—; las 26 entradas nuevas son exactamente las declaradas; y las 13 muestreadas se rastrean, cláusula por cláusula, al texto de los artefactos hermanos. **Cero colisiones exactas de nombre** contra los dos glosarios upstream.

**Un P1**, de la misma familia que los P1 de los cortes 1 y 2: un término que la categoría usa centralmente —«vía de alta», con dos títulos de sección propios en dos wireframes— no está declarado ni como entrada ni como candidato descartado, y no tiene entrada upstream que permita referenciarlo. Se cierra con una fila de tabla.

| Nivel | Cantidad |
| --- | --- |
| **P0** | **0** |
| P1 | 1 |
| P2 | 3 |
| P3 | 3 |
| **Total** | **7** |

**Veredicto: APROBADO CON OBSERVACIONES.** Sin P0, la cadena puede avanzar a M5. El P1 no bloquea la re-expresión de ningún documento: es una fila que falta en un artefacto que se está por promover, y su corrección no toca ninguno de los otros 24.

---

## 3 · Matriz D1–D9 por documento

Escala: **C** conforme · **n/a** no aplica.

| # | Documento | D1 idioma | D2 encoding | D3 slug | D4 versión en cabecera | D5 deprecación | D6 trazabilidad | D7 vocabulario fuente | D8 conjunto cerrado | D9 evidencia |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `Experiencia-De-Uso.md` | C | C | C | C 2.0 | C | C | C | C | C con H-05 |
| 2 | `Glosario-UX.md` | C | C | C | C 2.0 | C | C | C | C | C con H-03 |
| 3 | `README.md` | C | C | C | C 2.0 | C | C | C con H-04 | C | C con H-03 |
| 4 | `Representaciones/Representacion-Banda-De-Resultado.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 5 | `Representaciones/Representacion-Lenguaje-Visual-De-Estados.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 6 | `Representaciones/Representacion-Nodo-De-Servicio.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 7 | `Representaciones/Representacion-Sello-De-Version.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 8 | `Wireframes/Wireframes-Acceso-Al-Panel.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 9 | `Wireframes/Wireframes-Alta-De-Servicio.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 10 | `Wireframes/Wireframes-Aprovisionamiento-Inicial.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 11 | `Wireframes/Wireframes-Cajon-De-Cambios-Pendientes.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 12 | `Wireframes/Wireframes-Cambio-De-Contrasena.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 13 | `Wireframes/Wireframes-Catalogo-De-Plantillas.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 14 | `Wireframes/Wireframes-Configuracion-Del-Sistema.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 15 | `Wireframes/Wireframes-Descubrimiento-E-Incorporacion.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 16 | `Wireframes/Wireframes-Exportacion-E-Importacion.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 17 | `Wireframes/Wireframes-Imagenes.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 18 | `Wireframes/Wireframes-Informe-De-Conflicto-De-Direcciones.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 19 | `Wireframes/Wireframes-Lienzo-Del-Proyecto.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 20 | `Wireframes/Wireframes-Listado-De-Proyectos.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 21 | `Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md` | C | C | C | C 2.0 | C | C con H-06 | C | C | C |
| 22 | `Wireframes/Wireframes-Registro-Del-Contenedor.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 23 | `Wireframes/Wireframes-Revision-De-Higiene.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 24 | `Wireframes/Wireframes-Tablero-De-Estado.md` | C | C | C | C 2.0 | C | C | C | C | C |
| 25 | `Wireframes/Wireframes-Variables-Compartidas-Del-Proyecto.md` | C | C | C | C 2.0 | C | C | C | C | C |

**Evidencia de las columnas medidas al 100 %.**

- **D1/D2.** Los 25 son `utf-8`; **cero** emojis en el rango de pictogramas; español rioplatense con tildes; **cero** ocurrencias de nombres de motor de contenedores comerciales. Las menciones a Blazor y MudBlazor son las de los documentos del catálogo de diseño que §1.4 obliga a citar por nombre, declaradas en la Parte C del intake.
- **D3.** Los 25 nombres en Título-Con-Guiones estricto, ASCII sin acentos; **cero** archivos con sufijo de versión en la carpeta de trabajo; el sufijo `-v<X.Y>.md` aparece solo en los 25 archivados, con guion medio.
- **D4.** Los 25 declaran `**Versión:** 2.0` en cabecera; **ninguno** la lleva en el nombre.
- **D5.** Un solo archivo por nombre lógico en cada carpeta de trabajo; los 25 estados previos en el `_legacy/2026-07-30/` de su propia carpeta.
- **D9.** Las 428 rutas relativas y las 35 anclas cross-file resuelven en disco. Las tres citas a `_legacy/` —dos en el glosario y una en el README— resuelven.

---

## 4 · Matriz de estructura obligatoria

### 4.1 Cabecera: el orden de campos que §4.1 fija

Los **25 de 25** llevan, en este orden exacto:

```
**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** <nombre-de-archivo>.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** UX/UI Designer + Frontend Lead (AG-03)
**Variante:** UX/UI
```

Tres cosas que esto cierra:

- **El campo `**Variante:**` que §4.1 exige está en los 25**, con el valor coherente con el `tipo_proyecto_codigo` `web-monolith` según la tabla de §1.2. Es el criterio 1 de §6 y se cumple.
- **La corrección del Paso 2.b del plan se aplicó bien.** `**Proyecto:**` no sobrevive en **ninguno** de los 25: pasó a `**Producto:**` conservando su valor de origen `SelfHosted Service`, y se sumó `**Proyecto de código:** SelfHosted-Service` con el valor del `PRODUCT-MANIFEST` §2. Los dos conviven, que es la resolución que el plan §3.5 Paso 2.b ordena para las categorías de nivel proyecto de código. Los dos valores difieren por el guion y no se fusionaron, lo que satisface la prohibición de `Vocabulario-Rules` §3.
- **A diferencia del corte 3, acá no queda ningún documento con cabecera en tabla.** El P2 heredado `H-04-r2` de `Especificacion-Funcional.md` no tiene equivalente en 03: los 25 usan bloque de metadatos.

### 4.2 Secciones obligatorias

| Tipo de artefacto | Regla | Secciones exigidas | Resultado |
| --- | --- | --- | --- |
| `Experiencia-De-Uso.md` | §4.2 | 11 | **11 de 11**, numeradas §1 a §11, en orden |
| Los 18 `Wireframes-*.md` | §4.2.1 | 9 | **9 de 9 en los 18**, numeradas 1 a 9, en orden, sin secciones agregadas ni reordenadas |
| Las 4 `Representacion-*.md` | §4.2.2 | 7 | **7 de 7 en las 4**, numeradas 1 a 7, en orden |
| `README.md` | §3.4 | artefactos vigentes con propósito, variante y estado | 10 secciones; lista los 25 con su versión, su propósito y su estado |
| `Glosario-UX.md` | §2.1, §3.3 | existencia, tabla no vacía, completitud, polisemia, no duplicación | §1 a §10; tabla de 63 términos con definición propia más 25 referenciados |

### 4.3 Tabla de contenido de §4.1

Los 25 superan las tres secciones de primer nivel y los 25 llevan tabla de contenido inmediatamente después de la cabecera. Medición: **316 entradas de índice, 0 anclas rotas, 0 secciones de primer o segundo nivel sin entrada**. `Wireframes-Imagenes.md` intercala entre cabecera y tabla un aviso en bloque de cita sobre las pendientes `Q-15` a `Q-21`; no es una sección y no altera la estructura.

### 4.4 Criterios de aceptación de `Rules-UX-UI-DX` 4.0 §6

| # | Criterio | Resultado |
| --- | --- | --- |
| 1 | Variante declarada en cabecera y coherente con el tipo D8 | **Cumple** en los 25 |
| 2 | `Experiencia-De-Uso.md` con las once secciones | **Cumple** |
| 3 | Un `wireframes-<superficie>.md` por superficie clave, con las nueve secciones | **Cumple**: 18 wireframes contra un piso de 4 para `web-monolith` |
| 4 | `DX-Developer-Experience.md` para tipos sin UI final | **n/a**: variante UX/UI |
| 5 | WCAG 2.2 AA como piso; versiones anteriores solo en notas históricas | **Cumple**: `Experiencia-De-Uso.md` §5 declara «WCAG 2.2 nivel AA como piso obligatorio»; **cero** menciones a WCAG 2.0 o 2.1 en los 25 |
| 6 | Cada wireframe enumera al menos vacío, cargando, con datos y error | **Cumple en 17 de 18**; ver H-07 sobre `Wireframes-Alta-De-Servicio.md` |
| 7 | Quick-start verificable en cada `dx-` doc | **n/a** |
| 8 | Trazabilidad upstream y downstream por artefacto | **Cumple**: §8 en los 18, §6 en las 4, §9 en el marco; ver H-06 |
| 9 | Sin sufijo de versión en la carpeta de trabajo; slug estricto | **Cumple** |
| 10 | Un archivo por nombre lógico; superadas en `_legacy/` con sufijo | **Cumple** |
| 11 | Existe `Glosario-UX.md` y su tabla no está vacía | **Cumple**: 63 términos con definición propia |
| 12 | Todo término en más de un artefacto declarado, con referentes cuando tiene más de uno | **No cumple** para «vía de alta»: **H-01, P1** |
| 13 | El glosario no duplica términos de `Glosario-Funcional.md` con semántica distinta; los reusados se referencian | **Cumple**: 0 colisiones exactas de nombre; las 2 que traía el origen pasaron a referencia |
| 14 | Ninguna polisemia con contextos disjuntos se reporta ni se corrige calificando todo | **Cumple**: 8 constancias en §9.2 y cero calificaciones aplicadas |
| 15 | Sin stacks concretos, productos comerciales ni protocolos del dominio fuente | **Cumple** |
| 16 | Con `requiere_maqueta`: nombre canónico estable y tabla de estados completa por wireframe | **Cumple**: 18 nombres canónicos, 305 filas de estado |
| 17 | Con maqueta aprobada: `Linea-Base-Visual`, `Contrato-Datos-Maqueta`, `Bitacora-Validacion-Maqueta` | **n/a**: la maqueta no está aprobada; los tres los emite AG-03M. **Cero** `CMP-XX`, `EST-XX`, `NAV-XX`, `DM-XX`, que es lo esperado |
| 18 | Tabla de contenido con enlaces de primer y segundo nivel | **Cumple** en los 25 |

---

## 5 · Coherencia cross-doc y gobierno del glosario

### 5.1 El punto crítico: sobre-sustitución y sub-sustitución

**Censo completo, cuerpo sin filas de control de cambios, vivo contra archivado:**

| Forma | Archivado | Vivo | Delta |
| --- | --- | --- | --- |
| `proyecto*` (todas las flexiones) | 445 | 457 | +12 |
| `proyecto(s) de código` | 2 | 36 | +34 |
| `resoluci*` | 60 | 89 | +29 |
| `solución` / `soluciones` fuera de «solución de código» | 19 | 4 | −15 |

De las **36** ocurrencias de «proyecto de código» en cuerpo: **25** son el campo de cabecera nuevo, **2** venían textualmente del archivado (`Glosario-UX-v1.0` §6 y `README-v1.1` §3), **2** son texto nuevo de las entradas de glosario que declaran la familia (§5.3 «Modo pendiente» y §9.2 «La familia proyecto»), y **7 son promociones**. El número coincide con lo declarado.

**Las 7 promociones, una por una contra el archivado. Sobre-sustitución: cero.**

| # | Documento y línea | Archivado | Vivo | Referente | Veredicto |
| --- | --- | --- | --- | --- | --- |
| 1 | `Experiencia-De-Uso.md`:140 (`v1.1`:139) | «Piso obligatorio de todo **proyecto** con interfaz web» | «…todo **proyecto de código** con interfaz web» | La unidad D8 a la que se aplica `Design-Rules-Web-Generico` | **Correcta** |
| 2 | `Experiencia-De-Uso.md`:715 (`v1.1`:714) | «declararlo por **proyecto**» | «…por **proyecto de código**» | La unidad D8 que tendría prohibido definir el token | **Correcta** |
| 3 | `Experiencia-De-Uso.md`:722 (`v1.1`:721) | «en todo **proyecto** que cargue la extensión» | «…todo **proyecto de código** que cargue…» | Cita de `Rules-UX-UI-DX` §1.4, cuyo nivel es proyecto de código | **Correcta** |
| 4 | `Experiencia-De-Uso.md`:725 (`v1.1`:724) | «condiciona la ranura a que el **proyecto** tenga superficies» | «…el **proyecto de código** tenga…» | Paráfrasis de `Audit/B-02-03-r1` §7.2, mismo referente. La cita literal entre «» **no se tocó** | **Correcta** |
| 5 | `Experiencia-De-Uso.md`:751 (`v1.1`:750) | «prohíbe definirlo por **proyecto**» | «…por **proyecto de código**» | Fila de la brecha `B-UX-05`, mismo referente que la #2 | **Correcta** |
| 6 | `Representacion-Lenguaje-Visual-De-Estados.md`:117 (`v1.0`:116) | «prohíbe definir el token por **proyecto**» | «…por **proyecto de código**» | Ídem | **Correcta** |
| 7 | `Wireframes-Cajon-De-Cambios-Pendientes.md`:142 (`v1.0`:141) | «en todo **proyecto** que cargue la extensión» | «…todo **proyecto de código** que cargue…» | Ídem #3 | **Correcta** |

Las siete caen sobre el mismo referente: **la unidad D8 a la que el catálogo de diseño y sus extensiones se aplican**. Ninguna cae sobre la entidad del dominio. Las tres verificaciones que lo confirman:

- **Los tres nombres de archivo que llevan la entidad del dominio no cambiaron**: `Wireframes-Lienzo-Del-Proyecto.md`, `Wireframes-Listado-De-Proyectos.md`, `Wireframes-Variables-Compartidas-Del-Proyecto.md`. Sus 18 referencias cruzadas resuelven.
- **Los tres nombres canónicos de superficie tampoco**: `Lienzo del proyecto`, `Listado de proyectos`, `Variables compartidas del proyecto`, idénticos en README, §9.2 y §1 de cada wireframe.
- **Las 191 ocurrencias de «proyecto*» sin «de código» ni «SelfHosted»** se clasificaron en bloque: 113 designan la entidad del dominio o el emprendimiento en contexto ya fijado, 44 son «agente humano del proyecto», 31 son nombres de artefacto del dominio (`CU-01-Alta-De-Proyecto.md` y los tres wireframes) y 3 son la ruta `/proyectos` de la interfaz. **Ninguna es la unidad D8 sin calificar**, salvo las dos de H-04.

**Sub-sustitución: dos ocurrencias, en `README.md`.** Es el hallazgo **H-04, P2**. El plan §3.5 Paso 3 lo anticipa como «defecto menor y visible», y la asimetría respecto del hermano lo vuelve demostrable en lugar de opinable.

**«Solución» y «resolución».**

- **Cero «reproducto» reales.** El barrido devuelve 2 ocurrencias, las dos entrecomilladas dentro de filas de control de cambios de la versión 2.0 que declaran el daño que se evitaba: `Wireframes-Acceso-Al-Panel.md`:188 y `Wireframes-Alta-De-Servicio.md`:330. **Contarlas sería defecto de este informe** y no se cuentan.
- **Cero cabeceras de tabla de anti-patrones pisadas** y **cero concordancias de género rotas**: los barridos `| Anti-patrón | … | Producto |`, `producto técnica`, `productos técnicas` no devuelven nada. Donde «la solución» pasó a «el producto», el artículo se corrigió en las 15 ocurrencias.
- **«Solución» sobrevive donde debía.** Las 4 restantes son legítimas: 2 en prosa de negocio con el sentido de remedio —«las tres restricciones que cualquier **solución** tiene que cumplir» en `Representacion-Nodo-De-Servicio.md`:97 y «la restricción que cualquier **solución** debe cumplir» en `Experiencia-De-Uso.md`:747, que R2 de `Vocabulario-Rules` preserva— y 2 dentro de filas históricas de control de cambios de la versión 1.0, que §VI.2 prohíbe reescribir. Además, «solución de código» aparece 9 veces y no se tocó.
- **Las «resolución» sobrevivieron todas.** El dato del orquestador verifica con exactitud:

| Documento | Cuerpo, archivado | Cuerpo, vivo |
| --- | --- | --- |
| `Wireframes-Informe-De-Conflicto-De-Direcciones.md` | 37 | 37 |
| `Experiencia-De-Uso.md` | 12 | 12 |
| `Wireframes-Alta-De-Servicio.md` | 3 | 3 |
| `Representacion-Nodo-De-Servicio.md` | 2 | 2 |
| `README.md` | 1 | **2** |
| `Representacion-Lenguaje-Visual-De-Estados.md`, `Wireframes-Aprovisionamiento-Inicial.md`, `Wireframes-Cajon-De-Cambios-Pendientes.md`, `Wireframes-Lienzo-Del-Proyecto.md`, `Wireframes-Panel-Lateral-Del-Servicio.md` | 1 cada uno | 1 cada uno |
| `Glosario-UX.md` | 0 | **28** |
| Los 11 restantes | 0 | 0 |
| **Total** | **60** | **89** |

**Ningún documento perdió ninguna.** El aumento es +28 en el glosario —la entrada de polisemia de §8.1 y las referencias de §5.2— y +1 en el README. Coincide dígito por dígito con lo que el orquestador declaró.

### 5.2 Filas históricas de control de cambios

`SDD-Development-Guide.md` §VI.2 prohíbe reescribir una fila ya escrita. Verificación **celda por celda** en los 25 pares vivo/archivado:

- **51 filas históricas**, distribuidas de 1 a 3 por documento. **Cero reescritas, cero desaparecidas, cero reordenadas.**
- **25 filas nuevas**, exactamente una por documento, todas `| 2.0 | 2026-07-30 |`.
- Las 51 conservan las cadenas que la migración habría podido pisar: «de la solución», «esta solución», «proyecto» a secas. Es la prueba directa de que la sustitución no se hizo por reemplazo global.

### 5.3 Los bloques ASCII

Son la representación de las pantallas y su alineación es significativa. **21 bloques entre cercas en 21 documentos, comparados byte a byte contra el archivado: los 21 idénticos.** Los 4 documentos sin bloque son `Experiencia-De-Uso.md`, `Glosario-UX.md` y `README.md`, que no lo tenían, y ninguno lo agregó.

Esto incluye los tres casos donde el riesgo era real: el bloque del paso 1 de `Wireframes-Alta-De-Servicio.md` contiene «proyecto SelfHosted» y «resolucion»; el de `Wireframes-Informe-De-Conflicto-De-Direcciones.md` contiene «Resoluciones» como rótulo de zona; el de `Wireframes-Configuracion-Del-Sistema.md` contiene «por proyecto». **Ninguno de los tres se tocó, y por lo tanto ningún ancho se corrió.**

### 5.4 Identificadores de superficie

`SUP-01` a `SUP-18`, sin huecos y sin duplicados, uno por wireframe. `Experiencia-De-Uso.md` §9.2 es la tabla canónica y lo declara así explícitamente.

**Coincidencia término por término en los tres lugares, como `Deriva-Rules.md` exige contra la futura línea de base: 18 de 18 idénticos** entre `README.md` §4.2, `Experiencia-De-Uso.md` §9.2 y la §1 de cada wireframe. Ni un carácter de diferencia, ni una tilde, ni una mayúscula.

**Cero `CMP-XX`, `EST-XX`, `NAV-XX`, `DM-XX`**, que es exactamente lo esperado: `Linea-Base-Visual.md` y `Contrato-Datos-Maqueta.md` no existen todavía y los emite AG-03M. El glosario lo declara como constancia de barrido en §7 y no como omisión, que es el tratamiento correcto.

Las otras tres series están consistentes: `B-UX-01` a `B-UX-27` (27 identificadores únicos en §10.2, sin huecos), `C-UX-01` a `C-UX-05`, `S-UX-01` a `S-UX-04`.

### 5.5 Gobierno del glosario, los cuatro criterios de `Master-Prompt` §10

**Sin contradicciones.** Ningún término tiene dos definiciones incompatibles entre los 25. Las dos definiciones que el origen duplicaba contra 02 —`Estado agregado` y `Resultado por contenedor`— pasaron a §5.2 como referencia con su texto de consecuencia preservado íntegro, y ya no son definiciones. Verificado: **0 colisiones exactas de nombre** entre los 63 términos con definición propia y las filas de `Glosario-Funcional.md` o del glosario raíz de `Vision-Producto.md` §9.

**Completitud.** Es el criterio de fondo del corte y el que produce el único P1.

- **Transición verificada:** 39 términos con definición propia en `Glosario-UX-v1.0` → **63** en la 2.0. Los que salieron de la zona de definición son **exactamente 2**, los dos que pasaron a referencia. Los otros **37 sobreviven**. Las entradas nuevas son **26**, y coinciden una a una con la lista que la fila de control de cambios enumera.
- **Procedencia de las definiciones nuevas.** Se muestrearon 13 de 26. Las 13 se rastrean al uso de los hermanos, no a redacción propia. Dos ejemplos del nivel de rastreo alcanzado: la entrada **insignia** —«SVG de un único set por producto que hereda el color de su contenedor. No es glifo de texto ni emoji, y es decorativa cuando va acompañada de su etiqueta»— se compone de `Experiencia-De-Uso.md`:438 («Las insignias son SVG con `currentColor`, de un único set vectorial, no glifos de texto ni emoji») y de `Representacion-Lenguaje-Visual-De-Estados.md`:157 («La insignia es decorativa cuando va acompañada de su etiqueta, y se marca como tal para que el lector de pantalla no la anuncie dos veces»); la entrada **presentación del par de estado**, con sus tres densidades «compacta / con antigüedad / con causa», es la transcripción del bloque ASCII de §2 de esa misma representación. **Cero definiciones sin origen rastreable en la muestra.**
- **Regla de inclusión, dirección «no sobra»: verificada.** De los 32 candidatos descartados de §9.1, **28 tienen forma literal comprobable y los 28 viven en un solo artefacto o en ninguno con esa forma exacta**. Los 4 restantes son los que el propio §9.1 declara con forma distinta en disco («su ficha», «declarada vacía», «zonas del nodo», «canales redundantes»), y el documento lo dice: «Se declaran con la forma que el disco tiene». Ninguno de los 32 debería haber entrado.
- **Regla de inclusión, dirección «no falta»: un hueco.** Muestreo por extracción automática de 36 candidatos en negrita presentes en tres o más artefactos y ausentes del glosario. La mayoría son fragmentos de prosa, no términos. Uno resiste el filtro: **«vía de alta»** — H-01, P1. Un segundo, «imagen de registro», queda cubierto de forma indirecta por la constancia de la familia «registro» de §9.2 y se registra dentro del mismo hallazgo.
- **Los 25 referenciados de §5** verifican: 12 en §5.1 contra el glosario raíz y 13 en §5.2 contra `Glosario-Funcional.md`. Las anclas de las 35 citas cross-file resuelven, incluidas las 12 a `Vision-Producto.md#9-glosario-del-dominio` y las que apuntan a `Glosario-Funcional.md#31-registro--cinco-referentes`, `#32-resolución--dos-referentes`, `#35-huérfano--dos-referentes`, `#37-etiqueta--dos-referentes` y `#38-criterio-negativo-polisemias-verificadas-que-no-se-califican`.
- **Las dos diferencias declaradas de §5.3 verifican en disco.** `Modo pendiente`: el intake §12 dice «Estado visual, **en violeta**, de un nodo o arista que existe en el changeset pero todavía no se aplicó» y `Vision-Producto.md`:267 lo transcribe **sin el color**. La entrada declara la diferencia como «de nivel de declaración, no de referente», que es la lectura correcta. `Huérfano`: `Vision-Producto.md` §9 y `Glosario-Funcional.md` §3.5 declaran los dos referentes del dominio y 03 agrega solo la variante visual, declarada como precisión de superficie. **Nota:** el orquestador declaró «3 diferencias»; el artefacto declara **2** en §5.3 y es internamente consistente. Se registra en H-03.

**Polisemia gobernada.** El glosario declara **una** familia, «resolución», con cinco referentes, y adopta el **primer escalón** de `Vocabulario-Rules` §9.3 —entrada de glosario— declarando por qué el segundo no hace falta. La adopción es correcta y su justificación es la buena:

- El criterio invocado es el de §9.2: **la forma desnuda de una familia calificada es el caso que hay que mirar**. R2, R3, R4 y R5 aparecen siempre calificados; R1 se escribe «la resolución» a secas en §4 y §5 del informe de conflicto, que son las tablas que se despachan por separado a 06 y a 08. Verificado: 37 de las 59 «resolución» de cuerpo de los 23 artefactos hermanos viven en ese documento, repartidas en las diez secciones que la entrada nombra.
- **Ninguna ocurrencia se calificó.** El conteo de cuerpo de los 23 hermanos es **59** antes y **59** después, lo que la entrada afirma y este audit confirma. Calificar las 37 habría sido el anti-patrón que §9.1 describe.
- Los cinco referentes se verificaron en los documentos y secciones que la tabla cita. R5 se declara «no vive en 03» y se referencia a `Glosario-Funcional.md` §2.4 y §3.2: correcto, cero ocurrencias de `Resolución de la referencia` o `Momento de resolución` en los 25.

**Criterio negativo: las polisemias evaluadas y descartadas.** Se enumeran acá, según `Master-Prompt` §10 punto 5, **para que la ronda siguiente no las vuelva a levantar**. Las ocho las declara `Glosario-UX.md` §9.2 y las ocho se verificaron en disco:

| # | Familia | Por qué **no** es hallazgo | Verificación propia |
| --- | --- | --- | --- |
| 1 | **«proyecto», tres referentes** — entidad del dominio, unidad de compilación, emprendimiento | Contextos disjuntos: producto, código, proceso. El intake §12 los declara con evidencia y decide no calificar el tercero; `Vision-Producto.md` §9 transcribe la decisión con tres filas —`Proyecto SelfHosted`, `Proyecto de código`, `Proyecto`— y `Glosario-Funcional.md` §3.8 la respeta | Las tres filas existen en `Vision-Producto.md`:245-268. 03 no la reabre. **No es hallazgo** |
| 2 | **«resolución», cinco referentes** | **Sí** se desambigua, con entrada de glosario. Es el único caso de la categoría | Ver arriba |
| 3 | **«registro», cinco referentes** | Declarada en `Glosario-Funcional.md` §3.1. 03 usa las formas calificadas «registro del contenedor» —el nombre de `SUP-08`— y «registro del sistema» | El ancla resuelve. Es el caso canónico que `Vocabulario-Rules` §9.1 usa como ejemplo de falso positivo. **No es hallazgo** |
| 4 | **«esqueleto», dos referentes** | 28 de 29 ocurrencias son el estado de carga; 1, en `Experiencia-De-Uso.md` §2.1, designa los esqueletos en arte ASCII del catálogo de diseño. Ninguna sección contiene los dos | «esqueleto» aparece en 14 artefactos. **No es hallazgo** |
| 5 | **«asimetría», tres referentes** | Tres objetos en tres documentos, sin sección compartida: los dos formatos de exportación, la superficie que produce un código frente a la que lo exhibe, y el efecto de un alta sobre la sesión | Verificado en los tres documentos que cita. **No es hallazgo** |
| 6 | **«zona», dos referentes** | Zona del nodo frente a zona de la composición. La primera está siempre calificada: «zona de métricas», «zona de red», «zona de pie» | Verificado. **No es hallazgo** |
| 7 | **«etiqueta», referentes de superficie y de dominio** | Los dos del dominio están en `Glosario-Funcional.md` §3.7 y se referencian; los dos de superficie son etiqueta textual del par de estado y rótulo de control, y la entrada de §3 califica el primero | El ancla resuelve. **No es hallazgo** |
| 8 | **«higiene», «ámbito», «procedencia», «huérfano»** | Las cuatro declaradas en `Glosario-Funcional.md` §3.3 a §3.6. 03 las usa tal cual y solo agrega la variante visual del huérfano, declarada como precisión de superficie | Verificado. **No es hallazgo** |
| 9 | **«migración» en las filas de control de cambios** | Las 25 filas nuevas usan la forma calificada «migración normativa» que R6 exige. Las menciones históricas no se reescriben, por §VI.2 | Verificado en las 25. **No es hallazgo** |

### 5.6 La premisa falsa del orquestador

El orquestador propagó al lote del glosario que «resolución» colisiona en `Wireframes-Lienzo-Del-Proyecto` §5 contra §5.1. **Verificado en disco: la colisión no existe.** El barrido sección por sección de ese documento devuelve `resoluci` en **§5.1 (1 ocurrencia)** y en el control de cambios, y **cero en §5**. La premisa era falsa.

**Ningún documento quedó apoyado en ella**, y la verificación es directa:

1. `Glosario-UX.md` §8.1 **la repudia explícitamente**: «La justificación de esta entrada **no** es una colisión de dos sentidos dentro de una misma sección: el barrido por ocurrencia no encontró ninguna sección de 03 que contenga dos referentes distintos de la palabra». Re-funda la entrada en el criterio verificable de §9.2 —forma desnuda de una familia calificada en secciones que se despachan por separado— y nombra las dos secciones concretas donde eso ocurre.
2. La fila **R3** de la tabla de §8.1 cita `Wireframes-Lienzo-Del-Proyecto` **§5.1**, que es donde la ocurrencia efectivamente está. No cita §5.
3. Barrido sobre los 25 de las cadenas «§5 contra §5.1», «§5 y §5.1» y «colisiona en»: **cero ocurrencias**. Ningún otro documento menciona la colisión.

El lote hizo lo que `Vocabulario-Rules` §9.4 exige: no declaró la desambiguación sin verificar la colisión, encontró que la premisa recibida era falsa, y dejó escrito el criterio con el que sí se sostiene. **Es el manejo correcto y no genera hallazgo.**

### 5.7 Las otras dos declaraciones del orquestador

**El recuento de brechas del README, de 22 a 25 vigentes sobre 27.** Es **fuente admitida** y está bien resuelto. Tres razones:

- `Migracion-Rules.md` §4.1 admite tres fuentes y la segunda es «un documento hermano del mismo destino». `Experiencia-De-Uso.md` §10.2 es hermano, y §9.2 y §7 del propio README lo declaran **tabla canónica** de la serie `B-UX-XX`. Verificado en disco: §10.2 contiene **27 identificadores únicos**, `B-UX-01` a `B-UX-27`, sin huecos; con la retirada de §10.2.1 y la cerrada `B-UX-09`, **25 vigentes**. El número es correcto.
- **Nada se perdió**, que es lo que §4.2 regla 2 protege. El README no borró el recuento anterior: lo conserva en el mismo párrafo —«La versión 1.1 de este índice declaraba "veinte vigentes sobre veintidós identificadores emitidos"»— y explica por qué cambió. Es preservación con reconciliación declarada, no sobreescritura.
- La consistencia interna cierra: §7.3 reparte **22** identificadores, que son los 25 vigentes menos los 3 que §7.1 y §7.2 ya tratan aparte. Medido: 22 identificadores únicos en §7.3.

El único defecto asociado no es del README sino del registro: la columna «fuente de contenido» del plan sigue declarando «documento de origen» para esa fila. Es **H-02**.

**`Experiencia-De-Uso.md` §9.1 y sus «dieciséis wireframes».** **Detenerse fue correcto.** La inconsistencia es **heredada, no introducida**: el diff de cuerpo contra `Experiencia-De-Uso-v1.1.md` muestra que las tres menciones —«el §8 de los dieciséis wireframes», «los dieciséis lo cumplen» y «Wireframes asociados | Los 16 de `Wireframes/`»— están **idénticas en el archivado**, y que §9.2 ya decía «Dieciocho» en la versión 1.1. El desfase nació cuando esa versión sumó `SUP-17` y `SUP-18` sin recorrer §9.1.

Corregirlo habría sido una intervención de contenido y no una re-expresión: ninguna regla de la 4.0 fija ese número, el archivado no lo trae corregido y no hay respuesta humana que lo autorice. `Migracion-Rules.md` §4.1 y §4.2 apuntan las dos a declarar; `Master-Prompt.md` §9 pide detenerse ante la ambigüedad en lugar de resolverla por cuenta propia. El lote declaró y se detuvo. Queda registrado como **H-05, P3**, para que lo cierre el titular de la categoría —no la migración— antes de que la Fase B2 consuma §9.1.

### 5.8 La columna «fuente de contenido» del plan §4, fila por fila

Tres cortes seguidos produjeron el mismo hallazgo y el plan lo corrigió en §8.1, con una consecuencia explícita: «para el corte 4 la columna se declara documento por documento **antes** de despachar, y no por categoría». Verificación:

| Documentos | Fuente en el plan §4 | Fuente que el documento declara en su fila 2.0 | Coincide |
| --- | --- | --- | --- |
| Los 18 wireframes y las 4 representaciones | documento de origen | documento de origen, más el `PRODUCT-MANIFEST` §2 para el único campo de cabecera que se suma | Sustancialmente **sí** |
| `Experiencia-De-Uso.md` | documento de origen | «el documento de origen» — pero §2.2 incorpora la referencia a `Glosario-Funcional.md` de 02, que es un hermano | **No** |
| `Glosario-UX.md` | documento de origen | «el documento de origen, más los **veintitrés artefactos hermanos** del propio destino, más los **dos glosarios upstream**, más el `PRODUCT-INTAKE` §12 y §20 E-18 — **no es "documento de origen" a secas**, y el grueso del trabajo de esta versión sale de los hermanos» | **No** |
| `README.md` | documento de origen | «el documento de origen, más los **veinticuatro artefactos hermanos** del propio destino y el estado del disco — **no es "documento de origen" a secas**» | **No** |

Los 25 documentos declaran su fuente en su propia fila, y las tres que exceden «documento de origen» lo dicen con esas palabras. El defecto es **del plan**, que es el artefacto donde `Migracion-Rules.md` §6 criterio 1 pide que la declaración viva: sus 25 filas siguen diciendo «documento de origen». Es **H-02, P2**, cuarto corte consecutivo.

### 5.9 Trazabilidad y coherencia de referencias

- **428 enlaces relativos** en los 25, **cero rotos**. Incluye los 18 enlaces a los wireframes desde README y §9.2, los 4 a las representaciones, y los ~180 a `02-Especificacion-Funcional/Casos-De-Uso/`.
- **35 anclas cross-file**, **cero que no resuelven** contra los encabezados del archivo destino.
- **Cobertura `SUP → CU`:** las 18 filas de §9.2 y la inversa de §9.3 son consistentes. Los conjuntos de casos de uso del §8 de cada wireframe coinciden con su fila de §9.2 en **17 de 18**; la excepción es `Wireframes-Panel-Lateral-Del-Servicio.md`, **H-06, P3**, heredada idéntica del archivado.
- **Las 4 representaciones** declaran en su §6 las superficies que las invocan, y las tres listas —§6 de cada representación, §9.2 del marco y §4.3 del README— coinciden.
- **Trazabilidad de la tabla tipo de §4.3:** las catorce filas viven una sola vez, en `Experiencia-De-Uso.md` §9.1, con la decisión declarada y su origen en el hallazgo `H-17` del audit de la Fase B. Los 18 wireframes cumplen los cuatro puntos que §4.2.1 punto 8 les pide y suman la fila de catálogo de diseño que §1.4 exige. Es el tratamiento correcto y no una omisión.

---

## 6 · Hallazgos

### H-01 · P1 · «Vía de alta», término que la categoría usa como título de sección en dos wireframes y que aparece en tres artefactos, no está declarado en `Glosario-UX.md` ni entre los candidatos descartados

**Archivo:** `SDD/Docs/03-UX-UI-DX/Glosario-UX.md` §2 y §9.1
**Regla:** `Rules-UX-UI-DX` 4.0 §3.3 tercer punto y §6 criterio 12; `Vocabulario-Rules` 2.1 §10 («todo término que la fase acuña y que aparece en más de un artefacto está declarado en el glosario de su categoría»)

**Evidencia.** «Vía de alta» aparece en el cuerpo de **3 de los 23 artefactos hermanos**, con 13 ocurrencias:

| Artefacto | Ocurrencias | Peso |
| --- | --- | --- |
| `Wireframes-Catalogo-De-Plantillas.md` | 8 | **Dos títulos de sección**: «3.2 El catálogo es una vía de alta, no un origen» y «3.8 El estado vacío deriva a las otras vías de alta» |
| `Wireframes-Lienzo-Del-Proyecto.md` | 4 | **Un título de sección**: «3.1 El menú de las siete vías de alta». Y la declaración conceptual: «El intake declara **dos ejes independientes**: la **vía de alta**, que es cómo llega el administrador y que **no se persiste**, y …» |
| `Wireframes-Alta-De-Servicio.md` | 1 | Fila de la tabla de componentes de §3: «Menú de vías de alta» |

El término no está:

- entre los **63** con definición propia de §2 a §4 y §7;
- entre los **25 referenciados** de §5.1 y §5.2;
- entre los **32 candidatos descartados** de §9.1, que solo lista el derivado «delta de la vía» con 1 ocurrencia;
- entre las **8 constancias** de §9.2.

Y **no tiene entrada propia en ninguno de los dos glosarios upstream** que permita aplicar la salida «se referencia y no se duplica» de §3.3: en `Vision-Producto.md` §9 aparece solo dentro de la definición de `Catálogo` («Es la cuarta vía de alta de un servicio») y en `Glosario-Funcional.md` solo dentro de las definiciones de `Origen` y de `Verificación del origen`. La única mención en la entrada de §2 del glosario de 03 es incidental, dentro de la definición de **grilla de tarjetas**: «Es la composición de las **siete vías de alta**, del catálogo, del listado de proyectos y del descubrimiento».

**Por qué importa.** Es un eje del modelo de alta, distinto del origen y explícitamente no persistido, y su ordinal ya derivó una vez dentro de la propia categoría: `Wireframes-Catalogo-De-Plantillas.md`:118 registra que la versión 1.0 decía «cuarta vía de alta» sobre «tres orígenes reales», y `Wireframes-Lienzo-Del-Proyecto.md` sigue teniendo «las **cuatro** vías de alta» en su tabla de componentes de §3 y «las **siete** vías de alta» en el título de §3.1 —desfase heredado idéntico del archivado—. Un consumidor de 05, 06 u 08 que reciba una de esas secciones sueltas no tiene dónde resolver qué numera la serie ni por qué el número cambió. Es exactamente el hueco que la 4.0 convirtió en obligación al hacer el glosario obligatorio y verificable por completitud.

**Caso secundario, del mismo hallazgo.** «Imagen de registro» aparece en **4** artefactos de 03 —`Experiencia-De-Uso`, `Wireframes-Alta-De-Servicio`, `Wireframes-Panel-Lateral-Del-Servicio`, `Wireframes-Lienzo-Del-Proyecto`— como nombre de dos de las vías y de dos de los valores de la variante discriminada `Origen`. En `Glosario-Funcional.md` vive **dentro** de la entrada `Origen`, no como entrada propia. Queda cubierto de forma indirecta por la constancia de la familia «registro» de §9.2, que remite a `Glosario-Funcional.md` §3.1, y por eso no se levanta como hallazgo aparte: se registra para que la fila que cierre H-01 lo contemple.

**Por qué es P1 y no P0.** No rompe trazabilidad, no omite ningún documento obligatorio, no introduce vocabulario prohibido y no falta ninguna cabecera. Es un incumplimiento del §6 del archivo de reglas de la categoría, que `Master-Prompt.md` §10 clasifica como P1. **Tampoco es contenido inventado**: el término existe en los tres artefactos y en el intake; lo que falta es la entrada que los recoge.

**Por qué es P1 y no P2.** Los cortes 1 y 2 fijaron el precedente con «brecha» y con «conjunto de servicios», y las dos filas se agregaron. El gobierno del glosario es uno de los dos criterios que el salto de `Rules-UX-UI-DX` a la 4.0 incorpora —el otro es la existencia del artefacto—, de modo que es precisamente lo que este corte tenía que dejar cumplido. Y la asimetría lo agrava: el propio §9.1 declaró 32 candidatos descartados con su conteo «para que una ronda de auditoría posterior no los levante como omisión», y este término no está ni en esa lista.

**Recomendación.** Agregar a `Glosario-UX.md` §2 la entrada **Vía de alta**, con la definición tomada de `Wireframes-Lienzo-Del-Proyecto.md` §3.1 —el eje de cómo llega el administrador al alta, que no se persiste y es independiente del origen— y con la columna «Artefactos de 03» declarando los 3 verificados. Alcanza una fila. Al hacerlo, resolver también el desfase «cuatro vías» / «siete vías» de `Wireframes-Lienzo-Del-Proyecto.md` §3, que es heredado y no es defecto de esta migración, o declararlo como brecha con destinatario.

---

### H-02 · P2 · La columna «fuente de contenido» del plan §4 declara «documento de origen» para las 25 filas de 03, y tres documentos usaron además hermanos, el upstream y el intake · cuarto corte consecutivo

**Archivo:** `SDD/Docs/Audit/Plan-Migracion-4.1-a-6.0.md` §4, las 25 filas de `03-UX-UI-DX`
**Regla:** `Migracion-Rules.md` §2.1 y §6 criterio 1

**Evidencia.** Las 25 filas de §4 (líneas 312 a 336) declaran «documento de origen», sin excepción. Los propios documentos declaran otra cosa, en sus palabras:

- `Glosario-UX.md`: «Fuente de contenido: el documento de origen, más los **veintitrés artefactos hermanos** del propio destino, más los **dos glosarios upstream**, más el `PRODUCT-INTAKE` §12 y §20 E-18 — **no es "documento de origen" a secas**, y el grueso del trabajo de esta versión sale de los hermanos».
- `README.md`: «Fuente de contenido: el documento de origen, más los **veinticuatro artefactos hermanos** del propio destino y el estado del disco — **no es "documento de origen" a secas**».
- `Experiencia-De-Uso.md`: declara «el documento de origen», pero su §2.2 incorpora la referencia a `Glosario-Funcional.md` de 02 y la obligación de §3.3 de referenciar en lugar de redefinir, que es un hermano.
- Los 22 restantes suman el `PRODUCT-MANIFEST` §2 para el campo de cabecera nuevo.

**El agravante es que el plan se había corregido para esto.** Su §8.1 declara: «**Tres cortes seguidos produjeron el mismo hallazgo** —H-03 en el corte 1, y su repetición en los cortes 2 y 3— y la causa es de este plan», y cierra con «**Consecuencia para el corte 4**: la columna se declara documento por documento **antes** de despachar, y no por categoría». Las 25 filas no se tocaron.

**Por qué es P2 y no P0.** El P0 de `Master-Prompt-Migracion.md` §10 es contenido que **no proviene** de una fuente admitida. Acá las cuatro fuentes usadas son admitidas: documento de origen, documento hermano —del propio destino, incluidos los artefactos de 02 y los de 03—, y el intake con el manifiesto, que el plan ya trató como fuente válida en su §8.1 para las 25 filas de `CU-01` a `CU-13` y `CU-27` a `CU-38`. **No hay invención**: los 25 documentos declaran su fuente en su propia fila de control de cambios. El defecto es de registro en el plan, que es donde §6 criterio 1 pide que la declaración viva.

**Recomendación.** Corregir las cuatro clases de fila en §4 antes de M5 y anotar en §8.1 que el patrón se repitió por cuarta vez, con la causa: la consecuencia se escribió y no se convirtió en un paso ejecutable del despacho. La corrección se hace sobre el plan y no toca ninguno de los 25 documentos.

---

### H-03 · P2 · Al menos seis conteos que el glosario declara «verificados en disco» y «no una estimación» no reproducen

**Archivo:** `SDD/Docs/03-UX-UI-DX/Glosario-UX.md` §1.1, §2, §3, §5.2 y §8.1
**Regla:** D9 y `Master-Prompt.md` §10, criterio de evidencia verificable

**Evidencia.** §1.1 afirma: «La columna "Artefactos de 03" de §2 a §4 y de §7 es el resultado de ese barrido y **no una estimación**: cada conteo se verificó en disco». Se midieron los 63. La mayoría reproduce con tolerancia de flexión —los 18 `SUP-XX`, los 19 «punto de quiebre», los 14 «esqueleto», los 7 «descriptor», los 5 «marcador de origen indeterminado», los 4 «distintivo de artefacto preliminar», los 6 «catálogo de códigos», los 4 «estado vacío por filtro», los 6 «shell de acceso», los 4 «regla de continuidad del lazo», entre otros—. **Cuatro no reproducen por un margen que la flexión no explica:**

| Término | Declarado | Medido, con flexión y forma corta | Método |
| --- | --- | --- | --- |
| **Región de estado** | 16 | **6** — `Alta-De-Servicio`, `Catalogo-De-Plantillas`, `Imagenes`, `Registro-Del-Contenedor`, `Revision-De-Higiene`, `Variables-Compartidas`. Con la forma conceptual «rol de estado / no interrumpe» sube a 10 | `regi(o\|ó)n(es)? de estado`, insensible a caso, sobre los 23 artefactos |
| **Grilla de tarjetas** | 8 | **3** — `Alta-De-Servicio`, `Catalogo-De-Plantillas`, `Listado-De-Proyectos`. «Grilla» a secas aparece en 7 | `grilla de tarjetas` |
| **Par de color** | 5 | **3** — `Representacion-Banda-De-Resultado`, `Informe-De-Conflicto`, `Tablero-De-Estado` | `par(es)? de color` |
| **Acción diferenciada** | 6 | **4** — `Cajon-De-Cambios-Pendientes`, `Descubrimiento-E-Incorporacion`, `Listado-De-Proyectos`, `Panel-Lateral-Del-Servicio` | `acci(o\|ó)n(es)? diferenciada` |

Dos conteos más, fuera de esa columna:

- **§5.2**: «verificado comparando las 43 entradas del documento de origen contra las **178 filas** del funcional». `Glosario-Funcional.md` tiene **175 líneas de tabla** en su cuerpo, de las que 23 son encabezados y 23 separadores: **≈129 filas de datos**. El número 178 no reproduce por ningún criterio de conteo.
- **§8.1**: «el conteo de la cadena `resoluci` en los veintitrés artefactos es el mismo antes y después de este lote: **90** contando las filas de control de cambios y **59** de cuerpo». **El 59 verifica exactamente.** El otro es **95**, no 90.

**Nota sobre el recuento de diferencias declaradas.** El orquestador declaró «3 diferencias declaradas»; el artefacto declara **2** en §5.3 y su título lo dice: «Los **dos** casos donde esta categoría declara la diferencia». El artefacto es internamente consistente; la discrepancia es de la declaración de cierre.

**Por qué es P2 y no P0 por D9.** `Master-Prompt.md` §10 distingue «una afirmación sin evidencia», que es P1, de «una evidencia que no resuelve», que es P0. Acá la evidencia **resuelve**: el corpus existe, es el correcto, y el barrido es reproducible —lo reprodujimos—. Lo que falla es el número derivado de él. Es la misma distinción con la que los cortes 2 y 3 graduaron `H-03` y `H-02-r2` en P2.

**Por qué no afecta la completitud del glosario.** Ninguno de los cuatro conteos cambia una decisión de inclusión: los cuatro términos aparecen en **más de un** artefacto tanto con el número declarado como con el medido, de modo que los cuatro corresponden al glosario en cualquiera de las dos lecturas. La regla de inclusión se aplicó bien; lo que está mal es la cifra que la documenta.

**Recomendación.** Recontar las cuatro filas y las dos cifras de §5.2 y §8.1 con el mismo script, y declarar en §1.1 el patrón de búsqueda usado —forma literal, forma flexionada o concepto—, que es lo que hace el conteo reproducible por un tercero. Sin el patrón declarado, «verificado en disco» no es verificable.

---

### H-04 · P2 · Sub-sustitución en `README.md`: dos ocurrencias de «proyecto» a secas designan la unidad de compilación, y las mismas dos frases sí se promovieron en el hermano canónico

**Archivo:** `SDD/Docs/03-UX-UI-DX/README.md` líneas 143 y 160
**Regla:** `Vocabulario-Rules.md` 2.1 §4 R1 y §10 primer criterio («No aparece "proyecto" a secas designando una unidad de compilación ni un producto»)

**Evidencia.** Las dos ocurrencias, con su hermano promovido al lado:

| README | Hermano | Referente |
| --- | --- | --- |
| :143 «`Design-Rules-Web-Generico.md` \| 1.2 \| Base obligatoria de todo **proyecto** con interfaz web» | `Experiencia-De-Uso.md`:140 «Piso obligatorio de todo **proyecto de código** con interfaz web» | La unidad D8 a la que se aplica el catálogo base |
| :160 «…el catálogo base, que además prohíbe definir tokens por **proyecto**» | `Experiencia-De-Uso.md`:715 y :751, y `Representacion-Lenguaje-Visual-De-Estados.md`:117, las tres «por **proyecto de código**» | La unidad D8 que tendría prohibido definir el token |

Las dos frases del README son la vista resumida de contenido que vive en `Experiencia-De-Uso.md` §2.1 y §10.1, y en las dos el referente es inequívocamente la unidad de compilación: no es la entidad del dominio —un proyecto SelfHosted no aplica reglas de diseño ni define tokens— ni el emprendimiento. Las dos vienen sin promover del archivado (`README-v1.1.md`:137 y :154).

**Por qué es P2 y no P0.** La dirección es la inversa del daño: es sub-sustitución, no sobre-sustitución. El plan §3.5 Paso 3 la califica de antemano como «un defecto menor y visible», frente al «proyecto de código» puesto sobre la entidad del dominio, que «corrompe la especificación y se lee como correcto». No hay ninguna ocurrencia de la segunda clase.

**Por qué es P2 y no P3.** Es un incumplimiento directo del primer criterio de aceptación de `Vocabulario-Rules.md` §10, no una tensión de estilo, y la omisión es **demostrable en lugar de opinable**: el mismo enunciado se promovió en el hermano dentro del mismo corte, de modo que el criterio de referente ya estaba resuelto y aplicado. El resultado es además una inconsistencia entre dos artefactos vigentes de la misma categoría sobre la misma afirmación.

**Recomendación.** Promover las dos ocurrencias en `README.md`, con la justificación individual que las otras siete llevan, y agregarlo a la fila 2.0 de su control de cambios como corrección de audit absorbida —el documento está en estado `Propuesto`, de modo que `Master-Prompt.md` §5 permite absorberla sin subir versión ni archivar—.

---

### H-05 · P3 · `Experiencia-De-Uso.md` §9.1 conserva «los dieciséis wireframes» con dieciocho en disco · heredado, declarado y correctamente no propagado

**Archivo:** `SDD/Docs/03-UX-UI-DX/Experiencia-De-Uso.md` §9.1
**Regla:** D9; `Migracion-Rules.md` §4.1 y §4.2

**Evidencia.** §9.1 dice tres veces dieciséis: «su ausencia en el §8 de **los dieciséis wireframes** no se lea como omisión», «y **los dieciséis** lo cumplen», y la fila «Wireframes asociados \| Los **16** de `Wireframes/`». §9.2, dos secciones más abajo, dice «**Dieciocho** superficies» y lista `SUP-01` a `SUP-18`. En disco hay 18 archivos.

**La inconsistencia es heredada y no introducida.** El diff de cuerpo contra `Experiencia-De-Uso-v1.1.md` muestra las tres menciones idénticas en el archivado, y §9.2 diciendo «Dieciocho» también en la 1.1. El desfase nació al sumar `SUP-17` y `SUP-18` en esa versión.

**Detenerse fue correcto**, por las razones de §5.7 de este informe: ninguna regla de la 4.0 fija el número, el archivado no lo trae corregido, no hay respuesta humana, y `Master-Prompt.md` §9 pide detenerse ante la ambigüedad en lugar de resolverla. El lote declaró y no propagó, que es el comportamiento pedido.

**Por qué es P3.** No es defecto de la migración: es un defecto del origen preservado con fidelidad, y la fidelidad es lo que `Migracion-Rules.md` §4.2 protege. Se registra con nivel bajo porque el número es consumido por §4.4 de `Maqueta-Rules` en la Fase B2, que verifica superficies contra la categoría, y porque el `README.md` ya propaga la misma cifra vieja en otro lugar: su §8 declara «227 estados sobre **dieciséis** superficies», acompañado de la advertencia explícita de que «la cifra es la de la versión 1.0 y no incluye los estados de `SUP-17` ni de `SUP-18`, y el recuento sobre las dieciocho superficies queda pendiente». Esa advertencia es el tratamiento correcto y refuerza que el número está declarado como pendiente, no afirmado.

**Recomendación.** Cerrarlo el titular de la categoría, no la migración: actualizar §9.1 a dieciocho junto con el recuento de estados que el README deja pendiente, en una revisión de contenido posterior a M6. **No corregirlo dentro de esta migración**, que es lo que el lote decidió y este audit ratifica.

---

### H-06 · P3 · `Wireframes-Panel-Lateral-Del-Servicio.md` §8 omite `CU-38`, que §9.2 declara y resalta, contra la regla de coincidencia que §9.2 fija · heredado

**Archivo:** `SDD/Docs/03-UX-UI-DX/Wireframes/Wireframes-Panel-Lateral-Del-Servicio.md` §8
**Regla:** `Rules-UX-UI-DX` 4.0 §4.2.1 punto 8 y §6 criterio 8; la regla de gobierno de `Experiencia-De-Uso.md` §9.2

**Evidencia.** §9.2 declara para `SUP-06`: «CU-03, CU-13, CU-15, CU-18, CU-19, CU-35, **CU-38**», con `CU-38` resaltado. El §8 del wireframe enumera CU-03, CU-13, CU-15, CU-18, CU-19 y CU-35: **`CU-38` no aparece en ninguna parte del documento**. §9.2 declara además que esa fila «Reproduce su fila y **debe coincidir con ella carácter por carácter**».

Es el **único** desfase de conjunto en los 18: los otros 17 coinciden en el conjunto de casos de uso, con diferencias solo de orden y de presentación —el §8 de cada wireframe usa enlaces y agrega prosa de matización, lo que en rigor tampoco cumple «carácter por carácter» en ninguno de los 18—.

**Heredado.** `Wireframes-Panel-Lateral-Del-Servicio-v1.1.md` §8 tiene exactamente el mismo conjunto sin `CU-38`, y `Experiencia-De-Uso-v1.1.md`:640 ya declaraba «**CU-38**» resaltado. La migración preservó los dos con fidelidad.

**Por qué es P3.** No es defecto de la migración y no rompe ningún enlace: `CU-38` existe, está trazado desde `SUP-18` y desde §9.2, y su archivo resuelve. Lo que falta es la cobertura inversa en un §8. Se registra para que la Fase B2 no derive de ahí una superficie sin su caso de uso, y para que la regla «carácter por carácter» de §9.2 se enuncie con la exigencia que realmente aplica —coincidencia de conjunto, no de cadena—, porque como está escrita no la cumple ninguno de los 18.

**Recomendación.** Agregar `CU-38` al §8 del wireframe, o retirar el resaltado de §9.2 si la correspondencia era tentativa, junto con la corrección de H-05. Fuera de esta migración.

---

### H-07 · P3 · El §8 del plan sigue declarando las 25 filas de `03-UX-UI-DX` «sin resolver» después de cerrar el corte, y `Wireframes-Alta-De-Servicio.md` §5 no nombra dos de los cuatro estados mínimos

Se agrupan por ser los dos residuos de registro del corte, y por tener el mismo origen: algo que ya está resuelto en el contenido y no en el registro que lo declara.

**a) El registro de avance del plan.** `Plan-Migracion-4.1-a-6.0.md`:424 sigue diciendo «`SDD/Docs/03-UX-UI-DX/` \| 25 \| **Sin resolver.** Corte 4, pendiente», y §8 sigue totalizando «119 de 144». Al cerrar este corte son 144 de 144.

**Por qué no es el P0 número 6 de la migración.** Ese P0 es «una fila del plan **sin resolver y sin declarar**». Las 25 filas están **resueltas** —los 25 documentos existen en 2.0, con su archivado en el `_legacy/` de su propia carpeta y su fila nueva de control de cambios— y quedan **declaradas**, en la fila de cada documento y en este informe. Lo que está atrasado es el tablero, no el trabajo. Mismo criterio que `H-06` del corte 1, `H-04` del corte 2 y `H-07-r2` del corte 3, y cuarta repetición.

**b) Los estados mínimos de un wireframe.** `Rules-UX-UI-DX` 4.0 §6 pide que cada wireframe enumere al menos vacío, cargando, con datos y error. Medido sobre el §5 de los 18: **17 cumplen**. `Wireframes-Alta-De-Servicio.md` enumera **18 estados** y ninguno se llama «vacío» ni «con datos»; los equivalentes funcionales están —«Elección de vía» es el estado inicial, «Tronco, origen sin resolver» y «Configuración sin validar» cubren el tránsito, «Error» está nombrado— pero los dos rótulos no aparecen.

**Por qué es P3 y no P1.** El §5 de ese documento es **byte a byte idéntico al archivado**: la migración no quitó ni renombró ningún estado. Es un desfase de rótulo del documento de origen, y en una superficie de flujo por pasos «vacío» y «con datos» no tienen referente obvio: no hay una lista que pueda estar vacía. Levantarlo como incumplimiento de la 4.0 contra la migración sería pedirle a la migración que cambie contenido, que es lo que `Migracion-Rules.md` §4.1 le prohíbe.

**Recomendación.** Actualizar §8 y §8.1 del plan al cerrar el corte, antes de que M5 verifique que ninguna fila quedó sin resolver. Y, fuera de esta migración, evaluar si el §5 de `Wireframes-Alta-De-Servicio.md` conviene rotular sus estados iniciales y de contenido con los nombres canónicos, o declarar la excepción por tratarse de un flujo por pasos.

---

## 6-bis · Los seis P0 de una migración, uno por uno

| # | Hallazgo P0 de `Master-Prompt-Migracion.md` §10 | Cómo se verificó | Resultado |
| --- | --- | --- | --- |
| 1 | **Contenido que no proviene** del origen, de un hermano, del upstream o del intake | 39 → 63 términos: los 39 sobreviven (37 en su lugar, 2 convertidos en referencia con su texto preservado); las 26 nuevas coinciden con la lista declarada; **13 de 26 muestreadas al 50 %** y rastreadas cláusula por cláusula al texto de los hermanos. Los 22 wireframes y representaciones cambian entre 4 y 9 líneas de cuerpo, todas de vocabulario o cabecera. Los 21 bloques ASCII son byte a byte idénticos | **No se cumple** |
| 2 | **Sección exigida rellenada con contenido inferido** en lugar de emitida como pendiente | Ninguna sección se agregó a ningún documento: 11/11 en el marco, 9/9 en los 18 wireframes, 7/7 en las 4 representaciones, todas ya presentes en el archivado. `Glosario-UX.md` §9.3 declara «Ninguno» pendiente y lo sostiene con tres constancias que remiten a brechas ya identificadas (`B-UX-05`, `B-UX-07`, `B-UX-24`), no a valores inventados. `Wireframes-Imagenes.md` declara sus tramos dependientes de `Q-15` a `Q-21` y **no los completa con un valor plausible** | **No se cumple** |
| 3 | **Procedencia reescrita con migración parcial** | `PRODUCT-MANIFEST-SelfHosted-Service.md` §1.1 sigue declarando el conjunto **4.1**. Las 25 filas nuevas de control de cambios lo dicen con estas palabras: «el bloque de procedencia del destino no se tocó: sigue declarando 4.1, y cerrarlo es trabajo de M5» | **No se cumple** |
| 4 | **Corrección manual pisada** sin declarar la interpretación | Los 25 pares vivo/archivado se compararon en su cuerpo completo. Las 51 filas históricas están intactas; los 21 bloques ASCII, byte a byte; los 18 nombres canónicos y las cuatro series de identificadores, sin un carácter de cambio. Los tres documentos que la Fase B2 había corregido a mano —`Lienzo-Del-Proyecto` 1.1, `Panel-Lateral` 1.1, `Cajon-De-Cambios-Pendientes` 1.1, `Catalogo-De-Plantillas` 1.1, `Descubrimiento-E-Incorporacion` 1.1— conservan su fila 1.1 y su contenido | **No se cumple** |
| 5 | **Estado previo no archivado** en el `_legacy/` de su propia carpeta | 3 en `03-UX-UI-DX/_legacy/2026-07-30/`, 4 en `Representaciones/_legacy/2026-07-30/`, 18 en `Wireframes/_legacy/2026-07-30/`. **25 de 25**, cada uno con el sufijo de la versión que preserva. La corrección del Paso 2.b del plan se aplicó: no hay ningún `_legacy/` único espejando el subárbol | **No se cumple** |
| 6 | **Fila del plan sin resolver y sin declarar** | Las 25 están resueltas y declaradas, en la fila de control de cambios de cada documento y en este informe. El registro del plan está atrasado, que es **H-07 a**, P3 | **No se cumple** |

---

## 7 · Veredicto

# APROBADO CON OBSERVACIONES

**Cero hallazgos P0.** Un P1, tres P2, tres P3. Total: **7**.

El corte 4 es el más conservador de la fase, y es verificable sin creer a nadie: **los 21 bloques ASCII son byte a byte idénticos al archivado**, las **51 filas históricas** de control de cambios están intactas, los **18 nombres canónicos de superficie** coinciden término por término en los tres lugares donde viven, y los 22 wireframes y representaciones cambian entre cuatro y nueve líneas de cuerpo cada uno. La migración re-expresó y no regeneró.

**El punto crítico salió limpio.** Las **7 promociones** a «proyecto de código» son exactamente las declaradas, las siete caen sobre el referente del framework, y **ninguna sobre la entidad del dominio** —que en esta categoría da nombre a tres archivos, a tres nombres canónicos y a 449 ocurrencias que quedaron donde estaban—. En la dirección inversa quedaron dos ocurrencias sin promover en el README, que es el defecto menor y visible que el plan anticipó.

**Las «resolución» sobrevivieron todas**: 60 de cuerpo al abrir, 89 al cerrar, ningún documento con una menos, y el aumento explicado dígito por dígito. Cero «reproducto» reales: las dos del barrido están entrecomilladas dentro de filas que citan el daño evitado, y contarlas habría sido defecto de este informe.

**El glosario, que era el entregable de fondo, está bien construido y bien fundado.** Pasó de 39 a 63 términos sin perder ninguno de los de origen; convirtió en referencia las dos únicas colisiones exactas contra `Glosario-Funcional.md`; declaró una polisemia con el escalón más barato y sin calificar una sola ocurrencia; dejó 32 candidatos descartados y 8 constancias de barrido negativo escritas para que una ronda posterior no las levante; y, sobre todo, **detectó que la premisa que el orquestador le propagó era falsa, lo verificó en disco, lo dejó escrito y re-fundó la entrada en un criterio que sí se sostiene**. Ese es el comportamiento que `Vocabulario-Rules` §9.4 pide y que ningún corte anterior había tenido que ejercer.

Las dos decisiones que el orquestador sometió a evaluación se ratifican: **el recuento de brechas del README es fuente admitida** —hermano canónico, con el recuento anterior preservado en el mismo párrafo— y **detenerse ante los «dieciséis wireframes» de §9.1 fue correcto**, porque la inconsistencia es del origen y corregirla habría sido una intervención de contenido que §4.1 prohíbe.

### 7.1 Condiciones para promover

Ninguna es bloqueante. En orden de precedencia:

1. **H-01, P1.** Agregar la entrada **Vía de alta** a `Glosario-UX.md` §2, con los 3 artefactos verificados, y contemplar «Imagen de registro» al hacerlo. Es una fila y no toca ninguno de los otros 24 documentos. Es la única condición que afecta a un entregable.
2. **H-04, P2.** Promover las dos ocurrencias de `README.md`:143 y :160, con justificación individual.
3. **H-02 y H-07 a, P2 y P3.** Corregir el plan antes de M5: las 25 filas de la columna «fuente de contenido» en §4, y el registro de avance de §8 y §8.1. M5 verifica que ninguna fila quedó sin resolver, y con el tablero atrasado esa verificación arranca de una premisa falsa.
4. **H-03, P2.** Recontar las cuatro filas de la columna «Artefactos de 03», las «178 filas» de §5.2 y las «90» de §8.1, y **declarar el patrón de búsqueda** que sostiene cada conteo.
5. **H-05 y H-06, P3.** Fuera de esta migración, por el titular de la categoría: cerrar «dieciséis» → dieciocho en §9.1 con el recuento de estados que el README deja pendiente, y resolver el `CU-38` de `SUP-06`.

### 7.2 Lo que este informe deja declarado para la ronda siguiente y para M6

- **Las nueve polisemias con contextos disjuntos de §5.5 se evaluaron y se descartaron.** Volver a levantar cualquiera de ellas —en particular la familia «proyecto» y la familia «registro» con «imagen de registro»— es un defecto del informe que lo haga, por el criterio negativo de `Vocabulario-Rules.md` §10 y de `Master-Prompt.md` §10.
- **Las dos ocurrencias de «reproducto» del barrido son citas entrecomilladas dentro de filas de control de cambios** que declaran el daño evitado. No son ocurrencias reales.
- **Tres defectos son heredados del origen y fueron preservados con fidelidad**, que es lo que la migración tenía que hacer: los «dieciséis wireframes» de §9.1, el `CU-38` ausente del §8 de `SUP-06`, y el desfase «cuatro vías» / «siete vías» de `Wireframes-Lienzo-Del-Proyecto.md` §3. Ninguno se cuenta contra la migración.
- **La procedencia sigue declarando el conjunto 4.1**, y las 25 filas nuevas lo dicen explícitamente. Con este corte cerrado, las **144 filas** del plan quedan resueltas y M5 puede evaluar el cierre de procedencia sobre una cadena completa, que es la condición que `Migracion-Rules.md` §4.6 pone para tocarla.

---

## 8 · Control de cambios de este informe

| Versión | Fecha | Cambios | Autor |
| --- | --- | --- | --- |
| 1.0 | 2026-07-30 | Auditoría independiente de la **ronda 1** del **corte 4 y último** de la fase M4 de la migración normativa 4.1 → 6.0, sobre los **25** entregables de `03-UX-UI-DX` en versión 2.0, contra `Rules-UX-UI-DX` **4.0**, `Vocabulario-Rules` **2.1** §9 y §10, `Migracion-Rules` **1.0** §4 y §6, `Master-Prompt` §10, `Master-Prompt-Migracion` §10, `Deriva-Rules` y `SDD-Development-Guide` §VI.2. Cobertura del 100 % por script en cabecera y orden de campos, versiones, archivado por carpeta propia, **76 filas de control de cambios celda por celda**, **21 bloques ASCII byte a byte**, 428 enlaces, 35 anclas cross-file, 316 entradas de tabla de contenido, secciones obligatorias, los cinco barridos léxicos del plan §3.5 Paso 4, el censo completo de «proyecto de código» y de «resolución», los 18 identificadores de superficie en tres lugares y los 63 conteos del glosario. Muestreo declarado en la prosa: las 7 promociones al 100 %, 13 de las 26 definiciones nuevas del glosario al 50 %, y las secciones de riesgo de seis artefactos. **Cero P0**: los seis hallazgos P0 propios de una migración se verificaron uno por uno y ninguno se cumple. Un P1 de completitud del glosario, tres P2 —registro del plan, conteos no reproducibles y dos sub-sustituciones en el README— y tres P3, dos de ellos heredados del origen y preservados con fidelidad. Se ratifican las tres declaraciones que el orquestador sometió a verificación: la premisa falsa sobre la colisión de «resolución» **no sostiene ningún documento**, el recuento de brechas del README **es fuente admitida**, y **detenerse** ante los «dieciséis wireframes» de §9.1 **fue correcto**. **Veredicto: APROBADO CON OBSERVACIONES.** | Auditor independiente (Arquitecto de Soluciones + QA Senior) |
