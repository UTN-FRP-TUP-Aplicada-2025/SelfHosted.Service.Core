# CU-18 — Arranque y parada, con autoarranque

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** CU-18-Arranque-Y-Parada-Con-Autoarranque.md
**Versión:** 2.0
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md)
**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service §4 capacidad F-06; anexo E-15, endpoints de arranque y parada de proyecto y de servicio; anexo E-17 (la máquina de estados); anexo E-1, marca de autoarranque; E-16 RN-03, RN-04, RN-05, RN-09, RN-14, RN-20, RN-24, RN-31

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

Permitir que el administrador arranque y detenga un proyecto SelfHosted completo o un servicio suelto, respetando el orden que el grafo de arranque declara y con la marca de autoarranque al iniciar el sistema administrador, para que el arranque deje de depender de recordar el orden correcto.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador del producto | Primario | Arranca y detiene proyectos SelfHosted y servicios, y declara el autoarranque |
| Módulo de despliegue | Sistema | Valida los conflictos, calcula el orden topológico y ejecuta arranques y paradas |
| Motor de contenedores | Sistema | Crea, arranca y elimina los contenedores |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- Existe el proyecto SelfHosted con al menos un servicio declarado (CU-01, CU-03).
- Las direcciones fijas declaradas pertenecen al rango gestionado (CU-19).
- El administrador tiene sesión iniciada (CU-30), salvo en el arranque automático al iniciar el sistema.

## 4. Flujo principal

1. El administrador solicita arrancar el proyecto SelfHosted.
2. El sistema valida los conflictos de dirección contra los servicios activos, sin acceder al motor de contenedores (RN-03). Ver CU-20.
3. El sistema verifica que las aristas que referencian el host tengan canal alcanzable entre los modos de red de origen y destino (RN-04).
4. El sistema calcula el orden topológico sobre el subgrafo de las aristas que declaran espera, que es el grafo de arranque (RN-14).
5. El sistema despliega los servicios en ese orden, resolviendo las referencias inmediatamente antes de crear cada contenedor (RN-24).
6. El sistema determina el resultado por contenedor y no por operación (RN-31).
7. El sistema deriva el estado del proyecto SelfHosted de los estados de sus despliegues, que puede ser parcialmente activo (RN-20).
8. El administrador solicita detener el proyecto SelfHosted o un servicio.
9. El sistema elimina los contenedores conservando intactos la definición, las variables y los datos de los montajes (RN-09).
10. El sistema registra el evento de auditoría de cada operación (RN-17).

## 5. Flujos alternativos

**FA-01 — Arranque de un servicio suelto.**
Disparador: el administrador arranca un servicio en lugar del proyecto SelfHosted completo.
Pasos: se aplican las mismas validaciones de conflicto y de canal, acotadas a ese servicio.
Punto de retorno: paso 5.

**FA-02 — Arranque parcial por conflicto.**
Disparador: uno de los servicios está en conflicto de dirección y el administrador elige arrancar el resto.
Pasos: arrancan los servicios sin conflicto y el proyecto SelfHosted queda parcialmente activo, con estado explícito y no como error silencioso (RN-20). Ver CU-21.
Punto de retorno: paso 7.

**FA-03 — Autoarranque al iniciar el sistema administrador.**
Disparador: el sistema administrador se inicia y hay proyectos o servicios con la marca de autoarranque.
Pasos: se ejecuta el mismo flujo, con el solicitante registrado como autoarranque en lugar de la interfaz.
Punto de retorno: paso 2.

