# 01-Necesidades-Negocio — SelfHosted Service

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | README.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Cantidad de NB | 8 |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §2, §12, §23.1, §23.5; Vision-Producto.md §2.1, §2.2, §7.1 (RE-12), §9; Alcance-Producto.md §2.2, §6.2; 00-Contexto/README.md §5 |
| Trazabilidad downstream | 02-Especificacion-Funcional, 03-UX-UI-DX, 06-Backlog-Tecnico, 07-Plan-Sprint, 08-Calidad-Y-Pruebas |

---

## Tabla de contenido

- [§1. Qué contiene esta carpeta](#1-qué-contiene-esta-carpeta)
- [§2. Índice de necesidades](#2-índice-de-necesidades)
- [§3. Mapa de dependencias](#3-mapa-de-dependencias)
- [§4. Orden de lectura sugerido](#4-orden-de-lectura-sugerido)
- [§5. RACI](#5-raci)
  - [§5.1 Matriz por necesidad](#51-matriz-por-necesidad)
  - [§5.2 Quién valida como beneficiario](#52-quién-valida-como-beneficiario)
- [§6. Convenciones que esta categoría aplica](#6-convenciones-que-esta-categoría-aplica)
- [Control de cambios](#control-de-cambios)

---

## §1. Qué contiene esta carpeta

El catálogo de necesidades de negocio de SelfHosted Service: por qué existe cada capacidad del producto, a quién le duele lo que resuelve y con qué números se verifica que quedó resuelta.

| Archivo | Qué es |
| --- | --- |
| [Necesidades-Negocio.md](Necesidades-Negocio.md) | Índice maestro: tabla resumen, mapa de dependencias, trazabilidad agregada de capacidad a necesidad y de necesidad a caso de uso, decisiones de recorte y brechas abiertas |
| [Necesidades-De-Negocio/](Necesidades-De-Negocio/) | Ocho archivos, uno por necesidad, con las diez secciones obligatorias de la categoría |
| README.md | Este archivo: índice navegable, mapa de dependencias, orden de lectura y RACI |

Este README existe porque la categoría tiene más de cinco necesidades, que es la condición que las reglas constructivas fijan para exigirlo.

---

## §2. Índice de necesidades

| NB | Título | Impacto | Prioridad MoSCoW | Versión | Estado | Enlace |
| --- | --- | --- | --- | --- | --- | --- |
| NB-01 | Visibilidad unificada de la arquitectura de un conjunto de servicios | La arquitectura pasa de conocimiento personal a objeto declarado y verificable; es el sustrato de otras seis necesidades | Must Have | 2.0 | Propuesto | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| NB-02 | Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción | Hace la herramienta aplicable sobre un servidor en producción, sin cortar servicio; es el diferenciador declarado del producto | Must Have | 2.0 | Propuesto | [NB-02](Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) |
| NB-03 | Reproducibilidad de la arquitectura ante la pérdida del servidor | Convierte el riesgo de pérdida del disco, sin redundancia, en un riesgo acotado a los datos de los servicios | Should Have | 2.0 | Propuesto | [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| NB-04 | El alta de un servicio deja de ser un ejercicio de copiar y adaptar | El alta pasa de operación con riesgo heredado a operación declarativa, y el valor compartido deja de tener copias que sincronizar | Must Have | 2.0 | Propuesto | [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| NB-05 | Arranque previsible: orden declarado y conflictos de dirección detectados antes de fallar | El conflicto de direcciones pasa de accidente en el motor de contenedores a regla verificada antes de ejecutar | Must Have | 2.0 | Propuesto | [NB-05](Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| NB-06 | Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote | La ventana de indisponibilidad pasa de una por cambio a una por sesión de edición, con revisión previa del impacto | Must Have | 2.0 | Propuesto | [NB-06](Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| NB-07 | Atribución del consumo del servidor a un servicio concreto | La presión de recursos deja de ser anónima y se atribuye al servicio que la causa, con costo de observación acotado | Should Have | 2.0 | Propuesto | [NB-07](Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| NB-08 | Control de acceso al panel que gobierna el host y credenciales de máquina acotadas | Cierra la superficie abierta sobre un equipo con control administrativo total; sin ella ninguna otra necesidad puede entregarse | Must Have | 2.0 | Propuesto | [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |

Las ocho pasan a la versión 2.0 por la migración normativa del conjunto 4.1 al 6.0, que las clasifica a todas como «regenerar contenido» por el salto major de `Rules-Necesidades-Negocio` 2.0 a 3.1. La columna de versión coincide con el campo `Versión` de la cabecera de cada archivo. Ninguna cambió de prioridad, de estado ni de impacto.

---

## §3. Mapa de dependencias

| NB | Depende de | Es prerequisito de |
| --- | --- | --- |
| NB-08 | — | NB-01 de forma directa, y las seis restantes por transitividad |
| NB-01 | NB-08 | NB-02, NB-03, NB-04, NB-05 y NB-07 de forma directa; NB-06 por transitividad |
| NB-04 | NB-01 | NB-03, NB-05, NB-06, NB-07 |
| NB-05 | NB-01, NB-04 | NB-02, NB-06 |
| NB-02 | NB-01, NB-05 | — |
| NB-06 | NB-04, NB-05 | — |
| NB-03 | NB-01, NB-04 | — |
| NB-07 | NB-01, NB-04 | — |

El grafo es acíclico y ninguna necesidad depende de más de dos otras.

---

## §4. Orden de lectura sugerido

Las dependencias son fuertes: seis de las ocho necesidades presuponen a NB-01, y NB-01 presupone a NB-08. El orden de lectura es, entonces, el orden topológico del grafo:

1. [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) — control de acceso. Es la raíz: no depende de nada.
2. [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) — visibilidad de la arquitectura. Es el sustrato del resto.
3. [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) — alta de servicio.
4. [NB-05](Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) — arranque previsible y conflictos de dirección.
5. [NB-02](Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) — adopción del parque existente.
6. [NB-06](Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) — cambios revisados y aplicados en lote.
7. [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) — reproducibilidad de la arquitectura.
8. [NB-07](Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) — atribución del consumo del servidor.

Recorridos parciales, para lectores con un objetivo acotado:

- Quien sólo necesite entender por qué existe el producto: NB-01, NB-02 y NB-05.
- Quien vaya a especificar casos de uso: el índice [Necesidades-Negocio.md](Necesidades-Negocio.md) §4.2 primero, y después la sección 4 de cada necesidad, que enumera los dolores de los que cada caso de uso deriva.
- Quien vaya a derivar criterios de prueba: la sección 5 de cada necesidad, más §6 del índice, que consolida las reglas que los cuarenta y cuatro criterios respetan.

---

## §5. RACI

### §5.1 Matriz por necesidad

Las responsabilidades son uniformes en las ocho necesidades. Lo único que varía es quién valida como beneficiario, y eso se detalla en §5.2.

| Rol | R (ejecuta) | A (aprueba) | C (consultado) | I (informado) |
| --- | --- | --- | --- | --- |
| Analista de Negocio Senior (AG-01) | Redacta y mantiene las ocho necesidades, sus criterios y su trazabilidad | — | — | — |
| Agente humano del proyecto | — | Revisa y aprueba las ocho, y da el OK explícito de cada punto de control | — | — |
| Equipo de desarrollo, dos desarrolladores | Implementa las capacidades que cada necesidad agrupa | — | — | Recibe el catálogo como insumo de especificación |
| Agente IA de codificación | Genera la especificación y, en etapas posteriores, el código de cada corte vertical | — | — | — |
| Product Manager (AG-00) | — | — | Verifica la alineación con la visión y con el alcance | — |
| Analista Funcional (AG-02) | — | — | Desarrolla los casos de uso que cada necesidad declara previstos | — |
| Usuario final y propietario del servidor | — | — | — | Valida como beneficiario, según §5.2 |

La propiedad del contenido permanece en AG-01. Los roles consultados aportan revisión y validación, no autoría compartida. La aprobación es siempre del agente humano del proyecto, sin excepción y sin plazo máximo: el punto de control bloquea hasta el OK explícito y ese bloqueo no vence.

### §5.2 Quién valida como beneficiario

| NB | Beneficiario que valida | Por qué |
| --- | --- | --- |
| NB-01, NB-04, NB-05, NB-06 | Usuario final: administrador del producto | Son las necesidades que se manifiestan en la operación cotidiana del panel |
| NB-08 | Usuario final, junto al automatismo de integración continua | La capacidad de credenciales de máquina existe exactamente para el segundo |
| NB-02, NB-03, NB-07 | Propietario del servidor de referencia | Son las tres que tocan decisiones suyas sobre el parque en producción, el respaldo y la capacidad del equipo |

Los actores se identifican por rol y no por nombre propio: es una decisión cerrada del agente humano del proyecto del 2026-07-27, y el propietario, el lead técnico y el usuario final son la misma persona. Ningún artefacto downstream debe pedir un nombre propio.

---

## §6. Convenciones que esta categoría aplica

1. Desambiguación del término «proyecto». «Proyecto SelfHosted» designa el objeto del producto: la arquitectura de servicios contenedorizados con su red y su lienzo, que el usuario crea desde el portal. «Proyecto de código» designa la unidad de compilación del repositorio, que es una sola, y se escribe siempre completo. «Proyecto» a secas designa el emprendimiento: sus etapas, su alcance, sus plazos y sus objetivos. En esta categoría el sentido predominante es el del producto, y en contexto de proceso dejar el término sin calificar es la forma correcta y no un descuido: convertirlo produciría una afirmación falsa, como declara §12 del intake. Los tres referentes están declarados con su contexto en el glosario del dominio de [Visión de Producto](../00-Contexto/Vision-Producto.md) §9, que `Rules-Necesidades-Negocio` 3.1 §6 fija como glosario raíz de la cadena. Esta categoría consume ese vocabulario y **no acuña uno propio**: no mantiene glosario y todo término que acuñe o precise, y que aparezca en más de uno de sus artefactos, se da de alta allá. No se admite ninguna construcción que fusione los términos.

2. Uso de las identidades. Los documentos de esta categoría hablan del producto y lo nombran SelfHosted Service, que es su `Nombre-Producto`. La identidad de código del producto, su `Raiz-Codigo`, no aparece en prosa de negocio: es un nombre de artefacto de código. Es la regla R3 de `Vocabulario-Rules` 2.1, que `Rules-Necesidades-Negocio` 3.1 declara en su cabecera: esta categoría se aplica a nivel producto, de modo que ninguna de sus cabeceras declara un proyecto de código.

3. Tratamiento del material heredado y de lo pendiente. Las ocho necesidades provienen de la Fase A previa y se consumen como propuesta y no como requisito cerrado del cliente: están en estado `Propuesto` y ninguna se declara aprobada. Las especificaciones derivadas por el integrador se consumen declarándolas revisables. Toda pendiente se declara como brecha con su destinatario, en §7 del índice maestro, y nunca se resuelve por cuenta propia.

4. Nomenclatura de archivos. El archivo vivo no lleva sufijo de versión en el nombre: la declara en el campo `Versión` de su cabecera. El sufijo `-v<X.Y>.md` queda reservado a las copias archivadas. Es la convención que introdujo el conjunto normativo 4.0 al reformular D4 y D5, y que el 6.0 conserva. Este README no está exento: `Rules-Necesidades-Negocio` 3.1 §3.4 declara que al archivarse sí recibe el sufijo de versión, porque su nombre vivo tiene que ser estable y en el snapshot es la versión lo que lo identifica. La copia del estado anterior está en `_legacy/2026-07-30/README-v1.0.md`.

---

## Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/README-v1.0.md`, más los ocho archivos hermanos de `Necesidades-De-Negocio/` para la columna de versión de §2 y los documentos de 00-Contexto y el PRODUCT-INTAKE para los nombres de artefacto y la convención de vocabulario. Sube **major** porque la nomenclatura anterior deja de cumplir. La cabecera pasa de la etiqueta `Proyecto` a `Producto`, prohibida por `Vocabulario-Rules` §3 como etiqueta de un plano sobre el valor de otro, y su trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` y a `Alcance-Producto.md` renombrados. **§2 suma la columna de versión** y registra las ocho necesidades en 2.0, que es el estado al que las lleva esta misma migración; la tabla de §3.4 de la regla declara su contenido como mínimo y admite la columna. §6 convención 1 remite al glosario del dominio de `Vision-Producto.md` §9 como glosario raíz de la cadena y declara que esta categoría no acuña vocabulario propio, según el criterio de gobierno del glosario que `Rules-Necesidades-Negocio` 3.1 §6 incorpora; §6 convención 2 declara el nivel de aplicación producto y la regla R3 de `Vocabulario-Rules`; §6 convención 4 registra que este README recibe sufijo de versión al archivarse, según §3.4 de la regla. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan §3.5: se revisaron las **dos** ocurrencias de la cadena `soluci` del documento de origen, las dos designaban el nivel superior y las dos pasaron a «producto» con su concordancia de género —«administrador de la solución» a «administrador del producto» en §5.2, y «la identidad de código de la solución» a «la identidad de código del producto» en §6—. El documento de origen no traía ninguna ocurrencia de «re**soluci**ón» que preservar, de modo que la trampa de la subcadena no aplicó acá. La fila de 1.0 de esta misma tabla conserva su mención de `Alcance-Proyecto.md`, que **no** se reescribe: `SDD-Development-Guide.md` §VI.2 prohíbe tocar una fila histórica, y esa mención no es un enlace sino texto monoespaciado que registra el nombre vigente en su momento. De las ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»** que no lo fuera ya: las de «agente humano del proyecto» son el emprendimiento y se preservan a secas, y las de §6 convención 1 son menciones del término y no usos. Ningún valor cambia: el índice de §2, el mapa de dependencias de §3, el orden de lectura de §4 y el RACI de §5 quedan como estaban |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. El campo `Trazabilidad upstream` de la cabecera declaraba `SOLUTION-INTAKE §23` y los tres documentos de 00-Contexto sin sección, y era incompleto en un sentido y excesivo en el otro. Se enumeran las secciones que el cuerpo efectivamente consume —intake §2 y §23.5 para el RACI, §12 y §23.1 para las convenciones y el grafo, `Vision-Producto.md` §2.1 y §2.2 para la identificación por rol, §7.1 para el carácter no vencido del punto de control, `Alcance-Proyecto.md` §2.2 y §6.2 para la desambiguación y el material revisable, y `00-Contexto/README.md` §5 para las convenciones de la cadena— y se retira `Roadmap-Producto.md`, que este documento no consume en ninguna de sus seis secciones. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../Audit/A-00-01-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial de la sección, generada bajo el conjunto normativo 4.0 del Framework SDD junto con el índice maestro y las ocho necesidades. Incluye la tabla de índice con impacto y prioridad, el mapa de dependencias, el orden de lectura derivado del orden topológico y el RACI, con el detalle de qué beneficiario valida cada necesidad |
