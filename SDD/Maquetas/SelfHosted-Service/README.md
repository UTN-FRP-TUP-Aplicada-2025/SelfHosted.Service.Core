# Maqueta de validación visual — SelfHosted Service

**Proyecto:** SelfHosted Service
**Fase:** B2 · Validación visual de maqueta (`Maqueta-Rules.md` 2.0)
**Modelo UX-UI aplicado:** catálogo base de `Devs/References/Design/`. No hay modelos registrados en `Modelos-UX-UI/`, de modo que no se aplica ninguno por encima.
**Fecha de la iteración vigente:** 2026-07-29
**Plataforma de validación:** Google Chrome de escritorio, canal estable, versión mínima 150.0.7871.186, sobre Windows Server 2022 21H2, en red local. Es el único navegador soportado por `00-Contexto/Compatibilidad-Plataformas.md` §2.1 y §4.

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

El método adoptado por este proyecto es el **2 para corrección manual** y el **1 o el 3 para revisión**.

---

## 2. Qué hay adentro

```
SelfHosted-Service/
├── index.html                                  punto de entrada: las 16 superficies y el contrato de campos
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
├── assets/css/Estilos-Maqueta.css              tokens del catálogo como variables CSS
├── assets/js/Datos-Maqueta.js                  fuente única de datos, contrato de campos y descriptores
├── assets/js/Maqueta.js                        render, navegación y conmutación de estados
└── README.md                                   este archivo
```

No hay `assets/img/`: **toda la iconografía es SVG inline con `currentColor`**, sin raster y sin packs de íconos por CDN.

---

## 3. Qué superficie materializa qué caso de uso

La correspondencia es la de `Experiencia-De-Uso.md` §9.2, que es su **fuente única**. `index.html` la exhibe completa, generada desde `Datos-Maqueta.js`.

| # | Superficie | CU que la ejercitan | Estados demostrables |
| --- | --- | --- | --- |
| SUP-01 | Aprovisionamiento inicial | CU-29 | 9 |
| SUP-02 | Acceso al panel | CU-30 | 11 |
| SUP-03 | Cambio de contraseña | CU-31 | 9 |
| SUP-04 | Listado de proyectos | CU-01, CU-02, CU-11 | 11 |
| SUP-05 | Lienzo del proyecto | CU-03, CU-04, CU-05, CU-13, CU-15, CU-16, CU-18, CU-22, CU-28 | 15 |
| SUP-06 | Panel lateral del servicio | CU-03, CU-13, CU-15, CU-18, CU-19, CU-35 | 18 |
| SUP-07 | Cajón de cambios pendientes | CU-22, CU-23, CU-24, CU-25 | 15 |
| SUP-08 | Registro del contenedor | CU-14 | 8 |
| SUP-09 | Tablero de estado | CU-26, CU-27, CU-28 | 12 |
| SUP-10 | Descubrimiento e incorporación | CU-06, CU-07, CU-08 | 17 |
| SUP-11 | Catálogo de plantillas | CU-16, CU-17, CU-36 | 16 |
| SUP-12 | Configuración del sistema | CU-12, CU-19, CU-32 | 18 |
| SUP-13 | Variables compartidas del proyecto | CU-34, CU-35, CU-36 | 14 |
| SUP-14 | Informe de conflicto de direcciones | CU-18, CU-20, CU-21, CU-24 | 11 |
| SUP-15 | Exportación e importación | CU-09, CU-10, CU-11, CU-12 | 14 |
| SUP-16 | Revisión de higiene | CU-36 | 10 |

**208 estados demostrables.** Tres de ellos —los del alta de servicio de `SUP-06`— son **propuesta abierta** y todavía no están en la especificación; ver §5. CU-33 no tiene superficie y no es una omisión: su actor es el automatismo de integración continua y su superficie es la API REST.

---

## 4. La barra de validación

Arriba de cada superficie, rotulada literalmente **«Barra de validación de maqueta — no forma parte del producto»**. Es un instrumento de esta fase y **no se traslada ni a la especificación ni al código**.

Ofrece tres cosas:

- **Selector de superficie.** Navega a cualquiera de las 16 sin volver al índice.
- **Selector de estado.** Alterna los estados de la superficie en curso **sin recargar**. Cada cambio de estado se anuncia como región activa para lectores de pantalla. El estado queda en el fragmento de la dirección (`#estado=<id>`), de modo que un estado concreto se puede compartir por enlace.
- **Interruptor de recarga automática.** Apagado por defecto; su estado se persiste en el navegador. Encendido, compara el identificador de versión de los recursos —`ETag` o `Last-Modified` de una petición `HEAD`, no una descarga completa— cada 3 segundos, suspende el sondeo con la pestaña no visible, y refresca la página cuando alguno cambió. Sobre `file://` se muestra **deshabilitado con su razón** en lugar de fallar.

En `Lienzo del proyecto` la barra suma además la **nota de propuesta abierta** de la brecha `B-UX-01`.

---

