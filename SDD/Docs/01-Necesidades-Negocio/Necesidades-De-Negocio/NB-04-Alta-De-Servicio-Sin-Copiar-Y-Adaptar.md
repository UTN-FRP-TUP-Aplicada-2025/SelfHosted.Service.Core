# NB-04 — El alta de un servicio deja de ser un ejercicio de copiar y adaptar

| Campo | Valor |
| --- | --- |
| Producto | SelfHosted Service |
| Documento | NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md |
| Versión | 2.0 |
| Estado | Propuesto |
| Fecha | 2026-07-30 |
| Autor | Analista de Negocio Senior (AG-01) |
| Trazabilidad upstream | PRODUCT-INTAKE-SelfHosted-Service §1, §4 (F-05, F-10, F-14, F-23, F-24), §6 (flujo 1), §23.1, §23.3, §23.4, §23.5; Vision-Producto.md §1.1, §4.1, §5 (OBJ-02), §6; Alcance-Producto.md §4.1, §6.3; Roadmap-Producto.md §2.3 (EP-05, EP-10, EP-14), §2.5 (EP-23, EP-24), §2.6, §3 |
| Trazabilidad downstream | CU-13, CU-14, CU-15, CU-16, CU-17, CU-34, CU-35 (previstas en 02-Especificacion-Funcional) |

---

## Tabla de contenido

