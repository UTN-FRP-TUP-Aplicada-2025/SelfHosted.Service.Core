# Apuntes — Estado del framework SDD y puntos abiertos

| Campo | Valor |
|---|---|
| Fecha | 2026-07-29 |
| Análisis completo | `IA.SDD.Documentacion/PROMPTs/Features/11-Analisis/Estado.md` |
| Framework | `IA.SDD`, entrada vigente `[4.1]` de su `CHANGELOG.md` |
| Nota de coherencia | `IA.SDD/SDD/Devs/Guides/Coherencia-Roles-Y-Defectos-Verificados.md` |

Este documento es la **agenda de trabajo**: un punto por sección, para tratarlos de a uno. El análisis que los fundamenta está en el informe citado arriba; acá va lo accionable.

---

## Parte I — Lo que ya está aplicado

Intervenciones A y B del plan, publicadas como `[4.1]`. Nueve archivos editados más la nota de coherencia. No requerían decidir nada.

### I.1 Defectos verificados corregidos

| Defecto | Qué pasaba | Estado |
|---|---|---|
| Caso de los slugs | Los ejemplos de `Nombre-Solucion` y `Nombre-Proyecto` usaban minúsculas, variante que D3, el algoritmo de `Master-Prompt.md` §3.2 y **tres archivos de reglas** prohíben textualmente. El defecto se propagaba al nombre de archivo del intake | 66 ocurrencias normalizadas |
| Fichas AG-10 / AG-11 | Estaban **completamente intercambiadas** en el catálogo del marco teórico, contra sus propios archivos de reglas. La entrada 1.7 del control de cambios **declaraba** haberlas corregido | Corregidas, con sus interacciones cross-rol |
| Versión del manifiesto | `SOLUTION-MANIFEST-template.md` era el único artefacto de `Intake/` sin campo `Versión` en cabecera | Declara 2.1 |
| Rutas `rules/` | Cuatro citas a una carpeta que no existe; una caía en el primer paso de la validación de intake | Corregidas |
| Árbol del intake §16 | Mostraba `docs/` y `devs/Intake/` donde el orquestador fija `SDD/Docs/` y `SDD/Intake/`. Es el ejemplo que se copia | Corregido |
| `equipo_n` | Declaraba leerse de secciones del intake que no pedían ese dato. Gatea `Acuerdo-Equipo.md` y la forma de la categoría 07 | Pregunta nueva en el intake §2 |

Cuatro defectos más aparecieron durante la ejecución y se resolvieron en la misma pasada: referencias al `BRIEF` deprecado, residuos del intercambio 10 ↔ 11 en `Rules-Contexto.md`, y un conteo desactualizado en su prompt-snippet.

### I.2 Roles y autoridad de AG-00

- **Product Owner** y **stakeholder** quedan declarados como roles distintos, con entrada en los dos glosarios. El PO es humano, aguas arriba del intake, **fuera de la cadena AG-XX**, y dueño de la priorización y las exclusiones. El stakeholder es parcial y plural: aporta el material que el PO arbitra.
- **AG-00 formaliza, no arbitra.** Su §1.1 decía «forzar la priorización MoSCoW, declarar exclusiones explícitas». Esa frase venía del bootstrap del 2026-05-17, y `Intake-Rules.md` —que ya valida esas dos cosas antes de despachar cualquier subagente— no existió hasta el 2026-06-10. Nadie revisó el párrafo en el medio.
- **Catálogo de 18 ambigüedades** en `Rules-Contexto.md` §6.1, que AG-00 corre antes de redactar. Es el piloto de un patrón replicable a las once categorías restantes.

---

## Parte II — Puntos abiertos, uno por uno

Ordenados por dependencia. Los primeros desbloquean a los siguientes.

### Punto 1 — Separar producto, solución de código y proyecto de código

> Corresponde al apunte previo: *«separar la idea de proyecto, de producto, de solución .net»*.

**Es el punto de fondo de todo el análisis.** Hoy el framework tiene dos niveles en dos planos, y hacen falta cuatro.

