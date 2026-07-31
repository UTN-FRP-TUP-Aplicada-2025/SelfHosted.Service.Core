# Maqueta de validación visual — SelfHosted Service

**Producto:** SelfHosted Service
**Proyecto de código:** SelfHosted-Service (`web-monolith`)
**Fase:** B2 · Validación visual de maqueta, bajo **`Maqueta-Rules.md` 3.1**
**Modelo UX-UI aplicado:** catálogo base de `Devs/References/Design/`. El catálogo `Modelos-UX-UI/` está vacío —sólo tiene su índice y su plantilla—, de modo que no se aplica ningún modelo por encima.
**Fecha de la iteración vigente:** 2026-07-30
**Plataforma de validación:** Google Chrome de escritorio, canal estable, versión mínima 150.0.7871.186, sobre Windows Server 2022 21H2, en red local. Es el único navegador soportado por `00-Contexto/Compatibilidad-Plataformas.md` §2.1 y §4. **Familia única: no hay versión móvil especificada.**

> **Documento consolidado el 2026-07-30, al cierre de la segunda pasada.** La iteración del 2026-07-30 rehízo la maqueta entera bajo `Maqueta-Rules` 3.1 en dos pasadas: la **A** rehízo `SUP-05`, `SUP-06`, `SUP-07`, `SUP-10`, `SUP-11` y `SUP-17`, y extendió la columna vertebral; la **B** construyó `SUP-18` y `SUP-19`, ajustó `SUP-09` y `SUP-12`, y consolidó este documento y el índice. **Todas las cifras de acá abajo se verificaron en disco**, no se transcribieron de la versión anterior.

Esta maqueta **no es el producto**. Es la materialización navegable de la especificación de experiencia de `SDD/Docs/03-UX-UI-DX/`, para que el agente humano del proyecto vea antes de que se codifique.

---

## 1. Cómo se abre

Los cuatro métodos sirven exactamente los mismos archivos. No hay proceso de build, no hay gestor de paquetes y no hay `node_modules`: **lo que se edita es lo que se sirve**.

1. **Auto-lanzado del orquestador.** Servidor estático en segundo plano más apertura del navegador. Es el camino por defecto para la primera mirada.
2. **Servidor liviano del editor.** Es el recomendado si vas a corregir a mano: en Visual Studio Code, Live Server o equivalente sirve la carpeta y recarga el navegador solo en cada guardado.
3. **Servidor estático de línea de comandos.**
   ```bash
   cd SDD/Maquetas/SelfHosted-Service
   python3 -m http.server 8080
   ```
   y abrir `http://localhost:8080`. No recarga sola, pero la maqueta trae su propio interruptor de recarga automática.
4. **Abrir el archivo directamente.** `index.html` en el navegador, sin nada. Sirve para una mirada rápida. Sobre `file://` la recarga automática de la propia maqueta **no funciona**: el interruptor se muestra deshabilitado con su motivo.

El método adoptado por este proyecto de código es el **2 para corrección manual** y el **1 o el 3 para revisión**.

---

## 2. Qué hay adentro

**Veinte archivos HTML: diecinueve superficies más el punto de entrada.**

```
SelfHosted-Service/
├── index.html                                  punto de entrada: las 19 superficies y el contrato de campos
├── Aprovisionamiento-Inicial.html              SUP-01
├── Acceso-Al-Panel.html                        SUP-02
├── Cambio-De-Contrasena.html                   SUP-03
├── Listado-De-Proyectos.html                   SUP-04
├── Lienzo-Del-Proyecto.html                    SUP-05
├── Panel-Lateral-Del-Servicio.html             SUP-06
├── Cajon-De-Cambios-Pendientes.html            SUP-07
├── Registro-Del-Contenedor.html                SUP-08
├── Tablero-De-Estado.html                      SUP-09
├── Descubrimiento-E-Incorporacion.html         SUP-10
├── Catalogo-De-Plantillas.html                 SUP-11
├── Configuracion-Del-Sistema.html              SUP-12
├── Variables-Compartidas-Del-Proyecto.html     SUP-13
├── Informe-De-Conflicto-De-Direcciones.html    SUP-14
├── Exportacion-E-Importacion.html              SUP-15
├── Revision-De-Higiene.html                    SUP-16
├── Alta-De-Servicio.html                       SUP-17
├── Imagenes.html                               SUP-18
├── Exploracion-De-Registro-De-Imagenes.html    SUP-19
├── assets/css/Estilos-Maqueta.css              tokens del catálogo como variables CSS
├── assets/js/Datos-Maqueta.js                  fuente única de datos, contrato de campos y descriptores
├── assets/js/Maqueta.js                        render, navegación y conmutación de estados
└── README.md                                   este archivo
```