- [1. Descripción de la necesidad](#1-descripción-de-la-necesidad)
- [2. Ejemplo de uso desde la perspectiva del negocio](#2-ejemplo-de-uso-desde-la-perspectiva-del-negocio)
- [3. Impacto](#3-impacto)
- [4. Problema específico que resuelve](#4-problema-específico-que-resuelve)
- [5. Criterios de éxito](#5-criterios-de-éxito)
- [6. Stakeholders involucrados](#6-stakeholders-involucrados)
- [7. Trazabilidad a CU](#7-trazabilidad-a-cu)
- [8. Dependencias con otras NB](#8-dependencias-con-otras-nb)
- [9. Prioridad MoSCoW](#9-prioridad-moscow)
- [10. Control de cambios](#10-control-de-cambios)

---

## 1. Descripción de la necesidad

Cada alta de un servicio nuevo arranca hoy desde la configuración de otro servicio: se copia la definición que más se le parece y se la adapta. El método funciona en la primera pasada y arrastra siempre lo mismo: decisiones que correspondían al servicio original y que en el nuevo no tienen razón de ser, valores que quedaron sin cambiar y dimensiones que nadie recordó declarar porque el modelo copiado no las usaba. El costo aparece más tarde, cuando algo no anda y hay que averiguar cuál de los valores heredados es el culpable.

La necesidad es que el alta parta de un formulario y no de un archivo ajeno: un único lugar donde estén todas las dimensiones que el parque real exige declarar, con las vías de alta que el operador efectivamente usa, y con la construcción de la imagen dentro del alcance del registro en lugar de ocurrir por afuera. Y que un servicio o un conjunto de servicios que se repite se pueda guardar como plantilla y volver a instanciar con parámetros, en lugar de copiarse otra vez.

La misma necesidad cubre el caso del valor compartido. Hoy una credencial que usan tres servicios se escribe tres veces y se sincroniza a mano, sin que nada avise cuando una de las copias quedó vieja. Que ese valor se declare una sola vez y se referencie desde donde haga falta es el mismo dolor de copiar y adaptar, aplicado a un dato en lugar de a una configuración entera.

## 2. Ejemplo de uso desde la perspectiva del negocio

El propietario necesita levantar un servicio nuevo que usa la misma base de datos que otros dos. Abre la definición del servicio más parecido que tiene, la copia, cambia el nombre, cambia el puerto, borra dos montajes que no aplican, y copia la credencial de la base desde el segundo servicio. Tres semanas después rota esa credencial en la base y actualiza dos de los tres servicios; el tercero sigue con el valor viejo y falla cuando se reinicia.

Lo que necesita es un alta que le pida las dimensiones que hacen falta, sin arrastrar nada; poder guardar el conjunto «base de datos más servicio que la consume» como plantilla y volver a crearlo entero con dos parámetros; y que la credencial esté declarada una sola vez a nivel del conjunto, de modo que rotarla sea un cambio en un solo lugar.

## 3. Impacto

- El alta de un servicio pasa de ser una operación de riesgo heredado a una operación declarativa, y su costo deja de crecer con el tamaño del parque.
- Las cuatro vías de alta quedan cubiertas por el mismo modelo, incluida la construcción de una imagen propia, que hoy ocurre fuera de todo registro.
- Un conjunto de servicios que suele ir junto se vuelve reutilizable como una sola operación, en lugar de rearmarse pieza por pieza.
- El valor compartido deja de tener copias que mantener sincronizadas a mano, con lo que desaparece una clase entera de fallas silenciosas.
- Si la necesidad queda sin resolver, la métrica de reemplazo del método manual es inalcanzable y el operador sigue editando definiciones a mano, que es el método que el producto viene a sustituir.

## 4. Problema específico que resuelve

- Cada alta parte de la configuración de otro servicio y arrastra decisiones que ya no corresponden.
- Las dimensiones que el parque real exige declarar no están en ningún formulario único.
- No hay forma de reutilizar la configuración de un servicio frecuente ni de un conjunto que suele ir junto, sin copiarla y editarla.
- Un valor que comparten varios servicios se escribe una vez por servicio y se sincroniza a mano, sin que nada avise cuando una copia quedó vieja.
- Llevar la configuración declarada a un contenedor corriendo es un paso manual y distinto según el origen de la imagen.
- La construcción de una imagen propia ocurre fuera del alcance de todo registro.

## 5. Criterios de éxito

Ningún criterio usa fecha de calendario. Los plazos se expresan en meses desde el cierre de un alcance o se anclan al cierre de la etapa que entrega la capacidad medida, según la convención del intake §23.3 y la secuencia de etapas de [Roadmap-Producto.md](../../00-Contexto/Roadmap-Producto.md) §3. Ninguno de los seis es derivación.

| Criterio | Métrica | Target | Plazo |
| --- | --- | --- | --- |
| Reemplazo del método manual | Altas de servicio nuevas realizadas desde el producto, sobre el total de altas nuevas | ≥ 90 % de las altas nuevas | 6 meses desde el cierre del Alcance 1 |
| Cobertura de las dimensiones del alta | Dimensiones de configuración que el alta permite declarar, sobre las que el parque real exige | 8 de 8 dimensiones | Cierre de la etapa `02`, que entrega los servicios del proyecto SelfHosted (EP-03) |
| Vías de alta soportadas | Vías por las que se puede dar de alta un servicio: imagen de registro, repositorio remoto, definición local y plantilla del catálogo | 4 de 4 vías | Cierre de la etapa que entrega EP-14, dentro de la Fase 3 |
| Autosuficiencia de la instanciación | Datos adicionales a los huecos que la plantilla declara, y archivos de configuración redactados a mano, necesarios para instanciar un ítem del catálogo | 0 datos adicionales y 0 archivos a mano | Cierre de la etapa que entrega EP-14 |
| Fidelidad del conjunto instanciado | Servicios y dependencias de un ítem multi-servicio creados en una sola operación | 100 % de los servicios y sus dependencias | Cierre de la etapa que entrega EP-14 |
| Valor compartido declarado una sola vez | Copias de un mismo valor que hay que mantener sincronizadas a mano | 0 copias | Cierre de la etapa que absorba EP-23 y EP-24, hoy sin fase asignada |

Dos precisiones que se declaran en lugar de resolverse:

1. El primer criterio adopta como propio el objetivo de negocio OBJ-02 de [Vision-Producto.md](../../00-Contexto/Vision-Producto.md) §5, que es dato cerrado confirmado el 2026-07-27.
2. El plazo del sexto criterio depende de una brecha abierta que este documento no resuelve: la asignación de EP-23 y EP-24 a una fase y a un corte vertical está declarada como pendiente en [Alcance-Producto.md](../../00-Contexto/Alcance-Producto.md) §6.3 y en el Roadmap §2.6, con la categoría 07-Plan-Sprint y el agente humano del proyecto como destinatarios. El intake registra además que dos criterios de adopción del catálogo se retiraron durante la Fase A, porque un porcentaje de adopción no es medible sobre un catálogo que arranca vacío y que el usuario puebla o no; esos dos no se reponen acá.

## 6. Stakeholders involucrados

| Rol | Nivel | Qué pide o aporta |
| --- | --- | --- |
| Agente humano del proyecto | Propietario | Revisa y aprueba la necesidad, y da el OK explícito de cada punto de control que la entrega |
| Analista de Negocio Senior (AG-01) | Propietario del contenido | Mantiene la necesidad, sus criterios y su trazabilidad, y declara las brechas en lugar de resolverlas |
| Equipo de desarrollo, dos desarrolladores | Implementador | Construye el alta completa, las cuatro vías, el catálogo de plantillas y el mecanismo de valores compartidos y referencias |
| Agente IA de codificación | Implementador | Genera la especificación y, en etapas posteriores, el código de cada corte vertical de alta |
| Usuario final: administrador del producto | Beneficiario | Valida que un alta nueva no exija partir de la configuración de otro servicio |
| Product Manager (AG-00) | Consultado | Verifica la alineación con la visión y con el alcance declarados |
| Analista Funcional (AG-02) | Consultado | Desarrolla los casos de uso que esta necesidad declara previstos |

## 7. Trazabilidad a CU

| NB | CU prevista | Estado |
| --- | --- | --- |
| NB-04 | CU-13 despliegue desde imagen de registro público (capa de presentación) | a generar |
| NB-04 | CU-14 consulta del registro del contenedor (capa de presentación) | a generar |
| NB-04 | CU-15 despliegue construyendo la imagen (capa de presentación) | a generar |
| NB-04 | CU-16 alta desde plantilla del catálogo, con creación del conjunto completo (capa de presentación) | a generar |
| NB-04 | CU-17 mantenimiento del catálogo (capa de presentación) | a generar |
| NB-04 | CU-34 variables compartidas del proyecto SelfHosted (capa de presentación) | a generar |
| NB-04 | CU-35 valor expresado como referencia (capa de presentación) | a generar |

CU-34, CU-35 y CU-36 se agregaron al final de la numeración durante la Fase A previa, sin renumerar las anteriores, para no invalidar ninguna referencia ya emitida.

## 8. Dependencias con otras NB

- Depende de: NB-01, porque un servicio se da de alta dentro de un conjunto declarado.
- Es prerequisito de: NB-03, NB-05, NB-06 y NB-07.

## 9. Prioridad MoSCoW

Must Have. Agrupa dos capacidades Must Have de despliegue con tres de reutilización de configuración y de valor, y sin ella el dolor de copiar y adaptar que el intake §1 declara queda intacto.

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 2, bajo `Rules-Necesidades-Negocio` 3.1 y `Vocabulario-Rules` 2.1. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, según `Vocabulario-Rules` §3 y §4 R3; la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado y al artefacto hermano `Alcance-Producto.md`, antes `Alcance-Proyecto.md`. **Cierre del hallazgo H-02 del informe [`Audit/M4-00-Contexto-r1.md`](../../Audit/M4-00-Contexto-r1.md)**: el enlace markdown de la nota 2 de §5 apuntaba al nombre legado `Alcance-Proyecto.md`, que el corte 1 borró, y ahora resuelve contra `Alcance-Producto.md`. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5: dos ocurrencias de «solución» designaban el nivel superior y pasan a «producto» con su concordancia —«realizadas desde la solución» a «realizadas desde el producto» en el primer criterio de §5 y «administrador de la solución» a «administrador del producto» en §6—; no hay ninguna «solución de código» ni ninguna «resolución» en este documento. Las siete ocurrencias de «proyecto» se clasificaron por referente y **ninguna pasó a «proyecto de código»**: dos son «proyecto SelfHosted», la entidad del dominio, y una es el emprendimiento —«el agente humano del proyecto» como destinatario de la brecha en §5—, y las dos clases quedan intactas según el intake §12; las restantes eran la etiqueta de cabecera y el nombre del artefacto hermano. Ninguna necesidad, criterio de éxito, dependencia, prioridad, CU prevista ni brecha cambió: la migración es léxica, de forma de cabecera y de reparación de enlace |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar el estado anterior, por la política de versionado de `Master-Prompt.md` §5. Se completa el campo `Trazabilidad upstream` de la cabecera con `Roadmap-Producto.md` §2.6, que el §5 nota 2 cita como origen de la brecha del sexto criterio, y §3, que el §5 cita como origen de los hitos de anclaje. Origen: hallazgo H-02 del informe [Audit/A-00-01-r1.md](../../Audit/A-00-01-r1.md), aplicado a la propiedad que el hallazgo describe y no sólo a los tres archivos que nombra |
| 1.0 | 2026-07-29 | Versión inicial, generada bajo el conjunto normativo 4.0 del Framework SDD a partir del consolidado de la Fase A previa transcripto en el intake §23, y de los documentos de 00-Contexto. Conserva el identificador NB-04, sus seis criterios de éxito y la decisión de recorte que ubica F-23 y F-24 acá y no en NB-01 ni en NB-06. Declara como brecha la asignación pendiente de EP-23 y EP-24 |