**FA-04 — Reinicio de un contenedor sin reconstruir.**
Disparador: el administrador pide reiniciar un servicio.
Pasos: el contenedor se reinicia sin reconstruir la imagen ni alterar los montajes.
Punto de retorno: paso 6.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `409` de conflicto de dirección | Una dirección del proyecto SelfHosted está ocupada por un servicio activo de otro proyecto | Arranque bloqueado con el informe de conflicto y las tres resoluciones (RN-03). Ver CU-21 |
| Enlace inválido por canal | Una arista referencia el host de un destino sin canal alcanzable entre sus modos de red | El enlace queda marcado inválido y bloquea el arranque (RN-04) |
| `422` de ciclo de arranque | El grafo de arranque tiene un ciclo | Rechazo señalando el ciclo (RN-05) |
| Despliegue fallido de un contenedor | Un contenedor no puede crearse o arrancar | Ese despliegue queda fallido con su error y los demás conservan su resultado; el proyecto SelfHosted queda parcialmente activo (RN-31, RN-20) |

## 7. Postcondiciones

**En caso de éxito del arranque:** los contenedores de los servicios alcanzados están creados y arrancados en el orden que el grafo de arranque declara; el estado del proyecto SelfHosted se deriva de los estados por contenedor; existe el evento de auditoría.

**En caso de éxito de la parada:** los contenedores fueron eliminados y la definición, las variables y los datos de los montajes quedaron intactos.