## 5. Las dos propuestas abiertas que hay que aprobar o corregir

Las dos se marcan igual: nota visible en la barra de validación de su superficie, y bloque con borde discontinuo dentro de la superficie. **Ninguna de las dos es especificación.** La corrección de los wireframes y de `Experiencia-De-Uso` es del paso 6 y la hace AG-03.

### 5.1 Alta de servicio · `SUP-06`, estados `alta-de-servicio`, `alta-rechazo-nombre` y `alta-rechazo-repositorio`

`CU-03` declara el alta de un servicio en diez pasos y **ninguna superficie de `03-UX-UI-DX` la materializa**: `SUP-05` tiene el botón «Nuevo servicio» y ningún estado de formulario, y `SUP-06` declara «vacío: no aplica, el panel existe exactamente cuando hay un servicio seleccionado», que es justo lo que no ocurre al dar de alta. Resultado: se podía dar de alta desde plantilla del catálogo (`CU-16` en `SUP-11`), pero no desde cero.

El agente humano del proyecto resolvió alojarla como **un estado más del panel lateral**, reusando su formulario dirigido por descriptor, en lugar de crear una superficie propia. La maqueta lo materializa así:

| Paso de `CU-03` | Qué cubre el estado |
| --- | --- |
| Paso 3 | Nombre del servicio, con la advertencia de que es **también su alias de resolución de nombres** dentro de la red del proyecto, y sus límites derivados de `RN-01`: minúsculas, guiones, 1 a 32 caracteres, único dentro del proyecto |
| Paso 4 | Elección del origen entre **las tres variantes del anexo E-2** —imagen de registro, repositorio remoto, archivo de construcción local—, cada una con sus campos y su regla propia (`RN-08` para el repositorio) |
| Pasos 5 y 6 | No se duplican: continúan en las pestañas que el panel ya especifica. El estado lo declara explícitamente |
| Pasos 7 a 10 | La acción primaria «Guardar cambio» agrega el servicio al conjunto de cambios pendientes y su nodo aparece en el lienzo en estado pendiente de aplicar. No despliega |

El botón «Nuevo servicio» del lienzo —el del encabezado del lienzo y el del estado vacío— **ahora lleva a este estado**. Hasta el paso 5 de esta fase no llevaba a ninguna parte.

Dos campos del paso 4 no tienen ejemplo en la documentación y la maqueta **no los inventa**: la credencial del registro y la del repositorio se dibujan como control vacío con su motivo, y el proveedor del repositorio declara que E-2 trae un único valor sin decir si el conjunto admitido tiene otros. Ver las ambigüedades emitidas en la devolución de la fase.

### 5.2 Distinción visual de las aristas · `B-UX-01`, `SUP-05`

`B-UX-01` es una brecha declarada por `03-UX-UI-DX`: ninguna regla del catálogo de diseño cubre la representación de aristas de un lienzo y el anexo E-18 no tiene fila. La especificación fija tres restricciones y **no elige la distinción**.

Esta maqueta dibuja una, para que la mires y la apruebes o la corrijas. **No es especificación.**

| Clase de arista | Canales que la distinguen |
| --- | --- |
| Declara espera al destino | Trazo sólido neutro · punta de flecha **rellena** · **marcador de espera** (doble barra) en el punto medio · rótulo «espera» |
| No declara espera | Trazo sólido neutro · punta de flecha **hueca** · sin marcador medio |
| Inválida, bloquea el arranque | Trazo **punteado** en color de error · marcador de **cruz** en el punto medio · rótulo «inválida» |

Cumple las tres restricciones: no usa el violeta reservado a «pendiente de aplicar», usa forma además de color, y la inválida se distingue de las otras dos por color, por patrón de trazo y por marcador.

En el juego de datos del anexo E-1 todos los pares de servicios declaran espera, de modo que la clase «no declara espera» se ve en la leyenda del lienzo con las mismas marcas que usaría la arista real. La clase inválida se ve en el estado `arista-invalida`.

---

## 6. De dónde salen los datos

Los datos de ejemplo viven **exclusivamente** en `assets/js/Datos-Maqueta.js`. Ningún HTML los hardcodea: los renderiza `Maqueta.js`. `index.html` exhibe el contrato de campos completo, con tipo, ejemplo, entidad de origen y anexo del intake que lo declara.

| Conjunto | Anexo del intake |
| --- | --- |
| Proyecto SelfHosted, red, disposición del lienzo, variables compartidas, aristas | E-1 |
| Servicio con sus ocho dimensiones, sus tres orígenes y la variante macvlan | E-2 |
| Despliegue con su línea de tiempo, sus métricas y el despliegue fallido | E-3 |
| Changeset con sus cuatro cambios y su informe de impacto | E-5 |
| Ítems del catálogo, simple y multi-servicio, con sus parámetros | E-6 |
| Candidatos del descubrimiento, con el no incorporable y el ya incorporado | E-7 |
| Rango gestionado, reservas e informe de conflicto con sus tres resoluciones | E-8 |
| Paso obligatorio de clasificación de variables | E-11 |
| Credencial de máquina con sus ámbitos y su vigencia | E-12 |
| Tablero en tres capas y contrato visual de estados | E-18 |
| Parque de contenedores de referencia | E-19 |
| Configuraciones reales ofuscadas (C-1 a C-6) | E-20 |

