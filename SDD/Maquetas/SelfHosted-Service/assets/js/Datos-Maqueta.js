/* ==========================================================================
   Datos-Maqueta.js — SelfHosted Service · maqueta de validación visual
   --------------------------------------------------------------------------
   FUENTE ÚNICA de los datos de ejemplo, del contrato de campos y de los
   descriptores de configuración. Ningún HTML de esta maqueta hardcodea datos:
   los renderiza `Maqueta.js` desde acá (Maqueta-Rules.md §4.2).

   Procedencia de cada conjunto (anexos del SOLUTION-INTAKE):
     E-1  proyecto con layout de lienzo, variables compartidas y aristas
     E-2  servicio con sus tres variantes de origen + variante macvlan
     E-3  despliegue con línea de tiempo y métricas, y despliegue fallido
     E-5  changeset con su informe de impacto
     E-6  ítem del catálogo (simple y multi-servicio) con sus parámetros
     E-7  descubrimiento de contenedores adoptables
     E-8  rango gestionado, reservas e informe de conflicto
     E-11 clasificación de variables de la incorporación
     E-12 carga útil de un token de API emitido
     E-18 maquetado de la interfaz (mapa de navegación, tablero, estados)
     E-19 parque de contenedores de referencia
     E-20 configuraciones reales ofuscadas (C-1 a C-6)

   Los valores son verosímiles del dominio y NO son datos reales del cliente:
   E-19 y E-20 ya vienen ofuscados en origen por la política del intake.
   ========================================================================== */

