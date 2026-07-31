# Modelo conceptual — SelfHosted Service

**Proyecto de código:** SelfHosted-Service
**Producto:** SelfHosted Service
**Documento:** Modelo-Conceptual.md
**Versión:** 2.1
**Estado:** Propuesto
**Fecha:** 2026-07-30
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** PRODUCT-INTAKE-SelfHosted-Service anexo E-9 (esquema relacional completo y su bloque de identidad de objeto), anexo E-1, E-2, E-3, E-4, E-5, E-6, E-8, E-11, E-12, E-17, E-21, **E-23** (la imagen como objeto con identidad); §17.P.2 (invariantes I1 a I10), §17.P.4, §17.P.11 (decisiones del modelo de dominio, D-12), §24.3 (los tres objetos declarados y no diseñados), §12 (glosario del dominio del cliente y convención de vocabulario del producto). Glosario raíz de la cadena: [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §9.

---

## Tabla de contenido

- [0. Alcance y conteo de entidades](#0-alcance-y-conteo-de-entidades)
- [1. Entidades](#1-entidades)
  - [1.1 Proyecto SelfHosted](#11-proyecto-selfhosted)
  - [1.2 Red del proyecto](#12-red-del-proyecto)
  - [1.3 Variable compartida del proyecto](#13-variable-compartida-del-proyecto)
  - [1.4 Servicio](#14-servicio)
  - [1.5 Variable de servicio](#15-variable-de-servicio)
  - [1.6 Variable provista por el sistema](#16-variable-provista-por-el-sistema)
  - [1.7 Enlace](#17-enlace)
  - [1.8 Changeset](#18-changeset)
  - [1.9 Despliegue](#19-despliegue)
  - [1.10 Reserva de dirección](#110-reserva-de-dirección)
  - [1.11 Ítem del catálogo](#111-ítem-del-catálogo)
  - [1.12 Token de API](#112-token-de-api)
  - [1.13 Evento de auditoría](#113-evento-de-auditoría)
  - [1.14 Secreto](#114-secreto)
  - [1.15 Volumen o directorio de montaje](#115-volumen-o-directorio-de-montaje)
  - [1.16 Imagen](#116-imagen)
- [2. Atributos clave](#2-atributos-clave)
- [3. Relaciones](#3-relaciones)
- [4. Cardinalidades](#4-cardinalidades)
- [5. Reglas conceptuales](#5-reglas-conceptuales)
- [6. Referencia al glosario](#6-referencia-al-glosario)
  - [6.1 Términos del modelo que el glosario funcional declara](#61-términos-del-modelo-que-el-glosario-funcional-declara)
- [7. Diagrama](#7-diagrama)
- [8. Trazabilidad](#8-trazabilidad)
- [9. Brechas declaradas](#9-brechas-declaradas)
- [10. Control de cambios](#10-control-de-cambios)

---

## 0. Alcance y conteo de entidades

Este modelo es conceptual: nombra entidades, atributos y relaciones del dominio, y no declara tipos físicos, claves ni índices. La forma persistida de todo esto vive en el anexo E-9 del intake y su modelo lógico es materia de 05-Arquitectura-Tecnica.

Conteo de entidades, que es el dato del que depende la obligatoriedad de las reglas conceptuales según §2.2 de `Rules-Especificacion-Funcional.md`:

| Origen | Cantidad | Detalle |
| --- | --- | --- |
| Tablas declaradas en el anexo E-9 | 11 | `proyectos`, `variables_proyecto`, `enlaces`, `servicios`, `variables`, `changesets`, `despliegues`, `reservas_ip`, `catalogo_items`, `tokens_api`, `eventos_auditoria` |
| Objetos con identidad que E-9 declara y no diseña (D-12) | 3 | Secreto, Red del proyecto e **Imagen**. E-9 declara literalmente «pasa a ser objeto» para los tres; la imagen se incorporó en el intake v2.4, con su modelo conceptual en el anexo E-23 |
| Objeto con identidad que el intake §24.3 declara y no diseña | 1 | Volumen o directorio al que apunta un montaje |
| Total conceptual | 15 | |

**Decisión:** el modelo supera las diez entidades por las dos vías de conteo —once tablas persistidas, quince entidades conceptuales—, de modo que las reglas conceptuales `RC-XX` son obligatorias y se emiten en [reglas-conceptuales-de-modelo/](reglas-conceptuales-de-modelo/).

Lo que E-9 declara explícitamente como **atributo y no entidad**, por la prueba de tres condiciones de D-12, y que por lo tanto no aparece acá como entidad: recursos, verificación de salud, montajes y disposición del lienzo.

---

## 1. Entidades

### 1.1 Proyecto SelfHosted

Unidad de agrupación del producto: la arquitectura completa de servicios contenedorizados, con su red y su lienzo. Es lo que el usuario crea desde el portal. Traza: E-9 tabla `proyectos`; glosario §12; invariante I1.

Ejemplo de instancia: el proyecto 12, «Portal Interno», slug `portal-interno`, con red bridge propia, autoarranque activo y estado `parcialmente-activo` (E-1).

### 1.2 Red del proyecto

La red en la que viven los servicios de un proyecto SelfHosted, con su modo, su subred, su pasarela y su interfaz padre cuando corresponde. Traza: E-9, bloque de identidad de objeto, que la declara objeto con identidad porque la comparten todos los servicios del proyecto, se crea antes que los contenedores y les sobrevive; §24.3.

Ejemplo de instancia: red `portal-interno-net`, modo bridge, subred `172.20.0.0/24`, pasarela `172.20.0.1`, creada por el servicio (E-1).

### 1.3 Variable compartida del proyecto

Valor declarado una sola vez a nivel proyecto y referenciable desde cualquiera de sus servicios. Puede ser secreta. Traza: E-9 tabla `variables_proyecto` (D-5); capacidad F-23; glosario §12.

Ejemplo de instancia: `TZ = America/Argentina/Buenos_Aires`, no secreta, del proyecto 12 (E-1).

### 1.4 Servicio

La configuración de un contenedor dentro de un proyecto SelfHosted: origen, variables, red, montajes, dispositivos, límites, política de reinicio y marca de efímero. No tiene estado de encendido. Traza: E-9 tabla `servicios`; E-2; invariantes I2, I3.

Ejemplo de instancia: servicio 101, `api`, del proyecto 12, origen imagen `registro-privado/portal-api:1.4.2` con política fijada, red bridge con alias `api` (E-2).

### 1.5 Variable de servicio

Par de clave y valor que el proceso del contenedor recibe. Su valor puede ser un literal o una referencia sin resolver a otra variable. Puede ser secreta. Traza: E-9 tabla `variables`; E-2; E-4.

Ejemplo de instancia: `ConnectionStrings__Default` de `api`, cuyo valor legible es `Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database=portal` y cuya forma vinculada apunta al servicio 103 (E-2, E-4).

### 1.6 Variable provista por el sistema

Variable de sólo lectura que el sistema expone en cada servicio y que el usuario no declara ni edita. El conjunto es exactamente dos: el host interno y el nombre del servicio. Traza: RN-32; E-4; glosario §12.

Ejemplo de instancia: `SELFHOSTED_HOST` del servicio 103, que resuelve según el modo de red del destino.

No es una entidad persistida propia: es una proyección derivada del servicio, y se declara acá porque el modelo la referencia como si fuese una variable.

### 1.7 Enlace

Arista que materializa que un servicio depende de otro del mismo proyecto SelfHosted. Tiene dos ejes independientes: declarar espera al destino y referenciar el host del destino. Traza: E-9 tabla `enlaces`; E-4; RN-04, RN-05, RN-14, RN-34.

Ejemplo de instancia: enlace 9002 del proyecto 12, de `api` a `db`, con clave de origen `ConnectionStrings__Default`, clave de destino `SELFHOSTED_HOST`, puerto de destino 5432 y espera declarada (E-4).

### 1.8 Changeset

Conjunto de cambios de configuración acumulados y pendientes de aplicar en lote sobre un proyecto SelfHosted, con su informe de impacto. Traza: E-9 tabla `changesets`; E-5; invariante I9.

Ejemplo de instancia: changeset 331 del proyecto 12, estado pendiente, con cuatro cambios y un informe que declara `api` y `cache` a redesplegar y `db` sin impacto (E-5).

### 1.9 Despliegue

Intento concreto de materializar la configuración de un servicio en un contenedor, con su ciclo de vida. Traza: E-9 tabla `despliegues`; E-3; E-17; invariantes I4, I5; RN-31.

Ejemplo de instancia: despliegue 5471 del servicio 101, réplica 1, contenedor `3f9a1c7b2e4d`, estado activo, solicitado desde la interfaz, asociado al changeset 331 (E-3).

### 1.10 Reserva de dirección

Dirección de la red local reservada por una réplica de un servicio, con su interfaz padre. Es el único dato que se consulta entre proyectos. Traza: E-9 tabla `reservas_ip`; E-8; §17.P.4 decisión de esquema 1.

Ejemplo de instancia: `192.168.1.139` reservada por el servicio 305 del proyecto 7, activa (E-8).

### 1.11 Ítem del catálogo

Plantilla parametrizada en reposo que contiene un subgrafo de uno o varios servicios con sus enlaces y sus variables compartidas. Nada del catálogo corre. Traza: E-9 tabla `catalogo_items`; E-6; capacidad F-14 (D-7); RN-30.

Ejemplo de instancia: ítem `cat-api-con-base`, categoría de base de datos, formato 2, con dos servicios y una arista entre ellos (E-6).

### 1.12 Token de API

Credencial de máquina con ámbitos, vigencia y estado de revocación, usada por automatismos. Traza: E-9 tabla `tokens_api`; E-12; RN-16; §17.P.5.

Ejemplo de instancia: token `tk_7f3c9a12`, nombre `github-actions-portal`, ámbitos `proyectos:leer despliegues:ejecutar` (E-12).

### 1.13 Evento de auditoría

Registro de una operación con su actor, su acción, la entidad alcanzada, el detalle y el resultado. Traza: E-9 tabla `eventos_auditoria`; RN-17; §17.P.10; DA-07 para la retención.

Ejemplo de instancia: fila con actor `token:tk_7f3` tras una operación de escritura por API (T-26).

### 1.14 Secreto

Material sensible que una variable referencia en lugar de contenerlo. Se comparte entre servicios, se rota y tiene historia. Traza: E-9, bloque de identidad de objeto, que lo declara objeto con identidad; §24.3.

Ejemplo de instancia: `sec-011`, referenciado por la variable compartida `DB_PASSWORD` del proyecto 12 (E-1).

### 1.15 Volumen o directorio de montaje

Recurso de almacenamiento al que apunta un montaje de un servicio, que sobrevive al servicio. Traza: intake §24.3, que lo declara objeto con identidad y no diseñado; invariante I6; RN-09; RN-10.

Ejemplo de instancia: el directorio `/srv/despliegues/print-server/data` montado en `/data` por el servicio 305 (E-11).

### 1.16 Imagen

La imagen de contenedor de la que un despliegue materializa un contenedor, tratada como objeto y no como una cadena dentro del origen del servicio. Su identidad es el **digesto**, calculado sobre su contenido; la etiqueta es un nombre reasignable y no identifica nada de forma estable. Lleva **procedencia** —descargada, construida por el producto, construida por un automatismo externo, o **ajena**—, **pertenencia** al producto y, cuando la lleva, al proyecto y al servicio, y **marca de conservada**. Traza: E-23; E-9, bloque de identidad de objeto, que la declara objeto con identidad; RN-40; CU-37; CU-38.

**Cumple las tres condiciones de la prueba de D-12**, y conviene mostrarlo porque es lo que hace que esta entidad sea derivación y no propuesta nueva de esta categoría: la referencia cada despliegue y **varios despliegues referencian la misma**, que es una relación de muchos a uno que un atributo no puede representar; **sobrevive** al contenedor, al servicio y al proyecto, porque sigue en el almacén de imágenes cuando los tres dejan de existir; y tiene **ciclo de vida propio** —se descarga o se construye, ocupa disco, se conserva deliberadamente y se limpia—, que no es el ciclo de vida del servicio.

Ejemplo de instancia: la imagen de digesto `sha256:3f7a…`, referencia `registry.interno.lan/registro-privado/portal-api:1.4.2`, construida por un automatismo externo, con marca de pertenencia al servicio 101 del proyecto 12, no conservada, referenciada por los despliegues 5472 y 5480 (E-23).

**El digesto tiene quien lo escriba.** `Q-15` quedó **decidida en positivo el 2026-07-30**: el despliegue registra el digesto de la imagen que usó. Con esa decisión la entidad deja de ser una declaración sin escritor —el bloque `imagen` del despliegue de §2 es el campo que la puebla— y `Q-6`, que preguntaba por el commit, **cierra por arrastre** porque el digesto lo cubre. La marca de conservada también tiene su momento de ejercicio declarado: `Q-17` quedó decidida en la misma ronda y la limpieza es **sugerida**, de modo que la protección de RN-40 se ejerce en el momento en que el usuario confirma la sugerencia.

**Brecha declarada, acotada el 2026-07-30:** de las siete decisiones del intake §19 que condicionaban qué se hace con esta entidad, **dos quedaron cerradas** —`Q-15` y `Q-17`— y **cinco siguen abiertas**: `Q-16` (si las imágenes construidas llevan marca de pertenencia), `Q-18` (ámbito de credencial propio de la limpieza), `Q-19` (si existe la operación de volver a un despliegue anterior), `Q-20` (política de actualización al volver) y `Q-21` (quién marca una imagen como conservada y con qué alcance). Ninguna se presume resuelta acá. Ver §9.

---

## 2. Atributos clave

Sin tipos físicos. Sólo nombre y semántica, según §4.5 de las reglas de la categoría.

| Entidad | Atributo | Semántica | Restricción conceptual |
| --- | --- | --- | --- |
| Proyecto SelfHosted | Identidad | Identificador propio del proyecto | Toda relación se establece por él y nunca por el nombre (RC-17) |
| Proyecto SelfHosted | Nombre | Denominación legible elegida por el usuario | **No exige unicidad.** La consecuencia 2 de D-12 cierra la lista de nombres únicos del modelo en dos lugares y ninguno es éste, y E-9 declara `nombre` sin restricción de unicidad frente al identificador legible, que sí la lleva |
| Proyecto SelfHosted | Identificador legible | Forma corta y estable usada para nombrar recursos derivados | Único en la instalación (RC-01) |
| Proyecto SelfHosted | Autoarranque | Marca de que el proyecto se levanta al iniciar el administrador | Booleana |
| Proyecto SelfHosted | Disposición del lienzo | Posición y agrupación de los nodos | Atributo, no entidad (D-12). No entra al changeset (RN-12) |
| Red del proyecto | Modo | Bridge o macvlan | Bridge es el valor por defecto de un proyecto nuevo (DA-03) |
| Red del proyecto | Subred, pasarela, interfaz padre | Parámetros de la red | Presentes según el modo |
| Variable compartida del proyecto | Clave | Nombre descriptivo de la variable | No exige unicidad dentro del proyecto (RC-04, RN-28); sí respeta el formato de clave |
| Variable compartida del proyecto | Valor | Literal, ausente cuando la variable es secreta | Nunca una referencia (RC-05, RN-22) |
| Variable compartida del proyecto | Marca de secreta | Declara que el material viaja como referencia a un secreto | Cuando es verdadera, el valor está ausente (RC-16) |
| Servicio | Identidad | Identificador propio del servicio | Toda referencia lo usa a él y no al nombre (RC-17, RN-33) |
| Servicio | Nombre | Denominación y a la vez alias DNS dentro de la red del proyecto | Único dentro del proyecto, en minúsculas, con guiones, de 1 a 32 caracteres (RC-02, RN-01) |
| Servicio | Origen | **Variante discriminada de cinco valores**: imagen de registro público, imagen de registro privado, repositorio remoto, archivo de construcción en línea, y sin origen | Cada variante exige sus datos obligatorios y **ninguno de otra variante** (RN-08). No confundir con la **vía de alta**, que es cómo se llegó y no se persiste |
| Servicio | Comando de arranque | Comando con el que el contenedor arranca | Nulo hereda el de la imagen. Es la dimensión que el parque real usa y que la versión 1.0 no declaraba |
| Servicio | Estado de configuración | `borrador`, `pendiente-de-aplicar` o `aplicado` | **Ortogonal al estado del despliegue.** Un servicio en borrador no entra al conjunto de cambios pendientes y no es aplicable |
| Servicio | Procedencia | Huella de auditoría de la **vía de alta**: incorporación de un contenedor existente, o instanciación de un ítem del catálogo | **No es configuración.** Cuando viene del catálogo es una **copia** del identificador, el nombre y la versión de contenido del ítem, nunca una referencia (RN-39) |
| Servicio | Verificaciones | Estado, momento e informe de la verificación del origen y de la validación de la configuración | Son **dos operaciones distintas** con informes distintos. Ninguna bloquea guardar; las dos bloquean el paso a pendiente de aplicar |
| Servicio | Disparo externo | Bloque opcional con su credencial y su último uso | Es **propiedad transversal del servicio, no un origen**: cualquier variante de origen puede tenerlo |
| Servicio | Modo de red y dirección | Modo del servicio, alias, dirección fija e interfaz padre | En macvlan no publica puertos (RN-07) |
| Servicio | Puertos, montajes, dispositivos, recursos, verificación de salud | Dimensiones de configuración que el parque real exige | Atributos, no entidades (D-12) |
| Servicio | Réplicas | Cantidad de instancias paralelas | Cada réplica necesita su propia dirección cuando la dirección es fija (RN-18) |
| Servicio | Marca de efímero | Servicio pensado para reconstruirse en cada uso | Booleana |
| Servicio | Traza de adopción | Datos de la incorporación de un contenedor existente, incluida la clasificación de variables confirmada | Ausente cuando el servicio no fue adoptado |
| Variable de servicio | Clave | Contrato con el proceso que corre en el contenedor | Única dentro de su servicio (RC-03, RN-28). No puede empezar con el prefijo reservado (RN-32) |
| Variable de servicio | Referencia | Expresión sin resolver, en forma vinculada | Fuente de verdad cuando está presente |
| Variable de servicio | Último valor resuelto y momento de resolución | Materialización de la referencia | Sólo hay momento de resolución si hay referencia (RC-11) |
| Variable de servicio | Marca de secreta | Declara el carácter sensible del valor | Se propaga por la referencia (RN-23) |
| Variable de servicio | Forma de creación | Cómo nació la variable: manual, por enlace, por catálogo, por adopción o por referencia escrita | Registro, no clase distinta de variable |
| Enlace | Servicio de origen y servicio de destino | Extremos de la dependencia | Distintos entre sí (RC-06) |
| Enlace | Clave de la variable de origen y clave referenciada del destino | Par que sostiene la referencia | Van las dos o ninguna (RC-07) |
| Enlace | Puerto de destino | Registro de dependencia, no mecanismo de resolución | Ausente cuando la arista no involucra puerto |
| Enlace | Espera al destino | Propiedad declarada por el usuario que define el grafo de arranque | El sistema la propone y el usuario la cambia (RN-34) |
| Changeset | Estado | Pendiente, aplicado o descartado | Un cambio visual nunca entra (RN-12) |
| Changeset | Cambios | Lista de cambios con su antes, su después y los servicios que obligan a redesplegar | La entidad de un cambio puede ser servicio, proyecto o lienzo |
| Changeset | Informe de impacto | Servicios a redesplegar, servicios sin impacto y conflictos de dirección | Se presenta antes de ejecutar (RN-13) |
| Despliegue | Servicio y número de réplica | Qué materializa este intento | Un despliegue activo por réplica (I5) |
| Despliegue | Identificador del contenedor y nombre del contenedor | Vínculo con el motor | Ausentes mientras el contenedor no existe |
| Despliegue | Estado y código de salida | Punto de la máquina de estados de E-17 | Se resuelve siempre en un estado, nunca en «no se sabe» (RN-31) |
| Despliegue | Solicitante | Interfaz, API, autoarranque o política | Registro del disparador |
| Despliegue | Imagen usada | El **digesto** y la referencia legible de la imagen con la que se creó el contenedor | **Campo escrito por el despliegue**, por `Q-15` decidida en positivo el 2026-07-30. Es lo que permite saber qué corrió exactamente, resolver el uso de cada imagen y volver a ese despliegue (CU-38, cuya existencia como operación sigue sujeta a `Q-19`) |
| Imagen | Digesto | Identidad real, calculada sobre el contenido de la imagen | Es la identidad de la entidad. La etiqueta **no** identifica: es un nombre reasignable |
| Imagen | Procedencia y pertenencia | De dónde salió, y si el producto la administra y para qué servicio | La imagen **ajena** es la que el producto ve y no administra, y **no se toca** (RN-40) |
| Imagen | Marca de conservada | Declara que la imagen está protegida de la limpieza | Una imagen conservada no se limpia aunque ningún despliegue activo la referencie (RN-40). **Quién puede ponerla y con qué alcance sigue abierto** (`Q-21`) |
| Imagen | Tamaño y momento de creación | Consumo de disco atribuible y antigüedad | Es lo que vuelve accionable la atribución del consumo del servidor |
| Reserva de dirección | Dirección e interfaz padre | Dirección reservada de la red local | Debe pertenecer al rango gestionado y no estar excluida (RN-06) |
| Reserva de dirección | Servicio y número de réplica | A quién pertenece la reserva | Una reserva por réplica (RC-12, RN-18) |
| Ítem del catálogo | Subgrafo parametrizado | Servicios, enlaces y variables compartidas con huecos parametrizables | Al instanciarse crea N servicios y N contenedores (RN-30) |
| Ítem del catálogo | Versión del contenido y versión del formato | Distinguen lo que publica el usuario de la forma del ítem | El formato admite exactamente dos valores (RC-14) |
| Token de API | Nombre, prefijo y resumen del valor | Identificación del token sin conservar su valor | Sólo se persiste el resumen; el valor se muestra una vez (RC-13, RN-16) |
| Token de API | Ámbitos, vigencia y momento de revocación | Alcance y ciclo de vida | El conjunto de ámbitos es cerrado (§17.P.5) |
| Evento de auditoría | Momento, actor, acción, entidad, detalle y resultado | Los cinco campos de auditoría | Toda escritura genera uno (RN-17) |
| Secreto | Identidad y material | El valor sensible referenciado por una variable | Nunca se devuelve en claro ni se escribe en una exportación (RN-15) |
| Volumen o directorio de montaje | Identidad y ubicación | El recurso al que apunta un montaje | Sobrevive a la detención y puede conservarse al eliminar (RN-09, RN-10) |

---

## 3. Relaciones

Verbalizadas, según §4.2.2 de las reglas.

1. Un proyecto SelfHosted **agrupa** servicios; un servicio **pertenece a** exactamente un proyecto SelfHosted (I1, RN-02).
2. Un proyecto SelfHosted **tiene** una red; la red **da conectividad a** todos los servicios del proyecto.
3. Un proyecto SelfHosted **declara** variables compartidas; una variable compartida **pertenece a** un proyecto SelfHosted.
4. Un servicio **declara** variables de servicio; una variable de servicio **pertenece a** un servicio.
5. Un servicio **expone** variables provistas por el sistema, que no declara nadie y que son referenciables como cualquier otra.
6. Una variable de servicio **referencia** a otra variable —del propio servicio, compartida del proyecto o de otro servicio del mismo proyecto—; el vínculo se establece por identidad y no por nombre (RN-21, RN-33, RN-35).
7. Un servicio **depende de** otro servicio del mismo proyecto a través de un enlace; el enlace **sostiene** la referencia que le da origen, o **declara** únicamente la espera (RN-34).
8. Un proyecto SelfHosted **acumula** cambios en un changeset; el changeset **alcanza a** los servicios que su informe de impacto declara (RN-13).
9. Un servicio **es materializado por** despliegues; un despliegue **materializa** un servicio en una réplica concreta (I4, RN-31).
10. Un despliegue **puede originarse en** un changeset, cuando la operación que lo disparó fue la aplicación de ese changeset.
11. Una réplica de un servicio **reserva** una dirección; una reserva **pertenece a** una réplica de un servicio (RN-18).
12. Un ítem del catálogo **se instancia en** un proyecto SelfHosted, produciendo N servicios, N contenedores y los enlaces entre ellos (RN-30).
13. Una variable **referencia a** un secreto cuando es secreta; un secreto **puede ser referenciado por** varias variables.
14. Un montaje de un servicio **apunta a** un volumen o directorio; el volumen **sobrevive a** la detención del servicio y puede conservarse al eliminarlo (I6, RN-09, RN-10).
15. Un actor —el administrador o un token de API— **produce** eventos de auditoría; un evento **registra** una operación de escritura (RN-17).
16. Un servicio adoptado **queda vinculado a** un contenedor preexistente del motor por su identificador, sin recrearlo (RA-02, RA-03).
17. Un despliegue **usa** exactamente una imagen; una imagen **es usada por** varios despliegues, incluso de servicios distintos.
18. Una imagen **puede pertenecer a** un servicio de un proyecto SelfHosted, o **no pertenecer a ninguno**: la imagen ajena existe en el almacén y el producto no la administra.
19. Un servicio instanciado desde un ítem del catálogo **declara su procedencia** copiando el identificador, el nombre y la versión de contenido del ítem; el ítem **no queda referenciado** por él, y borrarlo no lo afecta (RN-39).

---

## 4. Cardinalidades

Notación uniforme: 1, N, 0..1, 1..N.

| Relación | Cardinalidad |
| --- | --- |
| Proyecto SelfHosted — Servicio | Proyecto (1) —— (0..N) Servicio |
| Proyecto SelfHosted — Red del proyecto | Proyecto (1) —— (1) Red |
| Proyecto SelfHosted — Variable compartida | Proyecto (1) —— (0..N) Variable compartida |
| Servicio — Variable de servicio | Servicio (1) —— (0..N) Variable de servicio |
| Servicio — Variable provista por el sistema | Servicio (1) —— (2) Variable provista |
| Servicio — Enlace (como origen) | Servicio (1) —— (0..N) Enlace |
| Servicio — Enlace (como destino) | Servicio (1) —— (0..N) Enlace |
| Variable de servicio — Enlace | Variable (1) —— (0..N) Enlace, una fila por clave referenciada |
| Proyecto SelfHosted — Changeset | Proyecto (1) —— (0..N) Changeset |
| Servicio — Despliegue | Servicio (1) —— (0..N) Despliegue, con como máximo 1 activo por réplica |
| Changeset — Despliegue | Changeset (0..1) —— (0..N) Despliegue |
| Servicio — Reserva de dirección | Servicio (1) —— (0..N) Reserva, una por réplica |
| Ítem del catálogo — Servicio instanciado | Ítem (1) —— (0..N) Servicio, N por instanciación |
| Variable — Secreto | Variable (0..N) —— (0..1) Secreto |
| Servicio — Volumen o directorio de montaje | Servicio (1) —— (0..N) Volumen o directorio |
| Actor — Evento de auditoría | Actor (1) —— (0..N) Evento |
| Servicio adoptado — Contenedor preexistente | Servicio (1) —— (1) Contenedor, y un contenedor pertenece a un solo proyecto (I10, RN-11) |
| Despliegue — Imagen | Despliegue (0..N) —— (1) Imagen. Es 0..N y no 1..N porque una imagen puede existir en el almacén sin que ningún despliegue la use |
| Imagen — Servicio (pertenencia) | Imagen (0..N) —— (0..1) Servicio. El 0..1 del lado del servicio es la **imagen ajena**, que no pertenece a ninguno |
| Ítem del catálogo — Servicio instanciado (procedencia) | Ítem (0..1) —— (0..N) Servicio, **por copia y no por referencia**: el 0..1 admite que el ítem ya no exista y el servicio siga declarando de dónde salió (RN-39) |

---

## 5. Reglas conceptuales

Diecinueve reglas conceptuales, una por archivo, en [reglas-conceptuales-de-modelo/](reglas-conceptuales-de-modelo/). Todas derivan de una restricción declarada en el anexo E-9, en el bloque de identidad de objeto del mismo anexo, o en el catálogo de reglas del anexo E-16; ninguna se origina en esta categoría.

| RC | Enunciado abreviado | Entidades |
| --- | --- | --- |
| [RC-01](reglas-conceptuales-de-modelo/RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto.md) | El identificador legible del proyecto SelfHosted es único en la instalación | Proyecto SelfHosted |
| [RC-02](reglas-conceptuales-de-modelo/RC-02-Unicidad-Del-Nombre-De-Servicio-En-Su-Proyecto.md) | El nombre del servicio es único dentro de su proyecto SelfHosted | Servicio, Proyecto SelfHosted |
| [RC-03](reglas-conceptuales-de-modelo/RC-03-Unicidad-De-La-Clave-De-Variable-En-Su-Servicio.md) | La clave de una variable de servicio es única dentro de su servicio | Variable de servicio, Servicio |
| [RC-04](reglas-conceptuales-de-modelo/RC-04-Ausencia-De-Unicidad-De-La-Clave-Compartida.md) | La clave de una variable compartida no exige unicidad dentro del proyecto | Variable compartida del proyecto |
| [RC-05](reglas-conceptuales-de-modelo/RC-05-Ausencia-De-Referencia-En-La-Variable-Compartida.md) | Una variable compartida contiene un literal o material secreto, nunca una referencia | Variable compartida del proyecto |
| [RC-06](reglas-conceptuales-de-modelo/RC-06-Irreflexividad-Del-Enlace.md) | Un enlace no puede tener el mismo servicio como origen y como destino | Enlace, Servicio |
| [RC-07](reglas-conceptuales-de-modelo/RC-07-Solidaridad-De-Las-Claves-Del-Enlace.md) | Las dos claves de referencia de un enlace están las dos presentes o las dos ausentes | Enlace |
| [RC-08](reglas-conceptuales-de-modelo/RC-08-Aporte-Minimo-Del-Enlace.md) | Todo enlace referencia una variable, declara espera, o las dos cosas | Enlace |
| [RC-09](reglas-conceptuales-de-modelo/RC-09-Unicidad-Del-Enlace-Por-Par-Y-Claves.md) | No hay dos enlaces con el mismo origen, destino y par de claves | Enlace |
| [RC-10](reglas-conceptuales-de-modelo/RC-10-Unicidad-Del-Enlace-De-Espera-Sin-Variable.md) | Entre dos servicios hay como máximo un enlace de espera sin variable | Enlace |
| [RC-11](reglas-conceptuales-de-modelo/RC-11-Coherencia-Entre-Referencia-Y-Resolucion.md) | Sólo una variable con referencia tiene momento de resolución | Variable de servicio |
| [RC-12](reglas-conceptuales-de-modelo/RC-12-Unicidad-De-La-Reserva-Por-Replica.md) | Cada réplica de un servicio reserva como máximo una dirección | Reserva de dirección, Servicio |
| [RC-13](reglas-conceptuales-de-modelo/RC-13-Unicidad-Del-Resumen-Del-Token.md) | El resumen del valor de un token de API es único y es lo único que se conserva | Token de API |
| [RC-14](reglas-conceptuales-de-modelo/RC-14-Valores-Admitidos-Del-Formato-Del-Item.md) | El formato de un ítem del catálogo admite exactamente dos valores | Ítem del catálogo |
| [RC-15](reglas-conceptuales-de-modelo/RC-15-Dependencia-Existencial-Del-Servicio.md) | Un servicio, sus variables, sus enlaces y sus reservas dependen existencialmente de su proyecto | Proyecto SelfHosted, Servicio, Variable de servicio, Enlace, Reserva |
| [RC-16](reglas-conceptuales-de-modelo/RC-16-Exclusion-Entre-Valor-Y-Marca-De-Secreta.md) | Una variable secreta no lleva valor en claro: lleva referencia a secreto | Variable de servicio, Variable compartida, Secreto |
| [RC-17](reglas-conceptuales-de-modelo/RC-17-Vinculo-Por-Identidad-Del-Modelo.md) | Toda relación entre objetos del modelo se establece por identidad y nunca por nombre | Todas |
| [RC-18](reglas-conceptuales-de-modelo/RC-18-Conservacion-Del-Historial-De-Despliegues.md) | El despliegue no se borra: es historial con política de retención declarada | Despliegue |
| [RC-19](reglas-conceptuales-de-modelo/RC-19-Unicidad-Del-Puerto-Publicado-Por-Host.md) | Un puerto del host lo publica como máximo un servicio | Servicio |

---

## 6. Referencia al glosario

El vocabulario de la categoría **no vive en este documento**. `Rules-Especificacion-Funcional` 4.0 §2.1 lo convierte en artefacto propio y obligatorio para los ocho tipos D8, `../Glosario-Funcional.md`, y su §4.2.2 punto 6 deja acá únicamente el puntero y la lista de términos. El motivo está declarado en la regla: este documento es **condicional a la persistencia** y el vocabulario de 02 no puede depender de ese flag.

**De dónde sale el artefacto nuevo.** Hasta la versión 3.0 de las reglas el glosario de la categoría **era este punto 6**. Su contenido —las treinta y dos entradas, el criterio de inclusión aplicado y la entrada polisémica de «registro» con sus cuatro referentes— es la fuente principal de `../Glosario-Funcional.md`, se traslada completo y no se reinterpreta. Nada se descarta en el traslado.

**Regla de no duplicación (§3.3).** Los términos que el glosario del dominio de 00 ya declara con la misma semántica —[`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §9, que es el glosario raíz de la cadena— se **referencian** ahí y no se redefinen. Este documento los usa con el sentido que 00 les fija.

### 6.1 Términos del modelo que el glosario funcional declara

Los términos que este modelo usa y que `../Glosario-Funcional.md` declara, separados por la regla de no duplicación de §3.3.

**Acuñados o precisados por la categoría 02** —no tienen entrada en `Vision-Producto.md` §9—:

| Término | Dónde lo usa este modelo |
| --- | --- |
| Registro **(cuatro referentes)** | Término polisémico: la entrada del glosario enumera sus cuatro referentes y fija la forma calificada de cada uno. Este modelo usa dos: **registro del sistema** en §8, con su propia fila de trazabilidad, y **registro de imágenes** en §2, en las dos variantes de origen «imagen de registro público» e «imagen de registro privado». Las tres apariciones de §2 con el sentido corriente de «anotación» —«Registro, no clase distinta de variable», «Registro de dependencia», «Registro del disparador»— y la de §1.13 —«Registro de una operación»— **no son ninguno de los cuatro referentes** y no se califican: `Vocabulario-Rules.md` §9.1 declara que calificarlas sería el falso positivo |
| Variable provista por el sistema | §1.6, §2, §3 relación 5, §4, §8 |
| Bridge | §1.2, §2 (modo de la red del proyecto), §1.4 |
| Macvlan | §1.2, §2 (modo de la red del proyecto y modo de red del servicio) |
| Efímero | §1.4, §2 (marca de efímero del servicio) |
| Verificación de salud | §2 (dimensiones de configuración del servicio) |
| Vía de alta | §2 (procedencia del servicio y nota del atributo Origen) |
| Origen | §1.4, §2 (variante discriminada de cinco valores) |
| Plantilla | §1.11, §3 relación 12, §7 |
| Versión de contenido | §2 (ítem del catálogo y procedencia del servicio), §3 relación 19 |
| Versión de formato | §2 (ítem del catálogo), §5 RC-14 |
| Imagen | §1.16, §2, §3 relaciones 17 y 18, §4, §7, §8, §9 |
| Digesto | §1.16, §2 (identidad de la imagen y bloque de imagen del despliegue) |
| Borrador | §2 (estado de configuración del servicio) |

**Referenciados de `Vision-Producto.md` §9 y no redefinidos:**

| Término | Dónde lo usa este modelo |
| --- | --- |
| Proyecto SelfHosted | §1.1 y todo el documento |
| Proyecto de código | Sólo en el contraste de vocabulario: no es una entidad de este modelo |
| Capa | Sólo en el contraste de vocabulario: no es una entidad de este modelo |
| Servicio | §1.4 y todo el documento |
| Despliegue | §1.9, §2, §3, §4, §5 RC-18, §8 |
| Arista o enlace | §1.7, §2, §3, §4, §5 RC-06 a RC-10 |
| Changeset | §1.8, §2, §3, §4, §8 |
| Adopción | §1.4, §2 (traza de adopción), §3 relación 16 |
| Huérfano | §3 relación 16, en su contraste con el servicio adoptado |
| Referencia de variable | §1.5, §2, §3 relación 6, §5 RC-05 y RC-11 |
| Variable compartida del proyecto | §1.3, §2, §3, §4, §5 RC-04, RC-05 y RC-16, §8 |
| Objeto con identidad | §0, §1.2, §1.14, §1.15, §1.16, §5 RC-17 |
| Catálogo | §1.11, §2, §3, §4, §7, §8 |
| Subgrafo parametrizado | §1.11, §2 (contenido del ítem del catálogo) |
| Modo pendiente | §2 (estado de configuración del servicio y estado del changeset) |
| Higiene del modelo | §2 (clave de la variable compartida, vía RN-37), §5 RC-04 |
| Token de API | §1.12, §2, §3 relación 15, §5 RC-13, §8 |
| Ámbito | §1.12, §2 (ámbitos del token de API) |

**Ninguna entrada de este documento contradice a `Vision-Producto.md` §9.** Los dieciocho términos referenciados se usan con la semántica que 00 les fija; las precisiones que esta categoría les agrega —la variante discriminada del origen, los dos estados de configuración, la copia de procedencia— son atributos del modelo y viven en §2, no en una redefinición del término.

---

## 7. Diagrama

```mermaid
erDiagram
    PROYECTO_SELFHOSTED ||--|| RED_DEL_PROYECTO : "tiene"
    PROYECTO_SELFHOSTED ||--o{ VARIABLE_COMPARTIDA : "declara"
    PROYECTO_SELFHOSTED ||--o{ SERVICIO : "agrupa"
    PROYECTO_SELFHOSTED ||--o{ CHANGESET : "acumula"
    PROYECTO_SELFHOSTED ||--o{ ENLACE : "contiene"
    SERVICIO ||--o{ VARIABLE_DE_SERVICIO : "declara"
    SERVICIO ||--o{ DESPLIEGUE : "es materializado por"
    SERVICIO ||--o{ RESERVA_DE_DIRECCION : "reserva"
    SERVICIO ||--o{ VOLUMEN_O_DIRECTORIO : "monta"
    SERVICIO ||--o{ ENLACE : "es origen de"
    SERVICIO ||--o{ ENLACE : "es destino de"
    VARIABLE_DE_SERVICIO }o--o| SECRETO : "referencia"
    VARIABLE_COMPARTIDA }o--o| SECRETO : "referencia"
    CHANGESET ||--o{ DESPLIEGUE : "origina"
    ITEM_DE_CATALOGO ||--o{ SERVICIO : "se instancia como"
    DESPLIEGUE }o--|| IMAGEN : "usa"
    IMAGEN }o--o| SERVICIO : "pertenece a"
    TOKEN_DE_API ||--o{ EVENTO_DE_AUDITORIA : "produce"
```

El diagrama omite deliberadamente la variable provista por el sistema, que es una proyección derivada del servicio y no una entidad persistida.

**La relación de la imagen con el ítem del catálogo no aparece, y es deliberado**: no existe. Un ítem declara una referencia de imagen como texto dentro de su plantilla, y sólo al instanciarse y desplegarse aparece una imagen concreta. Dibujarla sugeriría que el catálogo tiene imágenes, y **nada del catálogo corre**.

---

## 8. Trazabilidad

| Entidad | CU que la consumen | RN que la restringen |
| --- | --- | --- |
| Proyecto SelfHosted | CU-01, CU-02, CU-04, CU-05, CU-09, CU-10, CU-11, CU-12, CU-18, CU-20, CU-21, CU-22, CU-24, CU-27, CU-34, CU-36 | RN-02, RN-03, RN-12, RN-20, RN-35 |
| Red del proyecto | CU-01, CU-03, CU-19, CU-20 | RN-03, RN-06, RN-07, RN-35 |
| Variable compartida del proyecto | CU-34, CU-35, CU-16, CU-22, CU-25, CU-36, CU-09, CU-11 | RN-15, RN-22, RN-23, RN-27, RN-28, RN-37 |
| Servicio | CU-03, CU-04, CU-07, CU-08, CU-13, CU-15, CU-16, CU-18, CU-22, CU-24, CU-27, CU-28 | RN-01, RN-02, RN-06, RN-07, RN-08, RN-09, RN-10, RN-18, RN-19, RN-33, RN-36 |
| Variable de servicio | CU-03, CU-04, CU-07, CU-34, CU-35, CU-22, CU-25 | RN-21, RN-22, RN-23, RN-24, RN-27, RN-28, RN-32, RN-33 |
| Variable provista por el sistema | CU-04, CU-35 | RN-32, RN-04 |
| Registro del sistema | CU-01, CU-02, CU-11, CU-20, CU-26, CU-36 | RN-13, RN-17 |
| Enlace | CU-04, CU-11, CU-16, CU-18, CU-22, CU-25 | RN-04, RN-05, RN-14, RN-34 |
| Changeset | CU-22, CU-23, CU-24, CU-25, CU-34 | RN-12, RN-13 |
| Despliegue | CU-13, CU-15, CU-18, CU-24, CU-27, CU-28, CU-33 | RN-13, RN-20, RN-24, RN-31 |
| Reserva de dirección | CU-19, CU-20, CU-21 | RN-03, RN-06, RN-18 |
| Ítem del catálogo | CU-16, CU-17 | RN-30, RN-36, RN-37 |
| Token de API | CU-32, CU-33 | RN-15, RN-16, RN-17 |
| Evento de auditoría | CU-32, CU-33, y toda operación de escritura | RN-17 |
| Secreto | CU-07, CU-09, CU-34, CU-35 | RN-15, RN-23, RN-25 |
| Volumen o directorio de montaje | CU-03, CU-08, CU-18 | RN-09, RN-10 |
| Imagen | CU-13, CU-15, CU-37, CU-38, CU-39 | RN-40 |

---

## 9. Brechas declaradas

| Brecha | Traza | Destinatario |
| --- | --- | --- |
| El modelo lógico del Secreto, de la Red del proyecto y del Volumen o directorio de montaje no está diseñado: el intake declara que son objetos con identidad y que su mapeo es materia de la Fase C | Intake §24.3 y bloque de identidad de objeto de E-9 | 05-Arquitectura-Tecnica |
| Un volumen conservado tras eliminar su servicio queda hoy sin ninguna entidad que lo represente. El intake lo registra como hallazgo real y no lo resuelve | Intake §24.3 | 05-Arquitectura-Tecnica |
| Catorce de las dieciséis especificaciones derivadas `[D-i]` que sostienen partes de este modelo siguen sin revisar; se consumen declarándolas revisables | Intake §24.1 | Agente humano del proyecto |
| El intake no declara si un proyecto SelfHosted admite más de un changeset pendiente a la vez. El anexo E-9 no impone ninguna restricción de unicidad sobre `changesets`, y la invariante I9 declara sólo que los cambios se acumulan en un changeset y se aplican en lote | Anexo E-9, tabla `changesets`; intake §17.P.2, invariante I9 | 05-Arquitectura-Tecnica, al fijar el modelo lógico |
| El intake no declara política de purga para las reservas de dirección de servicios eliminados o inactivos | Anexo E-9, tabla `reservas_ip`; §17.P.4 decisión de esquema 1 | 05-Arquitectura-Tecnica |
| **El modelo lógico de la Imagen no está diseñado**, igual que los otros tres objetos con identidad. El anexo E-23 emite su modelo conceptual y declara explícitamente que no diseña sus columnas | Anexo E-23; E-9, bloque de identidad de objeto | 05-Arquitectura-Tecnica |
| **Cinco decisiones abiertas condicionan todavía qué se hace con la entidad Imagen**: `Q-16`, `Q-18`, `Q-19`, `Q-20` y `Q-21`. **Acotada el 2026-07-30**: `Q-15` y `Q-17` quedaron cerradas —el despliegue registra el digesto y la limpieza es sugerida—, de modo que la entidad tiene quien la escriba y la limpieza tiene modo de disparo. Lo que sigue sin decidirse es la marca de pertenencia de lo construido (`Q-16`), el ámbito de credencial de la limpieza (`Q-18`), la existencia de la operación de volver (`Q-19`), la política de actualización al volver (`Q-20`) y quién marca una imagen como conservada (`Q-21`). El intake corrige además la formulación anterior: `Q-15` era **condición** de las otras seis y no su respuesta, y ninguna se cierra por arrastre salvo `Q-6` | Intake §19, tabla de pendientes de decisión; anexo E-23, tabla «qué quedó decidido y qué queda abierto» | Agente humano del proyecto |
| **`Q-28`: el intake no declara si el origen de un servicio es editable después del alta.** La reentrada de la configuración de CU-03 arranca después del origen y lo excluye sin decirlo, de modo que corregir una etiqueta mal escrita no tiene camino. El atributo Origen es editable en el modelo y no hay flujo que lo ejerza | Intake §19; [CU-03](../Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) §10 | Agente humano del proyecto |
| **Cinco de las restricciones que sostienen este modelo siguen siendo especificaciones de integración `[D-i]` sin revisar**: `DI-20` a `DI-24`. **Acotada el 2026-07-30**: `DI-17`, `DI-18` y `DI-19` quedaron **confirmadas** por el agente humano del proyecto y pasan a `[D]`, de modo que la variante discriminada de origen con su reparto de siete vías sobre cinco valores, la separación de imagen pública y privada, y el estado de configuración `borrador` **se consumen como decisión cerrada** y ya no se declaran revisables. Las cinco que siguen abiertas alcanzan al archivo de construcción en línea, a la conversión de secretos al guardar como plantilla, a los tipos de parámetro, a los puertos publicados del descubrimiento y a la importación como copia | Intake §19, tabla de especificaciones de integración | Agente humano del proyecto |

---

## 10. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 2.1 | 2026-07-30 | **Incorporación de la ronda de decisiones del agente humano del proyecto del 2026-07-30**, consolidada en el `PRODUCT-INTAKE-SelfHosted-Service` **v3.2** —§19, el anexo E-23 actualizado y la nota de los dos ejes del alta de §4—. Sube **minor**: ninguna entidad, atributo, relación, cardinalidad, regla conceptual ni diagrama cambia de contenido; lo que cambia es **el estatus de las decisiones de las que este modelo dependía**. **`Q-15` decidida en positivo**: §1.16 deja de declarar que la entidad Imagen «existe en el modelo y nadie la escribe» y declara que el bloque `imagen` del despliegue es el campo que la puebla; la fila «Despliegue · Imagen usada» de §2 pasa de «Depende de `Q-15`, abierta» a campo escrito por el despliegue. **`Q-6` cierra por arrastre**, porque el digesto cubre qué versión corre. **`Q-17` decidida: la limpieza es sugerida**, de modo que §1.16 declara el momento en que la protección de la marca de conservada se ejerce. **`Q-27` decidida: hay exploración de registro de imágenes**, y §8 suma `CU-39` a la fila de trazabilidad de la entidad Imagen. **`DI-17`, `DI-18` y `DI-19` confirmadas**: la fila de §9 que declaraba ocho especificaciones de integración sin revisar pasa a **cinco**, `DI-20` a `DI-24`, y declara que la variante discriminada de origen, la separación de imagen pública y privada y el estado `borrador` se consumen como decisión cerrada. **Ninguna decisión abierta se cerró acá**: la fila de brecha de la entidad Imagen pasa de siete pendientes a **cinco** —`Q-16`, `Q-18`, `Q-19`, `Q-20` y `Q-21`—, enumeradas una por una, y la fila «Imagen · Marca de conservada» de §2 declara explícitamente que quién puede ponerla sigue siendo `Q-21`. Se transcribe además la corrección que el intake v3.2 hace de su propia formulación: `Q-15` era **condición** de las otras seis y no su respuesta. La versión 2.0 queda archivada en `_legacy/2026-07-30/Modelo-Conceptual-v2.0.md`, con su bloque de archivado antepuesto y su cuerpo sin modificar |
| 2.0 | 2026-07-30 | **Migración normativa 4.1 → 6.0**, fase M4, corte 3, sobre el plan [`Plan-Migracion-4.1-a-6.0.md`](../../Audit/Plan-Migracion-4.1-a-6.0.md) §3.5 y la fila de este documento de su §4. Clasificación **regenerar contenido**; fuente de contenido: **documento de origen**, más el upstream de 00 para la verificación de no duplicación del glosario y el intake §12 para la convención de vocabulario. Sube **major** porque `Rules-Especificacion-Funcional` pasa de 2.0 a **4.0** y un modelo conceptual emitido con la estructura anterior deja de cumplir. **El punto 6 deja de ser el glosario de la categoría**: la 4.0 §2.1 convierte el glosario en artefacto propio y obligatorio para los ocho tipos D8, `Glosario-Funcional.md`, y su §4.2.2 punto 6 deja acá sólo el puntero y la lista de términos. Las treinta y dos entradas del punto 6 anterior, su criterio de inclusión aplicado y la entrada polisémica de «registro» con sus cuatro referentes **no se descartan**: son la fuente principal de ese artefacto, que emite un lote posterior de este mismo corte, y se trasladan completas y sin reinterpretar. El punto 6 pasa a llamarse «Referencia al glosario» y suma §6.1, que lista los treinta y dos términos separados por la regla de no duplicación de §3.3: **catorce acuñados o precisados por 02** y **dieciocho referenciados** de [`Vision-Producto.md`](../../00-Contexto/Vision-Producto.md) §9, que es el glosario raíz de la cadena. **Renombre de vocabulario normativo por la `[5.0]` del framework, por el procedimiento por ocurrencia de `Vocabulario-Rules.md` §9.5 y nunca por sustitución global de cadena:** la etiqueta de cabecera `**Proyecto:**` sobre un valor de plano producto pasa a `**Producto:**` (1 ocurrencia), y el prefijo del nombre del documento de entrada pasa a `PRODUCT-INTAKE-SelfHosted-Service` (1). **Censo de «proyecto» sobre el documento de origen: 104 ocurrencias, 1 sustituida.** Las **89 que designan la entidad del dominio no se tocaron**, ni las 4 del emprendimiento —«agente humano del proyecto»—, ni las 5 de identificadores persistidos del anexo E-9 —`proyectos`, `variables_proyecto`, el ámbito `proyectos:leer`—, ni las 2 de nombre de artefacto del dominio —los enlaces a `RC-01-Unicidad-Del-Identificador-Legible-Del-Proyecto.md` y a `RC-02-Unicidad-Del-Nombre-De-Servicio-En-Su-Proyecto.md`, cuyos nombres de archivo **no se renombran**—, ni las 2 que ya decían «proyecto de código», ni la mención del término como término en el criterio de inclusión del punto 6. **Ninguna ocurrencia se promovió a «proyecto de código»**: en esta categoría hacerlo corrompería la especificación. **Barrido negativo del término de nivel superior.** La cadena que la `[5.0]` renombró a «producto» aparece 5 veces en el cuerpo del documento —§2 y §5— y las 5 son subcadena de la palabra que designa la materialización de una referencia, no el término renombrado, que no aparece nunca en este documento ni solo ni en el compuesto que designa el agrupador de construcción. Conteo idéntico antes y después: 5 y 5, y cero apariciones de la palabra inexistente que el reemplazo global produce. **Ningún invariante de integridad cambió de contenido normativo**: §1 a §5, §7, §8 y §9 conservan sus entidades, atributos, relaciones, cardinalidades, diagrama, trazabilidad y brechas palabra por palabra. La tabla de contenido suma las anclas de segundo nivel que §4.1 exige. La versión 1.1 queda archivada en `_legacy/2026-07-30/Modelo-Conceptual-v1.1.md`. |
| 1.1 | 2026-07-29 | **Se incorpora la Imagen como entidad con identidad y ciclo de vida propio, y se emite RC-19.** §0 pasa de catorce a **quince** entidades conceptuales, con la imagen entre los objetos que E-9 declara y no diseña. §1.16 declara la entidad nueva **aplicando condición por condición la prueba de tres de D-12**, que este modelo ya usaba, de modo que es derivación y no propuesta de esta categoría. §2 declara los atributos de la imagen, el bloque de imagen del despliegue, y cinco atributos del servicio que la versión 1.0 no tenía: el origen pasa de tres valores planos a **variante discriminada de cinco**, y se suman **comando de arranque**, **estado de configuración**, **procedencia** y **verificaciones**. §3 suma tres relaciones y §4 sus tres cardinalidades, incluida la que admite que el ítem del catálogo **ya no exista** y el servicio siga declarando de dónde salió. §5 suma **RC-19**, la unicidad del puerto publicado por host, que es la restricción que §22.4 del documento de entrada declaraba inexistente. §6 suma **ocho entradas de glosario** —vía de alta, origen, plantilla, versión de contenido, versión de formato, imagen, digesto y borrador—, cada una con el término con el que no hay que confundirla. §7 suma las dos relaciones de la imagen al diagrama y declara por qué **no** dibuja una relación entre la imagen y el ítem del catálogo. §8 suma la fila de la imagen. §9 suma **cuatro brechas**, entre ellas que la entidad Imagen existiría sin nadie que la escriba mientras `Q-15` esté abierta. La versión 1.0 queda archivada en `_legacy/2026-07-29/`. Origen: §22.4 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0 |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, por `Master-Prompt.md` §5. §6 suma la entrada **Registro**, que declara sus **cuatro referentes** —del sistema, de auditoría, del contenedor y de imágenes— con la forma calificada de cada uno y la regla de uso de la forma a secas, admitida sólo para el registro del sistema. Se agrega el **criterio de inclusión** del glosario, que el archivo de reglas no fija: entra todo término que aparece en más de un artefacto y todo término con más de un referente. El criterio de desambiguación es el del intake §12, con una precisión propia de esta categoría: **el contexto de lectura es la sección y no el documento**. §8 suma la fila de trazabilidad del registro del sistema. |
| 1.0 | 2026-07-29 | Tres correcciones absorbidas dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y las tres provienen del audit de su propia fase de emisión. Primera: §4 declaraba la cardinalidad del changeset como «con como máximo uno pendiente», restricción que ninguna fuente sostiene —el anexo E-9 crea `changesets` sin clave única ni índice parcial sobre el estado, y es explícito cuando quiere expresar una restricción de esa forma; la invariante I9 declara sólo que los cambios se acumulan y se aplican en lote—. Se retira el inciso y la pregunta se declara como brecha en §9, con 05-Arquitectura-Tecnica como destinataria. Origen: hallazgo H-03 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md). Segunda: §9 declaraba como brecha la retención de los eventos de auditoría, que el intake §17.P.11 sí declara en DA-07 —90 días, configurables—; el componente falso se retira y la fila queda acotada a la purga de las reservas de dirección, que sigue abierta. Tercera: §2 declaraba el nombre del proyecto SelfHosted como «sin unicidad declarada», cuando la consecuencia 2 de D-12 cierra la lista de nombres únicos del modelo en dos lugares y ninguno es éste; se reescribe la celda como dato resuelto y se retira la brecha correspondiente de §9. Origen de las dos últimas: §7.1 del mismo informe, veredictos de B-17 y B-03 |
| 1.0 | 2026-07-29 | Versión inicial. Derivada del anexo E-9 del intake y del bloque de identidad de objeto del mismo anexo, en lenguaje conceptual y sin tipos físicos. Declara catorce entidades conceptuales sobre once tablas persistidas, lo que activa la obligatoriedad de las reglas conceptuales por §2.2 de las reglas de la categoría. Declara cinco brechas con su destinatario y no resuelve ninguna |