| Nivel | Hoy en SDD | Estado |
|---|---|---|
| Producto de software (nombrado, del PO) | «Nombre de la solución» en la cabecera del intake | Existe el dato, no el concepto ni el nombre propio |
| Proyecto SDD (unidad D8, categorías 02-11) | Definido y canónico | Es un **componente entregable**, no un proyecto de código |
| Solución de código (`.sln`) | `NombreSolucionCodigo`, que en realidad es raíz de espacio de nombres | Existe como prefijo, no como artefacto |
| Proyecto de código (`.csproj`) | `nombre-proyecto-codigo` más `src/<x>/`, forzado 1:1 con el proyecto SDD | Existe, pero mal acoplado |
| Espacio de nombres | Solo aparece en la justificación del prefijo `Aplicada` | No existe como concepto |

**Las tres evidencias de que hace falta separarlos:**

1. **El producto no tiene nombre propio.** Un solo string alimenta el slug de documentación, la raíz PascalCase del código, el repo destino, el repo `.Documentacion` y el nombre del archivo de intake. Se rompe apenas el producto adopta nombre comercial y la raíz de código tiene que quedarse quieta por compatibilidad.
2. **`NombreSolucionCodigo` no es una solución de código: es una raíz de espacio de nombres.** El framework nunca emite un `.sln` ni artefacto agregador. La prueba está en la excepción de los redistribuibles: `Aplicada.Validaciones` escapa al prefijo porque «necesita un espacio de nombres estable e independiente de la solución que lo consume». Esa frase razona a nivel de namespace mientras llama «solución» a lo que manipula.
3. **El 1:1 se rompe en el propio mapa de sufijos del manifiesto.** Para `web-microservices`, §2.1 declara «un proyecto por servicio bajo `<NombreSolucionCodigo>.Services.<Servicio>` más `.Gateway` y `.BuildingBlocks`»: N proyectos de código bajo **una sola fila**, que tiene un único campo `nombre-proyecto-codigo` y un único path `src/`. Lo mismo con `library`: `.Core`, `.Abstractions`, `.Domain`, `.Infrastructure` son los proyectos que una librería real tiene **a la vez**, no cuatro alternativas.

**Qué hay que decidir:**

| Decisión | Opciones |
|---|---|
| ¿El nombre de producto se separa del de código? | Sí (habilita todo lo demás) / No (se deja el acoplamiento actual) |
| ¿El proyecto de código pasa a ser entidad enumerable, 1..N por proyecto SDD? | Sí (cierra la contradicción del mapa de sufijos) / No |
| ¿El espacio de nombres se declara como nivel? | Sí / Queda implícito en la convención de nombres |

**Severidad si se aplica:** major. Cambia el esquema de la tabla de composición, obliga a snapshot en `_legacy/`, entrada de `CHANGELOG.md` y declarar qué documentación emitida queda invalidada.

**Nota de alcance:** el conjunto cerrado D8 **no se toca**. Sus ocho valores describen componentes entregables, que es el nivel al que el proyecto SDD pertenece.

**Prerrequisito:** el punto 2, porque no se puede separar el nombre del producto sin haber definido antes qué es el producto.

---

### Punto 2 — Definir «producto» como concepto de primer nivel

Hoy el término no está en ningún glosario y se usa con **dos sentidos incompatibles**:

1. Sinónimo tácito de solución: la categoría 00 se llama «Contexto del producto» y emite `Vision-Producto.md` y `Roadmap-Producto.md`, pero su nivel declarado es Solución.
2. El sistema construido, por oposición a la maqueta: «no es el producto ni documentación viva».

**Lo que cambió respecto de la primera lectura.** En la primera pasada esto parecía un residuo a barrer, y la salida propuesta era renombrar la categoría 00 a «Contexto de la solución». **Se invierte:** el producto es el nivel superior que falta, con nombre propio y dueño declarado. La categoría 00 se llama «Contexto del producto» con razón — produce visión, alcance y roadmap, que son artefactos de producto y no de código.

**Qué hay que decidir:** solo con qué expresión se desambigua el segundo sentido (el sistema construido). La definición del concepto ya está resuelta por el modelo del punto 1.

**Severidad:** minor. Toca glosarios, la cabecera del intake y `Rules-Contexto.md`.

**Por qué conviene hacerlo temprano y barato:** evita que el punto 1, que es major, arrastre además la discusión terminológica.

---

### Punto 3 — Cerrar la triple asignación de la priorización

La priorización MoSCoW está declarada como responsabilidad en la §1.1 de **tres especialidades**, y ninguna rinde cuentas por ella:

