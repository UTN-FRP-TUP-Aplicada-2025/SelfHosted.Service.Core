# 01-Necesidades-Negocio — SelfHosted Service

| Campo | Valor |
| --- | --- |
| Proyecto | SelfHosted Service |
| Documento | README.md |
| Versión | 1.0 |
| Estado | Propuesto |
| Fecha | 2026-07-29 |
| Autor | Analista de Negocio Senior (AG-01) |
| Cantidad de NB | 8 |
| Trazabilidad upstream | SOLUTION-INTAKE-SelfHosted-Service §2, §12, §23.1, §23.5; Vision-Producto.md §2.1, §2.2, §7.1 (RE-12); Alcance-Proyecto.md §2.2, §6.2; 00-Contexto/README.md §5 |
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

| NB | Título | Impacto | Prioridad MoSCoW | Estado | Enlace |
| --- | --- | --- | --- | --- | --- |
| NB-01 | Visibilidad unificada de la arquitectura de un conjunto de servicios | La arquitectura pasa de conocimiento personal a objeto declarado y verificable; es el sustrato de otras seis necesidades | Must Have | Propuesto | [NB-01](Necesidades-De-Negocio/NB-01-Visibilidad-Unificada-De-La-Arquitectura.md) |
| NB-02 | Adoptabilidad del parque existente sin reinstanciar lo que ya está en producción | Hace la herramienta aplicable sobre un servidor en producción, sin cortar servicio; es el diferenciador declarado del producto | Must Have | Propuesto | [NB-02](Necesidades-De-Negocio/NB-02-Adoptabilidad-Del-Parque-Existente.md) |
| NB-03 | Reproducibilidad de la arquitectura ante la pérdida del servidor | Convierte el riesgo de pérdida del disco, sin redundancia, en un riesgo acotado a los datos de los servicios | Should Have | Propuesto | [NB-03](Necesidades-De-Negocio/NB-03-Reproducibilidad-De-La-Arquitectura.md) |
| NB-04 | El alta de un servicio deja de ser un ejercicio de copiar y adaptar | El alta pasa de operación con riesgo heredado a operación declarativa, y el valor compartido deja de tener copias que sincronizar | Must Have | Propuesto | [NB-04](Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| NB-05 | Arranque previsible: orden declarado y conflictos de dirección detectados antes de fallar | El conflicto de direcciones pasa de accidente en el motor de contenedores a regla verificada antes de ejecutar | Must Have | Propuesto | [NB-05](Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| NB-06 | Cambios de configuración revisados antes de aplicarse y aplicados en un solo lote | La ventana de indisponibilidad pasa de una por cambio a una por sesión de edición, con revisión previa del impacto | Must Have | Propuesto | [NB-06](Necesidades-De-Negocio/NB-06-Cambios-Revisados-Y-Aplicados-En-Lote.md) |
| NB-07 | Atribución del consumo del servidor a un servicio concreto | La presión de recursos deja de ser anónima y se atribuye al servicio que la causa, con costo de observación acotado | Should Have | Propuesto | [NB-07](Necesidades-De-Negocio/NB-07-Atribucion-Del-Consumo-Del-Servidor.md) |
| NB-08 | Control de acceso al panel que gobierna el host y credenciales de máquina acotadas | Cierra la superficie abierta sobre un equipo con control administrativo total; sin ella ninguna otra necesidad puede entregarse | Must Have | Propuesto | [NB-08](Necesidades-De-Negocio/NB-08-Control-De-Acceso-Y-Credenciales-De-Maquina.md) |

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
| NB-01, NB-04, NB-05, NB-06 | Usuario final: administrador de la solución | Son las necesidades que se manifiestan en la operación cotidiana del panel |
| NB-08 | Usuario final, junto al automatismo de integración continua | La capacidad de credenciales de máquina existe exactamente para el segundo |
| NB-02, NB-03, NB-07 | Propietario del servidor de referencia | Son las tres que tocan decisiones suyas sobre el parque en producción, el respaldo y la capacidad del equipo |

Los actores se identifican por rol y no por nombre propio: es una decisión cerrada del agente humano del proyecto del 2026-07-27, y el propietario, el lead técnico y el usuario final son la misma persona. Ningún artefacto downstream debe pedir un nombre propio.

---

## §6. Convenciones que esta categoría aplica

1. Desambiguación del término «proyecto». «Proyecto SelfHosted» designa el objeto del producto: la arquitectura de servicios contenedorizados con su red y su lienzo, que el usuario crea desde el portal. «Proyecto de código» designa la unidad de compilación del repositorio, que es una sola, y se escribe siempre completo. «Proyecto» a secas designa el emprendimiento. En esta categoría el sentido predominante es el del producto.

2. Uso de las identidades. Los documentos de esta categoría hablan del producto y lo nombran SelfHosted Service. La identidad de código de la solución no aparece en prosa de negocio: es un nombre de artefacto de código.

3. Tratamiento del material heredado y de lo pendiente. Las ocho necesidades provienen de la Fase A previa y se consumen como propuesta y no como requisito cerrado del cliente: están en estado `Propuesto` y ninguna se declara aprobada. Las especificaciones derivadas por el integrador se consumen declarándolas revisables. Toda pendiente se declara como brecha con su destinatario, en §7 del índice maestro, y nunca se resuelve por cuenta propia.

4. Nomenclatura de archivos. El archivo vivo no lleva sufijo de versión en el nombre: la declara en el campo `Versión` de su cabecera. El sufijo `-v<X.Y>.md` queda reservado a las copias archivadas. Es la convención vigente del conjunto normativo 4.0, que reformuló D4 y D5.

---

## Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. El campo `Trazabilidad upstream` de la cabecera declaraba `SOLUTION-INTAKE §23` y los tres documentos de 00-Contexto sin sección, y era incompleto en un sentido y excesivo en el otro. Se enumeran las secciones que el cuerpo efectivamente consume —intake §2 y §23.5 para el RACI, §12 y §23.1 para las convenciones y el grafo, `Vision-Producto.md` §2.1 y §2.2 para la identificación por rol, §7.1 para el carácter no vencido del punto de control, `Alcance-Proyecto.md` §2.2 y §6.2 para la desambiguación y el material revisable, y `00-Contexto/README.md` §5 para las convenciones de la cadena— y se retira `Roadmap-Producto.md`, que este documento no consume en ninguna de sus seis secciones. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../Audit/A-00-01-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial de la sección, generada bajo el conjunto normativo 4.0 del Framework SDD junto con el índice maestro y las ocho necesidades. Incluye la tabla de índice con impacto y prioridad, el mapa de dependencias, el orden de lectura derivado del orden topológico y el RACI, con el detalle de qué beneficiario valida cada necesidad |