No hay `assets/img/`: **toda la iconografía es SVG inline con `currentColor`**, sin raster y sin packs de íconos por CDN.

---

## 3. Matriz de correspondencia: qué superficie materializa qué caso de uso

La correspondencia es la de `Experiencia-De-Uso.md` §9.2, que es su **fuente única**. `index.html` la exhibe completa, generada desde `Datos-Maqueta.js`.

| # | Superficie | Archivo | Wireframe de origen | CU que la ejercitan | Estados demostrables |
| --- | --- | --- | --- | --- | --- |
| SUP-01 | Aprovisionamiento inicial | `Aprovisionamiento-Inicial.html` | `Wireframes-Aprovisionamiento-Inicial.md` | CU-29 | 9 |
| SUP-02 | Acceso al panel | `Acceso-Al-Panel.html` | `Wireframes-Acceso-Al-Panel.md` | CU-30 | 11 |
| SUP-03 | Cambio de contraseña | `Cambio-De-Contrasena.html` | `Wireframes-Cambio-De-Contrasena.md` | CU-31 | 9 |
| SUP-04 | Listado de proyectos | `Listado-De-Proyectos.html` | `Wireframes-Listado-De-Proyectos.md` | CU-01, CU-02, CU-11 | 11 |
| SUP-05 | Lienzo del proyecto | `Lienzo-Del-Proyecto.html` | `Wireframes-Lienzo-Del-Proyecto.md` 2.0 | CU-03, CU-04, CU-05, CU-13, CU-15, CU-16, CU-18, CU-22, CU-28 | 18 |
| SUP-06 | Panel lateral del servicio | `Panel-Lateral-Del-Servicio.html` | `Wireframes-Panel-Lateral-Del-Servicio.md` 2.1 | CU-03, CU-13, CU-15, CU-18, CU-19, CU-35, CU-38 | 23 |
| SUP-07 | Cajón de cambios pendientes | `Cajon-De-Cambios-Pendientes.html` | `Wireframes-Cajon-De-Cambios-Pendientes.md` 2.0 | CU-22, CU-23, CU-24, CU-25 | 17 |
| SUP-08 | Registro del contenedor | `Registro-Del-Contenedor.html` | `Wireframes-Registro-Del-Contenedor.md` | CU-14 | 8 |
| SUP-09 | Tablero de estado | `Tablero-De-Estado.html` | `Wireframes-Tablero-De-Estado.md` 2.1 | CU-26, CU-27, CU-28, CU-37 | 14 |
| SUP-10 | Descubrimiento e incorporación | `Descubrimiento-E-Incorporacion.html` | `Wireframes-Descubrimiento-E-Incorporacion.md` 2.0 | CU-06, CU-07, CU-08 | 19 |
| SUP-11 | Catálogo de plantillas | `Catalogo-De-Plantillas.html` | `Wireframes-Catalogo-De-Plantillas.md` 2.1 | CU-16, CU-17, CU-36 | 23 |
| SUP-12 | Configuración del sistema | `Configuracion-Del-Sistema.html` | `Wireframes-Configuracion-Del-Sistema.md` 2.1 | CU-12, CU-19, CU-32, CU-37 | 20 |
| SUP-13 | Variables compartidas del proyecto | `Variables-Compartidas-Del-Proyecto.html` | `Wireframes-Variables-Compartidas-Del-Proyecto.md` | CU-34, CU-35, CU-36 | 14 |
| SUP-14 | Informe de conflicto de direcciones | `Informe-De-Conflicto-De-Direcciones.html` | `Wireframes-Informe-De-Conflicto-De-Direcciones.md` | CU-18, CU-20, CU-21, CU-24 | 11 |
| SUP-15 | Exportación e importación | `Exportacion-E-Importacion.html` | `Wireframes-Exportacion-E-Importacion.md` | CU-09, CU-10, CU-11, CU-12 | 14 |
| SUP-16 | Revisión de higiene | `Revision-De-Higiene.html` | `Wireframes-Revision-De-Higiene.md` | CU-36 | 10 |
| SUP-17 | Alta de servicio | `Alta-De-Servicio.html` | `Wireframes-Alta-De-Servicio.md` 2.1 | CU-03, CU-13, CU-15, CU-16 | 19 |
| SUP-18 | Imágenes | `Imagenes.html` | `Wireframes-Imagenes.md` 2.1 | CU-37, CU-38 | 19 |
| SUP-19 | Exploración de registro de imágenes | `Exploracion-De-Registro-De-Imagenes.html` | `Wireframes-Exploracion-De-Registro-De-Imagenes.md` 1.0 | CU-39, CU-03 | 13 |