(function (global) {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────
     0. Identidad de la maqueta (sello de versión de cada superficie)
     ───────────────────────────────────────────────────────────────────── */

  var MAQUETA = {
    proyecto: 'SelfHosted Service',
    proyectoCodigo: 'SelfHosted-Service',
    /* Versiones verificadas en disco el 2026-07-30 contra
       `Devs/References/Design/`, no transcriptas de la iteración anterior:
       la pasada A había dejado tres de las cinco desactualizadas y el sello
       de versión no puede declarar una capa que no es la que se aplicó. */
    modeloUxUi: 'Catálogo base · Design-Rules-Web-Generico 1.3 + Blazor-Mudblazor 1.3 + Config-Esquema 1.2 + Primer-Arranque 1.1 + Acceso-Monousuario 1.1 + Identidad-De-Version 1.1 (Index-Design-Rules 1.4)',
    modeloUxUiCorto: 'Catálogo base (sin modelo de Modelos-UX-UI/)',
    fechaIteracion: '2026-07-30',
    reglaMaqueta: 'Maqueta-Rules.md 3.1',
    rotuloBarra: 'Barra de validación de maqueta — no forma parte del producto',
    navegadorSoportado: 'Chrome de escritorio estable ≥ 150.0.7871.186 · Windows Server 2022 21H2 · red local · familia única, sin versión móvil'
  };

  /* ─────────────────────────────────────────────────────────────────────
     1. Identidad de versión del producto — contrato de
        Design-Rules-Identidad-De-Version §2. Los cuatro campos están sin
        declarar por las fuentes (brecha B-UX-07): la maqueta exhibe la
        ranura y las tres variantes, no inventa el origen del dato.
     ───────────────────────────────────────────────────────────────────── */

  var IDENTIDAD_VERSION = {
    publicada: {
      versionLegible: '0.4.0',
      identificadorDeConstruccion: 'b7f21c9',
      esPreliminar: false,
      origenIndeterminado: false
    },
    preliminar: {
      versionLegible: '0.4.0-rc.2',
      identificadorDeConstruccion: 'b7f21c9',
      esPreliminar: true,
      origenIndeterminado: false
    },
    indeterminado: {
      versionLegible: null,
      identificadorDeConstruccion: null,
      esPreliminar: false,
      origenIndeterminado: true,
      marcador: 'Origen indeterminado — la identidad no pudo derivarse de la construcción'
    }
  };

  /* ─────────────────────────────────────────────────────────────────────
     2. Sesión e identidad del operador único (perfil de operador único)
     ───────────────────────────────────────────────────────────────────── */

  var IDENTIDAD = { usuario: 'admin' };

  /* ─────────────────────────────────────────────────────────────────────
     3. Catálogo de códigos de resultado — Experiencia-De-Uso §8.2
        Los textos de `REQUISITO-NO-CUMPLIDO` y `ACCESO-RESTRINGIDO` no
        pueden derivarse: la política no está declarada (brecha B-UX-10).
        La maqueta usa un texto de marcador y lo señala como tal.
     ───────────────────────────────────────────────────────────────────── */

  var CODIGOS_RESULTADO = {
    'IDENTIDAD-CREADA': {
      variante: 'confirmacion',
      texto: 'Se creó el administrador de esta instancia. Ya podés crear tu primer proyecto SelfHosted.'
    },
    'CREDENCIAL-RECHAZADA': {
      variante: 'error',
      texto: 'No se pudo iniciar sesión con esos datos. Revisalos y volvé a intentar.'
    },
    'ACCESO-RESTRINGIDO': {
      variante: 'error',
      texto: 'El acceso quedó restringido de forma temporal. Volvé a intentar más tarde.',
      brecha: 'B-UX-10 · la condición de disparo depende de la política de intentos, sin declarar'
    },
    'FORMULARIO-VENCIDO': {
      variante: 'error',
      texto: 'El formulario venció. Volvé a enviarlo.'
    },
    'SESION-VENCIDA': {
      variante: 'error',
      texto: 'La sesión venció. Iniciá sesión de nuevo para seguir trabajando.',
      brecha: 'B-UX-11 · la duración de la sesión y su condición de vencimiento no están declaradas'
    },
    'SECRETO-ACTUALIZADO': {
      variante: 'confirmacion',
      texto: 'La contraseña quedó actualizada.',
      brecha: 'B-UX-11 · qué pasa con la sesión en curso no está declarado; el texto queda incompleto a propósito'
    },
    'SECRETO-ACTUAL-INCORRECTO': {
      variante: 'error',
      texto: 'La contraseña actual no es correcta. La credencial no se modificó.'
    },
    'REQUISITO-NO-CUMPLIDO': {
      variante: 'error',
      texto: 'La contraseña nueva no cumple el requisito de la política.',
      brecha: 'B-UX-10 · el enunciado de la regla se deriva de la política, que no está declarada'
    },
    'CONFIRMACION-NO-COINCIDENTE': {
      variante: 'error',
      texto: 'La contraseña nueva y su confirmación no coinciden. Volvé a escribir la confirmación.'
    },
    'GENERICO': {
      variante: 'error',
      texto: 'No se pudo completar la operación. Volvé a intentar.'
    }
  };

  /* Requisito de política declarado antes del intento (Primer-Arranque §4.5).
     Ninguna fuente declara la política: la ranura existe, el texto no. */
  var REQUISITO_CONTRASENA = {
    disponible: false,
    marcador: 'Requisito de la política de contraseña — derivado de la política del sistema (pendiente: brecha B-UX-10)'
  };

  /* ─────────────────────────────────────────────────────────────────────
     4. Navegación — mapa del anexo E-18 + las rutas que E-18 no declara
     ───────────────────────────────────────────────────────────────────── */

  var NAVEGACION = [
    { etiqueta: 'Proyectos', archivo: 'Listado-De-Proyectos.html', icono: 'grid', ruta: '/proyectos' },
    { etiqueta: 'Tablero', archivo: 'Tablero-De-Estado.html', icono: 'gauge', ruta: '/dashboard' },
    { etiqueta: 'Descubrimiento', archivo: 'Descubrimiento-E-Incorporacion.html', icono: 'search', ruta: '/descubrimiento' },
    { etiqueta: 'Catálogo', archivo: 'Catalogo-De-Plantillas.html', icono: 'layers', ruta: '/catalogo' },
    /* La barra lateral del wireframe de SUP-18 declara la entrada «Imag.»:
       el inventario de imágenes es superficie del shell de trabajo y se
       alcanza desde la navegación principal. */
    { etiqueta: 'Imágenes', archivo: 'Imagenes.html', icono: 'caja', ruta: '/imagenes' },
    { etiqueta: 'Configuración', archivo: 'Configuracion-Del-Sistema.html', icono: 'settings', ruta: '/configuracion' }
  ];

  /* Navegación del proyecto SelfHosted abierto (lienzo, registro, variables,
     higiene). Las dos últimas no figuran en el mapa de E-18: brecha B-UX-17. */
  var NAVEGACION_PROYECTO = [
    { etiqueta: 'Lienzo', archivo: 'Lienzo-Del-Proyecto.html', icono: 'grid' },
    { etiqueta: 'Registros', archivo: 'Registro-Del-Contenedor.html', icono: 'list' },
    { etiqueta: 'Variables', archivo: 'Variables-Compartidas-Del-Proyecto.html', icono: 'key' },
    { etiqueta: 'Revisión', archivo: 'Revision-De-Higiene.html', icono: 'alert' }
  ];

  /* ─────────────────────────────────────────────────────────────────────
     4.1 El digesto de imagen: qué declara cada fuente, verificado literal

     Todo el corpus tiene TRES literales de digesto y ninguno completo
     (verificado sobre `SDD/` entero, `_legacy` incluidos):

       · E-2 §20.2.5 · informe de origen exitoso. Sus comprobaciones dicen,
         en este orden: imagen `redis`, etiqueta `7.2-alpine`, «Digesto
         resuelto» `sha256:9b1e…`. El digesto es de REDIS 7.2-ALPINE y de
         ninguna otra imagen.
       · E-3 §20.3 · despliegue 5471, servicio 101, activo,
         `imagenResuelta: "registro-privado/portal-api:1.4.2"`,
         `digestImagen: "sha256:a1b2c3..."`.
       · E-23 §20.23 · objeto imagen del servicio 101 con
         `referencia: "registry.interno.lan/registro-privado/portal-api:1.4.2"`
         y `digesto: "sha256:3f7a…"`, más el bloque `imagen` del despliegue
         5480 del mismo servicio, con el mismo digesto.

     E-3 y E-23 declaran DIGESTOS DISTINTOS para la misma referencia de
     imagen y el mismo servicio. La maqueta NO elige: exhibe los dos con su
     fuente, en las dos superficies que muestran ese dato, desde esta
     constante única. La resolución es del paso 6.
     ───────────────────────────────────────────────────────────────────── */

  var DIGESTO_PORTAL_API = {
    contradictorio: true,
    referencia: 'registry.interno.lan/registro-privado/portal-api:1.4.2',
    declaraciones: [
      {
        digesto: 'sha256:a1b2c3...',
        fuente: 'E-3 §20.3 · despliegue 5471 del servicio 101, en estado activo, campo `digestImagen`'
      },
      {
        digesto: 'sha256:3f7a…',
        fuente: 'E-23 §20.23 · objeto imagen del servicio 101, y bloque `imagen` del despliegue 5480 del mismo servicio'
      }
    ],
    motivo: 'Dos fuentes vigentes declaran digestos distintos para la misma referencia de imagen y el mismo servicio 101. E-2 §20.2 declara la política de actualización de ese origen como «fijada», de modo que la etiqueta 1.4.2 no debería resolver a dos contenidos distintos. La maqueta exhibe las dos declaraciones con su fuente y no elige entre ellas.',
    agravante: 'Las dos fuentes ni siquiera usan el mismo nombre de campo: E-3 lo llama `digestImagen` y E-23 `imagen.digesto`. Tampoco usan la misma convención de abreviatura: `sha256:a1b2c3...` con puntos suspensivos y `sha256:3f7a…` con elipsis.',
    segundaContradiccion: 'E-23 declara además que esa imagen la referencian los despliegues 5472 y 5480. E-3 declara el 5472 como despliegue del servicio 102, con `imagenResuelta: "imagen-oficial/redis:7.4"`, fallido porque «La imagen no existe en el registro». Un despliegue cuya imagen no existe no puede referenciar ninguna imagen del almacén, y además es de otro servicio y de otra imagen.',
    destinatario: 'Agente humano del proyecto · resolución en el paso 6'
  };

  /* Distinto de «no registrado». «No registrado» es una afirmación sobre el
     PRODUCTO: el despliegue existió y no guardó el digesto porque es anterior
     a Q-15. Esto otro es una afirmación sobre la DOCUMENTACIÓN: ninguna
     fuente emite el dato. Confundirlas haría que la maqueta afirmara un hecho
     del dominio que nadie declaró. */
  var DIGESTO_SIN_FUENTE_SERVICIO = 'Ninguna fuente declara el digesto de esta imagen. E-3 sólo emite los despliegues 5471 y 5472, y ninguno es de este servicio. No es que el producto no lo haya registrado: es que la documentación no lo trae, y la maqueta no lo inventa.';

  /* ─────────────────────────────────────────────────────────────────────
     5. Datos del dominio
     ───────────────────────────────────────────────────────────────────── */

  /* 5.1 Proyectos SelfHosted — E-1 (proyecto 12), E-8 (7 y 9), E-18 (tablero),
         E-20 C-5 (Laboratorio IA, red bridge ia-net). */
  var PROYECTOS = [
    {
      id: 12,
      nombre: 'Portal Interno',
      slug: 'portal-interno',
      descripcion: 'Sitio web interno con su base de datos y su cache',
      autoArranque: true,
      estado: 'parcialmente-activo',
      creadoEn: '2026-07-26T10:15:00-03:00',
      red: { modo: 'bridge', nombre: 'portal-interno-net', subred: '172.20.0.0/24', gateway: '172.20.0.1' },
      serviciosTotales: 3,
      serviciosActivos: 2,
      cpuPorcentaje: 6.0,
      memoriaGb: 1.1,
      cambiosPendientes: 5
    },
    {
      id: 7,
      nombre: 'Impresion 3D',
      slug: 'impresion-3d',
      descripcion: 'Servidor de impresión con la controladora anclada por identificador estable',
      autoArranque: true,
      estado: 'parcialmente-activo',
      creadoEn: '2026-05-02T11:00:00-03:00',
      red: { modo: 'macvlan', nombre: 'infra_vlan', subred: '192.168.1.0/24', gateway: '192.168.1.1' },
      serviciosTotales: 2,
      serviciosActivos: 1,
      cpuPorcentaje: 1.0,
      memoriaGb: 0.4,
      cambiosPendientes: 0
    },
    {
      id: 9,
      nombre: 'Laboratorio IA',
      slug: 'laboratorio-ia',
      descripcion: 'Tres servicios en red bridge con resolución por nombre de contenedor',
      autoArranque: false,
      estado: 'detenido',
      creadoEn: '2026-06-14T18:40:00-03:00',
      red: { modo: 'bridge', nombre: 'ia-net', subred: '172.19.0.0/24', gateway: '172.19.0.1' },
      serviciosTotales: 3,
      serviciosActivos: 0,
      cpuPorcentaje: null,
      memoriaGb: null,
      cambiosPendientes: 0
    }
  ];

  /* 5.2 Servicios del proyecto 12 — E-2 (api 101, cache 102, db 103) con la
         disposición del lienzo de E-1 y los estados de E-3. */
  var SERVICIOS = [
    {
      id: 101, proyectoId: 12, nombre: 'api', descripcion: 'API REST del portal',
      /* Estado del servicio: `borrador`, `pendiente-de-aplicar` o `aplicado`.
         Es ORTOGONAL al estado del despliegue, que vive en `estado` (E-2 §20.2.1). */
      estadoServicio: 'aplicado',
      origen: {
        tipo: 'imagen-privada', registroUrl: 'registry.interno.lan',
        imagen: 'registro-privado/portal-api', etiqueta: '1.4.2',
        politicaActualizacion: 'fijada', credencialRegistroId: 3
      },
      /* El digesto dice qué corre; la etiqueta dice qué se pidió. Se resuelve
         por el bloque `imagen` del despliegue y nunca por la etiqueta
         (SUP-06 §3.5, Q-15 decidida en positivo el 2026-07-30). */
      /* Corregido el 2026-07-30, pasada B. Acá decía `sha256:9b1e…`, que en
         E-2 §20.2.5 es el digesto resuelto para `redis` etiqueta
         `7.2-alpine` y no para esta imagen. Las dos fuentes que sí declaran
         un digesto para `portal-api:1.4.2` del servicio 101 —E-3 §20.3 y
         E-23 §20.23— se contradicen entre sí, de modo que la maqueta las
         exhibe a las dos con su fuente y no elige. Ver DIGESTO_PORTAL_API. */
      digesto: null,
      digestoContradictorio: DIGESTO_PORTAL_API,
      digestoCompletoNoDeclarado: 'Ninguna fuente declara un digesto completo, ni siquiera para las dos declaraciones en conflicto: las tres formas del corpus vienen abreviadas en su propio anexo. La forma completa que SUP-06 §3.5 pide disponible al pedirla no se puede demostrar acá.',
      comando: null,
      procedencia: null,
      verificaciones: {
        origen: { estado: 'verificado', en: '2026-07-26T09:00:00-03:00' },
        configuracion: { estado: 'validado', en: '2026-07-26T09:01:00-03:00' }
      },
      red: { modo: 'bridge', aliasDns: 'api', ipFija: null, interfazPadre: null },
      puertos: [{ contenedor: 8080, host: 8080, protocolo: 'tcp', publicar: true }],
      montajes: [{ tipo: 'volumen', nombre: 'portal-api-datos', destino: '/app/data', soloLectura: false }],
      dispositivos: [], capacidades: [],
      recursos: { limiteMemoriaMb: 512, reservaMemoriaMb: 128, limiteCpus: 1.0 },
      replicas: 1, politicaReinicio: 'unless-stopped', autoArranque: true, efimero: false,
      posicion: { x: 20, y: 20 },
      estado: 'activo', desde: '2026-07-26T09:02:11-03:00',
      metricas: { cpuPorcentaje: 3.4, memoriaUsadaMb: 186, memoriaLimiteMb: 512 }
    },
    {
      id: 102, proyectoId: 12, nombre: 'cache', descripcion: 'Cache en memoria del portal',
      estadoServicio: 'aplicado',
      origen: { tipo: 'imagen-publica', registro: 'registro-publico-de-referencia', imagen: 'imagen-oficial/redis', etiqueta: '7.4', politicaActualizacion: 'fijada' },
      digesto: null,
      digestoNoRegistrado: 'Digesto no registrado. Este despliegue es anterior a la decisión Q-15 y no lo guardó (SUP-06 §3.5). No es una celda sin cargar.',
      comando: null, procedencia: null,
      red: { modo: 'bridge', aliasDns: 'cache', ipFija: null, interfazPadre: null },
      puertos: [{ contenedor: 6379, host: null, protocolo: 'tcp', publicar: false }],
      montajes: [], dispositivos: [], capacidades: [],
      recursos: { limiteMemoriaMb: 256, reservaMemoriaMb: null, limiteCpus: null },
      replicas: 1, politicaReinicio: 'unless-stopped', autoArranque: true, efimero: false,
      posicion: { x: 360, y: 20 },
      estado: 'fallido', desde: '2026-07-26T09:02:19-03:00',
      causa: 'La imagen no existe en el registro',
      metricas: null
    },
    {
      id: 103, proyectoId: 12, nombre: 'db', descripcion: 'Base de datos del portal',
      estadoServicio: 'aplicado',
      origen: { tipo: 'imagen-publica', registro: 'registro-publico-de-referencia', imagen: 'imagen-oficial/postgres', etiqueta: '16-alpine', politicaActualizacion: 'fijada' },
      /* Corregido el 2026-07-30, pasada B. Acá decía `sha256:9b1e…`, que es
         el digesto de `redis:7.2-alpine` (E-2 §20.2.5) y no el de
         `imagen-oficial/postgres:16-alpine`. NINGUNA fuente declara digesto
         para esta imagen: E-3 sólo emite los despliegues 5471 y 5472, y
         ninguno es del servicio 103. Se declara la ranura con su motivo, que
         NO es el de «no registrado» del servicio 102. */
      digesto: null,
      digestoSinFuente: DIGESTO_SIN_FUENTE_SERVICIO,
      comando: null,
      /* Procedencia de plantilla — SUP-06 §3.6. Vínculo débil de D-14: es una
         copia y no una clave foránea. La plantilla puede borrarse y el
         servicio sigue respondiendo de dónde salió. Fuente: E-2 §20.2.4. */
      procedencia: {
        via: 'catalogo', itemCatalogoId: 'cat-postgres-16', itemNombre: 'PostgreSQL 16',
        versionContenido: 4, instanciadoEn: '2026-07-29T16:50:00-03:00', vinculo: 'debil-solo-origen'
      },
      red: { modo: 'bridge', aliasDns: 'db', ipFija: null, interfazPadre: null },
      puertos: [{ contenedor: 5432, host: null, protocolo: 'tcp', publicar: false }],
      montajes: [{ tipo: 'volumen', nombre: 'portal-db-datos', destino: '/var/lib/postgresql/data', soloLectura: false }],
      dispositivos: [], capacidades: [],
      recursos: { limiteMemoriaMb: 1024, reservaMemoriaMb: 256, limiteCpus: 2.0 },
      replicas: 2, politicaReinicio: 'always', autoArranque: true, efimero: false,
      posicion: { x: 360, y: 190 },
      estado: 'activo', desde: '2026-07-24T05:58:00-03:00',
      metricas: { cpuPorcentaje: 1.2, memoriaUsadaMb: 410, memoriaLimiteMb: 1024 }
    }
  ];

  /* Servicio incorporado desde un contenedor existente — E-11 (servicio 305).
     Se usa para el nodo huérfano y para la advertencia de corte. */
  var SERVICIO_INCORPORADO = {
    id: 305, proyectoId: 7, nombre: 'print-server', descripcion: 'Servidor de impresión incorporado sin recrear el contenedor',
    origen: { tipo: 'imagen', imagen: 'registro-privado/print-server', etiqueta: '1.4.18', politicaActualizacion: 'fijada' },
    red: { modo: 'macvlan', aliasDns: 'print-server', ipFija: '192.168.1.139', interfazPadre: 'enp1s0' },
    puertos: [{ contenedor: 3344, host: null, protocolo: 'tcp', publicar: false }],
    montajes: [{ tipo: 'bind', nombre: '/srv/despliegues/print-server/data', destino: '/data', soloLectura: false }],
    dispositivos: [{ host: '/dev/serial/by-id/usb-FTDI-if00-port0', contenedor: '/dev/ttyUSB0', permisos: 'rwm' }],
    capacidades: [],
    recursos: { limiteMemoriaMb: 512, reservaMemoriaMb: null, limiteCpus: null },
    replicas: 1, politicaReinicio: 'always', autoArranque: true, efimero: false,
    posicion: { x: 20, y: 190 },
    estado: 'huerfano', desde: '2026-07-26T10:25:00-03:00',
    metricas: null,
    adopcion: {
      adoptadoEn: '2026-07-26T10:25:00-03:00',
      contenedorId: 'b71c9d4a2f10',
      recreado: false,
      sugeridasPorHeuristica: ['ADMIN_TOKEN'],
      marcadasPorElUsuario: [],
      desmarcadasPorElUsuario: [],
      confirmadaPor: 'admin',
      confirmadaEn: '2026-07-26T10:24:40-03:00'
    },
    advertenciaCorte: 'Este servicio se incorporó sin recrear su contenedor. El primer redespliegue sí implica corte del servicio.',
    estadoServicio: 'aplicado',
    digesto: null,
    digestoNoRegistrado: 'Digesto no registrado. El despliegue es anterior a Q-15 (SUP-06 §3.5).',
    comando: null,
    procedencia: { via: 'adopcion', contenedorId: 'b71c9d4a2f10', adoptadoEn: '2026-07-26T10:25:00-03:00' }
  };

  /* Servicios en estado `borrador` — E-2 §20.2.4, servicios 403 y 406.
     Existen, son visibles en el lienzo, están incompletos y NO entran al
     conjunto de cambios pendientes. No son desplegables.
     La señal visual del nodo borrador es la brecha B-UX-24: la maqueta usa
     el tratamiento provisional de Representacion-Lenguaje-Visual-De-Estados
     §3.3 —par neutro con etiqueta textual propia— y no inventa color. */
  var SERVICIOS_BORRADOR = [
    {
      id: 403, proyectoId: 12, nombre: 'proxy-interno', descripcion: 'Imagen pública ajustada con un archivo de construcción en línea',
      estadoServicio: 'borrador',
      origen: {
        tipo: 'dockerfile',
        contenido: 'FROM nginx:1.25-alpine\nRUN apk add --no-cache curl\nENV NGINX_ENTRYPOINT_QUIET_LOGS=1\nEXPOSE 8080\nCMD ["nginx", "-g", "daemon off;"]',
        argumentosBuild: {},
        modificadoEn: '2026-07-29T16:40:00-03:00',
        imagen: 'proxy-interno', etiqueta: 'construida en línea'
      },
      comando: null, procedencia: null, digesto: null,
      red: { modo: 'bridge', aliasDns: 'proxy-interno', ipFija: null, interfazPadre: null },
      puertos: [], montajes: [], dispositivos: [], capacidades: [],
      recursos: { limiteMemoriaMb: 128, reservaMemoriaMb: 32, limiteCpus: 0.25 },
      replicas: 1, politicaReinicio: 'unless-stopped', autoArranque: false, efimero: false,
      posicion: { x: 20, y: 190 },
      estado: null, desde: null, metricas: null,
      verificaciones: {
        origen: { estado: 'sin-verificar', en: null },
        configuracion: { estado: 'sin-validar', en: null }
      },
      pasosPendientes: ['red', 'puertos', 'dimensiones'],
      fuente: 'E-2 §20.2.4, servicio 403'
    },
    {
      id: 406, proyectoId: 12, nombre: 'pendiente-de-definir', descripcion: 'El alta detenida en el paso del nombre',
      estadoServicio: 'borrador',
      origen: { tipo: 'ninguno', imagen: null, etiqueta: null },
      comando: null, procedencia: null, digesto: null,
      red: { modo: 'bridge', aliasDns: 'pendiente-de-definir', ipFija: null, interfazPadre: null },
      puertos: [], montajes: [], dispositivos: [], capacidades: [],
      recursos: { limiteMemoriaMb: null, reservaMemoriaMb: null, limiteCpus: null },
      replicas: 1, politicaReinicio: 'unless-stopped', autoArranque: false, efimero: false,
      posicion: { x: 360, y: 360 },
      estado: null, desde: null, metricas: null,
      verificaciones: {
        origen: { estado: 'sin-verificar', en: null },
        configuracion: { estado: 'sin-validar', en: null }
      },
      pasosPendientes: ['origen', 'red', 'puertos', 'dimensiones'],
      fuente: 'E-2 §20.2.4, servicio 406'
    }
  ];

  /* 5.3 Variables del servicio 101 — E-2. Ejercitan las tres formas de
         referencia, la propagación del carácter de secreto y la fila larga. */
  var VARIABLES_SERVICIO = [
    { clave: 'ASPNETCORE_ENVIRONMENT', valor: 'Production', secreta: false, origen: 'manual', referencia: null },
    { clave: 'ConnectionStrings__Default', valor: 'Host=db;Port=5432;Database=portal', secreta: false, origen: 'enlace', referencia: 'Host=${{ db.SELFHOSTED_HOST }};Port=5432;Database=portal' },
    { clave: 'REDIS_URL', valor: 'cache:6379', secreta: false, origen: 'enlace', referencia: '${{ cache.SELFHOSTED_HOST }}:6379' },
    { clave: 'API_KEY_EXTERNA', valor: null, secreta: true, origen: 'manual', referencia: null },
    { clave: 'TZ', valor: 'America/Argentina/Buenos_Aires', secreta: false, origen: 'referencia', referencia: '${{ shared.TZ }}' },
    { clave: 'DB_USER', valor: 'portal', secreta: false, origen: 'referencia', referencia: '${{ db.POSTGRES_USER }}' },
    { clave: 'DB_PASSWORD', valor: null, secreta: true, origen: 'referencia', referencia: '${{ shared.DB_PASSWORD }}' },
    { clave: 'PUERTO_HTTP', valor: '8080', secreta: false, origen: 'manual', referencia: null },
    { clave: 'SALUD_URL', valor: 'http://api:8080/salud', secreta: false, origen: 'referencia', referencia: 'http://${{ SELFHOSTED_HOST }}:${{ PUERTO_HTTP }}/salud' }
  ];

  /* 5.4 Aristas del lienzo del proyecto 12 — E-1.
         El lienzo dibuja una arista visual por par de servicios. */
  var ARISTAS = [
    { id: 9001, origen: 101, destino: 102, claveVariable: 'REDIS_URL', puertoDestino: 6379, esperaDestino: true, referenciaElHost: true, valida: true },
    { id: 9002, origen: 101, destino: 103, claveVariable: 'ConnectionStrings__Default', puertoDestino: 5432, esperaDestino: true, referenciaElHost: true, valida: true },
    { id: 9003, origen: 101, destino: 103, claveVariable: 'DB_USER', puertoDestino: null, esperaDestino: false, referenciaElHost: false, valida: true },
    { id: 9006, origen: 102, destino: 103, claveVariable: null, puertoDestino: null, esperaDestino: true, referenciaElHost: false, valida: true }
  ];

  /* 5.5 Línea de tiempo de despliegues — E-3 (5471 activo, 5472 fallido) */
  var DESPLIEGUES = [
    {
      id: 5471, servicioId: 101, numeroReplica: 1, contenedorId: '3f9a1c7b2e4d',
      nombreContenedor: 'portal-interno_api_1',
      imagenResuelta: 'registro-privado/portal-api:1.4.2',
      estado: 'activo', solicitadoPor: 'ui', changesetId: 331,
      iniciadoEn: '2026-07-26T09:02:11-03:00', finalizadoEn: null,
      eventos: [
        { en: '2026-07-26T09:01:40-03:00', tipo: 'pendiente', detalle: 'Despliegue encolado' },
        { en: '2026-07-26T09:01:44-03:00', tipo: 'construyendo', detalle: 'build de imagen · 38 s' },
        { en: '2026-07-26T09:02:09-03:00', tipo: 'creando', detalle: 'Contenedor creado' },
        { en: '2026-07-26T09:02:11-03:00', tipo: 'activo', detalle: 'Healthcheck OK' }
      ],
      metricas: { cpuPorcentaje: 3.4, memoriaUsadaMb: 186, memoriaLimiteMb: 512, tomadoEn: '2026-07-26T10:14:58-03:00' }
    },
    {
      id: 5472, servicioId: 102, numeroReplica: 1, contenedorId: null,
      nombreContenedor: 'portal-interno_cache_1',
      imagenResuelta: 'imagen-oficial/redis:7.4',
      estado: 'fallido', solicitadoPor: 'ui', changesetId: 331,
      iniciadoEn: '2026-07-26T09:02:12-03:00', finalizadoEn: '2026-07-26T09:02:19-03:00',
      eventos: [
        { en: '2026-07-26T09:01:40-03:00', tipo: 'pendiente', detalle: 'Despliegue encolado' },
        { en: '2026-07-26T09:02:12-03:00', tipo: 'creando', detalle: 'Descarga de imagen' },
        { en: '2026-07-26T09:02:19-03:00', tipo: 'fallido', detalle: 'La imagen no existe en el registro' }
      ],
      metricas: null
    }
  ];

  /* 5.6 Changeset 331 con su informe de impacto — E-5.
     Cada cambio declara ADEMÁS su clase y si RECREA EL CONTENEDOR, que es la
     distinción de SUP-07 §3.4: recrear es lo que hace perder el estado no
     persistido, y la marca va en el ítem del cambio y no sólo en el resumen
     del lote, porque el resumen no dice CUÁL descartar. */
  var CLASES_DE_CAMBIO = {
    'sin-recrear': {
      etiqueta: 'De configuración, sin recrear',
      ejemplos: 'Política de reinicio, límites de recursos, verificación de salud, réplicas',
      declara: 'El servicio queda pendiente de redespliegue'
    },
    'recreando': {
      etiqueta: 'De configuración, recreando',
      ejemplos: 'Variables, puertos, montajes, dispositivos, modo de red, dirección, comando de arranque',
      declara: 'Además el contenedor se recrea: se pierde todo estado no persistido en un montaje'
    },
    'identidad': {
      etiqueta: 'De identidad',
      ejemplos: 'Nombre del servicio',
      declara: 'El alias de resolución de nombres cambia, y ninguna referencia se rompe'
    },
    'cosmetico': {
      etiqueta: 'Cosmético',
      ejemplos: 'Posición en el lienzo, notas',
      declara: 'No es un cambio de configuración y no entra al cajón'
    }
  };

  var CHANGESET = {
    id: 331, proyectoId: 12, estado: 'pendiente',
    creadoEn: '2026-07-26T10:02:00-03:00', mensaje: null,
    cambios: [
      {
        id: 1, tipo: 'servicio-agregado', entidad: 'servicio', entidadId: null,
        resumen: "Nuevo servicio 'cache' (imagen-oficial/redis:7.4)",
        requiereRedespliegueDe: ['cache'], referenciadaPor: null,
        clase: 'recreando', recreaContenedor: true
      },
      {
        id: 2, tipo: 'variable-modificada', entidad: 'servicio', entidadId: 101,
        resumen: 'api · REDIS_URL: (sin valor) → cache:6379',
        requiereRedespliegueDe: ['api'], referenciadaPor: null,
        clase: 'recreando', recreaContenedor: true
      },
      {
        id: 3, tipo: 'nodo-movido', entidad: 'canvas', entidadId: 103,
        resumen: 'db movido a (560, 320)',
        requiereRedespliegueDe: [], referenciadaPor: null,
        visual: true, clase: 'cosmetico', recreaContenedor: false
      },
      {
        id: 4, tipo: 'variable-compartida-modificada', entidad: 'proyecto', entidadId: 12,
        resumen: 'Proyecto · TZ: America/Argentina/Buenos_Aires → UTC',
        requiereRedespliegueDe: ['api'],
        referenciadaPor: [{ servicio: 'api', clave: 'TZ' }],
        clase: 'recreando', recreaContenedor: true
      },
      /* Las dos filas que siguen NO están en el anexo E-5, que declara cuatro
         cambios y ninguno de clase «sin recrear» ni «de identidad». Se derivan
         del modelo con valores ya declarados —el límite de memoria de db en
         E-2 §20.2 y el nombre de cache en E-2— porque SUP-07 §3.4 exige
         demostrar las cuatro clases y el juego de datos del anexo sólo cubre
         dos. La derivación se declara para que sea impugnable. */
      {
        id: 5, tipo: 'limite-modificado', entidad: 'servicio', entidadId: 103,
        resumen: 'db · límite de memoria: 1024 MB → 2048 MB',
        requiereRedespliegueDe: ['db'], referenciadaPor: null,
        clase: 'sin-recrear', recreaContenedor: false
      },
      {
        id: 6, tipo: 'servicio-renombrado', entidad: 'servicio', entidadId: 102,
        resumen: "cache · nombre: 'cache' → 'cache-portal'",
        requiereRedespliegueDe: ['cache'], referenciadaPor: null,
        clase: 'identidad', recreaContenedor: false,
        nota: 'El alias de resolución de nombres cambia. Ninguna referencia se rompe: lo persistido lleva el vínculo al servicio y no su nombre (RN-33).'
      }
    ],
    /* El resumen del lote agrega el conteo, para decidir aplicar ahora o más
       tarde sin abrir cada ítem — SUP-07 §3.4 criterio 2. */
    servicioEnBorradorNoAparece: 'Un servicio en estado borrador no entra al conjunto de cambios pendientes y este cajón no lo lista. Es lo que hace utilizable guardar a mitad de camino: si apareciera, el lote entero dejaría de poder aplicarse. Si buscás un servicio que dejaste a medias, está en el lienzo.',
    impacto: {
      serviciosARedesplegar: ['api', 'cache'],
      serviciosSinImpacto: ['db'],
      conflictosIp: []
    },
    resultadoPorContenedor: [
      { servicio: 'api', replica: 1, estado: 'activo', causa: null },
      { servicio: 'cache', replica: 1, estado: 'fallido', causa: 'La imagen no existe en el registro' }
    ],
    noAlcanzados: [
      { servicio: 'db', motivo: 'Sin impacto: no referencia ninguna de las claves modificadas' }
    ],
    advertenciaIndisponibilidad: 'Redesplegar es detener y arrancar: los servicios alcanzados quedan fuera de servicio mientras dura el reemplazo.'
  };

  /* 5.7 Variables compartidas del proyecto 12 — E-1 y detección de higiene */
  var VARIABLES_COMPARTIDAS = [
    { id: 701, clave: 'TZ', valor: 'America/Argentina/Buenos_Aires', secreta: false, descripcion: 'Zona horaria comun a los tres servicios', usadaPor: 1 },
    { id: 702, clave: 'DB_PASSWORD', valor: null, secreta: true, referenciaSecreto: 'sec-011', descripcion: 'Credencial de la base, compartida por api y db', usadaPor: 2 },
    { id: 703, clave: 'TZ', valor: 'UTC', secreta: false, descripcion: 'Zona horaria del runner de integración continua', usadaPor: 0 }
  ];

  /* 5.8 Descubrimiento de contenedores adoptables — E-7 + parque de E-19 */
  var CANDIDATOS = [
    {
      contenedorId: 'b71c9d4a2f10', nombre: 'print-server',
      imagen: 'registro-privado/print-server:1.4.18', estado: 'running',
      creadoEn: '2026-05-02T11:00:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.139' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/print-server/data', destino: '/data' }],
      variablesDetectadas: 4, variablesSugeridasComoSecretas: ['ADMIN_TOKEN'],
      puertosPublicados: [],
      adoptable: true, motivoNoAdoptable: null, yaAdoptadoPor: null
    },
    {
      contenedorId: 'c93e0a1b7d55', nombre: 'bot-mensajeria',
      imagen: 'registro-privado/bot-moderador:latest', estado: 'running',
      creadoEn: '2026-04-18T08:30:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.134' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/bot-mensajeria/data', destino: '/app/data' }],
      variablesDetectadas: 4, variablesSugeridasComoSecretas: ['ADMIN_TOKEN'],
      puertosPublicados: [],
      adoptable: true, motivoNoAdoptable: null, yaAdoptadoPor: null
    },
    {
      contenedorId: '1a2b3c4d5e6f', nombre: 'panel-admin',
      imagen: 'imagen-oficial/panel-ce:latest', estado: 'running',
      creadoEn: '2026-03-11T14:05:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.130' }],
      montajes: [{ tipo: 'socket', origen: '/var/run/docker.sock', destino: '/var/run/docker.sock' }],
      variablesDetectadas: 2, variablesSugeridasComoSecretas: [],
      puertosPublicados: [],
      adoptable: false, motivoNoAdoptable: 'Monta el punto de acceso del motor de contenedores: gobernarlo desde acá crearía una dependencia circular de control.',
      yaAdoptadoPor: null
    },
    {
      contenedorId: 'd41f7a92b0c3', nombre: 'runner-ci',
      imagen: 'registro-privado/runner-ci:2.335.1', estado: 'running',
      creadoEn: '2026-06-30T19:22:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.138' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/runner-ci/data', destino: '/cache' }],
      variablesDetectadas: 7, variablesSugeridasComoSecretas: [],
      puertosPublicados: [],
      adoptable: false, motivoNoAdoptable: null,
      yaAdoptadoPor: 'Impresion 3D'
    },
    {
      contenedorId: '7b40e9c1d235', nombre: 'ia-video',
      imagen: 'registro-privado/video:0.3', estado: 'running',
      creadoEn: '2026-06-14T18:40:00-03:00',
      redes: [{ nombre: 'ia-net', modo: 'bridge', ip: '172.19.0.4' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/ia-video/data/models', destino: '/opt/app/models' }],
      variablesDetectadas: 1, variablesSugeridasComoSecretas: [],
      /* Unico candidato del parque que publica puertos: es el proyecto en red
         bridge de E-20 C-5. El servicio incorporado los CONSERVA, y pueden
         colisionar con un servicio ya declarado: por eso van a la vista antes
         de confirmar (SUP-10 §3.3). */
      puertosPublicados: [{ host: 8188, contenedor: 8188, protocolo: 'tcp' }],
      comando: '--cpu',
      adoptable: true, motivoNoAdoptable: null, yaAdoptadoPor: null
    },
    {
      contenedorId: '5e8c02a4f71b', nombre: 'vm-windows',
      imagen: 'imagen-comunidad/windows', estado: 'exited',
      creadoEn: '2026-02-02T09:00:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.133' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/vm-windows/data', destino: '/storage' }],
      variablesDetectadas: 6, variablesSugeridasComoSecretas: ['PASSWORD'],
      puertosPublicados: [],
      adoptable: true, motivoNoAdoptable: null, yaAdoptadoPor: null
    }
  ];

  /* 5.9 Paso obligatorio de clasificación de variables — E-11 (caso C-2 de E-20) */
  var CLASIFICACION = {
    contenedorId: 'c93e0a1b7d55',
    nombre: 'bot-mensajeria',
    propuestaEn: '2026-07-28T09:40:00-03:00',
    variables: [
      { clave: 'Moderacion__Gateway', valor: 'Mensajeria', sugeridaSecreta: false, motivoSugerencia: null, marcadaSecreta: false },
      { clave: 'Persistencia__RutaBase', valor: '/app/data/moderador.db', sugeridaSecreta: false, motivoSugerencia: null, marcadaSecreta: false },
      { clave: 'ClaveMaestra', valor: 'valor-no-detectado-por-la-heuristica', sugeridaSecreta: false, motivoSugerencia: null, marcadaSecreta: false },
      { clave: 'ADMIN_TOKEN', valor: 'valor-detectado-por-la-heuristica', sugeridaSecreta: true, motivoSugerencia: 'heuristica:TOKEN', marcadaSecreta: true }
    ],
    advertenciaCorte: 'El contenedor no se recrea al incorporarlo. El primer redespliegue posterior sí implica corte del servicio.'
  };

  /* 5.10 Rango de direcciones gestionado y reservas — E-8 */
  var RANGO_GESTIONADO = {
    subred: '192.168.1.128/26',
    desde: '192.168.1.129',
    hasta: '192.168.1.190',
    gateway: '192.168.1.1',
    interfazPadre: 'enp1s0',
    excluidas: ['192.168.1.129'],
    advertencia: 'El rango tiene que estar fuera del que reparte el servidor de direcciones de la red.',
    dependenciaDeEntorno: 'El rango de desarrollo tiene que ser distinto del de producción y sin solapamiento. Es una condición del entorno: se declara acá y no se administra desde esta superficie.'
  };

  var RESERVAS = [
    { direccion: '192.168.1.130', servicioId: 201, proyectoId: 5, servicio: 'panel-admin', proyecto: 'Infra base', activa: true },
    { direccion: '192.168.1.139', servicioId: 305, proyectoId: 7, servicio: 'print-server', proyecto: 'Impresion 3D', activa: true },
    { direccion: '192.168.1.139', servicioId: 412, proyectoId: 9, servicio: 'print-server-pruebas', proyecto: 'Laboratorio IA', activa: false }
  ];

  /* 5.11 Informe de conflicto de direcciones — E-8 */
  var CONFLICTO = {
    proyectoId: 9,
    proyecto: 'Laboratorio IA',
    puedeArrancar: false,
    verificadoEn: '2026-07-26T10:31:00-03:00',
    conflictos: [
      {
        clase: 'entre-proyectos',
        direccion: '192.168.1.139',
        servicioSolicitante: { id: 412, nombre: 'print-server-pruebas', proyecto: 'Laboratorio IA' },
        ocupadaPor: { id: 305, nombre: 'print-server', proyecto: 'Impresion 3D', despliegueId: 5310, estado: 'activo' },
        resoluciones: [
          { accion: 'detener-proyecto-en-conflicto', etiqueta: "Detener el proyecto 'Impresion 3D'", consecuencia: 'Libera las direcciones que ocupaba. El servicio de impresión queda fuera de servicio.' },
          { accion: 'reasignar-ip', etiqueta: 'Asignar la siguiente dirección libre: 192.168.1.141', consecuencia: 'Actualiza la reserva y marca como pendientes de redespliegue los servicios cuyas variables cambian de valor.' },
          { accion: 'arrancar-parcial', etiqueta: 'Arrancar los demás servicios del proyecto', consecuencia: 'El proyecto queda parcialmente activo, con su estado declarado.' }
        ]
      }
    ],
    serviciosSinConflicto: [{ id: 410, nombre: 'ia-api' }, { id: 411, nombre: 'ia-webui' }],
    conflictoDuplicadoInterno: {
      clase: 'duplicado-interno',
      direccion: '192.168.1.140',
      servicios: [{ id: 413, nombre: 'ia-video' }, { id: 414, nombre: 'ia-video-pruebas' }],
      resoluciones: [
        { accion: 'reasignar-ip', etiqueta: 'Asignar la siguiente dirección libre: 192.168.1.141', consecuencia: 'Actualiza la reserva de uno de los dos servicios.' },
        { accion: 'arrancar-parcial', etiqueta: 'Arrancar los demás servicios del proyecto', consecuencia: 'El proyecto queda parcialmente activo, con su estado declarado.' }
      ]
    },
    conflictoFueraDeRango: {
      clase: 'fuera-de-rango',
      direccion: '192.168.1.129',
      servicios: [{ id: 415, nombre: 'ia-webui' }],
      motivo: 'La dirección está excluida del rango gestionado.',
      resoluciones: [
        { accion: 'reasignar-ip', etiqueta: 'Asignar la siguiente dirección libre: 192.168.1.141', consecuencia: 'Actualiza la reserva a una dirección admisible del rango.' }
      ]
    },
    sugerenciaCaducada: 'La dirección 192.168.1.141 dejó de estar libre. La siguiente libre es 192.168.1.142.'
  };

  /* 5.12 Credenciales de máquina — E-12 */
  var CREDENCIALES = [
    {
      nombre: 'github-actions-portal', prefijo: 'tk_7f3c9a12',
      ambitos: ['proyectos:leer', 'despliegues:ejecutar'],
      vigenciaHasta: '2026-10-24T00:00:00-03:00',
      ultimoUso: '2026-07-29T08:14:00-03:00',
      estado: 'vigente'
    },
    {
      nombre: 'exportador-nocturno', prefijo: 'tk_2b90de41',
      ambitos: ['proyectos:leer', 'sistema:leer'],
      vigenciaHasta: null,
      ultimoUso: '2026-07-12T03:00:00-03:00',
      estado: 'revocada', revocadaEn: '2026-07-13T09:20:00-03:00'
    }
  ];

  var CREDENCIAL_EMITIDA = {
    nombre: 'github-actions-portal',
    valor: 'shs_tk_7f3c9a12_UNA-SOLA-VEZ-EJEMPLO-DE-MAQUETA',
    aviso: 'Este valor se muestra una única vez. El sistema sólo guarda su resumen: si lo perdés, hay que revocar esta credencial y emitir una nueva.'
  };

  var AMBITOS_DISPONIBLES = [
    'proyectos:leer', 'proyectos:escribir', 'despliegues:ejecutar',
    'catalogo:leer', 'catalogo:escribir', 'sistema:leer'
  ];

  /* 5.13 Respaldo programado y retención — brechas B-UX-16 (destino y
          periodicidad sin declarar; cota de 7 días declarada en §23.3) */
  var RESPALDO = {
    destino: null,
    destinoBrecha: 'B-UX-16 · el destino concreto no está declarado por ninguna fuente',
    periodicidad: null,
    periodicidadCota: 'Intervalo máximo declarado: 7 días entre exportaciones programadas',
    ultimasExportaciones: [
      { proyecto: 'Portal Interno', antiguedad: 'hace 2 días', resultado: 'exitosa' },
      { proyecto: 'Impresion 3D', antiguedad: 'hace 9 días', resultado: 'fallida', causa: 'El destino no respondió' },
      { proyecto: 'Laboratorio IA', antiguedad: null, resultado: 'sin-exportacion' }
    ]
  };

  var RETENCION = { desplieguesPorServicio: 20, diasAuditoria: 90 };

  /* 5.14 Catálogo de plantillas — E-6 */
  var ITEMS_CATALOGO = [
    {
      id: 'cat-postgres-16', nombre: 'PostgreSQL 16', categoria: 'base-de-datos',
      version: 4, servicios: 1, enlaces: 0,
      descripcion: 'Base PostgreSQL con volumen de datos y verificación de salud propia',
      parametros: [
        { clave: 'nombreBase', etiqueta: 'Nombre de la base', tipo: 'texto', requerido: true, porDefecto: 'app', generar: false },
        { clave: 'usuario', etiqueta: 'Usuario', tipo: 'texto', requerido: true, porDefecto: 'app', generar: false },
        { clave: 'password', etiqueta: 'Contraseña', tipo: 'secreto', requerido: true, porDefecto: null, generar: true },
        { clave: 'slug', etiqueta: 'Prefijo de recursos', tipo: 'texto', requerido: true, porDefecto: null, generar: false }
      ]
    },
    {
      id: 'cat-api-con-base', nombre: 'API con base PostgreSQL', categoria: 'stack',
      version: 1, servicios: 2, enlaces: 1,
      descripcion: 'Subgrafo de dos servicios con su arista y una variable compartida del proyecto',
      parametros: [
        { clave: 'nombreBase', etiqueta: 'Nombre de la base', tipo: 'texto', requerido: true, porDefecto: 'app', generar: false },
        { clave: 'usuario', etiqueta: 'Usuario', tipo: 'texto', requerido: true, porDefecto: 'app', generar: false },
        { clave: 'password', etiqueta: 'Contraseña', tipo: 'secreto', requerido: true, porDefecto: null, generar: true },
        { clave: 'slug', etiqueta: 'Prefijo de recursos', tipo: 'texto', requerido: true, porDefecto: null, generar: false }
      ]
    }
  ];

  /* 5.14.1 Lo que el catálogo necesita y la versión anterior de la maqueta no
     exhibía — E-6 §20.6.1 a §20.6.5 y wireframe SUP-11 §3.5 a §3.8. */

  /* Conjunto cerrado de cuatro tipos de parámetro — E-6 §20.6.1.
     `porDefecto` está PROHIBIDO sobre `secreto`: un valor por defecto secreto
     es un secreto escrito en un archivo distribuible, que RN-15 prohíbe. */
  var TIPOS_PARAMETRO = [
    { tipo: 'texto', recibe: 'Cadena libre que el usuario completa', porDefecto: 'Admitido' },
    { tipo: 'secreto', recibe: 'Material sensible', porDefecto: 'Prohibido. Su único mecanismo es generar' },
    { tipo: 'imagen', recibe: 'Referencia de imagen que el usuario aporta', porDefecto: 'Admitido' },
    { tipo: 'volumen', recibe: 'Nombre de volumen o ruta de directorio', porDefecto: 'Admitido' }
  ];

  var CATALOGO = {
    tiposParametro: TIPOS_PARAMETRO,

    /* Informe de guardar como plantilla — E-6 §20.6.2, campo `informeDeGuardado`.
       Las cuatro cosas que SUP-11 §3.7 exige mostrar para que sea confiable. */
    informeDeGuardado: {
      servicioDeOrigen: 'db-informes',
      variablesConvertidasAParametroSecreto: ['POSTGRES_PASSWORD'],
      parametrosPropuestos: ['slug', 'nombreBase', 'usuario'],
      valoresDescartados: 1,
      afirmacion: 'El valor se descartó. No quedó guardado en la plantilla y no se va a escribir en ninguna exportación.',
      publicadoEn: '2026-07-29T10:12:00-03:00'
    },

    /* Rechazos que la interfaz no puede producir pero la API sí — SUP-11 §5 */
    rechazoDefectoSobreSecreto: 'El parámetro «password» declara un valor por defecto y es de tipo secreto. Un valor por defecto secreto viaja dentro de la definición del ítem y se exporta con ella (RN-15, DI-22). En la interfaz este estado no es alcanzable, porque el campo de valor por defecto no existe para el tipo secreto.',
    rechazoTipoParametro: 'El parámetro «puerto» declara el tipo «numero», que no pertenece al conjunto cerrado de cuatro valores: texto, secreto, imagen y volumen (E-6 §20.6.1).',

    /* Importación con identificador colisionado — E-6 §20.6.5, DI-24 */
    identificadorExistente: {
      itemId: 'cat-postgres-16',
      accion: 'importado-como-copia',
      idAsignado: 'cat-postgres-16-importado',
      motivo: 'identificador-ya-existente',
      detalle: 'El ítem «cat-postgres-16» ya existe. Se importó como copia con identificador nuevo; el existente no se modificó.',
      bloquea: false,
      nota: 'El resto del archivo se importa igual. DI-24 es resolución propuesta y sin confirmar en el intake.'
    },

    /* Envoltorio de exportación con el contador que hace verificable la
       conversión de secretos — E-6 §20.6.4. Si la conversión funciona el
       contador es siempre cero, y este estado no ocurre. */
    exportacion: {
      tipoDeArchivo: 'catalogo-selfhosted',
      itemsExportados: 2,
      itemsConMaterialSensible: 0,
      conMaterialSensible: {
        itemsConMaterialSensible: 1,
        items: ['API con base PostgreSQL'],
        aviso: 'Un ítem del catálogo contiene material sensible. RN-15 prohíbe escribir un secreto en una exportación: se declara antes de emitir el archivo. Es la contrapartida verificable de la conversión de secretos.'
      }
    },

    /* Borrado de un ítem con instancias — RN-39. Confirmación NORMAL, sin
       advertencia de «en uso»: el vínculo es débil y sólo en calidad de origen. */
    borradoConInstancias: {
      item: 'PostgreSQL 16',
      instancias: 1,
      texto: '¿Borrar la plantilla «PostgreSQL 16»?',
      porQueSinAdvertencia: 'No se advierte que hay servicios instanciados desde este ítem, y es deliberado: el vínculo es débil y sólo en calidad de origen. Un aviso de «en uso» instalaría la expectativa de que el borrado los afecta, y no los afecta. El servicio instanciado sigue respondiendo de dónde salió aunque el ítem ya no exista.'
    },

    /* Editor de plantilla — SUP-11 §3.6: es el formulario del alta menos tres
       cosas, más el declarador de parámetros. No hay superficie nueva acá. */
    editor: {
      quita: [
        ['La validación de la configuración contra el motor de contenedores', 'La plantilla no ocupa dirección ni puerto, y validarla contra un servidor concreto la haría dependiente de ese servidor'],
        ['La acción de aplicar', 'Una definición en reposo no se aplica'],
        ['El despliegue y todo lo que lo acompaña', 'Línea de tiempo, estado del contenedor y registros: nada del catálogo corre']
      ],
      agrega: 'El declarador de parámetros, que convierte los valores variables del formulario en huecos, con su validación propia: que todo hueco tenga su parámetro declarado y que ningún parámetro quede sin uso.',
      conserva: 'La verificación del origen sí se conserva: verificar que la imagen que la plantilla declara existe es útil al escribirla, no depende de ningún servidor concreto, y evita publicar una plantilla que va a fallar en su primer uso.'
    },

    /* Estado vacío — SUP-11 §3.8. Declara CUATRO cosas desde el 2026-07-30. */
    vacio: {
      afirmaciones: [
        'El catálogo está vacío porque el producto no se distribuye con contenido precargado. Es el estado inicial de toda instalación nueva y no un fallo de carga.',
        'Se puebla de dos formas: guardando un servicio como plantilla, o importando un catálogo exportado.',
        'Hay otras seis vías de alta, con acceso directo al menú de vías del alta de servicio.',
        'La vía de imagen de registro no exige conocer la dirección: su paso del origen ofrece explorar el registro configurado.'
      ],
      notaAccesoDirecto: 'El acceso directo lleva al menú de vías del alta y no directamente a la exploración: elegir la vía es el primer paso del alta, y saltearlo produciría dos recorridos distintos hacia la misma pantalla.'
    }
  };

  /* 5.15 Tablero de estado — E-18, tres capas */
  var TABLERO = {
    servidor: {
      cpuPorcentaje: 34,
      ram: { usadoGb: 16.2, totalGb: 32 },
      swap: { usadoGb: 6.5, totalGb: 32 },
      disco: { usadoGb: 115, totalGb: 884, punto: '/' },
      contenedoresActivos: 8, contenedoresTotales: 8, imagenes: 18
    },
    contenedores: [
      { servicio: 'api', replica: 1, estado: 'activo', cpuPorcentaje: 3.4, memoriaUsadaMb: 186, memoriaLimiteMb: 512, antiguedad: '1 h 12 min' },
      { servicio: 'db', replica: 1, estado: 'activo', cpuPorcentaje: 1.2, memoriaUsadaMb: 410, memoriaLimiteMb: 1024, antiguedad: '2 d 4 h' },
      { servicio: 'db', replica: 2, estado: 'degradado', cpuPorcentaje: 1.1, memoriaUsadaMb: 402, memoriaLimiteMb: 1024, antiguedad: '2 d 4 h' },
      { servicio: 'cache', replica: 1, estado: 'fallido', cpuPorcentaje: null, memoriaUsadaMb: null, memoriaLimiteMb: 256, antiguedad: null, causa: 'La imagen no existe en el registro' }
    ],
    variantes: {
      pausado: { servicio: 'runner-ci', replica: 1, estado: 'detenido', etiqueta: 'Pausado', cpuPorcentaje: null, memoriaUsadaMb: null, memoriaLimiteMb: 8192, antiguedad: '5 h 3 min' },
      finalizado: { servicio: 'runner-ci', replica: 1, estado: 'detenido', etiqueta: 'Finalizado', cpuPorcentaje: null, memoriaUsadaMb: null, memoriaLimiteMb: 8192, antiguedad: '20 min' },
      huerfano: { servicio: 'print-server', replica: 1, estado: 'huerfano', cpuPorcentaje: null, memoriaUsadaMb: null, memoriaLimiteMb: 512, antiguedad: null },
      sinDespliegue: { servicio: 'ia-video', replica: null, estado: null, cpuPorcentaje: null, memoriaUsadaMb: null, memoriaLimiteMb: null, antiguedad: null },
      sinMetricas: { servicio: 'api', replica: 1, estado: 'activo', cpuPorcentaje: null, memoriaUsadaMb: null, memoriaLimiteMb: 512, antiguedad: '1 h 12 min', sinMetricas: true }
    },
    lecturaServidorNoDisponible: 'No se pudo leer el estado del sistema operativo del servidor. El resto del tablero sigue disponible.',
    estadoSinReconciliar: 'La última reconciliación con el motor de contenedores no se completó. Se muestra el último estado conocido.',
    brechaAntiguedad: 'B-UX-19 · cómo se presenta la antigüedad de un dato que no es actual no está declarado'
  };

  /* 5.16 Registro del contenedor — líneas verosímiles del servicio 101 */
  var REGISTRO = {
    servicio: 'api',
    replicas: [1],
    lineas: [
      '2026-07-26T09:02:09-03:00  info   Starting portal-api 1.4.2',
      '2026-07-26T09:02:09-03:00  info   Environment: Production',
      '2026-07-26T09:02:10-03:00  info   Connecting to Host=db;Port=5432;Database=portal',
      '2026-07-26T09:02:10-03:00  info   Cache endpoint resolved to cache:6379',
      '2026-07-26T09:02:11-03:00  info   Now listening on: http://0.0.0.0:8080',
      '2026-07-26T09:02:11-03:00  info   Application started. Press Ctrl+C to shut down.',
      '2026-07-26T09:14:02-03:00  warn   Cache endpoint unreachable, retrying in 5s',
      '2026-07-26T09:14:07-03:00  info   Cache endpoint recovered'
    ],
    brecha: 'B-UX-13 · no está declarado si el registro debe filtrarse respecto de valores secretos, ni el comportamiento ante el corte del flujo continuo'
  };

  /* 5.17 Revisión de higiene — cinco detecciones del intake §4 (F-25) */
  var HIGIENE = {
    grupos: [
      {
        id: 'variables-sin-uso', titulo: 'Variables compartidas sin uso',
        filas: [
          { principal: 'TZ', secundario: 'Zona horaria del runner de integración continua', acciones: ['ver', 'eliminar'] }
        ]
      },
      {
        id: 'nombres-repetidos', titulo: 'Nombres repetidos en el mismo ámbito',
        filas: [
          { principal: 'print-server', secundario: 'Ámbito: proyecto Impresion 3D', acciones: ['ver', 'renombrar'] }
        ]
      },
      {
        id: 'claves-al-instanciar', titulo: 'Claves que ya existían al instanciar',
        filas: [
          { principal: 'DB_PASSWORD', secundario: 'Mismo valor', acciones: ['ver', 'reusar'] },
          { principal: 'TZ', secundario: 'Distinto valor', acciones: ['ver'] }
        ]
      },
      {
        id: 'referencias-sin-uso', titulo: 'Referencias sin uso',
        filas: [
          { principal: 'api · REDIS_URL', secundario: 'Quedó sin consumidor tras el último cambio', acciones: ['ver'] }
        ]
      }
    ],
    rechazoEliminar: 'No se puede eliminar: la referencian api · TZ y db · TZ.',
    brechaFrecuencia: 'B-UX-20 · la frecuencia de la revisión periódica no está declarada, de modo que la superficie no promete actualidad'
  };

  /* 5.18 Exportación e importación — E-14, E-21 */
  var EXPORTACION = {
    artefactos: [
      { id: 'compose', etiqueta: 'Archivo en el formato estándar de composición', preserva: 'La configuración de cada servicio con sus valores resueltos, y las variables compartidas aplanadas dentro de cada servicio que las usa', noPreserva: 'La disposición del lienzo, el nivel de variable compartida y las expresiones de referencia sin resolver' },
      { id: 'variables', etiqueta: 'Archivo de variables, con las entradas de secreto vacías', preserva: 'Las entradas de los valores secretos, vacías', noPreserva: 'Ningún valor' },
      { id: 'manifiesto', etiqueta: 'Manifiesto propio', preserva: 'La disposición del lienzo, el nivel de variable compartida, las expresiones de referencia sin resolver en su forma legible y portable, y el carácter de secreto de cada variable sin su valor', noPreserva: 'Nada que el archivo de composición ya preserve' }
    ],
    advertenciaSecretos: 'Ningún valor secreto se escribe en ninguno de los archivos.',
    advertenciaCambiosPendientes: 'Este proyecto tiene 5 cambios sin aplicar. Se exporta la configuración aplicada, no la del borrador.',
    informe: {
      nombreCreado: 'Laboratorio IA (importado)',
      creados: [
        { etiqueta: 'servicios', cantidad: 3 },
        { etiqueta: 'enlaces', cantidad: 1 },
        { etiqueta: 'variables compartidas', cantidad: 2 }
      ],
      noRepresentables: [
        { elemento: 'stop_grace_period: 2m', motivo: 'El modelo no representa el período de gracia de detención' },
        { elemento: 'command: --cpu', motivo: 'El modelo no representa la sobreescritura del comando de arranque' }
      ]
    },
    causaReferenciaNoResoluble: "La expresión ${{ db.SELFHOSTED_HOST }} de api · ConnectionStrings__Default no resuelve: el servicio 'db' no existe en este proyecto."
  };

  /* ─────────────────────────────────────────────────────────────────────
     6. Descriptores de configuración — Design-Rules-Config-Esquema §2
        Campos declarados por las fuentes vs. campos sin declarar.
        `leyenda` y `ejemplos` NO están declarados por ninguna fuente para
        ningún parámetro de servicio ni de sistema: brecha B-UX-04. Cuando
        faltan, el descriptor los deja en null y la maqueta muestra la
        ranura vacía con su motivo, en vez de inventar el texto.
     ───────────────────────────────────────────────────────────────────── */

  var BRECHA_DESCRIPTOR = 'B-UX-04 · ninguna fuente declara la leyenda ni los ejemplos de este parámetro';

  var DESCRIPTORES = {
    servicio: [
      { clave: 'origenTipo', etiqueta: 'Tipo de origen', tipo: 'seleccion', unidad: null, porDefecto: null,
        enum: ['Imagen de registro', 'Repositorio remoto', 'Archivo de construcción local'], min: null, max: null,
        leyenda: null, ejemplos: null, avanzado: false, brecha: BRECHA_DESCRIPTOR },
      { clave: 'imagen', etiqueta: 'Imagen', tipo: 'texto', unidad: null, porDefecto: null,
        enum: null, min: null, max: null, leyenda: null, ejemplos: null, avanzado: false, brecha: BRECHA_DESCRIPTOR },
      { clave: 'etiqueta', etiqueta: 'Etiqueta', tipo: 'texto', unidad: null, porDefecto: null,
        enum: null, min: null, max: null, leyenda: null, ejemplos: null, avanzado: false, brecha: BRECHA_DESCRIPTOR },
      { clave: 'politicaActualizacion', etiqueta: 'Política de actualización', tipo: 'seleccion', unidad: null, porDefecto: null,
        enum: ['fijada', 'flotante'], min: null, max: null, leyenda: null, ejemplos: null, avanzado: false,
        restriccion: 'Conjunto declarado por el anexo E-21: una etiqueta explícita es «fijada»; una flotante o ausente, «flotante».',
        brecha: BRECHA_DESCRIPTOR },
      { clave: 'politicaReinicio', etiqueta: 'Política de reinicio', tipo: 'seleccion', unidad: null, porDefecto: null,
        enum: ['no', 'on-failure', 'always', 'unless-stopped'], min: null, max: null,
        leyenda: null, ejemplos: null, avanzado: false, brecha: BRECHA_DESCRIPTOR },
      { clave: 'autoArranque', etiqueta: 'Autoarranque', tipo: 'booleano', unidad: null, porDefecto: null,
        enum: null, min: null, max: null, leyenda: null, ejemplos: null, avanzado: false, brecha: BRECHA_DESCRIPTOR },
      { clave: 'replicas', etiqueta: 'Réplicas', tipo: 'numerico', unidad: 'cantidad', porDefecto: null,
        enum: null, min: 1, max: null, leyenda: null, ejemplos: null, avanzado: false,
        restriccion: 'Con dirección fija, exige una dirección por réplica.', brecha: BRECHA_DESCRIPTOR },
      { clave: 'efimero', etiqueta: 'Efímero', tipo: 'booleano', unidad: null, porDefecto: null,
        enum: null, min: null, max: null, leyenda: null, ejemplos: null, avanzado: false, brecha: BRECHA_DESCRIPTOR },
      { clave: 'limiteMemoriaMb', etiqueta: 'Límite de memoria', tipo: 'numerico', unidad: 'MB', porDefecto: null,
        enum: null, min: 0, max: 32768, leyenda: null, ejemplos: null, avanzado: true,
        restriccion: 'Acotado a los recursos declarados del host; el rechazo informa el máximo admisible.', brecha: BRECHA_DESCRIPTOR },
      { clave: 'limiteCpus', etiqueta: 'Límite de procesador', tipo: 'numerico', unidad: 'CPUs', porDefecto: null,
        enum: null, min: 0, max: 8, leyenda: null, ejemplos: null, avanzado: true,
        restriccion: 'Acotado a los recursos declarados del host.', brecha: BRECHA_DESCRIPTOR },
      { clave: 'modoRed', etiqueta: 'Modo de red', tipo: 'seleccion', unidad: null, porDefecto: 'bridge',
        enum: ['bridge', 'macvlan'], min: null, max: null, leyenda: null, ejemplos: null, avanzado: false,
        restriccion: 'El modo por defecto es el de red virtual del motor (decisión DA-03 a nivel de proyecto).', brecha: BRECHA_DESCRIPTOR },
      { clave: 'ipFija', etiqueta: 'Dirección fija', tipo: 'texto', unidad: null, porDefecto: null,
        enum: null, min: null, max: null, leyenda: null, ejemplos: null, avanzado: false,
        restriccion: 'Debe pertenecer al rango gestionado y no estar excluida; el rechazo sugiere la siguiente libre.', brecha: BRECHA_DESCRIPTOR },
      { clave: 'publicarPuertos', etiqueta: 'Publicar puertos en el host', tipo: 'booleano', unidad: null, porDefecto: null,
        enum: null, min: null, max: null, leyenda: null, ejemplos: null, avanzado: false,
        deshabilitadoSi: 'modoRed === macvlan',
        motivoDeshabilitado: 'En modo de red con dirección propia el contenedor tiene su dirección y la publicación de puertos no aplica.',
        brecha: BRECHA_DESCRIPTOR }
    ],
    sistema: [
      { clave: 'subred', etiqueta: 'Subred', tipo: 'texto', unidad: null, porDefecto: null, enum: null, min: null, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'gateway', etiqueta: 'Pasarela', tipo: 'texto', unidad: null, porDefecto: null, enum: null, min: null, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'desde', etiqueta: 'Desde', tipo: 'texto', unidad: null, porDefecto: null, enum: null, min: null, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'hasta', etiqueta: 'Hasta', tipo: 'texto', unidad: null, porDefecto: null, enum: null, min: null, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'interfazPadre', etiqueta: 'Interfaz padre', tipo: 'texto', unidad: null, porDefecto: null, enum: null, min: null, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'excluidas', etiqueta: 'Exclusiones', tipo: 'texto', unidad: null, porDefecto: null, enum: null, min: null, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'desplieguesPorServicio', etiqueta: 'Despliegues por servicio', tipo: 'numerico', unidad: 'cantidad', porDefecto: null, enum: null, min: 1, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },
      { clave: 'diasAuditoria', etiqueta: 'Días de auditoría', tipo: 'numerico', unidad: 'días', porDefecto: null, enum: null, min: 1, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR },

      /* Los dos descriptores del umbral de la sugerencia de limpieza —
         SUP-12 §3.4, incorporados por la decisión Q-17 del 2026-07-30.
         SUP-18 §3.5 declara la FORMA del umbral y establece que no se
         escribe en la pantalla: es descriptor de parámetro, la superficie
         lo lee y no lo inventa, y su valor vive acá.

         Los dos se dibujan CON SU DESCRIPTOR Y SIN VALOR POR DEFECTO. No es
         un olvido: ninguna fuente declara la capacidad del disco del
         servidor de referencia, ninguna cota de ocupación, y el catálogo de
         diseño no cubre umbrales de disco. Dibujarlos con un número
         plausible sería inventar la decisión. Brecha B-UX-28. */
      { clave: 'espacioRecuperableMinimo', etiqueta: 'Espacio recuperable mínimo', tipo: 'numerico',
        unidad: 'unidades de disco', porDefecto: null, enum: null, min: null, max: null,
        leyenda: null, ejemplos: null,
        restriccion: 'Se cuenta sólo sobre lo administrado, nunca sobre lo ajeno.',
        brecha: 'B-UX-28 · ninguna fuente declara el valor por defecto ni los límites de este parámetro',
        gobierna: 'Cuánto tendría que liberar la limpieza para que valga la pena proponerla.' },
      { clave: 'ocupacionAlmacenSugerencia', etiqueta: 'Ocupación del almacén a partir de la cual se sugiere', tipo: 'numerico',
        unidad: 'porcentaje de llenado del almacén', porDefecto: null, enum: null, min: null, max: null,
        leyenda: null, ejemplos: null,
        restriccion: 'Se evalúa junto con la condición anterior y no en su lugar.',
        brecha: 'B-UX-28 · ninguna fuente declara el valor por defecto ni los límites de este parámetro',
        gobierna: 'Desde qué punto de llenado del almacén tiene sentido proponer una limpieza.' }
    ]
  };

  /* Explicación en palabras de la sección del umbral — SUP-12 §3.4 punto 2.
     Se GENERA POR PLANTILLA a partir de los dos descriptores y de sus
     valores, nunca se redacta a mano: escrita a mano se desfasa del valor
     real, que es el anti-patrón explícito de Design-Rules-Config-Esquema.
     Con los dos valores sin declarar, la plantilla declara el hueco en lugar
     de componer una frase con un número inventado. */
  var EXPLICACION_UMBRAL = {
    plantilla: 'Se sugiere limpiar cuando se puedan liberar al menos ⟨X⟩ y el almacén supere ⟨Y⟩.',
    conjuncion: 'Las dos condiciones a la vez, no una o la otra. Cada una sola produce el defecto de la otra: proponer limpiezas que no liberan nada, o proponer en un servidor con disco de sobra.',
    componer: function (x, y) {
      if (x === null || x === undefined || y === null || y === undefined) {
        return null;
      }
      return 'Se sugiere limpiar cuando se puedan liberar al menos ' + x + ' y el almacén supere ' + y + '. Las dos condiciones a la vez.';
    },
    sinValor: 'La frase no se puede componer: ninguno de los dos parámetros tiene valor declarado. La sección declara el hueco en lugar de escribir una explicación con un número que nadie decidió.',
    /* Valores de ejemplo con los que se demuestra el estado «umbral declarado».
       NO salen de ninguna fuente y por eso no se escriben acá: el estado se
       demuestra con la forma de la frase y sus dos ranuras marcadas. */
    valoresDeEjemplo: null,
    noHace: [
      ['No dispara la limpieza ni la propone', 'Configura cuándo se propone. La propuesta y su confirmación viven en el inventario de imágenes, con la lista delante.'],
      ['No declara qué es descartable', 'El cálculo del espacio recuperable depende del criterio de descarte, que ninguna fuente declara (brecha B-26 de 02-Especificacion-Funcional). Esta sección gobierna el umbral, no la definición de lo que se cuenta.'],
      ['No inventa los valores por defecto', 'Brecha B-UX-28. Hasta que se cierre, los dos campos se dibujan con su descriptor completo y sin valor por defecto declarado, que es distinto de dibujarlos con un número plausible.']
    ],
    porQueAca: 'El almacén de imágenes es uno y compartido —lo usan el producto, el parque no incorporado y el automatismo de integración continua—, de modo que su umbral no es de ningún proyecto. Es además vecino natural de la sección de retención: las dos acotan cuánto historial ocupa el servidor.',
    dondeSeVe: 'Los dos campos son de aplicación y no de entorno: el administrador los gobierna desde el sistema y su efecto es visible en el sistema, en el inventario de imágenes y en el tablero de estado.'
  };

  /* ─────────────────────────────────────────────────────────────────────
     6.1 Alta de servicio — SUP-17, superficie propia
         Fuente: Wireframes-Alta-De-Servicio.md 2.1 (§3.1 a §3.6, §4, §5),
         CU-03 3.1 §4 (los diez pasos del tronco) y el anexo E-2 §20.2.1 a
         §20.2.6 del PRODUCT-INTAKE v3.3, que es de donde salen TODOS los
         valores de ejemplo de esta sección.

         Dos ejes independientes, que la versión anterior de la maqueta
         colapsaba en un campo:
           · la VÍA de alta tiene siete valores, es decisión de interfaz y
             de recorrido, y NO se persiste;
           · el ORIGEN tiene cinco variantes discriminadas por `tipo` y sí
             se persiste. Adopción y catálogo no tienen origen propio:
             producen uno de los otros y dejan huella en `procedencia`,
             que es auditoría y no configuración (E-2 §20.2.3 punto 5).
     ───────────────────────────────────────────────────────────────────── */

  /* Las siete vías. El orden es el del wireframe §3.1: la adopción primera,
     porque es la que resuelve el primer uso sobre un servidor en producción
     y la que no exige saber ninguna dirección de imagen. El servicio sin
     origen va SEPARADO de los seis: no es una alternativa equivalente. */
  var VIAS_ALTA = [
    {
      id: 'adopcion', etiqueta: 'Adoptar un contenedor existente',
      resuelve: 'Ya tengo el contenedor corriendo y quiero administrarlo desde acá',
      origenResultante: 'El que la traducción de la configuración observada deduzca',
      icono: 'search', separada: false, origenPropio: false,
      abre: 'Descubrimiento-E-Incorporacion.html',
      dejaProcedencia: 'adopcion',
      queVerifica: 'Que el candidato siga existiendo y no haya sido incorporado por otro proyecto entretanto'
    },
    {
      id: 'catalogo', etiqueta: 'Desde el catálogo',
      resuelve: 'Ya resolví esto antes y lo guardé como plantilla',
      origenResultante: 'El que declare la plantilla',
      icono: 'layers', separada: false, origenPropio: false,
      abre: 'Catalogo-De-Plantillas.html',
      dejaProcedencia: 'catalogo',
      queVerifica: 'Lo que la vía del origen que la plantilla declara verifique'
    },
    {
      id: 'imagen-publica', etiqueta: 'Imagen de registro público',
      resuelve: 'Sé qué imagen quiero y está publicada',
      origenResultante: 'Imagen de registro público',
      icono: 'caja', separada: false, origenPropio: true, explora: true,
      queVerifica: 'Que la imagen y la etiqueta existan; devuelve el digesto'
    },
    {
      id: 'imagen-privada', etiqueta: 'Imagen de registro privado',
      resuelve: 'La imagen está en mi registro y necesita credencial',
      origenResultante: 'Imagen de registro privado',
      icono: 'lock', separada: false, origenPropio: true, explora: true,
      queVerifica: 'Lo mismo, más que la credencial autentique'
    },
    {
      id: 'repositorio', etiqueta: 'Repositorio remoto',
      resuelve: 'Tengo el código en un repositorio y quiero que el panel construya',
      origenResultante: 'Repositorio remoto',
      icono: 'grid', separada: false, origenPropio: true,
      queVerifica: 'Repositorio y rama alcanzables, y que la ruta exista en esa rama; devuelve el último commit'
    },
    {
      id: 'dockerfile', etiqueta: 'Archivo de construcción en línea',
      resuelve: 'Quiero tomar una imagen publicada y ajustarla',
      origenResultante: 'Archivo de construcción en línea',
      icono: 'list', separada: false, origenPropio: true,
      queVerifica: 'Que el contenido sea interpretable y no lleve instrucciones de copia local'
    },
    {
      id: 'ninguno', etiqueta: 'Servicio sin origen',
      resuelve: 'Quiero el nodo en el lienzo y resolver el origen después',
      origenResultante: 'Sin origen',
      icono: 'reloj', separada: true, origenPropio: true,
      queVerifica: 'No aplica: la acción de verificar no está'
    }
  ];

  /* Punto de entrada a la exploración de registro (SUP-19), sólo en las vías
     3 y 4. Q-27 cerrada el 2026-07-30. La superficie destino se construye en
     la pasada B: acá queda el disparador con su destino declarado. */
  var EXPLORACION_REGISTRO = {
    destino: 'Exploracion-De-Registro-De-Imagenes.html',
    superficie: 'SUP-19',
    etiqueta: 'Explorar el registro',
    disponibleEn: ['imagen-publica', 'imagen-privada'],
    precisiones: [
      'Explorar no es una octava vía: no cambia el origen resultante, no agrega una variante y no deja huella en la procedencia.',
      'Volver de la exploración no saltea la verificación: el origen queda completo y sin verificar.',
      'La acción convive con los campos y no los reemplaza: el que sabe la dirección la escribe, el que no la sabe explora.'
    ],
    brecha: 'B-UX-29 · dónde se configura el conjunto de registros explorables y si viene alguno de fábrica no está declarado por ninguna fuente. De eso depende que el primer minuto de uso termine en una lista de imágenes o en un estado vacío que pide configurar un registro. La maqueta deja el disparador con su destino declarado y no elige por el agente humano.',
    notaMaqueta: 'SUP-19 está construida: el disparador abre la superficie, y volver de ella deja el origen completo y sin verificar.'
  };

  /* Las cinco variantes discriminadas de `origen` — E-2 §20.2.3.
     Cada variante exige sus campos y NINGUNO MÁS: un campo de otra variante
     es un dato inválido y no un campo opcional vacío. Por eso el bloque de
     origen de la maqueta nunca dibuja campos de otra variante, ni siquiera
     deshabilitados (wireframe §3.5 criterio 1). */
  var ORIGENES = [
    {
      tipo: 'imagen-publica', etiqueta: 'Imagen de registro público',
      descripcion: 'El servicio corre una imagen ya publicada en un registro público.',
      fuente: 'E-2 §20.2.3 y §20.2.4, servicio 401',
      campos: [
        { clave: 'registro', etiqueta: 'Registro', tipo: 'seleccion',
          enum: ['registro-publico-de-referencia'], requerido: true,
          ejemplo: 'registro-publico-de-referencia', fuente: 'E-2 §20.2.4',
          nota: 'Es un selector de registros públicos admitidos, no una dirección.' },
        { clave: 'imagen', etiqueta: 'Imagen', tipo: 'texto', requerido: true,
          ejemplo: 'redis', fuente: 'E-2 §20.2.4' },
        { clave: 'etiqueta', etiqueta: 'Etiqueta', tipo: 'texto', requerido: true,
          ejemplo: '7.2-alpine', fuente: 'E-2 §20.2.4' },
        { clave: 'politicaActualizacion', etiqueta: 'Política de actualización', tipo: 'seleccion',
          enum: ['fijada', 'flotante'], requerido: true, ejemplo: 'fijada', fuente: 'E-2 §20.2.3 y E-21' }
      ]
    },
    {
      tipo: 'imagen-privada', etiqueta: 'Imagen de registro privado',
      descripcion: 'El servicio corre una imagen de un registro propio que exige credencial.',
      fuente: 'E-2 §20.2, servicio 101',
      campos: [
        { clave: 'registroUrl', etiqueta: 'Dirección del registro', tipo: 'texto', requerido: true,
          ejemplo: 'registry.interno.lan', fuente: 'E-2 §20.2',
          nota: 'Acá el registro es una dirección y no un selector: es la primera de las dos diferencias con la vía pública.' },
        { clave: 'imagen', etiqueta: 'Imagen', tipo: 'texto', requerido: true,
          ejemplo: 'registro-privado/portal-api', fuente: 'E-2 §20.2' },
        { clave: 'etiqueta', etiqueta: 'Etiqueta', tipo: 'texto', requerido: true,
          ejemplo: '1.4.2', fuente: 'E-2 §20.2' },
        { clave: 'politicaActualizacion', etiqueta: 'Política de actualización', tipo: 'seleccion',
          enum: ['fijada', 'flotante'], requerido: true, ejemplo: 'fijada', fuente: 'E-2 §20.2.3 y E-21' },
        { clave: 'credencialRegistroId', etiqueta: 'Credencial de registro', tipo: 'seleccion',
          enum: null, requerido: true, ejemplo: null, fuente: null,
          sinEjemplo: 'El anexo E-2 declara `credencialRegistroId: 3`, un identificador numérico, y ninguna fuente declara con qué nombre se elige la credencial ni en qué superficie se dan de alta las credenciales de registro. La maqueta exhibe la ranura vacía. Ver la ambigüedad emitida.',
          nota: 'Es la segunda diferencia con la vía pública. E-2 §20.2.3 punto 1 aclara que la credencial de registro y la de repositorio son entidades distintas.' }
      ]
    },
    {
      tipo: 'repositorio', etiqueta: 'Repositorio remoto',
      descripcion: 'El panel construye la imagen desde un repositorio remoto.',
      fuente: 'E-2 §20.2.4, servicio 402',
      reglaPropia: 'RN-08: el origen repositorio exige la rama y la ruta del archivo de construcción.',
      campos: [
        { clave: 'proveedor', etiqueta: 'Proveedor', tipo: 'seleccion', enum: ['github'],
          requerido: true, ejemplo: 'github', fuente: 'E-2 §20.2.3',
          sinEjemplo: 'E-2 declara un único proveedor, `github`. Ninguna fuente declara si el conjunto admitido tiene otros. Ver la ambigüedad emitida.' },
        { clave: 'url', etiqueta: 'Dirección del repositorio', tipo: 'texto', requerido: true,
          ejemplo: 'https://github.com/usuario/portal-informes', fuente: 'E-2 §20.2.4' },
        { clave: 'rama', etiqueta: 'Rama', tipo: 'texto', requerido: true,
          ejemplo: 'main', fuente: 'E-2 §20.2.4 · exigida por RN-08' },
        { clave: 'rutaDockerfile', etiqueta: 'Ruta del archivo de construcción', tipo: 'texto', requerido: true,
          ejemplo: 'src/Informes/Dockerfile', fuente: 'E-2 §20.2.4 · exigida por RN-08' },
        { clave: 'contextoBuild', etiqueta: 'Contexto de construcción', tipo: 'texto', requerido: true,
          ejemplo: '.', fuente: 'E-2 §20.2.4' },
        { clave: 'argumentosBuild', etiqueta: 'Argumentos de construcción', tipo: 'texto', requerido: false,
          ejemplo: 'CONFIGURATION=Release', fuente: 'E-2 §20.2.4',
          nota: 'Las expresiones de referencia nunca son resolubles en tiempo de construcción (RN-24): no van acá. Lo que necesita valores resueltos va en el comando de arranque.' },
        { clave: 'credencialRepositorioId', etiqueta: 'Credencial del repositorio', tipo: 'seleccion',
          enum: null, requerido: false, ejemplo: null, fuente: null,
          sinEjemplo: 'Mismo caso que la credencial del registro: E-2 declara `credencialRepositorioId: 2`, un identificador numérico, sin nombre visible y sin superficie de alta declarada.' },
        { clave: 'reconstruirEnDespliegue', etiqueta: 'Reconstruir en cada despliegue', tipo: 'booleano',
          requerido: false, ejemplo: true, fuente: 'E-2 §20.2.4' }
      ]
    },
    {
      tipo: 'dockerfile', etiqueta: 'Archivo de construcción en línea',
      descripcion: 'El panel construye la imagen desde un archivo de construcción escrito acá mismo.',
      fuente: 'E-2 §20.2.4, servicio 403',
      limiteDeclarado: 'Sin contexto de construcción, un archivo de construcción no puede copiar archivos locales. Esta vía sirve para tomar una imagen publicada y ajustarla, y no para construir código fuente propio (E-2 §20.2.3 punto 3, DI-20).',
      campos: [
        { clave: 'contenido', etiqueta: 'Contenido del archivo de construcción', tipo: 'codigo', requerido: true,
          ejemplo: 'FROM nginx:1.25-alpine\nRUN apk add --no-cache curl\nENV NGINX_ENTRYPOINT_QUIET_LOGS=1\nEXPOSE 8080\nCMD ["nginx", "-g", "daemon off;"]',
          fuente: 'E-2 §20.2.4, servicio 403' },
        { clave: 'argumentosBuild', etiqueta: 'Argumentos de construcción', tipo: 'texto', requerido: false,
          ejemplo: '', fuente: 'E-2 §20.2.4 · el ejemplo del anexo viene vacío' },
        { clave: 'modificadoEn', etiqueta: 'Modificado', tipo: 'lectura', requerido: false,
          ejemplo: '2026-07-29T16:40:00-03:00', fuente: 'E-2 §20.2.4',
          nota: 'El panel es dueño del contenido y sabe cuándo cambió: es el equivalente del commit de la vía de repositorio.' }
      ]
    },
    {
      tipo: 'ninguno', etiqueta: 'Sin origen',
      descripcion: 'El alta detenida en el paso del nombre. El nodo existe en el lienzo en estado borrador.',
      fuente: 'E-2 §20.2.4, servicio 406',
      campos: []
    }
  ];

  /* Los ocho pasos del tronco. Sólo el paso del origen cambia según la vía
     (CU-03 3.1 §4: «los diez pasos son el tronco común de todas las vías»).
     El indicador de avance informa y NO bloquea. */
  var PASOS_TRONCO = [
    { id: 'nombre', etiqueta: 'Nombre', detalle: 'El nombre del servicio, que es también su alias de resolución de nombres (RN-01)' },
    { id: 'origen', etiqueta: 'Origen', detalle: 'El delta de la vía elegida, con su verificación' },
    { id: 'red', etiqueta: 'Red', detalle: 'Modo de red y, si corresponde, dirección fija e interfaz padre (RN-06)' },
    { id: 'puertos', etiqueta: 'Puertos', detalle: 'Gateados por el modo de red (RN-07, RN-38)' },
    { id: 'dimensiones', etiqueta: 'Dimensiones', detalle: 'Variables, montajes, dispositivos, capacidades, límites, política de reinicio, verificación de salud, efímero y comando de arranque' }
  ];

  /* El nombre. Sus límites SÍ están declarados por RN-01. */
  var CAMPO_NOMBRE = {
    clave: 'nombre', etiqueta: 'Nombre del servicio', tipo: 'texto',
    requerido: true, min: 1, max: 32,
    ejemplo: 'cache-ia', fuente: 'E-2 §20.2.4, servicio 401',
    restriccion: 'En minúsculas, con guiones, de 1 a 32 caracteres, y único dentro del proyecto (RN-01).',
    advertenciaAlias: 'Este nombre es también el alias de resolución de nombres del servicio dentro de la red del proyecto: los demás servicios lo alcanzan por él. Por eso tiene que ser único (CU-03 paso 3; RN-01).',
    rechazo: 'El nombre tiene que estar en minúsculas, con guiones, de 1 a 32 caracteres, y no puede repetirse dentro del proyecto (RN-01).'
  };

  /* Las dimensiones del tronco que la maqueta exhibe con dato de ejemplo.
     Todas salen de E-2 §20.2.4 servicio 401 y 402. */
  var DIMENSIONES_ALTA = {
    red: { modo: 'bridge', aliasDns: 'cache-ia', ipFija: '172.19.0.5', interfazPadre: null, fuente: 'E-2 §20.2.4, servicio 401' },
    redMacvlan: { modo: 'macvlan', aliasDns: 'print-server', ipFija: '192.168.1.139', interfazPadre: 'enp1s0', fuente: 'E-2 §20.2.6' },
    puertos: [{ contenedor: 6379, host: 6379, protocolo: 'tcp', publicar: true }],
    comando: { valor: null, ejemplo: 'dotnet Informes.dll --migrar-y-arrancar', fuente: 'E-2 §20.2.4, servicio 402',
      nota: 'Nulo hereda el comando de la imagen. Lo que necesita valores resueltos —una migración de base, por ejemplo— va acá y no en los argumentos de construcción (E-2 §20.2.2 y §20.2.3 punto 4).' },
    montajes: [{ tipo: 'volumen', nombre: 'cache-ia-datos', destino: '/data', soloLectura: false }],
    recursos: { limiteMemoriaMb: 512, reservaMemoriaMb: 128, limiteCpus: 0.5 },
    politicaReinicio: 'unless-stopped', autoArranque: true, efimero: false,
    healthcheck: { modo: 'heredado-de-la-imagen', comando: null, intervaloSegundos: 30 },
    motivoPuertosDeshabilitados: 'En modo de red con dirección propia el contenedor tiene su dirección y la publicación de puertos no aplica (RN-07).'
  };

  /* Los dos informes. Son DOS OPERACIONES DISTINTAS con DOS INFORMES
     DISTINTOS y viven en zonas distintas de la superficie: el del origen
     contiguo a su bloque, el de la configuración al pie (wireframe §3.2).
     Todo el contenido está transcripto de E-2 §20.2.5. */
  var INFORMES_ORIGEN = {
    verificado: {
      resultado: 'verificado', clase: null,
      en: '2026-07-29T16:30:00-03:00',
      alcance: 'Consultado el registro de imágenes público con identidad anónima. No se verificaron procesos del host.',
      comprobaciones: [
        { que: 'La imagen existe en el registro de imágenes', resultado: 'si', detalle: 'redis' },
        { que: 'La etiqueta existe', resultado: 'si', detalle: '7.2-alpine' },
        { que: 'Digesto resuelto', resultado: 'si', detalle: 'sha256:9b1e…' }
      ],
      accionSugerida: null
    },
    datoIncorrecto: {
      resultado: 'fallido', clase: 'dato-incorrecto',
      en: '2026-07-29T16:31:00-03:00',
      alcance: 'Consultado el registro de imágenes público.',
      comprobaciones: [
        { que: 'La imagen existe en el registro de imágenes', resultado: 'si', detalle: 'redis' },
        { que: 'La etiqueta existe', resultado: 'no', detalle: '7.2-alpne no existe. Similares: 7.2-alpine' }
      ],
      accionSugerida: 'corregir-el-dato',
      campoFoco: 'etiqueta',
      valorDeclarado: '7.2-alpne'
    },
    consultaImposible: {
      resultado: 'indeterminado', clase: 'consulta-imposible',
      en: '2026-07-29T16:32:00-03:00',
      alcance: 'No se pudo consultar el registro de imágenes público.',
      comprobaciones: [
        { que: 'Registro de imágenes alcanzable', resultado: 'no', detalle: 'Sin respuesta tras 10 s' }
      ],
      accionSugerida: 'reintentar'
    }
  };

  var INFORMES_CONFIGURACION = {
    validado: {
      resultado: 'validado',
      en: '2026-07-29T16:35:00-03:00',
      alcance: 'Verificado contra el registro del sistema y contra el motor de contenedores. No contra procesos del host.',
      comprobaciones: [
        { que: 'Nombre único en el proyecto (RN-01)', resultado: 'si' },
        { que: 'Dirección dentro del rango gestionado (RN-06)', resultado: 'si' },
        { que: 'Dirección libre entre servicios activos (RN-03)', resultado: 'si' },
        { que: 'Puertos compatibles con el modo de red (RN-07)', resultado: 'si' },
        { que: 'Puerto de host libre (RN-38)', resultado: 'si' },
        { que: 'Aristas con canal alcanzable (RN-04)', resultado: 'si' },
        { que: 'Referencias resolubles (RN-21)', resultado: 'si' }
      ]
    },
    conHallazgos: {
      resultado: 'con-hallazgos',
      en: '2026-07-29T16:35:00-03:00',
      alcance: 'Verificado contra el registro del sistema y contra el motor de contenedores. No contra procesos del host.',
      comprobaciones: [
        { que: 'Nombre único en el proyecto (RN-01)', resultado: 'si' },
        { que: 'Dirección dentro del rango gestionado (RN-06)', resultado: 'si' },
        { que: 'Dirección libre entre servicios activos (RN-03)', resultado: 'si' },
        { que: 'Puertos compatibles con el modo de red (RN-07)', resultado: 'si' },
        { que: 'Puerto de host libre (RN-38)', resultado: 'no',
          detalle: "El puerto 6379 lo publica el servicio 'cache' del proyecto 'Portal Interno'",
          nivel: 'bloqueante', sugerencia: 'El próximo puerto libre es 6380.' },
        { que: 'Aristas con canal alcanzable (RN-04)', resultado: 'si' },
        { que: 'Referencias resolubles (RN-21)', resultado: 'si' }
      ]
    },
    limiteDelAlcance: 'El sistema sólo conoce los puertos de lo que administra y los del motor de contenedores. Un proceso del sistema operativo que no corre en un contenedor puede tener el puerto tomado y este informe no lo sabe. Declarar el alcance es lo que evita que el tilde sostenga una afirmación que el sistema no puede verificar.'
  };

  /* Los cuatro criterios que gobiernan las dos verificaciones — E-2 §20.2.5,
     [D] DI-17 confirmada el 2026-07-30. */
  var CRITERIOS_VERIFICACION = [
    { id: 'V-1', texto: 'Toda verificación emite informe que declara su propio alcance. Un tilde sin decir qué se consultó es una afirmación sin evidencia.' },
    { id: 'V-2', texto: '«No existe» y «no pude consultar» son fallos distintos y se tratan distinto: corregir un dato contra reintentar.' },
    { id: 'V-3', texto: 'Ninguna de las dos bloquea guardar. Las dos bloquean el paso a pendiente de aplicar, que es la puerta al conjunto de cambios.' },
    { id: 'V-4', texto: 'Qué verifica la del origen depende de la variante.' }
  ];

  /* El estado del servicio, ortogonal al estado del despliegue — E-2 §20.2.1. */
  var ESTADOS_SERVICIO = {
    'borrador': {
      etiqueta: 'Borrador',
      significa: 'Existe, está incompleto y no es aplicable',
      entraAlConjunto: false, desplegable: false,
      /* B-UX-24: el contrato visual del anexo E-18 no tiene fila para el
         borrador, porque el estado no existía cuando se declaró, y
         Representacion-Lenguaje-Visual-De-Estados 2.0 tampoco lo incorpora.
         La maqueta NO inventa un color ni una insignia: aplica el mismo
         tratamiento provisional que §3.3 de esa representación ya declara
         para «finalizado» y «pausado» —par neutro más etiqueta textual
         propia—, que es derivación de una regla vigente y no invención. */
      brecha: 'B-UX-24 · ninguna fuente declara la señal visual del nodo borrador. La maqueta aplica el tratamiento provisional de Representacion-Lenguaje-Visual-De-Estados §3.3 —par neutro con etiqueta textual propia— y no elige color ni insignia nuevos.'
    },
    'pendiente-de-aplicar': {
      etiqueta: 'Pendiente de aplicar',
      significa: 'Está completo y espera que se aplique el conjunto de cambios',
      entraAlConjunto: true, desplegable: true, brecha: null
    },
    'aplicado': {
      etiqueta: 'Aplicado',
      significa: 'La configuración declarada es la que corre',
      entraAlConjunto: false, desplegable: true, brecha: null
    }
  };

  /* Propiedades del borrador — wireframe §3.4 */
  var BORRADOR = {
    propiedades: [
      ['Existe y es visible en el lienzo', 'El nodo aparece desde que se eligió la vía, no desde que se completó el alta'],
      ['Está incompleto de forma visible', 'El indicador de avance conserva qué falta, y el nodo del lienzo lo señala'],
      ['No entra al conjunto de cambios pendientes', 'El cajón no lo lista, y por lo tanto el lote sigue siendo aplicable'],
      ['No es aplicable', 'La acción de dejar pendiente está deshabilitada hasta que las dos verificaciones estén en verde'],
      ['Se puede retomar donde se dejó', 'Reabrir el alta desde el nodo del lienzo restituye el paso en el que estaba']
    ],
    porQueGuardarNuncaSeDeshabilita: 'Un formulario que no deja guardar hasta estar completo obliga a resolver todo de una sentada o a perder lo escrito. Acá guardar siempre puede, y lo que las verificaciones controlan es el paso siguiente.',
    acuseGuardado: 'El servicio quedó guardado como borrador: es visible en el lienzo, está incompleto y NO entra al conjunto de cambios pendientes.',
    acusePendiente: 'El servicio pasó a pendiente de aplicar y entró al conjunto de cambios pendientes del proyecto.',
    motivoPendienteDeshabilitada: 'Faltan las dos verificaciones en verde: el origen sin verificar y la configuración sin validar.'
  };

  /* Rechazos declarados por el wireframe §5 */
  var RECHAZOS_ALTA = {
    campoAjeno: 'El origen declara un campo que no pertenece a su variante. Es un dato inválido y no un campo opcional vacío (E-2 §20.2.3). El mensaje es distinto del de campo faltante. En la interfaz este estado no es alcanzable, porque el campo no existe.',
    copiaLocal: 'El contenido del archivo de construcción declara una copia de archivos locales. Sin contexto de construcción no se pueden copiar archivos del servidor: esta vía sirve para tomar una imagen publicada y ajustarla.',
    error: 'No se pudo guardar el alta. Nada quedó persistido y lo declarado sigue en el formulario.'
  };

  var ALTA_SERVICIO = {
    vias: VIAS_ALTA,
    origenes: ORIGENES,
    pasos: PASOS_TRONCO,
    nombre: CAMPO_NOMBRE,
    dimensiones: DIMENSIONES_ALTA,
    informesOrigen: INFORMES_ORIGEN,
    informesConfiguracion: INFORMES_CONFIGURACION,
    criteriosVerificacion: CRITERIOS_VERIFICACION,
    exploracion: EXPLORACION_REGISTRO,
    borrador: BORRADOR,
    rechazos: RECHAZOS_ALTA,
    /* Lo que la vía dedujo o la plantilla declaró, en lectura — wireframe §5 */
    origenDeducido: {
      adopcion: {
        tipo: 'imagen-privada', registroUrl: 'registry.interno.lan',
        imagen: 'registro-privado/print-server', etiqueta: '1.4.x',
        politicaActualizacion: 'flotante', credencialRegistroId: 3,
        procedencia: { via: 'adopcion', contenedorId: '9c1f2ab7', adoptadoEn: '2026-07-29T10:15:00-03:00' },
        nota: 'Lo dedujo la traducción de la configuración observada del contenedor. Se muestra en lectura y el tronco sigue desde la red.',
        fuente: 'E-2 §20.2.4, servicio 404'
      },
      catalogo: {
        tipo: 'imagen-publica', registro: 'registro-publico-de-referencia',
        imagen: 'postgres', etiqueta: '16.3', politicaActualizacion: 'fijada',
        procedencia: { via: 'catalogo', itemCatalogoId: 'cat-postgres-16', itemNombre: 'PostgreSQL 16', versionContenido: 4, instanciadoEn: '2026-07-29T16:50:00-03:00', vinculo: 'debil-solo-origen' },
        nota: 'Lo declara la plantilla del catálogo. La procedencia guarda una copia y no una clave foránea: la plantilla puede borrarse y el servicio sigue respondiendo de dónde salió (D-14).',
        fuente: 'E-2 §20.2.4, servicio 405'
      }
    }
  };

  /* Parámetros de entorno: tienen descriptor y NO se dibujan en ninguna
     superficie (Config-Esquema §2.1). Se listan acá para que la maqueta
     pueda declarar la frontera sin renderizar los controles. */
  var PARAMETROS_DE_ENTORNO = [
    { etiqueta: 'Clave de firma de credenciales y clave de la instancia', donde: 'Variable de entorno o archivo montado, fuera del repositorio y de la imagen' },
    { etiqueta: 'Ubicación del archivo de la base de datos', donde: 'Volumen persistente, nunca dentro de la imagen' },
    { etiqueta: 'Directorio de datos de trabajo', donde: 'Montado en la misma ruta absoluta en el host y en desarrollo' },
    { etiqueta: 'Ruta del punto de acceso del motor de contenedores', donde: 'Se fija al desplegar la instancia' },
    { etiqueta: 'Prefijo de nombre reservado de los contenedores', donde: 'Sin clasificar por ninguna fuente: brecha B-UX-06. Ante la duda, no se dibuja' }
  ];

  /* ─────────────────────────────────────────────────────────────────────
     6.2 Imágenes — SUP-18, superficie propia
         Fuente: Wireframes-Imagenes.md 2.1, CU-37 2.1, Modelo-Conceptual
         §1.16 y el anexo E-23 del PRODUCT-INTAKE v3.3, que es el único que
         emite el modelo de la imagen con sus tres campos determinantes:
         digesto, pertenencia y marca de conservada, más el valor `ajena`.

         DOS DECISIONES CERRADAS EL 2026-07-30 habilitan esta superficie:
           · Q-15 en positivo — el despliegue registra el digesto de la
             imagen que usó (bloque `imagen` del despliegue, E-23). Es lo
             que vuelve resoluble el indicador de uso.
           · Q-17 — la limpieza es SUGERIDA: el sistema detecta espacio
             recuperable y lo propone, el administrador confirma.

         TRES TRAMOS SIGUEN SIN ESPECIFICAR y esta maqueta NO los resuelve:
         Q-16 (marca de pertenencia de las imágenes construidas), Q-18
         (ámbito de credencial de la limpieza) y Q-21 (alcance de la marca
         de conservada). Ver `IMAGENES.tramosAbiertos`.
     ───────────────────────────────────────────────────────────────────── */

  /* La forma del digesto es el problema de fondo de esta superficie y se
     declara una sola vez acá para no repetirlo fila por fila.

     NINGUNA fuente del corpus declara un digesto completo: verificado sobre
     todo `SDD/`, cero coincidencias de `sha256:` seguido de sesenta y cuatro
     caracteres. Los digestos que alguna fuente vigente declara vienen
     ABREVIADOS EN EL PROPIO ANEXO, y son exactamente tres:

       · `sha256:9b1e…` — E-2 §20.2.5, digesto resuelto por la verificación
         del origen para `redis` etiqueta `7.2-alpine`
       · `sha256:a1b2c3...` — E-3 §20.3, despliegue 5471 del servicio 101,
         para `registro-privado/portal-api:1.4.2`
       · `sha256:3f7a…` — E-23, para la imagen
         `registry.interno.lan/registro-privado/portal-api:1.4.2` del mismo
         servicio 101, y para el bloque `imagen` del despliegue 5480

     Los dos últimos SE CONTRADICEN: misma referencia, mismo servicio,
     digestos distintos. Ver `DIGESTO_PORTAL_API` en §4.1.

     La maqueta los exhibe TAL CUAL y no completa los caracteres que faltan.
     Consecuencia visible, declarada y no disimulada: la «forma completa
     disponible al pedirla» que SUP-18 §3.2 y SUP-19 §3.2 piden NO se puede
     demostrar. El control existe, declara su estado de apertura, y lo que
     revela es la forma que la fuente declara más el motivo de por qué no
     hay más. Toda imagen para la que ninguna fuente declara digesto lleva
     `digesto: null`, que es distinto de una celda sin cargar. */
  var DIGESTO_SIN_FUENTE = 'Ninguna fuente declara el digesto de esta imagen. El corpus entero trae dos digestos y los dos vienen abreviados en su propio anexo. La maqueta no inventa los caracteres que faltan: sin digesto no hay identidad, y es lo que esta fila muestra.';
  var DIGESTO_ABREVIADO_EN_ORIGEN = 'Abreviado en el anexo de origen. Ninguna fuente declara la forma completa, de modo que la acción de verla no puede entregar más que esto.';
  var TAMANO_SIN_FUENTE = 'Tamaño sin declarar. El corpus entero declara un único tamaño de imagen —214 MB, anexo E-23— y la maqueta no inventa los demás. La columna existe porque es la que vuelve accionable la atribución del consumo.';

  /* Las cuatro lecturas del indicador de uso — SUP-18 §3.4.
     La resolución es POR DIGESTO y nunca por etiqueta. */
  var LECTURAS_DE_USO = {
    'en-uso': {
      etiqueta: 'En uso',
      condicion: 'Uno o más despliegues activos la referencian por su digesto',
      permiteConservar: false,
      motivoSinConservar: 'Ya está protegida por su uso. Marcarla sería redundante y sugeriría que sin la marca se borraría.',
      descartable: false
    },
    'solo-historial': {
      etiqueta: 'Sólo en el historial',
      condicion: 'La referencian despliegues del historial y ninguno activo',
      permiteConservar: true,
      motivoSinConservar: null,
      descartable: true,
      nota: 'Es exactamente la fila que la limpieza se llevaría, y la que el administrador puede querer proteger.'
    },
    'sin-referencia': {
      etiqueta: 'Sin referencia',
      condicion: 'Ningún despliegue, activo ni del historial, la referencia',
      permiteConservar: true,
      motivoSinConservar: null,
      descartable: true,
      nota: 'La ausencia se declara con estas palabras y no como celda vacía: una celda en blanco se lee como falta de dato, y acá el dato es que no hay ninguno.'
    },
    'no-atribuible': {
      etiqueta: 'Uso no atribuible',
      condicion: 'Existen despliegues del historial cuyo bloque de imagen no tiene digesto registrado',
      permiteConservar: true,
      motivoSinConservar: null,
      descartable: false,
      nota: 'La fila NO se presenta como descartable. Q-15 rige hacia adelante y los despliegues ya retenidos no tienen el dato: es la brecha B-28 de 02-Especificacion-Funcional, y la lectura conservadora es no contarlos como sin referencia.'
    }
  };

  /* Inventario. Se agrupa por PERTENENCIA y no por tamaño: lo primero que el
     administrador necesita saber es qué es suyo y qué no, porque de eso
     depende qué puede hacer (SUP-18 §3.1).

     Procedencia de cada fila, declarada por fila en `fuente`. La única
     imagen que alguna fuente emite como objeto completo es la primera,
     del anexo E-23. Las demás se derivan de la referencia de imagen que
     E-19 y E-20 declaran para el parque de contenedores de referencia, que
     el propio E-19 declara juego de datos de maqueta: la referencia y la
     etiqueta salen de ahí, y el digesto y el tamaño quedan sin declarar. */
  var IMAGENES = [
    {
      id: 'img-1',
      grupo: 'administrada',
      referencia: 'registry.interno.lan/registro-privado/portal-api:1.4.2',
      etiqueta: '1.4.2',
      /* Misma constante que exhibe SUP-06: es la fuente única que garantiza
         que las dos superficies digan lo mismo sobre este dato. E-3 y E-23
         declaran digestos distintos para esta referencia y la maqueta no
         elige entre ellas. */
      digesto: null,
      digestoContradictorio: DIGESTO_PORTAL_API,
      digestoNota: DIGESTO_ABREVIADO_EN_ORIGEN,
      tamanoMb: 214,
      tamanoNota: null,
      creadaEn: '2026-07-26T09:00:00-03:00',
      origenDeLaImagen: 'construida-por-el-ejecutor',
      pertenencia: { gestionadaPorElPanel: true, proyecto: 'Portal Interno', servicio: 'api', proyectoId: 12, servicioId: 101 },
      conservada: false,
      uso: {
        lectura: 'en-uso',
        activos: 1, historial: 1, sinDigesto: 0,
        detalle: [
          { proyecto: 'Portal Interno', servicio: 'api', despliegue: 5480, estado: 'activo' },
          { proyecto: 'Portal Interno', servicio: 'api', despliegue: 5472, estado: 'historial' }
        ]
      },
      fuente: 'E-23, objeto imagen completo, y Modelo-Conceptual §1.16 ejemplo de instancia',
      /* E-23 declara `desplieguesQueLaReferencian: [5472, 5480]` y en el mismo
         anexo el despliegue 5480 es del servicio 101. E-3, en cambio, asigna
         el 5472 al servicio 102. La maqueta transcribe la lista de E-23 y no
         la corrige: la discrepancia se devuelve como hallazgo. */
      notaDeFuente: 'E-23 declara que la referencian los despliegues 5472 y 5480. E-3 asigna el 5472 al servicio 102 y no al 101. La maqueta transcribe E-23 y no elige entre las dos fuentes.'
    },
    {
      id: 'img-2',
      grupo: 'administrada',
      referencia: 'registro-publico-de-referencia/imagen-oficial/redis:7.2-alpine',
      etiqueta: '7.2-alpine',
      digesto: 'sha256:9b1e…',
      digestoNota: DIGESTO_ABREVIADO_EN_ORIGEN,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'descargada',
      pertenencia: { gestionadaPorElPanel: true, proyecto: null, servicio: null, proyectoId: null, servicioId: null },
      conservada: false,
      uso: { lectura: 'sin-referencia', activos: 0, historial: 0, sinDigesto: 0, detalle: [] },
      fuente: 'E-2 §20.2.4 y §20.2.5 · es la imagen que la verificación del origen del alta resolvió, con su digesto',
      notaDeFuente: 'Descargada al verificar el origen del servicio 401, que quedó en borrador y nunca se desplegó. Por eso es la candidata más clara de la limpieza y la única fila con la lectura «sin referencia».'
    },
    {
      id: 'img-3',
      grupo: 'administrada',
      referencia: 'registro-privado/print-server:1.4.18',
      etiqueta: '1.4.18',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'construida-por-el-panel',
      pertenencia: { gestionadaPorElPanel: true, proyecto: 'Impresion 3D', servicio: 'print-server', proyectoId: 7, servicioId: 305 },
      conservada: false,
      uso: { lectura: 'no-atribuible', activos: 0, historial: 1, sinDigesto: 1, detalle: [{ proyecto: 'Impresion 3D', servicio: 'print-server', despliegue: 5310, estado: 'sin-digesto' }] },
      fuente: 'E-19 y E-20 C-3 · imagen construida con versión fijada por argumento de construcción',
      /* Q-16 abierta: si las imágenes CONSTRUIDAS llevan marca de pertenencia
         no lo declara ninguna fuente. Esta fila está en el grupo administrado
         porque el panel la construyó, y la maqueta declara que esa colocación
         depende de Q-16 en lugar de presentarla como resuelta. */
      pertenenciaSujetaA: 'Q-16'
    },
    {
      id: 'img-4',
      grupo: 'administrada',
      referencia: 'registro-privado/video:0.3',
      etiqueta: '0.3',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'construida-por-el-panel',
      pertenencia: { gestionadaPorElPanel: true, proyecto: 'Laboratorio IA', servicio: 'ia-video', proyectoId: 9, servicioId: 413 },
      conservada: true,
      uso: { lectura: 'solo-historial', activos: 0, historial: 2, sinDigesto: 0, masReciente: 'el despliegue más reciente del historial de ia-video', detalle: [{ proyecto: 'Laboratorio IA', servicio: 'ia-video', despliegue: null, estado: 'historial' }] },
      fuente: 'E-19 y E-20 C-5 · el proyecto Laboratorio IA está detenido, de modo que ningún despliegue activo la referencia',
      pertenenciaSujetaA: 'Q-16',
      conservadaSujetaA: 'Q-21',
      notaDeFuente: 'El identificador del despliegue del historial no lo declara ninguna fuente: la celda dice la cantidad y no inventa el número.'
    },
    {
      id: 'img-5',
      grupo: 'administrada',
      referencia: 'imagen-oficial/modelos:0.32',
      etiqueta: '0.32',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'descargada',
      pertenencia: { gestionadaPorElPanel: true, proyecto: 'Laboratorio IA', servicio: 'ia-api', proyectoId: 9, servicioId: 410 },
      conservada: false,
      uso: { lectura: 'solo-historial', activos: 0, historial: 1, sinDigesto: 0, detalle: [{ proyecto: 'Laboratorio IA', servicio: 'ia-api', despliegue: null, estado: 'historial' }] },
      fuente: 'E-19 y E-20 C-5'
    },
    {
      id: 'img-6',
      grupo: 'ajena',
      referencia: 'imagen-oficial/panel-ce:latest',
      etiqueta: 'latest',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'ajena',
      procedenciaAjena: 'Del parque de contenedores preexistente. La usa `panel-admin`, que monta el punto de acceso del motor y que el descubrimiento declara no adoptable.',
      pertenencia: { gestionadaPorElPanel: false, proyecto: null, servicio: null },
      conservada: false,
      uso: null,
      fuente: 'E-19 y E-20 C-1',
      etiquetaFlotante: true,
      vigente: true
    },
    {
      id: 'img-7',
      grupo: 'ajena',
      referencia: 'imagen-oficial/panel-ce:latest',
      etiqueta: 'latest',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'ajena',
      procedenciaAjena: 'Del parque preexistente. Es el contenido anterior de la misma etiqueta flotante: dos imágenes distintas que la etiqueta `latest` designó en momentos distintos.',
      pertenencia: { gestionadaPorElPanel: false, proyecto: null, servicio: null },
      conservada: false,
      uso: null,
      fuente: 'Derivada de E-20 C-1, que declara la etiqueta flotante `latest` como el patrón que la política de actualización tiene que poder declarar',
      etiquetaFlotante: true,
      vigente: false,
      masAntigua: true,
      /* Este par es el estado «dos imágenes con la misma etiqueta» de §5.
         El wireframe pide distinguirlas POR SU DIGESTO y ninguna fuente
         declara dos digestos para una etiqueta: la maqueta demuestra las dos
         filas y declara que el dato que las distingue no está. No inventa un
         segundo digesto para que la demostración parezca completa. */
      limitacionDeclarada: 'Las dos filas existen porque la etiqueta flotante designó contenidos distintos. Lo que las distingue es el digesto, y ninguna fuente declara ninguno de los dos: la maqueta demuestra la separación en dos filas y no fabrica los digestos que la harían legible.'
    },
    {
      id: 'img-8',
      grupo: 'ajena',
      referencia: 'imagen-comunidad/windows',
      etiqueta: 'sin etiqueta declarada · resuelve a la flotante por defecto',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'ajena',
      procedenciaAjena: 'Del parque preexistente. La usa `vm-windows`, que nadie incorporó a ningún proyecto.',
      pertenencia: { gestionadaPorElPanel: false, proyecto: null, servicio: null },
      conservada: false,
      uso: null,
      fuente: 'E-19 y E-20 C-4 · imagen sin etiqueta, que resuelve de forma implícita'
    },
    {
      id: 'img-9',
      grupo: 'ajena',
      referencia: 'registro-privado/bot-moderador:latest',
      etiqueta: 'latest',
      digesto: null,
      digestoNota: DIGESTO_SIN_FUENTE,
      tamanoMb: null,
      tamanoNota: TAMANO_SIN_FUENTE,
      creadaEn: null,
      origenDeLaImagen: 'ajena',
      procedenciaAjena: 'Del parque preexistente. La usa `bot-mensajeria`, que es candidato del descubrimiento y todavía no se incorporó.',
      pertenencia: { gestionadaPorElPanel: false, proyecto: null, servicio: null },
      conservada: false,
      uso: null,
      fuente: 'E-19 y E-20 C-2',
      etiquetaFlotante: true
    }
  ];

  /* Indicador de ocupación del almacén — SUP-18 §2 y §3.
     El total en unidades de disco NO es derivable: el corpus declara un
     único tamaño de imagen. El conteo SÍ: E-18 declara `18 imagenes` para
     el host, que es el único conteo que alguna fuente emite. La maqueta
     exhibe las dos cifras que puede sostener y declara la que no. */
  var OCUPACION_ALMACEN = {
    imagenesEnElHost: 18,
    fuenteConteo: 'E-18, bloque del servidor del tablero: «Contenedores 8 activos / 8 · 18 imagenes». Es el único conteo de imágenes de todo el corpus.',
    totalGb: null,
    totalSinFuente: 'Ocupación total sin declarar. Ninguna fuente emite el tamaño del almacén de imágenes: los 115/884 GB de E-18 son el disco raíz del host, y el intake nunca desagrega cuánto ocupan las imágenes.',
    repartoAdministradasGb: null,
    repartoAjenasGb: null,
    repartoSinFuente: 'El reparto entre lo administrado y lo ajeno tampoco se puede componer: se necesitaría el tamaño de cada imagen y el corpus declara uno solo.',
    unicoTamanoDeclarado: { referencia: 'registry.interno.lan/registro-privado/portal-api:1.4.2', tamanoMb: 214, fuente: 'E-23' },
    notaDeInventario: 'El inventario lista las imágenes para las que alguna fuente declara una referencia. E-18 declara dieciocho en el host y ninguna fuente enumera las demás: la maqueta no completa la lista con filas inventadas.'
  };

  /* Sugerencia de limpieza — SUP-18 §3.5, decisión Q-17.
     La FORMA está especificada; la ARITMÉTICA no, y depende del criterio de
     descarte, que ninguna fuente declara (brecha B-26 de 02). */
  var SUGERENCIA_LIMPIEZA = {
    vigente: true,
    espacioRecuperableGb: null,
    espacioSinFuente: 'Espacio recuperable sin cifra. Su cálculo depende del criterio de descarte —qué vuelve descartable a una imagen del producto—, que ninguna fuente declara: es la brecha B-26 de 02-Especificacion-Funcional. Mientras esté abierta, la condición tiene forma y no tiene aritmética.',
    imagenesQueEntrarian: null,
    cantidadSinFuente: 'La cantidad de imágenes que entrarían depende del mismo criterio de descarte. La maqueta demuestra la banda con su forma y sus dos acciones, y no compone un número.',
    /* SUP-18 §3.5 restricción 3 pide demostrar la banda «con dato de ejemplo».
       Este maquetado no lo hace, y es deliberado: el dato de ejemplo tendría
       que salir de los CU, del modelo conceptual, de las RN o de los anexos,
       y ninguno declara ninguna cifra de espacio recuperable. Emitir un
       número sería inventarlo. La contradicción entre la restricción del
       wireframe y la regla de datos se devuelve como hallazgo. */
    porQueSinCifra: 'El wireframe pide demostrar esta banda con dato de ejemplo. Ninguna fuente de datos de ejemplo —CU, modelo conceptual, reglas de negocio, anexos— declara ninguna cifra de espacio recuperable ni de ocupación de almacén. La maqueta muestra la forma completa de la banda y deja las dos ranuras declaradas, en vez de emitir una cifra sin fuente.',
    calculadaSobre: 'Sólo lo administrado. El espacio recuperable nunca cuenta lo ajeno: proponer liberar lo que la operación tiene prohibido tocar sería una promesa que la limpieza no puede cumplir (SUP-18 §3.1 criterio 4).',
    reglas: [
      ['Conjunción, no disyunción', 'Las dos condiciones a la vez. Cada una sola produce el defecto de la otra: proponer limpiezas que no liberan nada, o proponer en un servidor con disco de sobra.'],
      ['Histéresis', 'Una vez mostrada, la sugerencia no desaparece y reaparece por oscilación alrededor del punto declarado: se retira sólo cuando el hecho cambia de forma sostenida.'],
      ['Reaparición tras el descarte', 'Descartada, no vuelve hasta que el espacio recuperable crezca respecto del que se descartó. Q-17 decidió que el sistema propone, no que insiste.'],
      ['Una sola sugerencia y una sola fuente', 'Las dos ubicaciones —esta superficie y el tablero de estado— exhiben el mismo hecho. Descartarla acá la retira también del tablero.']
    ],
    descartada: {
      texto: 'La sugerencia quedó descartada. El inventario está igual que antes: no se borró nada y no hay evento de borrado.',
      reaparicion: 'No vuelve a aparecer hasta que el hecho cambie: hasta que el espacio recuperable crezca respecto del que se descartó.'
    },
    dondeNoAparece: [
      'En el lienzo del proyecto: la higiene informa y nunca impide.',
      'Dentro del banner de cambios pendientes: está reservado al estado transaccional y su contador cuenta cambios declarados.',
      'Como diálogo que bloquea ni como aviso que interrumpa: una sugerencia que interrumpe convierte el mantenimiento en urgencia.'
    ],
    /* Línea del tablero de estado — SUP-09 §3.2. Mismo hecho, otra forma. */
    lineaDelTablero: {
      texto: 'Se puede liberar espacio en imágenes',
      enlace: 'Imagenes.html',
      etiquetaEnlace: 'Ver imágenes',
      noHace: 'No lista qué imágenes entrarían, no ofrece confirmar y no ofrece descartar. Descartar es una decisión que se toma con la lista delante.',
      ausencia: 'Cuando no hay sugerencia vigente el bloque del servidor no muestra ningún hueco, ninguna leyenda de «sin sugerencias» y ningún espacio reservado: la ausencia de una oportunidad no es información.'
    }
  };

  /* Propuesta e informe de la limpieza — SUP-18 §3.3.
     Son DOS COSAS y no una: la propuesta declara lo que HARÍA y se confirma;
     el informe declara lo que HIZO y se acusa. Comparten estructura a
     propósito: lo único que cambia es el tiempo verbal. */
  var LIMPIEZA = {
    propuesta: {
      espacioQueLiberaria: null,
      espacioSinFuente: 'Sin cifra, por el mismo motivo que la banda: la aritmética depende del criterio de descarte (B-26).',
      entran: [
        { referencia: 'registro-publico-de-referencia/imagen-oficial/redis:7.2-alpine', digesto: 'sha256:9b1e…', tamanoMb: null, motivo: 'Administrada por el panel, sin marca de conservada y sin ninguna referencia' }
      ],
      quedanAfuera: [
        { referencia: 'registro-privado/video:0.3', clase: 'conservada', motivo: 'Conservada' },
        { referencia: 'imagen-oficial/panel-ce:latest', clase: 'ajena', motivo: 'Ajena: el panel no la administra' },
        { referencia: 'imagen-comunidad/windows', clase: 'ajena', motivo: 'Ajena: el panel no la administra' },
        { referencia: 'registro-privado/bot-moderador:latest', clase: 'ajena', motivo: 'Ajena: el panel no la administra' },
        { referencia: 'registry.interno.lan/registro-privado/portal-api:1.4.2', clase: 'en-uso', motivo: 'En uso por el despliegue 5480' },
        { referencia: 'registro-privado/print-server:1.4.18', clase: 'en-uso', motivo: 'Uso no atribuible: un despliegue del historial no registró su digesto' }
      ],
      advertencia: 'Nada se borró todavía. Todo camino a borrar pasa por esta propuesta: no hay ninguna acción de esta pantalla que borre en un solo gesto.',
      quePasaConLoQueEntra: 'Qué vuelve exactamente descartable a una imagen del producto —no tener ningún despliegue activo, no tener ninguno en absoluto, o una antigüedad— no está declarado por ninguna fuente. La propuesta muestra la fila que las cuatro lecturas del indicador dejan sin discusión y declara que el criterio sigue abierto.'
    },
    informe: {
      borradas: [
        { referencia: 'registro-publico-de-referencia/imagen-oficial/redis:7.2-alpine', digesto: 'sha256:9b1e…', tamanoMb: null }
      ],
      espacioLiberado: null,
      espacioSinFuente: 'Sin cifra: el corpus declara un único tamaño de imagen y no es el de esta.',
      dejadas: [
        { referencia: 'registro-privado/video:0.3', clase: 'conservada', motivo: 'Conservada', queHacer: 'Retirar la conservación si querés que entre en la próxima limpieza' },
        { referencia: 'imagen-oficial/panel-ce:latest', clase: 'ajena', motivo: 'Ajena: el panel no la administra', queHacer: 'Nada. No es del producto y ninguna operación de limpieza la alcanza' },
        { referencia: 'registry.interno.lan/registro-privado/portal-api:1.4.2', clase: 'en-uso', motivo: 'En uso por el despliegue 5480', queHacer: 'Esperar a que deje de usarse' }
      ]
    },
    sinNadaQueBorrar: {
      texto: 'No se borró ninguna imagen. No es un fallo: en un servidor recién ordenado que todo esté en uso, conservado o ajeno es el resultado esperado.',
      dejadas: [
        { referencia: 'registro-privado/video:0.3', clase: 'conservada', motivo: 'Conservada' },
        { referencia: 'registry.interno.lan/registro-privado/portal-api:1.4.2', clase: 'en-uso', motivo: 'En uso por el despliegue 5480' },
        { referencia: 'imagen-oficial/panel-ce:latest', clase: 'ajena', motivo: 'Ajena: el panel no la administra' },
        { referencia: 'imagen-comunidad/windows', clase: 'ajena', motivo: 'Ajena: el panel no la administra' }
      ]
    },
    parcial: {
      texto: 'La limpieza continuó con el resto. Una imagen no se pudo borrar y el motor devolvió su motivo.',
      noBorradas: [
        { referencia: 'registro-publico-de-referencia/imagen-oficial/redis:7.2-alpine', motivo: 'El motor de contenedores se negó a borrarla' }
      ],
      notaMaqueta: 'El texto exacto del motivo que devuelve el motor no lo declara ninguna fuente: la maqueta exhibe la ranura del motivo y no inventa el mensaje del motor.'
    },
    motorInalcanzable: 'El punto de acceso del motor de contenedores no responde. El inventario no se muestra desde caché: un inventario desactualizado invitaría a borrar lo que no corresponde.',
    tramosAbiertos: [
      { tramo: 'El grupo administrado', falta: 'Si las imágenes construidas llevan marca de pertenencia. Sin ella la separación entre lo propio y lo ajeno no es resoluble.', pendiente: 'Q-16' },
      { tramo: 'El alcance de la marca de conservada', falta: 'Si el administrador puede marcarla, sobre qué imágenes, y si la marca se pone sola al volver a un despliegue anterior.', pendiente: 'Q-21' },
      { tramo: 'El ámbito de credencial de la limpieza por API', falta: 'Si tiene ámbito propio, distinto del de desplegar.', pendiente: 'Q-18' }
    ],
    huecosDestapados: [
      { hueco: 'El criterio de descarte', falta: 'Qué vuelve descartable a una imagen del producto. Q-17 decidió el disparo y no el criterio.', brecha: 'B-26 de 02-Especificacion-Funcional' },
      { hueco: 'Los valores por defecto del umbral', falta: 'Las dos condiciones tienen forma declarada y no tienen valor. Ninguna fuente declara la capacidad del disco del servidor de referencia ni ninguna cota de ocupación.', brecha: 'B-UX-28' },
      { hueco: 'Los despliegues ya retenidos sin digesto', falta: 'Q-15 rige hacia adelante. Se exponen como «uso no atribuible», que es la lectura conservadora, y la elección se declara.', brecha: 'B-28 de 02-Especificacion-Funcional' }
    ]
  };

  var IMAGENES_SUPERFICIE = {
    inventario: IMAGENES,
    lecturas: LECTURAS_DE_USO,
    ocupacion: OCUPACION_ALMACEN,
    sugerencia: SUGERENCIA_LIMPIEZA,
    limpieza: LIMPIEZA,
    digestoSinFuente: DIGESTO_SIN_FUENTE,
    grupos: {
      administrada: {
        titulo: 'Administradas por el panel',
        descripcion: 'Llevan la marca de pertenencia del producto: las descargó o las construyó él. Se pueden conservar, se les puede retirar la conservación, y quedan incluidas en la limpieza.',
        tieneAcciones: true
      },
      ajena: {
        titulo: 'Ajenas · el panel no las administra y no las toca',
        descripcion: 'No llevan la marca: son del parque preexistente o de un automatismo externo. Se listan con su tamaño para poder atribuir el consumo, y nada más. No hay ninguna acción sobre ellas, ni siquiera deshabilitada.',
        tieneAcciones: false
      }
    },
    vacio: {
      titulo: 'El almacén de imágenes está vacío',
      texto: 'El motor de contenedores no tiene ninguna imagen. Es el estado de un servidor recién aprovisionado: la primera imagen aparece al desplegar el primer servicio.'
    },
    soloAjenas: {
      titulo: 'El producto todavía no descargó ni construyó ninguna imagen',
      texto: 'Es lo normal en una instalación nueva y no una anomalía. Las que se ven abajo son del parque preexistente: el panel las ve y no las administra.'
    },
    filtros: {
      nota: 'Los filtros acotan el inventario y NO alteran la propuesta de limpieza. El grupo ajeno tampoco desaparece del total de ocupación aunque se filtre.',
      procedencias: ['todas', 'descargada', 'construida-por-el-panel', 'construida-por-el-ejecutor', 'ajena']
    },
    accionMasiva: 'Un «seleccionar todo» selecciona todo lo administrado y nada de lo ajeno. Ninguna acción masiva alcanza al grupo ajeno.'
  };

  /* ─────────────────────────────────────────────────────────────────────
     6.3 Exploración de registro de imágenes — SUP-19, superficie nueva
         Fuente: Wireframes-Exploracion-De-Registro-De-Imagenes.md 1.0 y
         CU-39 1.1. Existe porque Q-27 cerró el 2026-07-30 a favor de que
         haya exploración, y su consecuencia declarada es que es una
         superficie nueva con wireframe propio.

         Explorar NO es una octava vía: es un punto de entrada al paso del
         origen de dos de las siete. No cambia el origen resultante, no
         agrega una variante y no deja huella en la procedencia.

         CU-39 no trae NI UN SOLO valor de ejemplo: cero nombres de
         registro, cero repositorios, cero etiquetas, cero digestos y cero
         momentos de publicación. Todo lo que esta sección exhibe sale de
         valores que E-2 y E-23 sí declaran en otro contexto —el del origen
         del servicio— y se rotula como tal.
     ───────────────────────────────────────────────────────────────────── */

  var REGISTROS_EXPLORABLES = [
    {
      id: 'publico',
      nombre: 'registro-publico-de-referencia',
      naturaleza: 'publico',
      identidad: 'Público · consulta anónima',
      credencial: null,
      enumera: true,
      fuente: 'E-2 §20.2.4 · es el único valor del selector de registros públicos que alguna fuente declara'
    },
    {
      id: 'privado',
      nombre: 'registry.interno.lan',
      naturaleza: 'privado',
      identidad: 'Privado · con la credencial',
      credencial: null,
      credencialSinNombre: 'E-2 declara `credencialRegistroId: 3`, un identificador numérico, y ninguna fuente declara con qué nombre se elige la credencial. La superficie exhibe la ranura del nombre y no inventa uno: el valor de la credencial nunca se muestra, pero el nombre sí tendría que estar.',
      enumera: false,
      motivoNoEnumera: 'Este registro no ofrece forma de listar lo que publica y sólo responde consultas por nombre.',
      fuente: 'E-2 §20.2 · dirección del registro privado del servicio 101'
    }
  ];

  var RESULTADOS_EXPLORACION = [
    {
      repositorio: 'imagen-oficial', imagen: 'redis',
      referenciaLegible: 'registro-publico-de-referencia/imagen-oficial/redis',
      fuente: 'E-2 §20.2.4 y §20.2.5'
    },
    {
      repositorio: 'imagen-oficial', imagen: 'postgres',
      referenciaLegible: 'registro-publico-de-referencia/imagen-oficial/postgres',
      fuente: 'E-2 §20.2.4, servicio 405, y el ítem cat-postgres-16 de E-6'
    },
    {
      repositorio: 'imagen-oficial', imagen: 'panel-ce',
      referenciaLegible: 'registro-publico-de-referencia/imagen-oficial/panel-ce',
      fuente: 'E-19 y E-20 C-1'
    },
    {
      repositorio: 'imagen-oficial', imagen: 'webui',
      referenciaLegible: 'registro-publico-de-referencia/imagen-oficial/webui',
      fuente: 'E-19 y E-20 C-5'
    }
  ];

  /* Etiquetas de la imagen elegida. Cada una con su momento de publicación y
     el digesto AL QUE APUNTA HOY: la palabra «hoy» es parte del dato.
     Ninguna fuente declara ningún momento de publicación de ninguna etiqueta
     de ninguna imagen: la columna existe con su ranura declarada. */
  var MOMENTO_SIN_FUENTE = 'Momento de publicación sin declarar. Ninguna fuente del corpus emite la fecha de publicación de ninguna etiqueta. Es el dato que permite distinguir la etiqueta vigente de una vieja cuando los nombres no lo dicen, y la maqueta no lo inventa.';

  var ETIQUETAS_EXPLORACION = {
    'redis': [
      { etiqueta: '7.2-alpine', publicadaEn: null, publicadaNota: MOMENTO_SIN_FUENTE, digesto: 'sha256:9b1e…', digestoNota: DIGESTO_ABREVIADO_EN_ORIGEN, fuente: 'E-2 §20.2.5 · digesto resuelto por la verificación del origen' },
      { etiqueta: '7.4', publicadaEn: null, publicadaNota: MOMENTO_SIN_FUENTE, digesto: null, digestoNota: DIGESTO_SIN_FUENTE, fuente: 'E-2 §20.2, servicio 102' }
    ],
    'postgres': [
      { etiqueta: '16.3', publicadaEn: null, publicadaNota: MOMENTO_SIN_FUENTE, digesto: null, digestoNota: DIGESTO_SIN_FUENTE, fuente: 'E-2 §20.2.4, servicio 405' },
      { etiqueta: '16-alpine', publicadaEn: null, publicadaNota: MOMENTO_SIN_FUENTE, digesto: null, digestoNota: DIGESTO_SIN_FUENTE, fuente: 'E-2 §20.2, servicio 103' }
    ],
    'panel-ce': [
      { etiqueta: 'latest', publicadaEn: null, publicadaNota: MOMENTO_SIN_FUENTE, digesto: null, digestoNota: DIGESTO_SIN_FUENTE, fuente: 'E-19 y E-20 C-1 · etiqueta flotante' }
    ],
    'webui': []
  };

  var EXPLORACION = {
    registros: REGISTROS_EXPLORABLES,
    resultados: RESULTADOS_EXPLORACION,
    etiquetas: ETIQUETAS_EXPLORACION,
    imagenElegidaPorDefecto: 'redis',
    criterioPorDefecto: 'redis',

    /* Referencia que el desenlace devuelve. Vive acá y no en el renderizador:
       es un dato y ningún dato se escribe en `Maqueta.js`. El digesto es el
       que E-2 §20.2.5 declara para `redis` etiqueta `7.2-alpine`, que es la
       única fuente que lo respalda. */
    referenciaDevuelta: {
      referencia: 'registro-publico-de-referencia/imagen-oficial/redis:7.2-alpine',
      digesto: 'sha256:9b1e…',
      digestoNota: 'Abreviado en el anexo de origen (E-2 §20.2.5, «Digesto resuelto» del informe de verificación del origen para la imagen redis, etiqueta 7.2-alpine). Ninguna fuente declara la forma completa.'
    },

    notaEtiqueta: 'La etiqueta es un nombre reasignable: no identifica nada de forma estable. El digesto es la identidad real de lo que se va a desplegar.',
    notaVerificacion: 'Explorar no es verificar. El digesto que se ve acá no es necesariamente el digesto con el que se despliega: entre elegir y confirmar puede haber pasado cualquier cosa. La verificación del origen del alta corre igual al volver, y es la que devuelve el digesto con el que el despliegue va a trabajar.',

    /* Tres desenlaces distintos y ninguno es «cerrar» — §3.3.
       El etiquetado de la acción cambia con el desenlace: un botón único
       cuyo efecto depende de dónde se abrió es el defecto que SUP-17 evita
       al separar «guardar como borrador» de «dejar pendiente de aplicar». */
    desenlaces: {
      'imagen-publica': {
        origen: 'SUP-17 · paso del origen, vía de imagen de registro público',
        accion: 'Usar esta imagen en el alta',
        produce: 'Devuelve registro, imagen y etiqueta al bloque de origen, que resuelve a la variante imagen-publica.',
        queda: 'El paso del origen queda completo y SIN VERIFICAR. La acción de verificar el origen queda habilitada, y la de dejar pendiente de aplicar sigue deshabilitada hasta que las dos verificaciones estén en verde.',
        volverA: 'Alta-De-Servicio.html#estado=origen-de-exploracion'
      },
      'imagen-privada': {
        origen: 'SUP-17 · paso del origen, vía de imagen de registro privado',
        accion: 'Usar esta imagen en el alta',
        produce: 'Lo mismo, resolviendo a imagen-privada, con el registro como dirección y la credencial que la consulta ya usó.',
        queda: 'Igual que la anterior. La credencial no se vuelve a pedir: la que autenticó la exploración es la que queda declarada.',
        volverA: 'Alta-De-Servicio.html#estado=origen-de-exploracion'
      },
      'consulta': {
        origen: 'SUP-18 · inventario de imágenes',
        accion: 'Consultar esta referencia',
        produce: 'Presenta la referencia completa con su digesto para consultarla o llevarla a un alta posterior.',
        queda: 'El inventario queda como estaba. No se creó ningún servicio y no se declaró ningún origen. Es el caso FA-05 de CU-39.',
        volverA: 'Imagenes.html'
      }
    },

    /* Las cuatro formas de no encontrar nada — §3.4. Se ven distinto porque
       la acción del administrador es distinta en cada una. */
    sinResultados: {
      clase: 'resultado',
      titulo: 'La consulta no devolvió coincidencias',
      texto: 'Se consultó el registro «registro-publico-de-referencia» con el criterio escrito y no hay coincidencias. Es un resultado, no un error.',
      acciones: ['Cambiar el criterio', 'Cambiar de registro']
    },
    consultaImposible: {
      clase: 'indeterminado',
      titulo: 'No se pudo consultar el registro',
      texto: 'El registro no respondió. El resultado es indeterminado: no hay ningún dato que corregir y ningún campo queda marcado.',
      accion: 'Reintentar',
      notaMaqueta: 'El límite de espera tras el cual el resultado pasa a indeterminado no lo declara ninguna fuente para esta superficie. El wireframe §7 declara el criterio y no el número.'
    },
    credencialRechazada: {
      clase: 'fallido',
      titulo: 'El registro rechazó la identidad declarada',
      texto: 'La credencial del registro privado no fue aceptada. El valor de la credencial no aparece en este mensaje y no se devuelve nunca (RN-15).',
      accion: 'Corregir la credencial del registro'
    },
    enumeracionNoAdmitida: {
      titulo: 'Este registro no admite enumerar lo que publica',
      texto: 'Sólo responde consultas por nombre exacto. La exploración queda acotada y la limitación se declara en lugar de presentar una lista vacía, que se leería como «no hay nada».',
      accion: 'Buscar por nombre exacto'
    },
    imagenSinEtiquetas: {
      titulo: 'El registro no devolvió ninguna etiqueta para esta imagen',
      texto: 'No es un error del administrador y la superficie no lo presenta como tal. Se puede volver a los resultados y elegir otra.'
    },

    /* Estado vacío sin ningún registro configurado. La acción de salida
       queda como ARISTA DECLARADA SIN DESTINO: a qué superficie lleva no lo
       declara ninguna fuente, y elegirlo sería decidir por el agente humano. */
    sinRegistroConfigurado: {
      titulo: 'No hay ningún registro de imágenes configurado',
      texto: 'Sin uno, no hay nada que explorar.',
      accion: 'Configurar un registro',
      destinoSinDeclarar: 'A qué superficie lleva esta acción no lo declara ninguna fuente. Si el conjunto de registros es configuración de la instalación, su superficie es SUP-12; si es del proyecto SelfHosted, es una superficie del proyecto. La maqueta deja la arista declarada y sin destino en lugar de elegir. Brecha B-UX-29.',
      viasAlternativas: [
        { etiqueta: 'Repositorio remoto', via: 'repositorio' },
        { etiqueta: 'Archivo de construcción en línea', via: 'dockerfile' }
      ],
      notaAlternativas: 'Las dos vías de alta que no dependen de ningún registro.'
    },

    sinCriterio: {
      titulo: 'Elegí un registro y buscá lo que publica',
      texto: 'Es un estado de invitación y no una anomalía: todavía no se buscó ni se recorrió nada.'
    },

    cancelar: 'Cancelar no pierde nada. Lo que ya declaraste en el alta no se toca: el servicio sigue en borrador y el paso del origen queda como estaba.',

    porQueNoEsAsistente: [
      ['No hay estado parcial que preservar', 'Un asistente existe para que un acto largo no se pierda a la mitad. Acá no se escribe nada: la exploración es de sólo lectura.'],
      ['El primer paso no se completa una vez', 'El registro se cambia tantas veces como haga falta, y un asistente lo trataría como un paso ya superado.'],
      ['Los tres momentos no son simétricos', 'Un control persistente, una búsqueda iterativa y una elección con evidencia. Un contador de «paso X de 3» afirmaría una progresión lineal que el recorrido real no tiene.']
    ],

    noEscribe: 'La exploración es de sólo lectura: no crea servicios, no copia el catálogo remoto al registro del sistema y no produce evento de auditoría por sí misma. El evento lo produce el alta que consume el resultado, cuando escribe (RN-17).',

    brecha: 'B-UX-29'
  };

  /* ─────────────────────────────────────────────────────────────────────
     7. Contrato de campos que la maqueta exhibe
        (nombre, tipo, ejemplo, entidad de origen) — Maqueta-Rules §4.2
     ───────────────────────────────────────────────────────────────────── */

  var CONTRATO_CAMPOS = [
    { campo: 'proyecto.nombre', tipo: 'texto', ejemplo: 'Portal Interno', entidad: 'Proyecto SelfHosted', anexo: 'E-1' },
    { campo: 'proyecto.slug', tipo: 'texto', ejemplo: 'portal-interno', entidad: 'Proyecto SelfHosted', anexo: 'E-1' },
    { campo: 'proyecto.estado', tipo: 'enumerado', ejemplo: 'parcialmente-activo', entidad: 'Proyecto SelfHosted (derivado de los despliegues)', anexo: 'E-1, E-3' },
    { campo: 'proyecto.red.modo', tipo: 'enumerado', ejemplo: 'bridge', entidad: 'Red del proyecto', anexo: 'E-1' },
    { campo: 'proyecto.red.subred', tipo: 'texto', ejemplo: '172.20.0.0/24', entidad: 'Red del proyecto', anexo: 'E-1' },
    { campo: 'proyecto.cambiosPendientes', tipo: 'entero', ejemplo: '5', entidad: 'Changeset', anexo: 'E-1, E-5' },
    { campo: 'servicio.nombre', tipo: 'texto', ejemplo: 'api', entidad: 'Servicio', anexo: 'E-2' },
    { campo: 'servicio.origen.tipo', tipo: 'variante discriminada', ejemplo: 'imagen-publica · imagen-privada · repositorio · dockerfile · ninguno', entidad: 'Origen del servicio', anexo: 'E-2 §20.2.3' },
    { campo: 'servicio.origen.imagen', tipo: 'texto', ejemplo: 'registro-privado/portal-api', entidad: 'Origen del servicio', anexo: 'E-2' },
    { campo: 'servicio.origen.etiqueta', tipo: 'texto', ejemplo: '1.4.2', entidad: 'Origen del servicio', anexo: 'E-2' },
    { campo: 'servicio.origen.politicaActualizacion', tipo: 'enumerado', ejemplo: 'fijada · flotante', entidad: 'Origen del servicio', anexo: 'E-2 y E-21' },
    { campo: 'servicio.origen.proveedor', tipo: 'enumerado', ejemplo: 'github', entidad: 'Origen por repositorio', anexo: 'E-2 · conjunto admitido sin declarar' },
    { campo: 'servicio.origen.url', tipo: 'texto', ejemplo: 'https://github.com/usuario/portal-api', entidad: 'Origen por repositorio', anexo: 'E-2' },
    { campo: 'servicio.origen.rama', tipo: 'texto', ejemplo: 'main', entidad: 'Origen por repositorio', anexo: 'E-2 · exigida por RN-08' },
    { campo: 'servicio.origen.rutaDockerfile', tipo: 'texto', ejemplo: 'src/Api/Dockerfile · /srv/proyectos/portal/Dockerfile', entidad: 'Origen por repositorio y por archivo local', anexo: 'E-2 · exigida por RN-08' },
    { campo: 'servicio.origen.contextoBuild', tipo: 'texto', ejemplo: '. · /srv/proyectos/portal', entidad: 'Origen por repositorio y por archivo local', anexo: 'E-2' },
    { campo: 'servicio.origen.argumentosBuild', tipo: 'mapa de texto', ejemplo: 'CONFIGURATION=Release', entidad: 'Origen por repositorio y por archivo local', anexo: 'E-2' },
    { campo: 'servicio.origen.reconstruirEnDespliegue', tipo: 'booleano', ejemplo: 'true', entidad: 'Origen por repositorio y por archivo local', anexo: 'E-2' },
    { campo: 'servicio.origen.registro', tipo: 'seleccion', ejemplo: 'registro-publico-de-referencia', entidad: 'Registro del origen por imagen pública', anexo: 'E-2 §20.2.4' },
    { campo: 'servicio.origen.registroUrl', tipo: 'texto', ejemplo: 'registry.interno.lan', entidad: 'Registro del origen por imagen privada', anexo: 'E-2 §20.2' },
    { campo: 'servicio.origen.contenido', tipo: 'texto multilinea', ejemplo: 'FROM nginx:1.25-alpine …', entidad: 'Origen por archivo de construcción en línea', anexo: 'E-2 §20.2.4, servicio 403' },
    { campo: 'servicio.origen.modificadoEn', tipo: 'fecha', ejemplo: '2026-07-29T16:40:00-03:00', entidad: 'Origen por archivo de construcción en línea', anexo: 'E-2 §20.2.4' },
    { campo: 'servicio.estado', tipo: 'enumerado', ejemplo: 'borrador · pendiente-de-aplicar · aplicado', entidad: 'Servicio, ortogonal al estado del despliegue', anexo: 'E-2 §20.2.1' },
    { campo: 'servicio.comando', tipo: 'texto | nulo', ejemplo: 'dotnet Informes.dll --migrar-y-arrancar · null hereda el de la imagen', entidad: 'Servicio', anexo: 'E-2 §20.2.2 y §20.2.4' },
    { campo: 'servicio.procedencia.via', tipo: 'enumerado | nulo', ejemplo: 'adopcion · catalogo · null', entidad: 'Huella de auditoría de la vía de alta, no configuración', anexo: 'E-2 §20.2.1 y §20.2.4' },
    { campo: 'servicio.procedencia.versionContenido', tipo: 'entero', ejemplo: '4', entidad: 'Procedencia de catálogo, vínculo débil D-14', anexo: 'E-2 §20.2.4, servicio 405' },
    { campo: 'servicio.verificaciones.origen.estado', tipo: 'enumerado', ejemplo: 'verificado · fallido · indeterminado · sin-verificar', entidad: 'Verificación del origen', anexo: 'E-2 §20.2.5' },
    { campo: 'servicio.verificaciones.configuracion.estado', tipo: 'enumerado', ejemplo: 'validado · con-hallazgos · sin-validar', entidad: 'Validación de la configuración', anexo: 'E-2 §20.2.5' },
    { campo: 'informeOrigen.alcance', tipo: 'texto', ejemplo: 'Consultado el registro de imágenes público con identidad anónima. No se verificaron procesos del host.', entidad: 'Informe de verificación del origen', anexo: 'E-2 §20.2.5' },
    { campo: 'informeOrigen.clase', tipo: 'enumerado | nulo', ejemplo: 'dato-incorrecto · consulta-imposible', entidad: 'Informe de verificación del origen', anexo: 'E-2 §20.2.5, criterio V-2' },
    { campo: 'informeConfiguracion.comprobaciones[].nivel', tipo: 'enumerado | nulo', ejemplo: 'bloqueante', entidad: 'Informe de validación de la configuración', anexo: 'E-2 §20.2.5, RN-38' },
    { campo: 'despliegue.imagen.digesto', tipo: 'texto | nulo', ejemplo: 'CONTRADICTORIO · E-3 declara sha256:a1b2c3... para el despliegue 5471 del servicio 101 y E-23 declara sha256:3f7a… para el 5480 del mismo servicio y la misma imagen · null si el despliegue es anterior a Q-15', entidad: 'Despliegue', anexo: 'E-3 §20.3 (campo digestImagen) contra E-23 §20.23 (campo imagen.digesto); Q-15 decidida el 2026-07-30' },
    { campo: 'candidato.puertosPublicados', tipo: 'lista de objetos', ejemplo: '[{host: 8188, contenedor: 8188}] · lista vacía en macvlan, que es dato y no ausencia de dato', entidad: 'Candidato del descubrimiento', anexo: 'E-19, E-20 C-5' },
    { campo: 'cambio.clase', tipo: 'enumerado', ejemplo: 'sin-recrear · recreando · identidad · cosmetico', entidad: 'Cambio del changeset', anexo: 'Derivado de SUP-07 §3.4; E-5 declara cuatro cambios y sólo dos clases' },
    { campo: 'cambio.recreaContenedor', tipo: 'booleano', ejemplo: 'true', entidad: 'Cambio del changeset', anexo: 'Derivado de SUP-07 §3.4' },
    { campo: 'itemCatalogo.parametros[].tipo', tipo: 'enumerado cerrado', ejemplo: 'texto · secreto · imagen · volumen', entidad: 'Parámetro del ítem', anexo: 'E-6 §20.6.1' },
    { campo: 'informeDeGuardado.valoresDescartados', tipo: 'entero', ejemplo: '1', entidad: 'Guardar como plantilla', anexo: 'E-6 §20.6.2' },
    { campo: 'exportacionCatalogo.itemsConMaterialSensible', tipo: 'entero', ejemplo: '0 si la conversión de secretos funcionó', entidad: 'Envoltorio de exportación del catálogo', anexo: 'E-6 §20.6.4' },
    { campo: 'servicio.origen.credencialId', tipo: 'entero | nulo', ejemplo: '3 · sin nombre visible declarado', entidad: 'Credencial de registro o de repositorio', anexo: 'E-2 · sin superficie declarada, ver ambigüedad' },
    { campo: 'servicio.red.ipFija', tipo: 'texto | nulo', ejemplo: '192.168.1.139 · null en bridge', entidad: 'Red del servicio', anexo: 'E-2' },
    { campo: 'servicio.politicaReinicio', tipo: 'enumerado', ejemplo: 'unless-stopped', entidad: 'Servicio', anexo: 'E-2' },
    { campo: 'servicio.replicas', tipo: 'entero', ejemplo: '2', entidad: 'Servicio', anexo: 'E-2' },
    { campo: 'servicio.recursos.limiteMemoriaMb', tipo: 'entero', ejemplo: '512', entidad: 'Recursos del servicio', anexo: 'E-2' },
    { campo: 'servicio.dispositivos[].host', tipo: 'texto', ejemplo: '/dev/serial/by-id/usb-FTDI-if00-port0', entidad: 'Dispositivo del servicio', anexo: 'E-2, E-20 C-3' },
    { campo: 'variable.clave', tipo: 'texto', ejemplo: 'ConnectionStrings__Default', entidad: 'Variable del servicio', anexo: 'E-2' },
    { campo: 'variable.valor', tipo: 'texto | nulo', ejemplo: 'Host=db;Port=5432;Database=portal · null si es secreta', entidad: 'Variable del servicio', anexo: 'E-2' },
    { campo: 'variable.referencia', tipo: 'texto | nulo', ejemplo: '${{ db.SELFHOSTED_HOST }}', entidad: 'Variable del servicio', anexo: 'E-2, E-4' },
    { campo: 'variable.secreta', tipo: 'booleano', ejemplo: 'true', entidad: 'Variable del servicio', anexo: 'E-2' },
    { campo: 'variableCompartida.clave', tipo: 'texto', ejemplo: 'DB_PASSWORD', entidad: 'Variable compartida del proyecto', anexo: 'E-1' },
    { campo: 'variableCompartida.usadaPor', tipo: 'entero', ejemplo: '2', entidad: 'Derivado del campo referenciadaPor', anexo: 'E-5' },
    { campo: 'arista.esperaDestino', tipo: 'booleano', ejemplo: 'true', entidad: 'Enlace del lienzo', anexo: 'E-1, E-4' },
    { campo: 'arista.puertoDestino', tipo: 'entero | nulo', ejemplo: '5432', entidad: 'Enlace del lienzo', anexo: 'E-1, E-4' },
    { campo: 'despliegue.estado', tipo: 'enumerado', ejemplo: 'activo · fallido', entidad: 'Despliegue', anexo: 'E-3, E-17' },
    { campo: 'despliegue.eventos[].detalle', tipo: 'texto', ejemplo: 'La imagen no existe en el registro', entidad: 'Línea de tiempo del despliegue', anexo: 'E-3' },
    { campo: 'despliegue.metricas.cpuPorcentaje', tipo: 'decimal', ejemplo: '3.4', entidad: 'Métricas del despliegue', anexo: 'E-3' },
    { campo: 'despliegue.metricas.memoriaUsadaMb', tipo: 'entero', ejemplo: '186 sobre 512', entidad: 'Métricas del despliegue', anexo: 'E-3' },
    { campo: 'cambio.resumen', tipo: 'texto', ejemplo: 'api · REDIS_URL: (sin valor) → cache:6379', entidad: 'Cambio del changeset', anexo: 'E-5' },
    { campo: 'cambio.requiereRedespliegueDe', tipo: 'lista de texto', ejemplo: '["api"]', entidad: 'Cambio del changeset', anexo: 'E-5' },
    { campo: 'impacto.serviciosSinImpacto', tipo: 'lista de texto', ejemplo: '["db"]', entidad: 'Informe de impacto', anexo: 'E-5' },
    { campo: 'candidato.motivoNoAdoptable', tipo: 'texto | nulo', ejemplo: 'monta-el-socket-de-docker', entidad: 'Candidato del descubrimiento', anexo: 'E-7' },
    { campo: 'candidato.yaAdoptadoPor', tipo: 'texto | nulo', ejemplo: 'Impresion 3D', entidad: 'Candidato del descubrimiento', anexo: 'E-7' },
    { campo: 'clasificacion.sugeridaSecreta', tipo: 'booleano', ejemplo: 'false para ClaveMaestra', entidad: 'Paso de clasificación', anexo: 'E-11' },
    { campo: 'clasificacion.marcadaSecreta', tipo: 'booleano', ejemplo: 'true para ClaveMaestra', entidad: 'Paso de clasificación', anexo: 'E-11' },
    { campo: 'rangoGestionado.subred', tipo: 'texto', ejemplo: '192.168.1.128/26', entidad: 'Rango gestionado', anexo: 'E-8' },
    { campo: 'rangoGestionado.excluidas', tipo: 'lista de texto', ejemplo: '["192.168.1.129"]', entidad: 'Rango gestionado', anexo: 'E-8' },
    { campo: 'conflicto.ocupadaPor', tipo: 'objeto', ejemplo: 'print-server de Impresion 3D, activo', entidad: 'Informe de conflicto', anexo: 'E-8' },
    { campo: 'credencial.prefijo', tipo: 'texto', ejemplo: 'tk_7f3c9a12', entidad: 'Credencial de máquina', anexo: 'E-12' },
    { campo: 'credencial.ambitos', tipo: 'lista de texto', ejemplo: '["proyectos:leer", "despliegues:ejecutar"]', entidad: 'Credencial de máquina', anexo: 'E-12' },
    { campo: 'itemCatalogo.servicios', tipo: 'entero', ejemplo: '2 en el ítem multi-servicio', entidad: 'Ítem del catálogo', anexo: 'E-6' },
    { campo: 'itemCatalogo.parametros[].porDefecto', tipo: 'texto | nulo', ejemplo: 'app', entidad: 'Parámetro del ítem', anexo: 'E-6' },
    { campo: 'servidor.ram', tipo: 'decimal sobre decimal', ejemplo: '16.2 / 32 GB', entidad: 'Estado del servidor', anexo: 'E-18' },
    { campo: 'identidadVersion.versionLegible', tipo: 'texto | nulo', ejemplo: '0.4.0 · null si el origen es indeterminado', entidad: 'Contrato de identidad de versión', anexo: 'sin declarar: brecha B-UX-07' },

    /* Campos de la imagen — E-23, Modelo-Conceptual §1.16 y §2 */
    { campo: 'imagen.digesto', tipo: 'texto | nulo', ejemplo: 'Tres literales en todo el corpus, los tres abreviados en su propio anexo: sha256:9b1e… (redis 7.2-alpine, E-2 §20.2.5), sha256:a1b2c3... y sha256:3f7a… (los dos para portal-api:1.4.2, y se contradicen). Null cuando ninguna fuente lo declara', entidad: 'Imagen', anexo: 'E-2 §20.2.5, E-3 §20.3 y E-23 §20.23; ninguno declara la forma completa' },
    { campo: 'imagen.referencia', tipo: 'texto', ejemplo: 'registry.interno.lan/registro-privado/portal-api:1.4.2', entidad: 'Imagen', anexo: 'E-23' },
    { campo: 'imagen.etiqueta', tipo: 'texto', ejemplo: '1.4.2 · latest cuando es flotante · ausente en imagen-comunidad/windows', entidad: 'Imagen', anexo: 'E-23, E-19, E-20 C-1 y C-4' },
    { campo: 'imagen.origenDeLaImagen', tipo: 'enumerado', ejemplo: 'descargada · construida-por-el-panel · construida-por-el-ejecutor · ajena', entidad: 'Imagen', anexo: 'E-23' },
    { campo: 'imagen.pertenencia.gestionadaPorElPanel', tipo: 'booleano', ejemplo: 'true · su determinación para las imágenes construidas sigue abierta (Q-16)', entidad: 'Imagen', anexo: 'E-23' },
    { campo: 'imagen.conservada', tipo: 'booleano', ejemplo: 'false · quién puede ponerla y con qué alcance sigue abierto (Q-21)', entidad: 'Imagen', anexo: 'E-23, RN-40' },
    { campo: 'imagen.tamanoMb', tipo: 'entero | nulo', ejemplo: '214 · es el único tamaño de imagen que declara todo el corpus', entidad: 'Imagen', anexo: 'E-23' },
    { campo: 'imagen.creadaEn', tipo: 'fecha | nulo', ejemplo: '2026-07-26T09:00:00-03:00 · única fecha de creación de imagen declarada', entidad: 'Imagen', anexo: 'E-23' },
    { campo: 'imagen.desplieguesQueLaReferencian', tipo: 'lista de entero', ejemplo: '[5472, 5480] · E-3 asigna el 5472 a otro servicio, discrepancia devuelta', entidad: 'Imagen', anexo: 'E-23' },
    { campo: 'despliegue.imagen.referencia', tipo: 'texto', ejemplo: 'registry.interno.lan/registro-privado/portal-api:1.4.2', entidad: 'Bloque imagen del despliegue', anexo: 'E-23; Q-15 decidida el 2026-07-30' },
    { campo: 'imagen.uso.lectura', tipo: 'enumerado', ejemplo: 'en-uso · solo-historial · sin-referencia · no-atribuible', entidad: 'Indicador de uso, derivado por digesto', anexo: 'SUP-18 §3.4 · derivado de E-23, no declarado como campo' },
    { campo: 'almacen.imagenes', tipo: 'entero', ejemplo: '18 · es el único conteo de imágenes de todo el corpus', entidad: 'Estado del servidor', anexo: 'E-18' },
    { campo: 'almacen.ocupacionGb', tipo: 'decimal | nulo', ejemplo: 'sin declarar · los 115/884 GB de E-18 son el disco raíz del host, no el almacén', entidad: 'Estado del almacén de imágenes', anexo: 'sin declarar por ninguna fuente' },
    { campo: 'umbral.espacioRecuperableMinimo', tipo: 'descriptor sin valor', ejemplo: 'sin valor por defecto ni límites declarados', entidad: 'Descriptor de configuración del sistema', anexo: 'brecha B-UX-28' },
    { campo: 'umbral.ocupacionAlmacenSugerencia', tipo: 'descriptor sin valor', ejemplo: 'sin valor por defecto ni límites declarados', entidad: 'Descriptor de configuración del sistema', anexo: 'brecha B-UX-28' },

    /* Campos de la exploración de registro — CU-39 no declara ninguno */
    { campo: 'registroExplorable.nombre', tipo: 'texto', ejemplo: 'registro-publico-de-referencia · registry.interno.lan', entidad: 'Registro de imágenes explorable', anexo: 'E-2 §20.2 y §20.2.4 · en contexto de origen del servicio, no de exploración' },
    { campo: 'registroExplorable.credencial', tipo: 'texto | nulo', ejemplo: 'sin nombre declarado · E-2 sólo declara credencialRegistroId: 3', entidad: 'Registro de imágenes explorable', anexo: 'sin declarar por ninguna fuente' },
    { campo: 'resultadoExploracion.referenciaLegible', tipo: 'texto', ejemplo: 'registro-publico-de-referencia/imagen-oficial/redis', entidad: 'Resultado de la exploración', anexo: 'derivado de E-2; CU-39 no declara ningún resultado de ejemplo' },
    { campo: 'etiquetaExploracion.digesto', tipo: 'texto | nulo', ejemplo: 'sha256:9b1e… para 7.2-alpine · null para las demás', entidad: 'Etiqueta devuelta por la exploración', anexo: 'E-2 §20.2.5' },
    { campo: 'etiquetaExploracion.publicadaEn', tipo: 'fecha | nulo', ejemplo: 'sin declarar · ninguna fuente emite el momento de publicación de ninguna etiqueta', entidad: 'Etiqueta devuelta por la exploración', anexo: 'sin declarar por ninguna fuente' }
  ];

  /* ─────────────────────────────────────────────────────────────────────
     8. Superficies y sus estados demostrables.
        Cada lista de estados es exactamente la tabla §5 del wireframe de
        esa superficie, sin las filas marcadas «no aplica».
     ───────────────────────────────────────────────────────────────────── */

  var SUPERFICIES = [
    {
      id: 'SUP-01', nombre: 'Aprovisionamiento inicial', archivo: 'Aprovisionamiento-Inicial.html',
      shell: 'acceso', cu: ['CU-29'], wireframe: 'Wireframes-Aprovisionamiento-Inicial.md',
      proposito: 'Crear la identidad del administrador único en una instancia recién desplegada.',
      estados: [
        { id: 'cargando', etiqueta: 'Cargando · resolviendo el destino' },
        { id: 'con-datos', etiqueta: 'Con datos · sin aprovisionar', predeterminado: true },
        { id: 'enviando', etiqueta: 'Enviando' },
        { id: 'requisito-no-cumplido', etiqueta: 'Error · requisito no cumplido' },
        { id: 'confirmacion-no-coincidente', etiqueta: 'Error · confirmación no coincidente' },
        { id: 'dato-obligatorio-ausente', etiqueta: 'Error · dato obligatorio ausente' },
        { id: 'formulario-vencido', etiqueta: 'Error · formulario vencido' },
        { id: 'envio-fuera-de-tiempo', etiqueta: 'Envío fuera de tiempo · redirección neutra' },
        { id: 'exito', etiqueta: 'Éxito · se resuelve en la superficie siguiente' }
      ]
    },
    {
      id: 'SUP-02', nombre: 'Acceso al panel', archivo: 'Acceso-Al-Panel.html',
      shell: 'acceso', cu: ['CU-30'], wireframe: 'Wireframes-Acceso-Al-Panel.md',
      proposito: 'Abrir la sesión del administrador único. Primera ubicación obligatoria del sello de versión.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos · listo para ingresar', predeterminado: true },
        { id: 'enviando', etiqueta: 'Cargando · enviando el intento' },
        { id: 'credencial-rechazada', etiqueta: 'Error · credenciales rechazadas' },
        { id: 'acceso-restringido', etiqueta: 'Error · acceso restringido temporalmente' },
        { id: 'formulario-vencido', etiqueta: 'Error · formulario vencido' },
        { id: 'identidad-creada', etiqueta: 'Confirmación · identidad recién creada' },
        { id: 'secreto-actualizado', etiqueta: 'Confirmación · secreto actualizado' },
        { id: 'sesion-vencida', etiqueta: 'Error · sesión vencida' },
        { id: 'sello-publicada', etiqueta: 'Sello · versión publicada' },
        { id: 'sello-preliminar', etiqueta: 'Sello · artefacto preliminar' },
        { id: 'sello-indeterminado', etiqueta: 'Sello · origen indeterminado' }
      ]
    },
    {
      id: 'SUP-03', nombre: 'Cambio de contraseña', archivo: 'Cambio-De-Contrasena.html',
      shell: 'trabajo', cu: ['CU-31'], wireframe: 'Wireframes-Cambio-De-Contrasena.md',
      proposito: 'Reemplazar la contraseña exigiendo la actual, declarando qué pasa con la sesión.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'enviando', etiqueta: 'Enviando' },
        { id: 'secreto-actual-incorrecto', etiqueta: 'Error · contraseña actual incorrecta' },
        { id: 'requisito-no-cumplido', etiqueta: 'Error · requisito no cumplido' },
        { id: 'confirmacion-no-coincidente', etiqueta: 'Error · confirmación no coincidente' },
        { id: 'formulario-vencido', etiqueta: 'Error · formulario vencido' },
        { id: 'sesion-vencida', etiqueta: 'Sesión vencida durante la edición' },
        { id: 'exito', etiqueta: 'Éxito · se resuelve en la superficie siguiente' }
      ]
    },
    {
      id: 'SUP-04', nombre: 'Listado de proyectos', archivo: 'Listado-De-Proyectos.html',
      shell: 'trabajo', cu: ['CU-01', 'CU-02', 'CU-11'], wireframe: 'Wireframes-Listado-De-Proyectos.md',
      proposito: 'Portada del shell de trabajo: estado agregado de los proyectos y su alta, renombrado y eliminación.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'vacio-primer-uso', etiqueta: 'Vacío · primer uso, con orientación posterior' },
        { id: 'vacio-por-filtro', etiqueta: 'Vacío por filtro' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'proyecto-activo', etiqueta: 'Proyecto activo' },
        { id: 'proyecto-parcial', etiqueta: 'Proyecto parcialmente activo' },
        { id: 'proyecto-detenido', etiqueta: 'Proyecto detenido' },
        { id: 'error', etiqueta: 'Error' },
        { id: 'exito-accion', etiqueta: 'Éxito de una acción' },
        { id: 'confirmacion-entrante', etiqueta: 'Confirmación entrante · IDENTIDAD-CREADA' },
        { id: 'identificador-en-uso', etiqueta: 'Error · identificador legible en uso' }
      ]
    },
    {
      id: 'SUP-05', nombre: 'Lienzo del proyecto', archivo: 'Lienzo-Del-Proyecto.html',
      shell: 'trabajo', cu: ['CU-03', 'CU-04', 'CU-05', 'CU-13', 'CU-15', 'CU-16', 'CU-18', 'CU-22', 'CU-28'],
      wireframe: 'Wireframes-Lienzo-Del-Proyecto.md 2.0',
      proposito: 'Vista por defecto del proyecto: leer, editar, arrancar y detener la arquitectura completa.',
      estadosDeclarados: 16, estadosDemostrables: 15,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'menu-vias', etiqueta: 'Menú de las siete vías de alta (§3.1) — suplementario' },
        { id: 'nodo-borrador', etiqueta: 'Nodo borrador (§3.3) — suplementario' },
        { id: 'instanciacion-plantilla', etiqueta: 'Instanciación de plantilla · N nodos (§3.2) — suplementario' },
        { id: 'vacio', etiqueta: 'Vacío · sin servicios declarados' },
        { id: 'cargando', etiqueta: 'Cargando · reconciliando contra el motor' },
        { id: 'sin-cambios-pendientes', etiqueta: 'Sin cambios pendientes · el banner no se muestra' },
        { id: 'con-cambios-pendientes', etiqueta: 'Con cambios pendientes' },
        { id: 'nodo-pendiente', etiqueta: 'Nodo pendiente de aplicar' },
        { id: 'nodo-huerfano', etiqueta: 'Nodo huérfano' },
        { id: 'proyecto-parcial', etiqueta: 'Proyecto parcialmente activo' },
        { id: 'arranque-bloqueado', etiqueta: 'Arranque bloqueado por conflicto' },
        { id: 'arista-invalida', etiqueta: 'Arista inválida · bloquea el arranque' },
        { id: 'ciclo-rechazado', etiqueta: 'Ciclo de arranque rechazado' },
        { id: 'arista-sin-aporte', etiqueta: 'Arista sin aporte rechazada' },
        { id: 'arista-duplicada', etiqueta: 'Arista de espera duplicada' },
        { id: 'error', etiqueta: 'Error' },
        { id: 'canal-caido', etiqueta: 'Canal caído' }
      ]
    },
    {
      id: 'SUP-06', nombre: 'Panel lateral del servicio', archivo: 'Panel-Lateral-Del-Servicio.html',
      shell: 'trabajo', cu: ['CU-03', 'CU-13', 'CU-15', 'CU-18', 'CU-19', 'CU-35', 'CU-38'],
      wireframe: 'Wireframes-Panel-Lateral-Del-Servicio.md 2.1',
      proposito: 'Configuración del servicio seleccionado, con la garantía de que guardar un cambio no lo despliega.',
      estadosDeclarados: 17, estadosDemostrables: 15,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'origen-imagen-publica', etiqueta: 'Origen en lectura · imagen de registro público (§3.4) — suplementario' },
        { id: 'origen-imagen-privada', etiqueta: 'Origen en lectura · imagen de registro privado (§3.4) — suplementario' },
        { id: 'origen-repositorio', etiqueta: 'Origen en lectura · repositorio remoto (§3.4) — suplementario' },
        { id: 'origen-dockerfile', etiqueta: 'Origen en lectura · archivo de construcción (§3.4) — suplementario' },
        { id: 'origen-ninguno', etiqueta: 'Origen en lectura · sin origen (§3.4) — suplementario' },
        { id: 'digesto-no-registrado', etiqueta: 'Digesto no registrado (§3.5) — suplementario' },
        { id: 'procedencia-plantilla', etiqueta: 'Procedencia de plantilla (§3.6) — suplementario' },
        { id: 'clase-de-cambio', etiqueta: 'Qué cambio recrea el contenedor y qué no (§3.7) — suplementario' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'sin-despliegue', etiqueta: 'Sin despliegue' },
        { id: 'campo-valido', etiqueta: 'Campo válido' },
        { id: 'campo-en-error', etiqueta: 'Campo en error' },
        { id: 'campo-deshabilitado', etiqueta: 'Campo deshabilitado por incompatibilidad' },
        { id: 'ayuda-desplegada', etiqueta: 'Ayuda contextual desplegada' },
        { id: 'avanzadas-expandidas', etiqueta: 'Opciones avanzadas expandidas' },
        { id: 'edicion-sin-guardar', etiqueta: 'Con edición sin guardar' },
        { id: 'cambio-guardado', etiqueta: 'Cambio guardado · quedó pendiente' },
        { id: 'requiere-redespliegue', etiqueta: 'Requiere redespliegue' },
        { id: 'enviando', etiqueta: 'Enviando' },
        { id: 'error-dominio', etiqueta: 'Error de dominio' },
        { id: 'error-referencia', etiqueta: 'Error de referencia' },
        { id: 'despliegue-fallido', etiqueta: 'Despliegue fallido · con su causa' }
      ]
    },
    {
      id: 'SUP-07', nombre: 'Cajón de cambios pendientes', archivo: 'Cajon-De-Cambios-Pendientes.html',
      shell: 'trabajo', cu: ['CU-22', 'CU-23', 'CU-24', 'CU-25'],
      wireframe: 'Wireframes-Cajon-De-Cambios-Pendientes.md 2.0',
      proposito: 'Revisar los cambios acumulados con la consecuencia delante y aplicar el lote.',
      estadosDeclarados: 16, estadosDemostrables: 15,
      estados: [
        { id: 'con-datos-lista', etiqueta: 'Con datos · lista de cambios (vista 1)', predeterminado: true },
        { id: 'cambio-que-recrea', etiqueta: 'Cambio que recrea el contenedor (§3.4) — suplementario' },
        { id: 'borrador-ausente', etiqueta: 'El servicio en borrador no aparece acá (§3.5) — suplementario' },
        { id: 'vacio', etiqueta: 'Vacío · el cajón no se abre' },
        { id: 'cargando', etiqueta: 'Cargando · calculando el informe' },
        { id: 'cambio-entidad-proyecto', etiqueta: 'Cambio de entidad proyecto · referenciada por' },
        { id: 'con-datos-informe', etiqueta: 'Con datos · informe de impacto (vista 2)' },
        { id: 'informe-sin-redespliegues', etiqueta: 'Informe sin servicios a redesplegar' },
        { id: 'informe-con-conflictos', etiqueta: 'Informe con conflictos de dirección' },
        { id: 'aplicando', etiqueta: 'Aplicando' },
        { id: 'aplicado-exito', etiqueta: 'Aplicado con éxito' },
        { id: 'aplicado-parcial', etiqueta: 'Aplicado parcialmente' },
        { id: 'canal-caido', etiqueta: 'Canal caído durante la aplicación' },
        { id: 'rechazo-variable-referenciada', etiqueta: 'Rechazo · variable referenciada' },
        { id: 'error-referencia', etiqueta: 'Error de referencia al aplicar' },
        { id: 'error-ambito', etiqueta: 'Error de ámbito insuficiente' },
        { id: 'ranura-asistente', etiqueta: 'Ranura del asistente deshabilitada' }
      ]
    },
    {
      id: 'SUP-08', nombre: 'Registro del contenedor', archivo: 'Registro-Del-Contenedor.html',
      shell: 'trabajo', cu: ['CU-14'], wireframe: 'Wireframes-Registro-Del-Contenedor.md',
      proposito: 'Leer lo que el proceso de adentro del contenedor está diciendo, con seguimiento continuo opcional.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'vacio', etiqueta: 'Vacío · sin líneas todavía' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'seguimiento-activo', etiqueta: 'Seguimiento activo' },
        { id: 'seguimiento-detenido', etiqueta: 'Seguimiento detenido' },
        { id: 'sin-contenedor', etiqueta: 'Sin contenedor vigente' },
        { id: 'motor-inalcanzable', etiqueta: 'Motor inalcanzable' },
        { id: 'flujo-interrumpido', etiqueta: 'Flujo interrumpido' }
      ]
    },
    {
      id: 'SUP-09', nombre: 'Tablero de estado', archivo: 'Tablero-De-Estado.html',
      shell: 'trabajo', cu: ['CU-26', 'CU-27', 'CU-28', 'CU-37'], wireframe: 'Wireframes-Tablero-De-Estado.md 2.1',
      proposito: 'Atribuir el consumo del servidor a un servicio concreto, en tres capas.',
      /* §5 del wireframe 2.1 tiene QUINCE filas, de las cuales «sin permiso»
         declara no aplica: catorce demostrables. El texto del wireframe dice
         «pasa a catorce, trece demostrables», que es una fila menos de las
         que su propia tabla enumera. Se maquetan las catorce y la
         discrepancia se devuelve como hallazgo. */
      estadosDeclarados: 15, estadosDemostrables: 14,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'vacio', etiqueta: 'Vacío · sin proyectos declarados' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'proyecto-parcial', etiqueta: 'Proyecto parcialmente activo' },
        { id: 'servicio-degradado', etiqueta: 'Servicio activo degradado' },
        { id: 'servicio-pausado-finalizado', etiqueta: 'Servicio pausado o finalizado' },
        { id: 'servicio-huerfano', etiqueta: 'Servicio huérfano' },
        { id: 'servicio-sin-despliegue', etiqueta: 'Servicio sin despliegue' },
        { id: 'metricas-no-disponibles', etiqueta: 'Métricas no disponibles' },
        { id: 'lectura-servidor-no-disponible', etiqueta: 'Lectura del servidor no disponible' },
        { id: 'estado-sin-reconciliar', etiqueta: 'Estado sin reconciliar' },
        { id: 'sugerencia-limpieza-vigente', etiqueta: 'Sugerencia de limpieza vigente (§3.2)' },
        { id: 'sin-sugerencia-limpieza', etiqueta: 'Sin sugerencia · la ausencia no se representa (§3.2)' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-10', nombre: 'Descubrimiento e incorporación', archivo: 'Descubrimiento-E-Incorporacion.html',
      shell: 'trabajo', cu: ['CU-06', 'CU-07', 'CU-08'], wireframe: 'Wireframes-Descubrimiento-E-Incorporacion.md 2.0',
      proposito: 'Incorporar contenedores que ya corren, sin recrearlos ni cortar el servicio.',
      estadosDeclarados: 18, estadosDemostrables: 17,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos · paso 1', predeterminado: true },
        { id: 'candidato-con-puertos', etiqueta: 'Candidato que publica puertos (§3.3) — suplementario' },
        { id: 'candidato-sin-puertos', etiqueta: 'Candidato que no publica puertos (§3.3) — suplementario' },
        { id: 'vacio', etiqueta: 'Vacío · sin candidatos' },
        { id: 'cargando', etiqueta: 'Cargando · consultando el motor' },
        { id: 'candidato-incorporable', etiqueta: 'Candidato incorporable' },
        { id: 'candidato-no-incorporable', etiqueta: 'Candidato no incorporable · con motivo' },
        { id: 'candidato-ya-incorporado', etiqueta: 'Candidato ya incorporado' },
        { id: 'vacio-por-filtro', etiqueta: 'Vacío por filtro' },
        { id: 'motor-inalcanzable', etiqueta: 'Motor inalcanzable' },
        { id: 'clasificacion-pendiente', etiqueta: 'Clasificación pendiente · paso 2' },
        { id: 'variable-con-sugerencia', etiqueta: 'Variable con sugerencia' },
        { id: 'variable-sin-sugerencia', etiqueta: 'Variable sin sugerencia' },
        { id: 'variable-marcada', etiqueta: 'Variable marcada por el administrador' },
        { id: 'incorporando', etiqueta: 'Incorporando' },
        { id: 'incorporado', etiqueta: 'Incorporado · nodo activo sin corte' },
        { id: 'rechazo-clasificacion-ausente', etiqueta: 'Rechazo · clasificación ausente' },
        { id: 'rechazo-nombre', etiqueta: 'Rechazo por nombre' },
        { id: 'rechazo-pertenencia', etiqueta: 'Rechazo por pertenencia' }
      ]
    },
    {
      id: 'SUP-11', nombre: 'Catálogo de plantillas', archivo: 'Catalogo-De-Plantillas.html',
      shell: 'trabajo', cu: ['CU-16', 'CU-17', 'CU-36'], wireframe: 'Wireframes-Catalogo-De-Plantillas.md 2.1',
      proposito: 'Convertir en activo reutilizable algo ya resuelto, e instanciarlo con sus parámetros.',
      estadosDeclarados: 24, estadosDemostrables: 23,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'secretos-convertidos', etiqueta: 'Secretos convertidos al guardar como plantilla' },
        { id: 'parametro-secreto-editor', etiqueta: 'Parámetro de tipo secreto en el editor' },
        { id: 'rechazo-defecto-sobre-secreto', etiqueta: 'Rechazo por valor por defecto sobre secreto' },
        { id: 'rechazo-tipo-parametro', etiqueta: 'Rechazo por tipo de parámetro' },
        { id: 'identificador-existente', etiqueta: 'Identificador ya existente al importar' },
        { id: 'exportacion-material-sensible', etiqueta: 'Exportación con material sensible' },
        { id: 'borrado-con-instancias', etiqueta: 'Borrado de un ítem con instancias' },
        { id: 'vacio', etiqueta: 'Vacío · estado inicial de toda instalación nueva' },
        { id: 'vacio-por-filtro', etiqueta: 'Vacío por filtro' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'item-un-servicio', etiqueta: 'Ítem de un solo servicio' },
        { id: 'item-varios-servicios', etiqueta: 'Ítem de varios servicios' },
        { id: 'instanciando', etiqueta: 'Instanciando' },
        { id: 'nombre-sufijado', etiqueta: 'Aviso · nombre sufijado' },
        { id: 'clave-mismo-valor', etiqueta: 'Aviso · clave existente con el mismo valor' },
        { id: 'clave-distinto-valor', etiqueta: 'Aviso · clave existente con distinto valor' },
        { id: 'rechazo-nombre', etiqueta: 'Rechazo por nombre' },
        { id: 'rechazo-referencia', etiqueta: 'Rechazo por referencia inválida' },
        { id: 'rechazo-ciclo', etiqueta: 'Rechazo por ciclo de valor' },
        { id: 'rechazo-formato', etiqueta: 'Rechazo por formato no admitido' },
        { id: 'importacion-con-perdida', etiqueta: 'Importación con pérdida' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-12', nombre: 'Configuración del sistema', archivo: 'Configuracion-Del-Sistema.html',
      shell: 'trabajo', cu: ['CU-12', 'CU-19', 'CU-32', 'CU-37'], wireframe: 'Wireframes-Configuracion-Del-Sistema.md 2.1',
      proposito: 'Rango gestionado, credenciales, respaldo, retención, umbral de la sugerencia de limpieza e identidad de la instancia.',
      /* §5 tiene 22 filas; dos declaran «no aplica» —«sin permiso» y el
         vacío del conjunto—, de modo que quedan 20 demostrables. */
      estadosDeclarados: 22, estadosDemostrables: 20,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'sin-reservas', etiqueta: 'Sin reservas' },
        { id: 'sin-credenciales', etiqueta: 'Sin credenciales' },
        { id: 'campo-valido', etiqueta: 'Campo válido' },
        { id: 'campo-en-error', etiqueta: 'Campo en error' },
        { id: 'direccion-fuera-de-rango', etiqueta: 'Dirección fuera de rango o excluida' },
        { id: 'rango-solapado', etiqueta: 'Rango solapado con el del servidor de direcciones' },
        { id: 'credencial-emitida', etiqueta: 'Credencial recién emitida · vista de un solo uso' },
        { id: 'credencial-revocada', etiqueta: 'Credencial revocada' },
        { id: 'respaldo-vigente', etiqueta: 'Respaldo con exportación vigente' },
        { id: 'respaldo-inalcanzable', etiqueta: 'Respaldo con destino inalcanzable' },
        { id: 'umbral-declarado', etiqueta: 'Umbral de la sugerencia declarado (§3.4)' },
        { id: 'umbral-sin-valor', etiqueta: 'Umbral sin valor por defecto declarado (§3.4)' },
        { id: 'sello-publicada', etiqueta: 'Sello · versión publicada' },
        { id: 'sello-preliminar', etiqueta: 'Sello · artefacto preliminar' },
        { id: 'sello-indeterminado', etiqueta: 'Sello · origen indeterminado' },
        { id: 'diagnostico-expandido', etiqueta: 'Diagnóstico expandido' },
        { id: 'diagnostico-copiado', etiqueta: 'Diagnóstico copiado' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-13', nombre: 'Variables compartidas del proyecto', archivo: 'Variables-Compartidas-Del-Proyecto.html',
      shell: 'trabajo', cu: ['CU-34', 'CU-35', 'CU-36'], wireframe: 'Wireframes-Variables-Compartidas-Del-Proyecto.md',
      proposito: 'Declarar una sola vez un valor que varios servicios usan.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'vacio', etiqueta: 'Vacío' },
        { id: 'vacio-por-filtro', etiqueta: 'Vacío por filtro' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'variable-secreta', etiqueta: 'Variable secreta · valor enmascarado' },
        { id: 'variable-huerfana', etiqueta: 'Variable huérfana · sin uso' },
        { id: 'clave-mismo-valor', etiqueta: 'Clave duplicada con el mismo valor' },
        { id: 'clave-distinto-valor', etiqueta: 'Clave duplicada con distinto valor' },
        { id: 'campo-en-error', etiqueta: 'Campo en error' },
        { id: 'rechazo-referencia', etiqueta: 'Rechazo · variable referenciada' },
        { id: 'rechazo-referencia-en-valor', etiqueta: 'Rechazo · referencia escrita en el valor' },
        { id: 'cambio-guardado', etiqueta: 'Cambio guardado · quedó pendiente' },
        { id: 'con-servicios-marcados', etiqueta: 'Con servicios marcados para redespliegue' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-14', nombre: 'Informe de conflicto de direcciones', archivo: 'Informe-De-Conflicto-De-Direcciones.html',
      shell: 'trabajo', cu: ['CU-18', 'CU-20', 'CU-21', 'CU-24'], wireframe: 'Wireframes-Informe-De-Conflicto-De-Direcciones.md',
      proposito: 'Enterarse antes de romper algo que funciona, y resolverlo sin salir a investigar.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'cargando', etiqueta: 'Cargando · validando' },
        { id: 'conflicto-entre-proyectos', etiqueta: 'Conflicto entre proyectos' },
        { id: 'conflicto-duplicado-interno', etiqueta: 'Conflicto por duplicado interno' },
        { id: 'conflicto-fuera-de-rango', etiqueta: 'Conflicto por dirección fuera de rango' },
        { id: 'sin-resolucion-elegida', etiqueta: 'Sin resolución elegida' },
        { id: 'aplicando', etiqueta: 'Aplicando' },
        { id: 'arranque-procedido', etiqueta: 'Arranque procedido' },
        { id: 'arranque-parcial', etiqueta: 'Arranque parcial' },
        { id: 'sugerencia-caducada', etiqueta: 'Sugerencia caducada' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-15', nombre: 'Exportación e importación', archivo: 'Exportacion-E-Importacion.html',
      shell: 'trabajo', cu: ['CU-09', 'CU-10', 'CU-11', 'CU-12'], wireframe: 'Wireframes-Exportacion-E-Importacion.md',
      proposito: 'Reproducir la arquitectura fuera del servidor y traerla de vuelta sin perder nada en silencio.',
      estados: [
        { id: 'exportacion-seleccion', etiqueta: 'Con datos · selección de exportación', predeterminado: true },
        { id: 'exportacion-cambios-pendientes', etiqueta: 'Exportación con cambios pendientes' },
        { id: 'exportacion-generando', etiqueta: 'Cargando · generando los archivos' },
        { id: 'exportacion-entregada', etiqueta: 'Exportación entregada' },
        { id: 'referencia-no-resoluble', etiqueta: 'Referencia no resoluble al exportar' },
        { id: 'importacion-selector', etiqueta: 'Con datos · selector de archivo' },
        { id: 'importacion-interpretando', etiqueta: 'Cargando · interpretando el archivo' },
        { id: 'informe-sin-perdida', etiqueta: 'Informe sin pérdida' },
        { id: 'informe-con-perdida', etiqueta: 'Informe con pérdida' },
        { id: 'rechazo-nombre', etiqueta: 'Rechazo por nombre' },
        { id: 'rechazo-referencia', etiqueta: 'Rechazo por referencia inválida' },
        { id: 'rechazo-ciclo', etiqueta: 'Rechazo por ciclo de arranque' },
        { id: 'rechazo-formato', etiqueta: 'Rechazo por formato no admitido' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-16', nombre: 'Revisión de higiene', archivo: 'Revision-De-Higiene.html',
      shell: 'trabajo', cu: ['CU-36'], wireframe: 'Wireframes-Revision-De-Higiene.md',
      proposito: 'Inventario de condiciones que el registro acumuló. Ninguna bloquea nada.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
        { id: 'vacio', etiqueta: 'Vacío · sin condiciones detectadas' },
        { id: 'cargando', etiqueta: 'Cargando' },
        { id: 'variable-huerfana', etiqueta: 'Variable compartida huérfana' },
        { id: 'nombre-repetido', etiqueta: 'Nombre repetido en el mismo ámbito' },
        { id: 'clave-mismo-valor', etiqueta: 'Clave existente con el mismo valor' },
        { id: 'clave-distinto-valor', etiqueta: 'Clave existente con distinto valor' },
        { id: 'referencia-sin-uso', etiqueta: 'Referencia sin uso' },
        { id: 'rechazo-eliminar', etiqueta: 'Rechazo al eliminar una variable con referencias' },
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-17', nombre: 'Alta de servicio', archivo: 'Alta-De-Servicio.html',
      shell: 'trabajo', cu: ['CU-03', 'CU-13', 'CU-15', 'CU-16'],
      wireframe: 'Wireframes-Alta-De-Servicio.md 2.1',
      proposito: 'Declarar un servicio completo dentro de un proyecto, empezando por elegir por dónde llegar y no por completar un campo técnico.',
      estadosDeclarados: 19, estadosDemostrables: 18,
      estados: [
        { id: 'eleccion-de-via', etiqueta: 'Elección de vía · las siete tarjetas', predeterminado: true },
        { id: 'tronco-origen-sin-resolver', etiqueta: 'Tronco · origen sin resolver' },
        { id: 'origen-sin-verificar', etiqueta: 'Origen sin verificar' },
        { id: 'origen-de-exploracion', etiqueta: 'Origen traído de la exploración' },
        { id: 'origen-verificado', etiqueta: 'Origen verificado · con su digesto' },
        { id: 'origen-dato-incorrecto', etiqueta: 'Origen fallido por dato incorrecto' },
        { id: 'origen-indeterminado', etiqueta: 'Origen indeterminado por consulta imposible' },
        { id: 'configuracion-sin-validar', etiqueta: 'Configuración sin validar' },
        { id: 'configuracion-validada', etiqueta: 'Configuración validada' },
        { id: 'configuracion-con-hallazgos', etiqueta: 'Configuración con hallazgos bloqueantes' },
        { id: 'colision-de-puerto', etiqueta: 'Colisión de puerto de host' },
        { id: 'campo-ajeno-a-la-variante', etiqueta: 'Rechazo por campo ajeno a la variante' },
        { id: 'borrador-guardado', etiqueta: 'Borrador guardado' },
        { id: 'pendiente-de-aplicar', etiqueta: 'Pendiente de aplicar' },
        { id: 'puertos-deshabilitados', etiqueta: 'Puertos deshabilitados por modo de red' },
        { id: 'via-sin-origen-propio', etiqueta: 'Vía de adopción o de catálogo · origen en lectura' },
        { id: 'servicio-sin-origen-guardado', etiqueta: 'Servicio sin origen guardado' },
        { id: 'error', etiqueta: 'Error · no se pudo cargar ni persistir' },
        /* Estado suplementario: `Maqueta-Rules.md` §4.3 exige cargando como
           mínimo y la tabla §5 del wireframe no lo declara. §7 sí declara que
           las dos verificaciones «pueden tardar» y se muestran como operación
           con progreso: es de ahí que se deriva. */
        { id: 'cargando', etiqueta: 'Cargando · verificación en curso — suplementario' }
      ]
    },
    {
      id: 'SUP-18', nombre: 'Imágenes', archivo: 'Imagenes.html',
      shell: 'trabajo', cu: ['CU-37', 'CU-38'],
      wireframe: 'Wireframes-Imagenes.md 2.1',
      proposito: 'Ver qué imágenes ocupan el servidor, cuáles administra el producto y cuáles no, cuáles están en uso, y liberar espacio sin destruir nada que haga falta.',
      estadosDeclarados: 20, estadosDemostrables: 19,
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos · dos grupos por pertenencia', predeterminado: true },
        { id: 'cargando', etiqueta: 'Cargando · esqueleto de tabla' },
        { id: 'solo-ajenas', etiqueta: 'Sólo imágenes ajenas · normal en instalación nueva' },
        { id: 'almacen-vacio', etiqueta: 'Almacén vacío' },
        { id: 'imagen-en-uso', etiqueta: 'Imagen en uso · sin acción de conservar' },
        { id: 'imagen-solo-historial', etiqueta: 'Imagen sólo en el historial · con acción de conservar' },
        { id: 'imagen-sin-referencia', etiqueta: 'Imagen sin ninguna referencia' },
        { id: 'uso-no-atribuible', etiqueta: 'Uso no atribuible · despliegues sin digesto' },
        { id: 'imagen-conservada', etiqueta: 'Imagen conservada' },
        { id: 'imagen-ajena', etiqueta: 'Imagen ajena · sin acciones' },
        { id: 'etiqueta-repetida', etiqueta: 'Dos imágenes con la misma etiqueta' },
        { id: 'sugerencia-vigente', etiqueta: 'Sugerencia de limpieza vigente' },
        { id: 'sugerencia-descartada', etiqueta: 'Sugerencia descartada' },
        { id: 'propuesta-a-la-vista', etiqueta: 'Propuesta a la vista · nada se borró todavía' },
        { id: 'limpieza-en-curso', etiqueta: 'Limpieza en curso' },
        { id: 'limpieza-con-resultado', etiqueta: 'Limpieza con resultado' },
        { id: 'limpieza-sin-nada', etiqueta: 'Limpieza sin nada que borrar · no es error' },
        { id: 'limpieza-parcial', etiqueta: 'Limpieza parcial' },
        { id: 'motor-inalcanzable', etiqueta: 'Motor inalcanzable' }
      ]
    },
    {
      id: 'SUP-19', nombre: 'Exploración de registro de imágenes', archivo: 'Exploracion-De-Registro-De-Imagenes.html',
      shell: 'trabajo', cu: ['CU-39', 'CU-03'],
      wireframe: 'Wireframes-Exploracion-De-Registro-De-Imagenes.md 1.0',
      proposito: 'Encontrar la imagen a desplegar recorriendo un registro configurado, en lugar de escribir de memoria una dirección que quizá no se conoce.',
      estadosDeclarados: 14, estadosDemostrables: 13,
      estados: [
        { id: 'con-resultados', etiqueta: 'Con resultados', predeterminado: true },
        { id: 'vacio-sin-registro', etiqueta: 'Vacío · ningún registro configurado' },
        { id: 'vacio-sin-criterio', etiqueta: 'Vacío · sin criterio todavía' },
        { id: 'cargando', etiqueta: 'Cargando · consulta al registro en curso' },
        { id: 'sin-resultados', etiqueta: 'Sin resultados · es resultado, no error' },
        { id: 'consulta-imposible', etiqueta: 'Error de alcance · consulta imposible' },
        { id: 'credencial-rechazada', etiqueta: 'Error de credencial · credencial rechazada' },
        { id: 'enumeracion-no-admitida', etiqueta: 'Enumeración no admitida' },
        { id: 'etiquetas-de-la-imagen', etiqueta: 'Etiquetas de la imagen elegida' },
        { id: 'imagen-sin-etiquetas', etiqueta: 'Imagen sin etiquetas resolubles' },
        { id: 'etiqueta-elegida', etiqueta: 'Etiqueta elegida' },
        { id: 'devuelto-al-alta', etiqueta: 'Devuelto al alta · completo y sin verificar' },
        { id: 'consultado-fuera-del-alta', etiqueta: 'Consultado fuera del alta · desenlace de consulta' }
      ]
    }
  ];

  /* ─────────────────────────────────────────────────────────────────────
     9. Propuesta abierta de la maqueta — B-UX-01
     ───────────────────────────────────────────────────────────────────── */

  /* Brecha abierta que SUP-17 exhibe declarada y NO resuelve. La maqueta
     deja el disparador de la exploración con su destino declarado y no
     inventa dónde se configuran los registros. */
  var BRECHA_REGISTROS = {
    brecha: 'B-UX-29',
    titulo: 'Brecha abierta declarada · configuración de los registros explorables',
    texto: 'Dónde se configura el conjunto de registros de imágenes explorables, y si viene alguno de fábrica, no lo declara ninguna fuente. De eso depende que el primer minuto de uso termine en una lista de imágenes o en un estado vacío que pide configurar un registro. Esta maqueta NO la resuelve: exhibe el disparador con su destino declarado y deja la decisión al agente humano del proyecto.',
    restricciones: [
      'Si el conjunto es configuración de la instalación, su superficie es SUP-12; si es del proyecto SelfHosted, es una superficie del proyecto.',
      'La acción del estado vacío tiene que llevar a un lugar que exista, y hoy no se puede declarar cuál es sin elegir por el agente humano.',
      'Explorar no es una octava vía: las vías siguen siendo siete y las variantes de origen, cinco.'
    ],
    nota: 'SUP-19, exploración de registro de imágenes, se construye en la pasada B de esta iteración. El disparador de las vías 3 y 4 ya declara su destino.'
  };

  /* Brecha abierta que SUP-18, SUP-12 y SUP-09 exhiben declarada y NINGUNA
     resuelve. La maqueta dibuja la forma completa del umbral y de la banda,
     y deja las ranuras numéricas declaradas. */
  var BRECHA_UMBRAL = {
    brecha: 'B-UX-28',
    titulo: 'Brecha abierta declarada · los valores del umbral de la sugerencia de limpieza',
    texto: 'Las dos condiciones del umbral tienen forma declarada y no tienen valor. Ninguna fuente declara la capacidad del disco del servidor de referencia, ninguna cota de ocupación, y el catálogo de diseño no cubre umbrales de disco. A eso se suma que el cálculo del espacio recuperable depende del criterio de descarte, que tampoco declara ninguna fuente (brecha B-26 de 02-Especificacion-Funcional). Esta maqueta NO elige ninguno de los dos: dibuja la banda y los dos descriptores con su forma completa y deja las ranuras numéricas declaradas.',
    restricciones: [
      'Los dos valores viven en descriptores, con etiqueta, leyenda, unidad, valor por defecto y límites, y la pantalla los lee. No se hardcodean.',
      'El espacio recuperable se cuenta sólo sobre lo administrado, nunca sobre lo ajeno.',
      'Mientras el criterio de descarte esté abierto, la condición de espacio recuperable tiene forma y no tiene aritmética.'
    ],
    nota: 'El wireframe de SUP-18 pide demostrar la banda «con dato de ejemplo». Ninguna fuente de datos de ejemplo declara ninguna cifra de espacio recuperable ni de ocupación: emitir un número sería inventarlo. La contradicción entre esa restricción y la regla de datos se devuelve como hallazgo del paso 6.'
  };

  var PROPUESTA_ARISTAS = {
    brecha: 'B-UX-01',
    titulo: 'Propuesta a validar · distinción visual de las aristas que declaran espera',
    texto: 'Ninguna regla del catálogo cubre la representación de aristas de un lienzo y el anexo E-18 no tiene fila. Esta maqueta dibuja una distinción concreta para que el agente humano la apruebe o la corrija: NO es especificación.',
    restricciones: [
      'No usa el violeta reservado en exclusiva a «pendiente de aplicar».',
      'Usa un segundo canal además del color: la forma de la punta y un marcador en el punto medio.',
      'Es distinguible de la arista inválida, que además cambia de color y de patrón de trazo.'
    ],
    nota: 'En el juego de datos del anexo E-1 todos los pares de servicios declaran espera, de modo que la clase «no declara espera» ' +
      'no aparece dibujada en el lienzo con estos datos: se exhibe en la leyenda, con las mismas marcas que usaría la arista real, ' +
      'y aparecería en el lienzo en cuanto el administrador desmarque la espera de una arista.',
    reglas: [
      { clase: 'espera', titulo: 'Declara espera al destino', canales: 'Trazo sólido neutro · punta de flecha rellena · marcador de espera (doble barra) en el punto medio · rótulo «espera» junto al marcador' },
      { clase: 'sin-espera', titulo: 'No declara espera', canales: 'Trazo sólido neutro · punta de flecha hueca · sin marcador medio' },
      { clase: 'invalida', titulo: 'Inválida · bloquea el arranque', canales: 'Trazo punteado en color de error · marcador de cruz en el punto medio · rótulo «inválida»' }
    ]
  };

  /* ─────────────────────────────────────────────────────────────────────
     10. Exportación del módulo
     ───────────────────────────────────────────────────────────────────── */

  global.DatosMaqueta = {
    MAQUETA: MAQUETA,
    IDENTIDAD: IDENTIDAD,
    IDENTIDAD_VERSION: IDENTIDAD_VERSION,
    CODIGOS_RESULTADO: CODIGOS_RESULTADO,
    REQUISITO_CONTRASENA: REQUISITO_CONTRASENA,
    NAVEGACION: NAVEGACION,
    NAVEGACION_PROYECTO: NAVEGACION_PROYECTO,
    PROYECTOS: PROYECTOS,
    SERVICIOS: SERVICIOS,
    SERVICIO_INCORPORADO: SERVICIO_INCORPORADO,
    VARIABLES_SERVICIO: VARIABLES_SERVICIO,
    ARISTAS: ARISTAS,
    DESPLIEGUES: DESPLIEGUES,
    CHANGESET: CHANGESET,
    VARIABLES_COMPARTIDAS: VARIABLES_COMPARTIDAS,
    CANDIDATOS: CANDIDATOS,
    CLASIFICACION: CLASIFICACION,
    RANGO_GESTIONADO: RANGO_GESTIONADO,
    RESERVAS: RESERVAS,
    CONFLICTO: CONFLICTO,
    CREDENCIALES: CREDENCIALES,
    CREDENCIAL_EMITIDA: CREDENCIAL_EMITIDA,
    AMBITOS_DISPONIBLES: AMBITOS_DISPONIBLES,
    RESPALDO: RESPALDO,
    RETENCION: RETENCION,
    ITEMS_CATALOGO: ITEMS_CATALOGO,
    TABLERO: TABLERO,
    REGISTRO: REGISTRO,
    HIGIENE: HIGIENE,
    EXPORTACION: EXPORTACION,
    DESCRIPTORES: DESCRIPTORES,
    EXPLICACION_UMBRAL: EXPLICACION_UMBRAL,
    IMAGENES: IMAGENES_SUPERFICIE,
    EXPLORACION: EXPLORACION,
    ALTA_SERVICIO: ALTA_SERVICIO,
    VIAS_ALTA: VIAS_ALTA,
    ORIGENES: ORIGENES,
    PASOS_TRONCO: PASOS_TRONCO,
    ESTADOS_SERVICIO: ESTADOS_SERVICIO,
    EXPLORACION_REGISTRO: EXPLORACION_REGISTRO,
    SERVICIOS_BORRADOR: SERVICIOS_BORRADOR,
    CLASES_DE_CAMBIO: CLASES_DE_CAMBIO,
    CATALOGO: CATALOGO,
    TIPOS_PARAMETRO: TIPOS_PARAMETRO,
    PARAMETROS_DE_ENTORNO: PARAMETROS_DE_ENTORNO,
    CONTRATO_CAMPOS: CONTRATO_CAMPOS,
    SUPERFICIES: SUPERFICIES,
    PROPUESTA_ARISTAS: PROPUESTA_ARISTAS,

    /* Propuestas abiertas que la maqueta exhibe para que el humano las
       apruebe o las corrija. Una por superficie que la aloja. */
    BRECHA_UMBRAL: BRECHA_UMBRAL,
    BRECHA_REGISTROS: BRECHA_REGISTROS,

    propuestaDe: function (idSuperficie) {
      if (idSuperficie === 'SUP-05') { return PROPUESTA_ARISTAS; }
      if (idSuperficie === 'SUP-17') { return BRECHA_REGISTROS; }
      if (idSuperficie === 'SUP-19') { return BRECHA_REGISTROS; }
      if (idSuperficie === 'SUP-18' || idSuperficie === 'SUP-12' || idSuperficie === 'SUP-09') { return BRECHA_UMBRAL; }
      return null;
    },
    origen: function (tipo) {
      for (var i = 0; i < ORIGENES.length; i++) {
        if (ORIGENES[i].tipo === tipo) { return ORIGENES[i]; }
      }
      return ORIGENES[0];
    },
    via: function (idVia) {
      for (var i = 0; i < VIAS_ALTA.length; i++) {
        if (VIAS_ALTA[i].id === idVia) { return VIAS_ALTA[i]; }
      }
      return VIAS_ALTA[0];
    },

    superficie: function (id) {
      for (var i = 0; i < SUPERFICIES.length; i++) {
        if (SUPERFICIES[i].id === id) { return SUPERFICIES[i]; }
      }
      return null;
    },
    codigo: function (clave) {
      return CODIGOS_RESULTADO[clave] || CODIGOS_RESULTADO.GENERICO;
    }
  };
})(window);