| Especialidad | Qué declara | Estado |
|---|---|---|
| AG-00 Product Manager | «forzar la priorización MoSCoW» | **Corregido en `[4.1]`** |
| AG-01 Analista de Negocio | «con qué prioridad relativa» | Pendiente |
| AG-06 Scrum Master | «que la priorización MoSCoW refleje el valor real de negocio» | Pendiente |

**El modo de falla es acumulativo.** Si el intake trae la prioridad decidida, las tres la derivan y no pasa nada. Si no la trae, **las tres la inventan por separado**, cada una coherente consigo misma, y las tres versiones conviven sin contradecirse de forma detectable porque cada una vive en su categoría.

**Ya no requiere decidir nada:** el prerrequisito era tener el Product Owner declarado, y `[4.1]` lo dejó declarado.

**Severidad:** minor. Toca dos archivos de reglas.

**Es el mejor costo/beneficio de todo lo pendiente.** Recomiendo tratarlo primero.

---

### Punto 4 — Declarar la frontera del framework

El tramo previo al intake —juntar material, definir conceptos, volcarlos a la plantilla— es **externo al framework por diseño**, y es una metodología necesaria por derecho propio. El problema no es que esté afuera: es que **no está declarado como afuera**, y un tramo del que el framework no habla se lee como omisión y no como decisión de alcance.

**Lo que la aclaración ya resolvió:** la regla de autocontención de `Intake-Rules.md` §5 no es una norma de prolijidad, es **la condición de frontera**. El intake debe absorber todo porque nada del otro lado es resoluble por el framework. Eso es lo que vuelve al prompt integrador una pieza necesaria y no una comodidad.

**Lo que queda abierto:** el intake es el único documento de SDD **sin upstream declarado**, y D6 lo exige en cabecera. Dos salidas, ambas baratas:

- Campo de fuentes informativo, que aclare que es cita de auditoría no resoluble por el framework.
- Exención declarada de D6, con el intake como documento de frontera. Hay precedente de forma: la tabla de cinco exenciones de la política de deprecación.

**Qué hay que decidir:** cuánto se declara del contrato en el corte.

| Nivel | Qué incluye |
|---|---|
| 1 | Solo la exclusión: qué queda afuera y por qué |
| **2 (recomendado)** | La exclusión más el contrato de lo que cruza: intake conforme a plantilla, autocontenido, con §19 tildado, depositado en `SDD/Intake/` |
| 3 | Lo anterior más la especialidad del integrador declarada dentro del framework |

**Severidad:** minor. **No agrega ninguna fase al orquestador**: si el tramo es externo, el orquestador no debe orquestar lo que está afuera.

---

### Punto 5 — Qué hace el integrador ante contradicciones entre stakeholders

Deriva del punto 4 y tiene consecuencia operativa inmediata.

Si el prompt integrador actúa en rol de Product Owner, entonces **tiene que arbitrar**. Y cuando el material traiga posiciones de stakeholders que se contradicen —el caso normal— tiene dos salidas legítimas:

1. Resolver la contradicción, que es decidir sobre el producto.
2. Escalarla al Product Owner humano.

**Hoy nada dice cuál, y las dos fallas son reales:**

- Si transcribe ambas posiciones sin resolver, produce un intake que revienta después en la validación (§4 con todo en Must, §9 sin exclusiones).
- Si resuelve en silencio, **toma decisiones de producto que ningún humano aprobó**, y se propagan por las doce categorías.

**Recomendación:** escalar siempre. Es lo mismo que `[4.1]` estableció para AG-00, un paso más arriba.

---

### Punto 6 — Especialidades faltantes y desdoblamiento por nivel

De la evaluación de qué especialidad debe intervenir en cada categoría.

**Faltan tres**, y las tres tienen el patrón de gating ya resuelto por `usa_llm` y `requiere_maqueta`:

| Especialidad | Gatillo | Hoy quién lo hace | Por qué no alcanza |
|---|---|---|---|
| Product Owner | Siempre | Nadie declarado hasta `[4.1]` | Cierra el punto 3 |
| **AppSec** | `requiere_compliance` o `tiene_auth` | Repartido entre AG-05, AG-08 y AG-09 | La seguridad es transversal y adversarial, como QA. Repartida entre tres **constructores**, nadie la ataca |
| Modelador de Datos | `tiene_persistencia` | AG-02 y AG-05 | El modelo conceptual y el lógico son el mismo objeto en dos niveles, partido entre dos especialidades sin mandato compartido |