**En caso de fallo:** el arranque queda bloqueado con su informe, o parcialmente ejecutado con el estado explícito de cada contenedor; ninguna configuración ni ningún dato persistido se pierde.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | El proyecto `ia-local` con `ia-webui` dependiente de `ia-api` por una arista con espera declarada | El administrador arranca el proyecto SelfHosted | El orden de arranque es `ia-api`, `ia-video`, `ia-webui`, deducido del grafo de arranque y no configurado a mano |
| CA-02 | Un proyecto SelfHosted de tres servicios con uno en conflicto de dirección | El administrador elige arrancar el resto | Arrancan dos servicios y el proyecto queda parcialmente activo, con estado explícito y sin error silencioso |
| CA-03 | Un servicio en macvlan con el montaje de datos en `/data` | El administrador detiene el servicio | El contenedor se elimina y el montaje permanece intacto |
| CA-04 | Una arista entre `api` y `db` que referencia el host, con la espera desmarcada por el administrador | El administrador arranca el proyecto SelfHosted | Los dos servicios arrancan en cualquier orden, y la arista sigue exigiendo canal alcanzable |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-05](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-05-Arranque-Previsible-Y-Conflictos-Anticipados.md) |
| Reglas de negocio aplicables | RN-03, RN-04, RN-05, RN-09, RN-14, RN-17, RN-20, RN-24, RN-31. Reglas conceptuales: RC-12, RC-18 |
| Historias de usuario a generar en 06 | US-CU-18-1 (arrancar un proyecto SelfHosted respetando el orden de arranque), US-CU-18-2 (detener un proyecto SelfHosted o un servicio sin perder datos), US-CU-18-3 (declarar el autoarranque de un proyecto o de un servicio), US-CU-18-4 (reiniciar un contenedor sin reconstruir) |
| Componentes esperados en 05 | Capa `Web`, controladores de arranque y parada y barra superior del proyecto; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregados `Proyectos`, `Despliegues` y `Red`, con el cálculo del orden topológico; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | T-14 (orden de arranque); T-05, T-06, T-07 (conflicto de dirección); T-24 (arranque parcial); T-21 (conservación del montaje al detener); T-44, T-46 (independencia de espera y canal); T-11 (canal no alcanzable) |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- El orden de arranque sale del subgrafo de las aristas que declaran espera, no de qué variable se referencia. Es la decisión D-11 y las reglas RN-05 y RN-14 llevan su ampliación marcada `[D-i]`, sin revisar.
- Detener no borra nada: es la consecuencia observable de la separación entre configuración y ejecución.
- El estado del proyecto SelfHosted se deriva de los despliegues por contenedor y no de un estado propio de la operación.
- La reconciliación del estado real contra el motor pertenece a CU-28 y se ejecuta también en la apertura del proyecto.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.0 | 2026-07-30 | Migración normativa del conjunto 4.1 al 6.0, fase M4 corte 3, bajo `Rules-Especificacion-Funcional` 4.0, `Vocabulario-Rules` 2.1 y `Migracion-Rules` 1.0. Clasificación **regenerar contenido** por el salto major de la regla que lo gobierna; fuente de contenido: el documento de origen, archivado en `_legacy/2026-07-30/CU-18-Arranque-Y-Parada-Con-Autoarranque-v1.0.md`. Sube **major** porque la nomenclatura anterior deja de cumplir. Cabecera: la etiqueta `Proyecto` pasa a `Producto` sobre el mismo valor, que `Vocabulario-Rules` §3 prohíbe como etiqueta de un plano sobre el valor de otro, y la trazabilidad upstream apunta al `PRODUCT-INTAKE-SelfHosted-Service` renombrado. Sustitución léxica **por ocurrencia** según `Vocabulario-Rules` §9.5 y el plan de migración §3.5, sin ningún reemplazo global de cadena: se revisaron las dos ocurrencias de la cadena `soluci` de este documento y se sustituyó una sola, la que designaba el nivel superior, con su concordancia de género —el nombre del actor primario «Administrador de la solución» de §2, que pasa a «Administrador del producto»—; no hay en este documento ninguna «solución de código» ni ningún uso de prosa de negocio que R2 preserve. La única ocurrencia de la cadena `resoluci` —«re**soluci**ón»— **no es la palabra «solución» y quedó intacta**, con conteo verificado antes y después de la intervención: sustituirlas habría producido la palabra inexistente que la `[5.1]` del framework documenta sobre sí mismo, la que resulta de reemplazar la cadena `soluci` dentro de «re**soluci**ón». De las veintiocho ocurrencias de «proyecto», **ninguna pasó a «proyecto de código»**: dieciocho son «proyecto SelfHosted» y nueve son su forma corta con el contexto ya fijado en la misma sección —el proyecto `ia-local` de CA-01, «el proyecto queda parcialmente activo», «la barra superior del proyecto», el agregado `Proyectos` y «la apertura del proyecto» de §10—, las veintisiete la entidad del dominio; ninguna es el emprendimiento; la restante era la etiqueta de cabecera. La clasificación sigue el intake §12, que declara los tres referentes del término, y el glosario del dominio de `Vision-Producto.md` §9. **Glosario**: §2.1 y §4.2.4 de la regla convierten el vocabulario de la categoría en el artefacto propio y obligatorio `Glosario-Funcional.md`, que hasta la 3.0 era el punto 6 de `Modelo-Conceptual.md` y por lo tanto dependía de que el proyecto de código tuviera persistencia. Este caso de uso **no lo emite**: los términos que acuña o precisa y que aparecen en más de un artefacto de 02 se devolvieron al lote que lo emite, por la regla de inclusión de §3.3, y los que ya declara el glosario del dominio de `Vision-Producto.md` §9 se referencian en lugar de redefinirse, por la regla de no duplicación de la misma sección. Las once secciones obligatorias de §4.2 ya estaban completas y no se agregó ni se quitó ninguna; la tabla de contenido de §4.1 y la sección opcional §13 que §4.3 admite para `web-monolith` quedan como estaban. Ningún propósito, actor, precondición, paso del flujo principal, flujo alternativo, excepción, postcondición, criterio de aceptación, regla de negocio aplicable, historia de usuario prevista, componente esperado, test previsto ni brecha declarada cambió de enunciado: la migración es léxica y de forma de cabecera. Las filas históricas de esta tabla **no se reescribieron**, por `SDD-Development-Guide.md` §VI.2 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El intake declara que las operaciones de despliegue se serializan por proyecto SelfHosted, y que entre validar el conflicto de dirección y registrar la reserva activa no puede colarse otro arranque: la validación y el registro van en la misma transacción de escritura.