Los valores son verosímiles del dominio y **no son datos reales del cliente**: E-19 y E-20 ya vienen ofuscados en origen por la política declarada en el propio intake.

Donde una fuente **no declara** un dato, la maqueta exhibe la ranura vacía con el identificador de la brecha en lugar de inventar el valor. Es deliberado y es parte de lo que hay que validar. Las brechas que se ven en la maqueta son `B-UX-01`, `B-UX-04`, `B-UX-05`, `B-UX-06`, `B-UX-07`, `B-UX-10`, `B-UX-11`, `B-UX-12`, `B-UX-13`, `B-UX-16`, `B-UX-17`, `B-UX-18`, `B-UX-19` y `B-UX-20`.

---

## 7. Reglas constructivas que la maqueta respeta

- HTML5 semántico, CSS y JavaScript vanilla, Bootstrap 5.0 por CDN como grilla y componentes. El CSS propio se carga después y sobreescribe con los tokens del catálogo.
- **Ningún token visual ad hoc.** Todo valor visual está en el bloque `:root` de `Estilos-Maqueta.css`, con el nombre semántico del catálogo. Fuera de ese bloque no hay literales de color, tipografía ni radio.
- El estado «pendiente de aplicar» no tiene token en el catálogo base (`C-UX-01`, `B-UX-05`). Para no inventar un literal, la maqueta lo **alias** al token de catálogo `color.accent.module-b`, que es violeta y que en esta solución no está asignado a ningún módulo, de modo que se conserva la reserva de exclusividad del anexo E-18. Es un alias provisional, no una promoción de token.
- **Sin llamadas de red a servicios reales.** La maqueta es autónoma. Las únicas peticiones son las `HEAD` de la recarga automática, contra sus propios archivos.
- **WCAG 2.2 AA como piso:** landmarks semánticos, un encabezado de primer nivel por vista, `label` asociados a cada control, foco visible, recorrido completo por teclado, `role="alert"` en las bandas de error y `role="status"` en las de confirmación y en los anuncios de cambio de estado, contraste 4.5:1 en texto, unidades explícitas y cifras tabulares, y `prefers-reduced-motion` respetado.
- **Sello de versión** de la maqueta al pie de cada superficie: proyecto, modelo UX-UI aplicado y fecha de la iteración vigente.

---

## 8. Cómo se corrige

**Vía A — por prompt.** Describí el cambio y el orquestador lo aplica sobre estos archivos.

**Vía B — a mano.** Editá los HTML, el CSS o el JavaScript y avisá con:

> «revisá la maqueta y tomá las correcciones»

El orquestador relee íntegros los archivos de esta carpeta, los compara contra el estado que él mismo dejó, enumera las diferencias, las interpreta como decisiones de diseño tuyas y **te presenta esa lectura para que la confirmes antes de propagarla**. Las correcciones manuales se preservan: en las iteraciones siguientes no se pisan, y si un pedido por prompt entra en conflicto con una, el orquestador se detiene y pregunta.

Dos lugares que conviene conocer para corregir a mano:

- **Cambiar un dato:** `assets/js/Datos-Maqueta.js`. Es la fuente única; el cambio se refleja en todas las superficies que lo exhiben.
- **Cambiar un valor visual:** el bloque `:root` de `assets/css/Estilos-Maqueta.css`. Si el valor no está ahí, no lo agregues suelto: es un token que corresponde promover al catálogo.

---

## 9. Qué revisar

- **Navegación.** ¿Los recorridos entre superficies son los que esperabas? ¿Falta alguna ruta?
- **Datos.** ¿Los campos que se muestran son los que el sistema tiene que mostrar? ¿Falta o sobra alguno? El contrato completo está en `index.html`.
- **Estados.** Alterná los estados de cada superficie con la barra de validación. ¿Falta alguno? ¿Alguno sobra?
- **Apariencia.** ¿La jerarquía visual y el peso de cada acción son los correctos? ¿Hay exactamente una acción primaria por pantalla donde la especificación la exige?
- **La propuesta de `B-UX-01`.** ¿La distinción de aristas te sirve, o la corregís?
- **Las ranuras vacías.** Donde la maqueta dice «sin declarar» con un identificador de brecha, la decisión es tuya.

---

## 10. Lo que esta maqueta todavía no emite

`Linea-Base-Visual.md`, `Contrato-Datos-Maqueta.md` y `Bitacora-Validacion-Maqueta.md` se emiten en `SDD/Docs/03-UX-UI-DX/` **al aprobarse la maqueta**, en los pasos posteriores de la fase. No existen todavía y su ausencia no es una omisión.