**Y dos deberían desdoblarse por nivel**, porque el trabajo cambia de naturaleza y la especialidad no:

| Cat. | Nivel proyecto | Nivel solución |
|---|---|---|
| 05 | Arquitectura interna: capas, componentes, ADR | Contratos inter-proyecto, grafo de dependencias → **Solution Architect** |
| 09 | Pipeline del proyecto | Orden de build topológico, coordinación productor/consumidor → **Release Engineer** |

La 11 también es de doble nivel y ahí **sí alcanza** una sola especialidad: es el mismo oficio en dos alcances.

**Severidad:** las especialidades gatilladas son minor. El desdoblamiento de 05 y 09 es **major**: toca el gating de dos categorías y cambia qué subagente se despacha en qué nivel.

**Prioridad:** AppSec primero si algún producto en curso es regulado.

---

### Punto 7 — El instrumento que falta: registro de decisión de producto

El framework ya sabe manejar a un agente que decide legítimamente: **el ADR**. Cuando AG-05 elige entre alternativas técnicas, deja registro con contexto, alternativas, decisión, consecuencias y estado.

**Ese instrumento existe solo en la categoría 05.** Las decisiones de producto —prioridad, exclusión, recorte de alcance, criterio de transición de fase— se escriben como si fueran hechos.

Es la raíz del problema que `[4.1]` atacó en AG-00: **el problema no es que un agente decida, es que decida sin dejar rastro de que hubo una decisión**. Un MoSCoW inventado no se ve absurdo, se ve razonable, y después la cadena D6 lo cita correctamente como upstream durante once categorías mientras el audit lo aprueba, porque el audit verifica forma y coherencia interna, no fidelidad a una intención que nunca se expresó.

**Qué hay que decidir:** si se incorpora el instrumento, o si alcanza con que la decisión se escale siempre al PO. No son excluyentes: escalar es la salida preferente, el registro sirve para cuando el PO delega explícitamente.

**Severidad:** minor.

---

### Punto 8 — Réplica del catálogo de ambigüedades a las once categorías restantes

`Rules-Contexto.md` §6.1 estrena el patrón con 18 ítems para la categoría 00. Convierte el mecanismo reactivo de `Master-Prompt.md` §9 —que hoy detecta lo que le llama la atención al subagente mientras escribe— en una verificación que corre **antes** de redactar.

**Recomendación:** esperar a que el patrón pruebe su valor en una corrida real antes de replicarlo. Es trabajo de volumen.

---

### Punto 9 — Menores

| Punto | Detalle |
|---|---|
| Lista de siglas de §3.2 | Enumera API, REST, UX, UI, DX, AI, CLI. CSV no está, así que la normalización estricta da `Parser-Csv`. Si CSV debe tratarse como sigla conocida, el lugar es la lista, no el ejemplo. **Ampliarla es una decisión, no un defecto** |
| «13 especialidades» | El marco teórico lo declara en §4.1 mientras la tabla §4.3 enumera catorce, por AG-03M. Determinar si AG-03M cuenta es decisión sobre el catálogo |
| Cuatro copias de la convención de nombres | Intake §13, manifiesto §1.2 y §2.1, `Intake-Rules.md` §4, `Master-Prompt.md` §3.2. Hoy dicen lo mismo: es superficie de deriva, no defecto. Conviene resolverlo **dentro del punto 1**, que ya toca esos archivos |
| Once enlaces relativos que no resuelven | En `Root-Rules.md` y `Rules-Necesidades-Negocio.md`. Son ejemplos del árbol generado en el destino, no enlaces de este repositorio. Cosmético y preexistente |

---

## Orden sugerido

| Paso | Punto | Por qué en ese momento |
|---|---|---|
| 1 | **Punto 3** | Ya no requiere decidir nada y cierra el modo de falla más caro |
| 2 | **Punto 2** | Barato, y desbloquea el punto 1 |
| 3 | **Puntos 4 y 5** | Independientes de todo lo demás, se pueden hacer en paralelo |
| 4 | **Punto 7** | Incremental, mejora la trazabilidad de todo lo anterior |
| 5 | **Punto 6**, parte gatillada | AppSec y Modelador de Datos, minor |
| 6 | **Punto 1** y **punto 6** parte de desdoblamiento | Los dos major, juntos, con un solo snapshot en `_legacy/` |
| 7 | **Punto 8** | Cuando el patrón haya probado su valor |