**Diecinueve superficies. 282 estados demostrables.** La cifra la calcula `index.html` desde `Datos-Maqueta.js` y no se transcribe a mano; la de esta tabla se verificó contra el mismo archivo.

**Cobertura de casos de uso.** Los treinta y nueve casos de uso de `02-Especificacion-Funcional` están cubiertos salvo **CU-33**, y no es una omisión: su actor es el automatismo de integración continua y su superficie es la API REST, no una pantalla.

Algunas superficies demuestran, además de los estados que su wireframe declara, **estados suplementarios** rotulados como tales en el selector. Existen porque el wireframe especifica un componente en su §3 y no le da fila en su tabla de estados: son hallazgos de la fase, enumerados en la devolución del paso 3.

---

## 4. La barra de validación

Arriba de cada superficie, rotulada literalmente **«Barra de validación de maqueta — no forma parte del producto»**. Es un instrumento de esta fase y **no se traslada ni a la especificación ni al código**.

Ofrece tres cosas:

- **Selector de superficie.** Navega a cualquiera de las diecinueve sin volver al índice.
- **Selector de estado.** Alterna los estados de la superficie en curso **sin recargar**. Cada cambio se anuncia como región activa para lectores de pantalla, y queda en el fragmento de la dirección (`#estado=<id>`), de modo que un estado concreto se puede compartir por enlace.
- **Interruptor de recarga automática.** Apagado por defecto; su estado se persiste en el navegador. Encendido, compara el identificador de versión de los recursos —`ETag` o `Last-Modified` de una petición `HEAD`, no una descarga completa— cada 3 segundos, suspende el sondeo con la pestaña no visible, y refresca la página cuando alguno cambió. Sobre `file://` se muestra **deshabilitado con su razón** en lugar de fallar.

En las superficies que alojan una brecha o una propuesta abierta la barra suma además su **nota**, con borde propio: `SUP-05` (`B-UX-01`), `SUP-17` y `SUP-19` (`B-UX-29`), y `SUP-09`, `SUP-12` y `SUP-18` (`B-UX-28`).

---

## 5. Las brechas y propuestas abiertas que hay que resolver

Ninguna de las tres es especificación. La maqueta las **exhibe declaradas** y no elige por el agente humano. La corrección de los wireframes y de `Experiencia-De-Uso` es del paso 6 y la hace AG-03.

### 5.1 Distinción visual de las aristas · `B-UX-01`, en `SUP-05`

Ninguna regla del catálogo de diseño cubre la representación de aristas de un lienzo y el anexo E-18 no tiene fila. La especificación fija tres restricciones y **no elige la distinción**. Esta maqueta dibuja una para que la apruebes o la corrijas.

