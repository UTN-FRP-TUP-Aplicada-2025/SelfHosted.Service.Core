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
    modeloUxUi: 'Catálogo base · Design-Rules-Web-Generico 1.2 + Config-Esquema 1.1 + Primer-Arranque 1.0 + Acceso-Monousuario 1.0 + Identidad-De-Version 1.0',
    modeloUxUiCorto: 'Catálogo base (sin modelo de Modelos-UX-UI/)',
    fechaIteracion: '2026-07-29',
    rotuloBarra: 'Barra de validación de maqueta — no forma parte del producto',
    navegadorSoportado: 'Chrome de escritorio estable ≥ 150.0.7871.186 · Windows Server 2022 21H2 · red local'
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
      cambiosPendientes: 4
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
      origen: { tipo: 'imagen', imagen: 'registro-privado/portal-api', etiqueta: '1.4.2', politicaActualizacion: 'fijada' },
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
      origen: { tipo: 'imagen', imagen: 'imagen-oficial/redis', etiqueta: '7.4', politicaActualizacion: 'fijada' },
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
      origen: { tipo: 'imagen', imagen: 'imagen-oficial/postgres', etiqueta: '16-alpine', politicaActualizacion: 'fijada' },
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
    advertenciaCorte: 'Este servicio se incorporó sin recrear su contenedor. El primer redespliegue sí implica corte del servicio.'
  };

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

  /* 5.6 Changeset 331 con su informe de impacto — E-5 */
  var CHANGESET = {
    id: 331, proyectoId: 12, estado: 'pendiente',
    creadoEn: '2026-07-26T10:02:00-03:00', mensaje: null,
    cambios: [
      {
        id: 1, tipo: 'servicio-agregado', entidad: 'servicio', entidadId: null,
        resumen: "Nuevo servicio 'cache' (imagen-oficial/redis:7.4)",
        requiereRedespliegueDe: ['cache'], referenciadaPor: null
      },
      {
        id: 2, tipo: 'variable-modificada', entidad: 'servicio', entidadId: 101,
        resumen: 'api · REDIS_URL: (sin valor) → cache:6379',
        requiereRedespliegueDe: ['api'], referenciadaPor: null
      },
      {
        id: 3, tipo: 'nodo-movido', entidad: 'canvas', entidadId: 103,
        resumen: 'db movido a (560, 320)',
        requiereRedespliegueDe: [], referenciadaPor: null,
        visual: true
      },
      {
        id: 4, tipo: 'variable-compartida-modificada', entidad: 'proyecto', entidadId: 12,
        resumen: 'Proyecto · TZ: America/Argentina/Buenos_Aires → UTC',
        requiereRedespliegueDe: ['api'],
        referenciadaPor: [{ servicio: 'api', clave: 'TZ' }]
      }
    ],
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
      adoptable: true, motivoNoAdoptable: null, yaAdoptadoPor: null
    },
    {
      contenedorId: 'c93e0a1b7d55', nombre: 'bot-mensajeria',
      imagen: 'registro-privado/bot-moderador:latest', estado: 'running',
      creadoEn: '2026-04-18T08:30:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.134' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/bot-mensajeria/data', destino: '/app/data' }],
      variablesDetectadas: 4, variablesSugeridasComoSecretas: ['ADMIN_TOKEN'],
      adoptable: true, motivoNoAdoptable: null, yaAdoptadoPor: null
    },
    {
      contenedorId: '1a2b3c4d5e6f', nombre: 'panel-admin',
      imagen: 'imagen-oficial/panel-ce:latest', estado: 'running',
      creadoEn: '2026-03-11T14:05:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.130' }],
      montajes: [{ tipo: 'socket', origen: '/var/run/docker.sock', destino: '/var/run/docker.sock' }],
      variablesDetectadas: 2, variablesSugeridasComoSecretas: [],
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
      adoptable: false, motivoNoAdoptable: null,
      yaAdoptadoPor: 'Impresion 3D'
    },
    {
      contenedorId: '5e8c02a4f71b', nombre: 'vm-windows',
      imagen: 'imagen-comunidad/windows', estado: 'exited',
      creadoEn: '2026-02-02T09:00:00-03:00',
      redes: [{ nombre: 'infra_vlan', modo: 'macvlan', ip: '192.168.1.133' }],
      montajes: [{ tipo: 'bind', origen: '/srv/despliegues/vm-windows/data', destino: '/storage' }],
      variablesDetectadas: 6, variablesSugeridasComoSecretas: ['PASSWORD'],
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
    advertenciaCambiosPendientes: 'Este proyecto tiene 4 cambios sin aplicar. Se exporta la configuración aplicada, no la del borrador.',
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
      { clave: 'diasAuditoria', etiqueta: 'Días de auditoría', tipo: 'numerico', unidad: 'días', porDefecto: null, enum: null, min: 1, max: null, leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR }
    ]
  };

  /* 6.1 Alta de un servicio — pasos 3 y 4 de CU-03.
     La superficie que los aloja NO estaba especificada: el botón «Nuevo
     servicio» del lienzo no llevaba a ninguna vista de alta. El agente humano
     del proyecto resolvió alojarla como un estado más del panel lateral,
     reusando su formulario dirigido por descriptor. Es material que todavía
     no está en `03-UX-UI-DX`: la maqueta lo exhibe como PROPUESTA A VALIDAR.

     Los descriptores de abajo declaran, campo por campo, qué fuente los
     sostiene. Donde ninguna fuente declara un dato, el descriptor lo deja en
     null y la maqueta muestra la ranura con su motivo: no se inventa. */

  var ALTA_SERVICIO = {
    propuesta: {
      brecha: 'Sin identificador todavía · hallazgo del paso 5 de la Fase B2',
      titulo: 'Propuesta a validar · alta de servicio como estado del panel lateral',
      texto: 'CU-03 declara el alta en diez pasos y ninguna superficie de 03-UX-UI-DX la materializa: SUP-05 tiene el botón ' +
        '«Nuevo servicio» y ningún estado de formulario, y SUP-06 declara «vacío: no aplica, el panel existe exactamente cuando ' +
        'hay un servicio seleccionado», que es justo lo que no ocurre al dar de alta. Este estado cubre los pasos 3 y 4 ' +
        'reusando el formulario dirigido por descriptor que el panel ya tiene especificado. NO es especificación: la corrección ' +
        'del wireframe y de Experiencia-De-Uso es del paso 6 y la hace AG-03.',
      alcance: [
        'Paso 3 de CU-03: el nombre del servicio, que es también su alias de resolución de nombres dentro de la red del proyecto.',
        'Paso 4 de CU-03: la elección del origen entre las tres variantes que el anexo E-2 declara.',
        'De ahí en adelante continúan los pasos 5 y 6 con las dimensiones que el panel ya especifica, sin superficie nueva.'
      ]
    },

    /* Paso 3 — el nombre. Sus límites SÍ están declarados por RN-01. */
    nombre: {
      clave: 'nombre', etiqueta: 'Nombre del servicio', tipo: 'texto', unidad: null,
      porDefecto: null, enum: null, min: 1, max: 32,
      restriccion: 'En minúsculas, con guiones, de 1 a 32 caracteres, y único dentro del proyecto (RN-01).',
      leyenda: null, ejemplos: null, brecha: BRECHA_DESCRIPTOR,
      ejemploDeLaFuente: 'api',
      advertenciaAlias: 'Este nombre es también el alias de resolución de nombres del servicio dentro de la red del proyecto: ' +
        'los demás servicios lo alcanzan por él. Por eso tiene que ser único (CU-03 paso 3; RN-01).'
    },

    /* Paso 4 — las tres variantes de origen del anexo E-2. */
    origenes: [
      {
        id: 'imagen', etiqueta: 'Imagen de registro',
        descripcion: 'El servicio corre una imagen ya publicada en un registro.',
        campos: [
          { clave: 'imagen', etiqueta: 'Imagen', tipo: 'texto', requerido: true, ejemplo: 'registro-privado/portal-api', fuente: 'E-2' },
          { clave: 'etiqueta', etiqueta: 'Etiqueta', tipo: 'texto', requerido: true, ejemplo: '1.4.2', fuente: 'E-2' },
          { clave: 'politicaActualizacion', etiqueta: 'Política de actualización', tipo: 'seleccion',
            enum: ['fijada', 'flotante'], requerido: true, ejemplo: 'fijada', fuente: 'E-2 y E-21' },
          { clave: 'registroUrl', etiqueta: 'Registro', tipo: 'texto', requerido: false, ejemplo: 'registry.interno.lan', fuente: 'E-2' },
          { clave: 'requiereCredenciales', etiqueta: 'El registro exige credenciales', tipo: 'booleano',
            requerido: false, ejemplo: 'true', fuente: 'E-2' },
          { clave: 'credencialId', etiqueta: 'Credencial del registro', tipo: 'seleccion', enum: null, requerido: false,
            ejemplo: null, fuente: null,
            sinEjemplo: 'El anexo E-2 declara un identificador numérico de credencial y no declara con qué nombre se la elige, ' +
              'ni existe superficie declarada donde se den de alta las credenciales de registro. Ver la ambigüedad emitida.' }
        ]
      },
      {
        id: 'repositorio', etiqueta: 'Repositorio remoto',
        descripcion: 'El servicio se construye desde un repositorio remoto en cada despliegue.',
        reglaPropia: 'RN-08: el origen repositorio exige la ruta del archivo de construcción y la rama.',
        campos: [
          { clave: 'proveedor', etiqueta: 'Proveedor', tipo: 'seleccion', enum: ['github'], requerido: true,
            ejemplo: 'github', fuente: 'E-2',
            sinEjemplo: 'E-2 declara un único proveedor. Ninguna fuente declara si el conjunto admitido tiene otros. Ver la ambigüedad emitida.' },
          { clave: 'url', etiqueta: 'Dirección del repositorio', tipo: 'texto', requerido: true,
            ejemplo: 'https://github.com/usuario/portal-api', fuente: 'E-2' },
          { clave: 'rama', etiqueta: 'Rama', tipo: 'texto', requerido: true, ejemplo: 'main', fuente: 'E-2 · exigida por RN-08' },
          { clave: 'rutaDockerfile', etiqueta: 'Ruta del archivo de construcción', tipo: 'texto', requerido: true,
            ejemplo: 'src/Api/Dockerfile', fuente: 'E-2 · exigida por RN-08' },
          { clave: 'contextoBuild', etiqueta: 'Contexto de construcción', tipo: 'texto', requerido: false, ejemplo: '.', fuente: 'E-2' },
          { clave: 'argumentosBuild', etiqueta: 'Argumentos de construcción', tipo: 'texto', requerido: false,
            ejemplo: 'CONFIGURATION=Release', fuente: 'E-2' },
          { clave: 'reconstruirEnDespliegue', etiqueta: 'Reconstruir en cada despliegue', tipo: 'booleano',
            requerido: false, ejemplo: 'true', fuente: 'E-2' },
          { clave: 'credencialId', etiqueta: 'Credencial del repositorio', tipo: 'seleccion', enum: null, requerido: false,
            ejemplo: null, fuente: null,
            sinEjemplo: 'Mismo caso que la credencial del registro: identificador numérico en E-2, sin nombre ni superficie declarada.' }
        ]
      },
      {
        id: 'dockerfile', etiqueta: 'Archivo de construcción local',
        descripcion: 'El servicio se construye desde un archivo de construcción del propio servidor.',
        campos: [
          { clave: 'rutaDockerfile', etiqueta: 'Ruta del archivo de construcción', tipo: 'texto', requerido: true,
            ejemplo: '/srv/proyectos/portal/Dockerfile', fuente: 'E-2' },
          { clave: 'contextoBuild', etiqueta: 'Contexto de construcción', tipo: 'texto', requerido: true,
            ejemplo: '/srv/proyectos/portal', fuente: 'E-2' },
          { clave: 'argumentosBuild', etiqueta: 'Argumentos de construcción', tipo: 'texto', requerido: false,
            ejemplo: '', fuente: 'E-2 · el ejemplo del anexo viene vacío' },
          { clave: 'reconstruirEnDespliegue', etiqueta: 'Reconstruir en cada despliegue', tipo: 'booleano',
            requerido: false, ejemplo: 'true', fuente: 'E-2' }
        ]
      }
    ],

    continuacion: 'Al confirmar, el servicio se agrega al conjunto de cambios pendientes y su nodo aparece en el lienzo ' +
      'en estado pendiente de aplicar (CU-03 pasos 7 a 10). Los pasos 5 y 6 —modo de red y dirección, variables, puertos, ' +
      'montajes, dispositivos, capacidades, límites, política de reinicio, verificación de salud y marca de efímero— ' +
      'continúan en las pestañas que este panel ya especifica.',

    rechazoNombre: 'El nombre tiene que estar en minúsculas, con guiones, de 1 a 32 caracteres, y no puede repetirse dentro del proyecto (RN-01).',
    rechazoRepositorio: 'El origen repositorio exige la ruta del archivo de construcción y la rama (RN-08).'
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
     7. Contrato de campos que la maqueta exhibe
        (nombre, tipo, ejemplo, entidad de origen) — Maqueta-Rules §4.2
     ───────────────────────────────────────────────────────────────────── */

  var CONTRATO_CAMPOS = [
    { campo: 'proyecto.nombre', tipo: 'texto', ejemplo: 'Portal Interno', entidad: 'Proyecto SelfHosted', anexo: 'E-1' },
    { campo: 'proyecto.slug', tipo: 'texto', ejemplo: 'portal-interno', entidad: 'Proyecto SelfHosted', anexo: 'E-1' },
    { campo: 'proyecto.estado', tipo: 'enumerado', ejemplo: 'parcialmente-activo', entidad: 'Proyecto SelfHosted (derivado de los despliegues)', anexo: 'E-1, E-3' },
    { campo: 'proyecto.red.modo', tipo: 'enumerado', ejemplo: 'bridge', entidad: 'Red del proyecto', anexo: 'E-1' },
    { campo: 'proyecto.red.subred', tipo: 'texto', ejemplo: '172.20.0.0/24', entidad: 'Red del proyecto', anexo: 'E-1' },
    { campo: 'proyecto.cambiosPendientes', tipo: 'entero', ejemplo: '4', entidad: 'Changeset', anexo: 'E-1, E-5' },
    { campo: 'servicio.nombre', tipo: 'texto', ejemplo: 'api', entidad: 'Servicio', anexo: 'E-2' },
    { campo: 'servicio.origen.tipo', tipo: 'enumerado', ejemplo: 'imagen · repositorio · dockerfile', entidad: 'Origen del servicio', anexo: 'E-2' },
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
    { campo: 'servicio.origen.registro.url', tipo: 'texto', ejemplo: 'registry.interno.lan', entidad: 'Registro del origen por imagen', anexo: 'E-2' },
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
    { campo: 'identidadVersion.versionLegible', tipo: 'texto | nulo', ejemplo: '0.4.0 · null si el origen es indeterminado', entidad: 'Contrato de identidad de versión', anexo: 'sin declarar: brecha B-UX-07' }
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
      wireframe: 'Wireframes-Lienzo-Del-Proyecto.md',
      proposito: 'Vista por defecto del proyecto: leer, editar, arrancar y detener la arquitectura completa.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
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
      shell: 'trabajo', cu: ['CU-03', 'CU-13', 'CU-15', 'CU-18', 'CU-19', 'CU-35'],
      wireframe: 'Wireframes-Panel-Lateral-Del-Servicio.md',
      proposito: 'Configuración del servicio seleccionado, con la garantía de que guardar un cambio no lo despliega.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
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
      wireframe: 'Wireframes-Cajon-De-Cambios-Pendientes.md',
      proposito: 'Revisar los cambios acumulados con la consecuencia delante y aplicar el lote.',
      estados: [
        { id: 'con-datos-lista', etiqueta: 'Con datos · lista de cambios (vista 1)', predeterminado: true },
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
      shell: 'trabajo', cu: ['CU-26', 'CU-27', 'CU-28'], wireframe: 'Wireframes-Tablero-De-Estado.md',
      proposito: 'Atribuir el consumo del servidor a un servicio concreto, en tres capas.',
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
        { id: 'error', etiqueta: 'Error' }
      ]
    },
    {
      id: 'SUP-10', nombre: 'Descubrimiento e incorporación', archivo: 'Descubrimiento-E-Incorporacion.html',
      shell: 'trabajo', cu: ['CU-06', 'CU-07', 'CU-08'], wireframe: 'Wireframes-Descubrimiento-E-Incorporacion.md',
      proposito: 'Incorporar contenedores que ya corren, sin recrearlos ni cortar el servicio.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos · paso 1', predeterminado: true },
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
      shell: 'trabajo', cu: ['CU-16', 'CU-17', 'CU-36'], wireframe: 'Wireframes-Catalogo-De-Plantillas.md',
      proposito: 'Convertir en activo reutilizable algo ya resuelto, e instanciarlo con sus parámetros.',
      estados: [
        { id: 'con-datos', etiqueta: 'Con datos', predeterminado: true },
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
      shell: 'trabajo', cu: ['CU-12', 'CU-19', 'CU-32'], wireframe: 'Wireframes-Configuracion-Del-Sistema.md',
      proposito: 'Rango gestionado, credenciales de máquina, respaldo, retención e identidad de la instancia.',
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
      shell: 'trabajo', cu: ['CU-03'],
      wireframe: 'PROPUESTA — todavia sin wireframe. Lo emite AG-03 en el paso 6 de la Fase B2.',
      proposito: 'Pasos 3 y 4 de CU-03: nombre del servicio, que es tambien su alias de resolucion de nombres, y eleccion entre las tres variantes de origen del anexo E-2.',
      estados: [
        { id: 'con-datos', etiqueta: 'Alta de servicio · pasos 3 y 4 de CU-03 — PROPUESTA', predeterminado: true, propuesta: true },
        { id: 'vacio', etiqueta: 'Vacio · formulario sin completar — PROPUESTA', propuesta: true },
        { id: 'cargando', etiqueta: 'Cargando — PROPUESTA', propuesta: true },
        { id: 'alta-rechazo-nombre', etiqueta: 'Rechazo por nombre (RN-01) — PROPUESTA', propuesta: true },
        { id: 'alta-rechazo-repositorio', etiqueta: 'Rechazo del origen repositorio (RN-08) — PROPUESTA', propuesta: true },
        { id: 'error', etiqueta: 'Error · no se pudo guardar — PROPUESTA', propuesta: true }
      ]
    }
  ];

  /* ─────────────────────────────────────────────────────────────────────
     9. Propuesta abierta de la maqueta — B-UX-01
     ───────────────────────────────────────────────────────────────────── */

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
    ALTA_SERVICIO: ALTA_SERVICIO,
    PARAMETROS_DE_ENTORNO: PARAMETROS_DE_ENTORNO,
    CONTRATO_CAMPOS: CONTRATO_CAMPOS,
    SUPERFICIES: SUPERFICIES,
    PROPUESTA_ARISTAS: PROPUESTA_ARISTAS,

    /* Propuestas abiertas que la maqueta exhibe para que el humano las
       apruebe o las corrija. Una por superficie que la aloja. */
    propuestaDe: function (idSuperficie) {
      if (idSuperficie === 'SUP-05') { return PROPUESTA_ARISTAS; }
      if (idSuperficie === 'SUP-17') { return ALTA_SERVICIO.propuesta; }
      return null;
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