| Clase de arista | Canales que la distinguen |
| --- | --- |
| Declara espera al destino | Trazo sólido neutro · punta de flecha **rellena** · **marcador de espera** (doble barra) en el punto medio · rótulo «espera» |
| No declara espera | Trazo sólido neutro · punta de flecha **hueca** · sin marcador medio |
| Inválida, bloquea el arranque | Trazo **punteado** en color de error · marcador de **cruz** en el punto medio · rótulo «inválida» |

Cumple las tres restricciones: no usa el violeta reservado a «pendiente de aplicar», usa forma además de color, y la inválida se distingue de las otras dos por color, por patrón de trazo y por marcador.

### 5.2 Configuración de los registros explorables · `B-UX-29`, en `SUP-17` y `SUP-19`

Dónde se configura el conjunto de registros de imágenes explorables, y si viene alguno de fábrica, **no lo declara ninguna fuente**. De eso depende que el primer minuto de uso termine en una lista de imágenes o en un estado vacío que pide configurar un registro.

Se ve en dos lugares: el disparador «Explorar el registro» del paso del origen de las vías 3 y 4 del alta, que **existe y declara su destino**; y el estado vacío de `SUP-19`, donde la acción «Configurar un registro» queda como **arista declarada y sin destino**. La maqueta no elige cuál es ese destino.

### 5.3 Valores del umbral de la sugerencia de limpieza · `B-UX-28`, en `SUP-12`, `SUP-18` y `SUP-09`

Las dos condiciones del umbral tienen **forma declarada y no tienen valor**. Ninguna fuente declara la capacidad del disco del servidor de referencia, ninguna cota de ocupación, y el catálogo de diseño no cubre umbrales de disco. A eso se suma que el cálculo del espacio recuperable depende del **criterio de descarte**, que tampoco declara ninguna fuente —brecha `B-26` de `02-Especificacion-Funcional`—.

La maqueta dibuja **la forma completa** de las tres materializaciones y deja las ranuras numéricas declaradas: los dos descriptores de `SUP-12` con su etiqueta, su unidad, su regla de cálculo y **sin valor por defecto**; la banda de `SUP-18` con sus dos acciones y su espacio recuperable declarado como sin cifra; y la línea de `SUP-09` con su enlace y sin acción de confirmar ni de descartar.

---

## 6. De dónde salen los datos

Los datos de ejemplo viven **exclusivamente** en `assets/js/Datos-Maqueta.js`. Ningún HTML los hardcodea: los renderiza `Maqueta.js`. `index.html` exhibe el contrato de campos completo, con tipo, ejemplo, entidad de origen y anexo del intake que lo declara.

Fuente: `PRODUCT-INTAKE-SelfHosted-Service.md` **v3.3**.

| Conjunto | Anexo del intake |
| --- | --- |
| Proyecto SelfHosted, red, disposición del lienzo, variables compartidas, aristas | E-1 |
| Servicio con sus ocho dimensiones, sus **cinco variantes discriminadas de origen** y la variante macvlan | E-2 |
| Despliegue con su línea de tiempo, sus métricas y el despliegue fallido | E-3 |
| Changeset con sus cambios y su informe de impacto | E-5 |
| Ítems del catálogo, simple y multi-servicio, con sus parámetros y sus cuatro tipos | E-6 |
| Candidatos del descubrimiento, con el no incorporable y el ya incorporado | E-7 |
| Rango gestionado, reservas e informe de conflicto con sus tres resoluciones | E-8 |
| Paso obligatorio de clasificación de variables | E-11 |
| Credencial de máquina con sus ámbitos y su vigencia | E-12 |
| Tablero en tres capas, contrato visual de estados y el conteo de imágenes del host | E-18 |
| Parque de contenedores de referencia | E-19 |
| Configuraciones reales ofuscadas (C-1 a C-6) | E-20 |
| **La imagen como objeto con identidad**: digesto, pertenencia, marca de conservada, el valor `ajena`, y el bloque `imagen` del despliegue | **E-23** |

Los valores son verosímiles del dominio y **no son datos reales del cliente**: E-19 y E-20 ya vienen ofuscados en origen por la política declarada en el propio intake.

### 6.1 Dónde la maqueta exhibe la ranura vacía en lugar de inventar el valor

Es deliberado y es parte de lo que hay que validar. Las brechas que se ven en la maqueta son `B-UX-01`, `B-UX-04`, `B-UX-05`, `B-UX-06`, `B-UX-07`, `B-UX-10`, `B-UX-11`, `B-UX-12`, `B-UX-13`, `B-UX-16`, `B-UX-17`, `B-UX-18`, `B-UX-19`, `B-UX-20`, `B-UX-24` —la señal visual del nodo borrador—, `B-UX-28` —los valores del umbral— y `B-UX-29` —la configuración de los registros explorables—. Se recogen además sin resolver `B-UX-25`, el origen no editable, y `B-26` y `B-28` de `02-Especificacion-Funcional`: el criterio de descarte y los despliegues retenidos sin digesto.

**El caso más visible es el digesto de imagen**, porque es el eje del inventario de `SUP-18` y de la elección de etiqueta de `SUP-19`:

- **Ninguna fuente del corpus declara un digesto completo.** Verificado sobre todo `SDD/`: cero coincidencias de `sha256:` seguido de sesenta y cuatro caracteres, incluidos los `_legacy`.
- Los **tres** digestos que alguna fuente vigente declara vienen **abreviados en su propio anexo**: `sha256:9b1e…` (E-2 §20.2.5, digesto resuelto por la verificación del origen para `redis` etiqueta `7.2-alpine`), `sha256:a1b2c3...` (E-3 §20.3, despliegue 5471 del servicio 101, para `portal-api:1.4.2`) y `sha256:3f7a…` (E-23, para la misma imagen `portal-api:1.4.2` del mismo servicio 101, y para el bloque `imagen` del despliegue 5480).
- **Los dos últimos se contradicen entre sí** y la maqueta **no elige**: `SUP-06` y `SUP-18` exhiben las dos declaraciones con su fuente, desde la misma constante de `Datos-Maqueta.js`, rotuladas como «declarado distinto por dos fuentes». E-2 §20.2 declara ese origen con política de actualización **fijada**, de modo que la etiqueta `1.4.2` no debería resolver a dos contenidos distintos. Se agrava con que E-23 declara que esa imagen la referencia el despliegue **5472**, que E-3 declara del servicio 102, con otra imagen, y **fallido porque la imagen no existe**. Resolución del paso 6.
- La maqueta los exhibe **tal cual** y no completa los caracteres que faltan. La consecuencia es visible y está declarada: **la «forma completa disponible al pedirla» no se puede demostrar**. El control existe, declara su estado de apertura, y lo que revela es la forma que la fuente declara más el motivo de por qué no hay más.
- Toda imagen para la que ninguna fuente declara digesto lleva la celda con **«Digesto sin declarar»** y su motivo, que es distinto de una celda sin cargar.

Lo mismo vale para el **tamaño de imagen** —el corpus declara uno solo, 214 MB, en E-23—, la **ocupación del almacén** —ninguna fuente la emite; los 115/884 GB de E-18 son el disco raíz del host—, y el **momento de publicación de una etiqueta** —ninguna fuente emite ninguno—.

---

## 7. Reglas constructivas que la maqueta respeta

- HTML5 semántico, CSS y JavaScript vanilla, Bootstrap 5.0 por CDN como grilla y componentes. El CSS propio se carga después y sobreescribe con los tokens del catálogo.
- **Ningún token visual ad hoc.** Todo valor de color, tipografía y radio está en el bloque `:root` de `Estilos-Maqueta.css`, con el nombre semántico del catálogo. Fuera de ese bloque no hay literales de ninguno de los tres.
- Capas del catálogo aplicadas, con la versión **verificada en disco el 2026-07-30**: `Design-Rules-Web-Generico` 1.3, `Design-Rules-Blazor-Mudblazor` 1.3, `Design-Rules-Config-Esquema` 1.2, `Design-Rules-Primer-Arranque` 1.1, `Design-Rules-Acceso-Monousuario` 1.1 y `Design-Rules-Identidad-De-Version` 1.1, bajo `Index-Design-Rules` 1.4.
- El estado «pendiente de aplicar» no tiene token en el catálogo base (`C-UX-01`, `B-UX-05`). Para no inventar un literal, la maqueta lo **alias** al token de catálogo `color.accent.module-b`, que es violeta y que en este producto no está asignado a ningún módulo, de modo que se conserva la reserva de exclusividad del anexo E-18. Es un alias provisional, no una promoción de token.
- **Sin llamadas de red a servicios reales.** La maqueta es autónoma. Las únicas peticiones son las `HEAD` de la recarga automática, contra sus propios archivos.
- **WCAG 2.2 AA como piso:** landmarks semánticos, un encabezado de primer nivel por vista, `label` asociados a cada control, foco visible, recorrido completo por teclado, `role="alert"` en las bandas de error y `role="status"` en las de confirmación, en las regiones de estado y en los anuncios de cambio de estado, contraste 4.5:1 en texto, unidades explícitas y cifras tabulares, y `prefers-reduced-motion` respetado.
- **Sello de versión** al pie de cada superficie: proyecto de código, modelo UX-UI aplicado y fecha de la iteración vigente.

---

## 8. Cómo se corrige

**Vía A — por prompt.** Describí el cambio y el orquestador lo aplica sobre estos archivos.

**Vía B — a mano.** Editá los HTML, el CSS o el JavaScript y avisá con:

> «revisá la maqueta y tomá las correcciones»

El orquestador relee íntegros los archivos de esta carpeta, los compara contra el estado que él mismo dejó, enumera las diferencias, las interpreta como decisiones de diseño tuyas y **te presenta esa lectura para que la confirmes antes de propagarla**. Las correcciones manuales se preservan: en las iteraciones siguientes no se pisan, y si un pedido por prompt entra en conflicto con una, el orquestador se detiene y pregunta.

Dos lugares que conviene conocer para corregir a mano:

- **Cambiar un dato:** `assets/js/Datos-Maqueta.js`. Es la fuente única; el cambio se refleja en todas las superficies que lo exhiben.
- **Cambiar un valor visual:** el bloque `:root` de `assets/css/Estilos-Maqueta.css`. Si el valor no está ahí, no lo agregues suelto: es un token que corresponde promover al catálogo.

**Esta maqueta no está bajo control de versiones en este repositorio.** No hay diff que consultar: el inventario de referencia para comparar es esta tabla de §3 y el contrato de campos de `index.html`.

---

## 9. Qué revisar

- **Navegación.** ¿Los recorridos entre superficies son los que esperabas? En particular, el circuito nuevo: alta de servicio → explorar el registro → volver con el origen **completo y sin verificar**.
- **Datos.** ¿Los campos que se muestran son los que el sistema tiene que mostrar? ¿Falta o sobra alguno? El contrato completo está en `index.html`.
- **Estados.** Alterná los estados de cada superficie con la barra de validación. ¿Falta alguno? ¿Alguno sobra?
- **Apariencia.** ¿La jerarquía visual y el peso de cada acción son los correctos? ¿Hay exactamente una acción primaria por pantalla donde la especificación la exige?
- **Las tres brechas de §5.** Las dos propuestas y las dos ranuras numéricas del umbral son decisiones tuyas.
- **Las ranuras vacías.** Donde la maqueta dice «sin declarar» con un identificador de brecha, la decisión es tuya. En `SUP-18` son muchas y a propósito: el inventario de imágenes es la superficie donde más se nota qué falta declarar.

---

## 10. Lo que esta maqueta todavía no emite

`Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` se emiten en `SDD/Docs/03-UX-UI-DX/` **al aprobarse la maqueta**, en los pasos posteriores de la fase. No existen todavía y su ausencia no es una omisión.

La retroalimentación de `SDD/Docs/` y de `SDD/Intake/` es el **paso 6** y es otro despacho: nada de lo que esta pasada encontró se escribió ahí. Los hallazgos se devolvieron al orquestador.
