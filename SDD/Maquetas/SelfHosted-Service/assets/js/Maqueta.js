/* ==========================================================================
   Maqueta.js — SelfHosted Service · maqueta de validación visual
   --------------------------------------------------------------------------
   Render de los datos, navegación y conmutación de estados (Maqueta-Rules §2.2).
   Todo el contenido de dominio se lee de `DatosMaqueta`; acá no hay datos.
   ========================================================================== */

(function (global) {
  'use strict';

  var D = global.DatosMaqueta;

  /* ═══════════════════════════════════════════════════════════════════════
     1. Utilidades
     ═══════════════════════════════════════════════════════════════════════ */

  function esc(v) {
    if (v === null || v === undefined) { return ''; }
    return String(v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function n(v, sufijo) {
    if (v === null || v === undefined) { return '—'; }
    return '<span class="mq-num">' + esc(v) + '</span>' + (sufijo ? ' ' + esc(sufijo) : '');
  }

  function id(prefijo) { return prefijo + '-' + Math.random().toString(36).slice(2, 8); }

  /* ═══════════════════════════════════════════════════════════════════════
     2. Iconografía · SVG inline con currentColor (Web-Generico §6.1)
        Ninguna es raster y ninguna viene de un pack por CDN.
     ═══════════════════════════════════════════════════════════════════════ */

  var TRAZOS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.5 17a9 9 0 1 1 17 0"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    key: '<circle cx="7" cy="14" r="3.5"/><path d="M9.6 11.4L20 4M17 6l2 2M15 8l1.6 1.6"/>',
    alert: '<path d="M12 4l9 16H3l9-16z"/><path d="M12 10v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    check: '<path d="M5 13l4 4 10-10"/>',
    cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    play: '<path d="M7 5l12 7-12 7V5z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/>',
    copiar: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    salir: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 8l-4 4 4 4M6 12h9"/>',
    lock: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    caja: '<rect x="3.5" y="6" width="17" height="13" rx="2"/><path d="M3.5 10h17"/>',
    reloj: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    descarga: '<path d="M12 4v11M8 11l4 4 4-4"/><path d="M4 19h16"/>',
    base: '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>'
  };

  function icono(nombre, tam, extra) {
    var t = TRAZOS[nombre] || TRAZOS.info;
    var s = tam || 16;
    return '<svg aria-hidden="true" focusable="false" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"' +
      (extra ? ' class="' + esc(extra) + '"' : '') + '>' + t + '</svg>';
  }

  /* Insignias del par de estado — Representacion-Lenguaje-Visual-De-Estados §3.1.
     Cada una es una forma distinta: la forma es el canal redundante del color. */
  var INSIGNIAS = {
    activo: '<circle cx="8" cy="8" r="5" fill="currentColor"/>',
    degradado: '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 3a5 5 0 0 1 0 10z" fill="currentColor"/>',
    creando: '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 3a5 5 0 0 1 5 5H8z" fill="currentColor"/>',
    detenido: '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    fallido: '<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    pendiente: '<path d="M8 2.5l5.5 5.5L8 13.5 2.5 8z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    huerfano: '<path d="M8 2.5l6 11H2z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
  };

  var ETIQUETAS_ESTADO = {
    activo: 'Activo',
    degradado: 'Activo degradado',
    creando: 'Creando',
    detenido: 'Detenido',
    fallido: 'Fallido',
    pendiente: 'Pendiente de aplicar',
    huerfano: 'Huérfano'
  };

  /* ═══════════════════════════════════════════════════════════════════════
     3. Constructores de componentes del catálogo
     ═══════════════════════════════════════════════════════════════════════ */

  /* Par de estado: insignia + etiqueta textual + tratamiento de borde.
     El color nunca es el único canal. */
  function parEstado(clave, opciones) {
    var o = opciones || {};
    var etiqueta = o.etiqueta || ETIQUETAS_ESTADO[clave] || clave;
    var ins = INSIGNIAS[clave] || INSIGNIAS.detenido;
    var extra = o.antiguedad ? ' · desde hace ' + esc(o.antiguedad) : '';
    var html = '<span class="mq-par-estado mq-estado--' + esc(clave) + '">' +
      '<svg aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 16 16">' + ins + '</svg>' +
      esc(etiqueta) + extra + '</span>';
    if (o.causa) {
      html += '<span class="mq-estado-causa">' + esc(o.causa) + '</span>';
    }
    return html;
  }

  /* Banda de resultado por código — Representacion-Banda-De-Resultado */
  function banda(codigoOTexto, opciones) {
    var o = opciones || {};
    var variante, texto, brecha = null;
    if (o.texto) {
      variante = o.variante || 'error';
      texto = o.texto;
    } else {
      var c = D.codigo(codigoOTexto);
      variante = c.variante;
      texto = c.texto;
      brecha = c.brecha || null;
    }
    var rol = variante === 'confirmacion' ? 'status' : (variante === 'error' ? 'alert' : 'status');
    var ic = variante === 'confirmacion' ? 'check' : (variante === 'error' ? 'alert' : 'info');
    var html = '<div class="mq-banda mq-banda--' + esc(variante) + '" role="' + rol + '">' +
      icono(ic, 16) + '<div><span>' + esc(texto) + '</span>';
    if (!o.texto && codigoOTexto) {
      html += ' <code class="mq-meta">' + esc(codigoOTexto) + '</code>';
    }
    if (brecha) {
      html += '<span class="mq-hint">Texto incompleto a propósito · ' + esc(brecha) + '</span>';
    }
    html += '</div></div>';
    return html;
  }

  function bandaInfo(texto) { return banda(null, { variante: 'info', texto: texto }); }
  function bandaAtencion(texto) { return banda(null, { variante: 'atencion', texto: texto }); }
  function bandaError(texto) { return banda(null, { variante: 'error', texto: texto }); }
  function bandaOk(texto) { return banda(null, { variante: 'confirmacion', texto: texto }); }

  /* Estado vacío — Web-Generico §5: invitación a actuar, no adorno.
     La ilustración es SVG y no porta información que no esté en el texto. */
  function vacio(titulo, texto, accion) {
    return '<div class="mq-vacio">' +
      '<div class="mq-ilustracion" aria-hidden="true">' +
      '<svg width="72" height="52" viewBox="0 0 72 52" fill="none" stroke="currentColor" stroke-width="1.6">' +
      '<rect x="2" y="8" width="30" height="20" rx="3"/><rect x="40" y="8" width="30" height="20" rx="3"/>' +
      '<rect x="21" y="34" width="30" height="16" rx="3" stroke-dasharray="4 3"/>' +
      '<path d="M32 18h8"/></svg></div>' +
      '<h3>' + esc(titulo) + '</h3>' +
      '<p class="mq-caption">' + esc(texto) + '</p>' +
      (accion ? '<p>' + accion + '</p>' : '') +
      '</div>';
  }

  function esqueleto(cantidad, clase) {
    var out = '';
    for (var i = 0; i < cantidad; i++) {
      out += '<div class="mq-esqueleto' + (clase ? ' mq-esqueleto--' + clase : '') + '"' +
        (clase ? '' : ' style="width:' + (60 + (i % 3) * 15) + '%"') + '></div>';
    }
    return '<div aria-hidden="true">' + out + '</div>';
  }

  function progresoLineal() { return '<div class="mq-progreso-lineal" aria-hidden="true"><span></span></div>'; }

  function spinner() { return '<span class="mq-spinner" aria-hidden="true"></span>'; }

  function botonEnviando(texto) {
    return '<button type="button" class="mq-btn mq-btn--primario" disabled>' + spinner() + ' ' + esc(texto) + '</button>';
  }

  function barraMagnitud(usado, total, unidad, etiquetaAccesible) {
    if (usado === null || usado === undefined) {
      return '<span class="mq-caption">Sin métricas</span>';
    }
    var pct = total ? Math.round((usado / total) * 100) : usado;
    var cifra = total
      ? usado + ' / ' + total + ' ' + unidad
      : usado + ' ' + unidad;
    return '<span class="mq-magnitud">' +
      '<span class="mq-barra-magnitud" role="progressbar" aria-valuenow="' + esc(usado) + '"' +
      ' aria-valuemin="0" aria-valuemax="' + esc(total || 100) + '"' +
      ' aria-label="' + esc(etiquetaAccesible || 'Magnitud') + '">' +
      '<span style="width:' + Math.min(100, pct) + '%"></span></span>' +
      '<span class="mq-cifra">' + esc(cifra) + '</span></span>';
  }

  function tabla(columnas, filas, opciones) {
    var o = opciones || {};
    var html = '<div class="mq-tabla-envoltorio"><table class="mq-tabla"' +
      (o.resumen ? ' aria-describedby="' + esc(o.resumen) + '"' : '') + '>';
    if (o.caption) { html += '<caption class="mq-sr-only">' + esc(o.caption) + '</caption>'; }
    html += '<thead><tr>';
    columnas.forEach(function (c) { html += '<th scope="col">' + esc(c) + '</th>'; });
    html += '</tr></thead><tbody>' + filas.join('') + '</tbody></table></div>';
    return html;
  }

  function filasClaveValor(pares) {
    var html = '<dl class="mq-filas-clave-valor">';
    pares.forEach(function (p) {
      html += '<div class="mq-fila-cv"><dt>' + esc(p[0]) + '</dt><dd>' + (p[2] === true ? p[1] : esc(p[1])) + '</dd></div>';
    });
    return html + '</dl>';
  }

  /* Sello de versión — Representacion-Sello-De-Version */
  function sello(variante, opciones) {
    var o = opciones || {};
    var c = D.IDENTIDAD_VERSION[variante] || D.IDENTIDAD_VERSION.publicada;
    var cuerpo;
    if (c.origenIndeterminado) {
      cuerpo = '<span>' + esc(c.marcador) + '</span>';
    } else {
      cuerpo = '<span>Versión ' + esc(c.versionLegible) + '</span>';
      if (c.esPreliminar) {
        cuerpo += '<span class="mq-distintivo-preliminar">artefacto preliminar</span>';
      }
    }
    var html = '<p class="mq-sello' + (o.centrado ? ' mq-sello--centrado' : '') + '">' + cuerpo + '</p>';
    if (o.brecha !== false) {
      html += '<p class="mq-hint"' + (o.centrado ? ' style="text-align:center"' : '') +
        '>B-UX-07 · ninguna fuente declara cómo llega este contrato al punto de composición</p>';
    }
    return html;
  }

  function diagnostico(variante, copiado) {
    var c = D.IDENTIDAD_VERSION[variante] || D.IDENTIDAD_VERSION.publicada;
    return '<div class="mq-diagnostico">' +
      filasClaveValor([
        ['Versión', c.origenIndeterminado ? 'Origen indeterminado' : c.versionLegible],
        ['Construcción', c.identificadorDeConstruccion || 'Sin declarar (B-UX-07)'],
        ['Origen', c.origenIndeterminado ? 'No pudo derivarse de la construcción' : 'Derivado de la construcción']
      ]) +
      '<div class="mq-acciones" style="margin-top:var(--space-12)">' +
      '<button type="button" class="mq-btn">' + icono('copiar') + ' Copiar diagnóstico</button></div>' +
      (copiado ? '<p class="mq-caption" role="status">Diagnóstico copiado. Ya lo podés pegar en tu reporte.</p>' : '') +
      '</div>';
  }

  /* Campo dirigido por descriptor — Config-Esquema §4.1 */
  function campoDescriptor(desc, opciones) {
    var o = opciones || {};
    var idc = id('campo');
    var idHint = idc + '-hint';
    var idErr = idc + '-err';
    var descritoPor = [idHint];
    var botonAyuda = ' <button type="button" class="mq-btn-icono" aria-expanded="' + (o.ayuda ? 'true' : 'false') +
      '" aria-label="Ayuda sobre ' + esc(desc.etiqueta) + '">' + icono('info', 14) + '</button>';

    var html = '<div class="mq-campo">';
    if (o.error) { descritoPor.push(idErr); }

    /* En un booleano el rótulo visible es el del propio interruptor: repetirlo
       arriba duplicaría la etiqueta para el lector de pantalla. */
    if (desc.tipo !== 'booleano') {
      html += '<label for="' + idc + '">' + esc(desc.etiqueta) + botonAyuda + '</label>';
    }

    var atributos = ' id="' + idc + '" class="mq-input"';
    if (o.error) { atributos += ' aria-invalid="true"'; }
    if (o.deshabilitado) { atributos += ' disabled'; }

    if (desc.tipo === 'seleccion' && desc.enum) {
      html += '<select' + atributos.replace('mq-input', 'mq-select') + ' aria-describedby="' + descritoPor.join(' ') + '">';
      desc.enum.forEach(function (v) {
        html += '<option' + (v === o.valor ? ' selected' : '') + '>' + esc(v) + '</option>';
      });
      html += '</select>';
    } else if (desc.tipo === 'booleano') {
      html += '<div class="mq-fila"><label class="mq-toggle" for="' + idc + '">' +
        '<input type="checkbox" id="' + idc + '"' +
        (o.valor ? ' checked' : '') + (o.deshabilitado ? ' disabled' : '') +
        ' aria-describedby="' + descritoPor.join(' ') + '"> <span>' + esc(desc.etiqueta) + '</span></label>' +
        botonAyuda + '</div>';
    } else {
      html += '<input type="' + (desc.tipo === 'numerico' ? 'number' : 'text') + '"' + atributos +
        ' value="' + esc(o.valor === undefined || o.valor === null ? '' : o.valor) + '"' +
        ' aria-describedby="' + descritoPor.join(' ') + '">';
    }

    /* Hint derivado del descriptor: default y límites. Nunca escrito a mano. */
    var partes = [];
    if (desc.porDefecto !== null && desc.porDefecto !== undefined) { partes.push('por defecto ' + desc.porDefecto); }
    if (desc.min !== null && desc.min !== undefined && desc.max !== null && desc.max !== undefined) {
      partes.push('entre ' + desc.min + ' y ' + desc.max);
    } else if (desc.min !== null && desc.min !== undefined) {
      partes.push('mínimo ' + desc.min);
    } else if (desc.max !== null && desc.max !== undefined) {
      partes.push('máximo ' + desc.max);
    }
    if (desc.unidad) { partes.push('en ' + desc.unidad); }
    if (desc.restriccion) { partes.push(desc.restriccion); }
    if (!partes.length) { partes.push('Sin valor por defecto ni límites declarados'); }
    partes.push('leyenda y ejemplos sin declarar (B-UX-04)');
    html += '<span class="mq-hint" id="' + idHint + '">' + esc(partes.join(' · ')) + '</span>';

    if (o.deshabilitado && desc.motivoDeshabilitado) {
      html += '<span class="mq-hint">' + esc(desc.motivoDeshabilitado) + '</span>';
    }
    if (o.error) {
      html += '<span class="mq-error-inline" id="' + idErr + '">' + esc(o.error) + '</span>';
    }
    if (o.ayuda) {
      html += '<div class="mq-ayuda"><strong>¿Qué es «' + esc(desc.etiqueta) + '»?</strong>' +
        '<p style="margin:var(--space-4) 0 0">La leyenda y los ejemplos de valor con su consecuencia se derivan del descriptor. ' +
        'Ninguna fuente los declara para este parámetro, de modo que la maqueta exhibe la ranura vacía en lugar de inventar el texto.</p>' +
        '<p class="mq-hint" style="margin:var(--space-4) 0 0">' + esc(desc.brecha) + '</p></div>';
    }
    html += '</div>';
    return html;
  }

  /* Ranura del asistente — Config-Esquema §4.7 */
  function ranuraAsistente() {
    return '<div class="mq-ranura-asistente" role="group" aria-label="Asistente de configuración, no disponible" aria-disabled="true">' +
      icono('info', 18) +
      '<div><strong>Asistente de configuración</strong>' +
      '<span class="mq-hint">Ranura reservada, deshabilitada. Contradicción declarada C-UX-03.</span></div>' +
      '<span class="mq-distintivo-preliminar mq-empuje">próximamente</span></div>';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     4. Shell (Web-Generico §3.1 · Acceso-Monousuario §3)
     ═══════════════════════════════════════════════════════════════════════ */

  function navLateral(sup) {
    var html = '<div class="mq-identidad-producto">' + icono('caja', 20) + '<span>SelfHosted</span></div>';
    D.NAVEGACION.forEach(function (item) {
      var activo = item.archivo === sup.archivo;
      html += '<a class="mq-nav-item" href="' + esc(item.archivo) + '"' +
        (activo ? ' aria-current="page"' : '') + '>' + icono(item.icono) + '<span>' + esc(item.etiqueta) + '</span></a>';
    });
    html += '<hr class="mq-nav-sep">';
    html += '<span class="mq-meta" style="padding:0 var(--space-8);opacity:.72">Proyecto abierto</span>';
    D.NAVEGACION_PROYECTO.forEach(function (item) {
      var activo = item.archivo === sup.archivo;
      html += '<a class="mq-nav-item" href="' + esc(item.archivo) + '"' +
        (activo ? ' aria-current="page"' : '') + '>' + icono(item.icono) + '<span>' + esc(item.etiqueta) + '</span></a>';
    });
    return html;
  }

  /* Barra de identidad — Acceso-Monousuario §4.3: identidad activa y las dos
     acciones, con ícono y etiqueta textual, nunca colapsadas a solo ícono. */
  function barraIdentidad() {
    return '<div class="mq-barra-identidad">' +
      '<span class="mq-identidad-activa">' + esc(D.IDENTIDAD.usuario) + '</span>' +
      '<a class="mq-btn" href="Cambio-De-Contrasena.html">' + icono('lock') + ' Cambiar contraseña</a>' +
      '<button type="button" class="mq-btn" aria-label="Cerrar la sesión y volver a la pantalla de acceso">' +
      icono('salir') + ' Salir</button></div>';
  }

  function pieMaqueta() {
    var m = D.MAQUETA;
    return '<div><strong>Proyecto</strong> ' + esc(m.proyecto) + '</div>' +
      '<div><strong>Modelo UX-UI</strong> ' + esc(m.modeloUxUiCorto) + '</div>' +
      '<div><strong>Iteración</strong> ' + esc(m.fechaIteracion) + '</div>' +
      '<div><a href="index.html">Índice de la maqueta</a></div>';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     5. Barra de validación de maqueta (instrumento, no producto)
     ═══════════════════════════════════════════════════════════════════════ */

  var CLAVE_RECARGA = 'maqueta-selfhosted:recarga-automatica';

  var Recarga = {
    intervaloMs: 3000,          /* dentro del rango de 2 a 5 s de §4.3 */
    temporizador: null,
    firmas: {},
    recursos: [],
    disponible: function () { return global.location.protocol !== 'file:'; },
    activa: function () {
      try { return global.localStorage.getItem(CLAVE_RECARGA) === '1'; } catch (e) { return false; }
    },
    fijar: function (valor) {
      try { global.localStorage.setItem(CLAVE_RECARGA, valor ? '1' : '0'); } catch (e) { /* sin persistencia */ }
    },
    /* Identificador de versión del recurso: se compara ETag o Last-Modified
       de una petición HEAD. No se descarga el archivo completo. */
    firmaDe: function (url) {
      return fetch(url, { method: 'HEAD', cache: 'no-store' }).then(function (r) {
        return r.headers.get('ETag') || r.headers.get('Last-Modified') || String(r.status);
      });
    },
    sondear: function () {
      if (global.document.hidden) { return; }   /* suspensión con pestaña no visible */
      var self = this;
      self.recursos.forEach(function (url) {
        self.firmaDe(url).then(function (firma) {
          if (self.firmas[url] === undefined) { self.firmas[url] = firma; return; }
          if (self.firmas[url] !== firma) { global.location.reload(); }
        }).catch(function () { /* degradación silenciosa */ });
      });
    },
    arrancar: function () {
      if (!this.disponible() || this.temporizador) { return; }
      var doc = global.document;
      this.recursos = [
        doc.location.pathname,
        'assets/css/Estilos-Maqueta.css',
        'assets/js/Datos-Maqueta.js',
        'assets/js/Maqueta.js'
      ];
      this.firmas = {};
      this.sondear();
      this.temporizador = global.setInterval(this.sondear.bind(this), this.intervaloMs);
    },
    detener: function () {
      if (this.temporizador) { global.clearInterval(this.temporizador); this.temporizador = null; }
    }
  };

  function barraValidacion(sup, estadoActual) {
    var m = D.MAQUETA;
    var html = '<span class="mq-barra-rotulo">' + esc(m.rotuloBarra) + '</span>';
    html += '<div class="mq-barra-fila">';

    /* Selector de superficie */
    html += '<div class="mq-barra-campo"><label for="mq-sel-superficie">Superficie</label>' +
      '<select id="mq-sel-superficie">';
    D.SUPERFICIES.forEach(function (s) {
      html += '<option value="' + esc(s.archivo) + '"' + (s.id === sup.id ? ' selected' : '') + '>' +
        esc(s.id) + ' · ' + esc(s.nombre) + '</option>';
    });
    html += '</select></div>';

    /* Selector de estado */
    html += '<div class="mq-barra-campo"><label for="mq-sel-estado">Estado</label>' +
      '<select id="mq-sel-estado">';
    sup.estados.forEach(function (e) {
      html += '<option value="' + esc(e.id) + '"' + (e.id === estadoActual ? ' selected' : '') + '>' +
        esc(e.etiqueta) + '</option>';
    });
    html += '</select></div>';
    html += '<span class="mq-barra-motivo">' + sup.estados.length + ' estados demostrables</span>';

    /* Interruptor de recarga automática */
    var puede = Recarga.disponible();
    html += '<div class="mq-barra-campo">' +
      '<input type="checkbox" id="mq-recarga"' +
      (puede && Recarga.activa() ? ' checked' : '') +
      (puede ? '' : ' disabled') +
      (puede ? '' : ' aria-describedby="mq-recarga-motivo"') + '>' +
      '<label for="mq-recarga">Recarga automática</label></div>';
    if (!puede) {
      html += '<span class="mq-barra-motivo" id="mq-recarga-motivo">' +
        'Deshabilitada: la maqueta se abrió desde el sistema de archivos (file://) y la consulta de versión de recurso no funciona. ' +
        'Servila desde un servidor local para habilitarla.</span>';
    }

    html += '<span class="mq-barra-motivo mq-empuje">' + esc(m.navegadorSoportado) + '</span>';
    html += '</div>';

    /* Nota de propuesta abierta, sólo en las superficies que alojan una */
    var p = D.propuestaDe(sup.id);
    if (p) {
      html += '<div class="mq-barra-nota"><strong>' + esc(p.titulo) + '</strong> — ' + esc(p.texto) + '</div>';
    }
    return html;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     6. Renderizadores por superficie
     ═══════════════════════════════════════════════════════════════════════ */

  var R = {};

  /* ── SUP-01 · Aprovisionamiento inicial ───────────────────────────────── */
  R['SUP-01'] = function (sup, estado) {
    if (estado === 'cargando') {
      return '<div class="mq-tarjeta-angosta">' +
        '<h2 class="mq-titulo-seccion">Preparando la instancia</h2>' +
        progresoLineal() +
        '<p class="mq-caption" role="status">Resolviendo el destino. La espera es breve por contrato.</p></div>';
    }
    if (estado === 'envio-fuera-de-tiempo') {
      return '<div class="mq-tarjeta-angosta">' +
        '<h2 class="mq-titulo-seccion">Redirección neutra</h2>' +
        progresoLineal() +
        '<p class="mq-caption">El sistema se aprovisionó entre la carga y el envío. La superficie redirige a ' +
        '<a href="Acceso-Al-Panel.html">Acceso al panel</a> sin exponer por qué rechazó, y sin dejar ningún mensaje acá.</p></div>';
    }
    if (estado === 'exito') {
      return '<div class="mq-tarjeta-angosta">' +
        '<h2 class="mq-titulo-seccion">Administrador creado</h2>' +
        '<p class="mq-caption">El lazo se cierra en la superficie de destino: el acuse <code>IDENTIDAD-CREADA</code> ' +
        'se exhibe en <a href="Listado-De-Proyectos.html">Listado de proyectos</a>, que es <code>destinoAlCompletar</code>.</p></div>';
    }

    var errores = {
      'requisito-no-cumplido': 'REQUISITO-NO-CUMPLIDO',
      'confirmacion-no-coincidente': 'CONFIRMACION-NO-COINCIDENTE',
      'formulario-vencido': 'FORMULARIO-VENCIDO'
    };
    var html = '<div class="mq-tarjeta-angosta">';
    html += '<h2 class="mq-titulo-seccion">Crear el administrador</h2>';
    html += '<p class="mq-subtitulo">Es la única cuenta del sistema. Se crea una sola vez y no se puede recuperar la contraseña.</p>';

    if (errores[estado]) { html += banda(errores[estado]); }
    if (estado === 'dato-obligatorio-ausente') {
      html += banda(null, { variante: 'error', texto: 'Falta completar el nombre de usuario.' });
    }

    var invalido = estado === 'dato-obligatorio-ausente';
    html += '<div class="mq-campo"><label for="ap-usuario">Nombre de usuario</label>' +
      '<input class="mq-input" id="ap-usuario" name="username" autocomplete="username" type="text"' +
      (invalido ? ' aria-invalid="true" aria-describedby="ap-usuario-err"' : '') + '>' +
      (invalido ? '<span class="mq-error-inline" id="ap-usuario-err">Este dato es obligatorio.</span>' : '') + '</div>';

    var reqInvalido = estado === 'requisito-no-cumplido';
    html += '<div class="mq-campo"><label for="ap-pass">Contraseña</label>' +
      '<input class="mq-input" id="ap-pass" name="new-password" autocomplete="new-password" type="password"' +
      ' aria-describedby="ap-req"' + (reqInvalido ? ' aria-invalid="true"' : '') + '>' +
      '<span class="mq-hint" id="ap-req">' + esc(D.REQUISITO_CONTRASENA.marcador) + '</span></div>';

    var confInvalido = estado === 'confirmacion-no-coincidente';
    html += '<div class="mq-campo"><label for="ap-pass2">Confirmación de la contraseña</label>' +
      '<input class="mq-input" id="ap-pass2" name="new-password-confirm" autocomplete="new-password" type="password"' +
      (confInvalido ? ' aria-invalid="true"' : '') + '></div>';

    if (estado === 'enviando') {
      html += '<button type="button" class="mq-btn mq-btn--primario mq-btn--ancho" disabled>' +
        spinner() + ' Creando el administrador…</button>';
    } else {
      html += '<button type="button" class="mq-btn mq-btn--primario mq-btn--ancho">Crear el administrador</button>';
    }
    html += '<p class="mq-hint" style="margin-top:var(--space-14)">Sin acción de cancelar y sin sello de versión: ' +
      'las dos ausencias son decisión declarada del wireframe, no omisión.</p>';
    html += '</div>';
    return html;
  };

  /* ── SUP-02 · Acceso al panel ─────────────────────────────────────────── */
  R['SUP-02'] = function (sup, estado) {
    var variantesSello = { 'sello-preliminar': 'preliminar', 'sello-indeterminado': 'indeterminado' };
    var codigos = {
      'credencial-rechazada': 'CREDENCIAL-RECHAZADA',
      'acceso-restringido': 'ACCESO-RESTRINGIDO',
      'formulario-vencido': 'FORMULARIO-VENCIDO',
      'identidad-creada': 'IDENTIDAD-CREADA',
      'secreto-actualizado': 'SECRETO-ACTUALIZADO',
      'sesion-vencida': 'SESION-VENCIDA'
    };

    var html = '<div class="mq-tarjeta-angosta">';
    html += '<h2 class="mq-titulo-seccion">Iniciar sesión</h2>';
    if (codigos[estado]) { html += banda(codigos[estado]); }

    html += '<div class="mq-campo"><label for="ac-usuario">Nombre de usuario</label>' +
      '<input class="mq-input" id="ac-usuario" name="username" autocomplete="username" type="text"></div>';
    html += '<div class="mq-campo"><label for="ac-pass">Contraseña</label>' +
      '<input class="mq-input" id="ac-pass" name="current-password" autocomplete="current-password" type="password"></div>';

    if (estado === 'enviando') {
      html += '<button type="button" class="mq-btn mq-btn--primario mq-btn--ancho" disabled>' + spinner() + ' Iniciando sesión…</button>';
    } else {
      html += '<button type="button" class="mq-btn mq-btn--primario mq-btn--ancho">Iniciar sesión</button>';
    }

    html += '<div style="margin-top:var(--space-18)">' + sello(variantesSello[estado] || 'publicada', { centrado: true }) + '</div>';
    html += '<p class="mq-hint" style="text-align:center">El sello no abre el detalle acá: el diagnóstico completo vive en ' +
      '<a href="Configuracion-Del-Sistema.html">Configuración del sistema</a>.</p>';
    html += '</div>';
    html += '<p class="mq-hint" style="text-align:center;max-width:var(--card-narrow-width);margin:var(--space-12) auto 0">' +
      'Sin registro · sin recordarme · sin recuperación · sin selector de cuenta · sin roles. ' +
      'Lo que no aplica, no se dibuja.</p>';
    return html;
  };

  /* ── SUP-03 · Cambio de contraseña ────────────────────────────────────── */
  R['SUP-03'] = function (sup, estado) {
    if (estado === 'cargando') {
      return '<div class="mq-panel" style="max-width:460px">' + esqueleto(4) + '</div>';
    }
    if (estado === 'sesion-vencida') {
      return '<div class="mq-panel" style="max-width:460px">' +
        banda('SESION-VENCIDA') +
        '<p class="mq-caption">La sesión venció con la superficie abierta. La navegación devuelve al shell de acceso con el estado declarado: ' +
        'no hay vencimiento silencioso que se manifieste como un rechazo arbitrario al guardar.</p>' +
        '<p><a class="mq-btn" href="Acceso-Al-Panel.html">Ir a Acceso al panel</a></p></div>';
    }
    if (estado === 'exito') {
      return '<div class="mq-panel" style="max-width:460px">' +
        '<p class="mq-caption">El acuse se exhibe en la superficie siguiente con el código <code>SECRETO-ACTUALIZADO</code>. ' +
        'Cuál es esa superficie depende del efecto sobre la sesión, que ninguna fuente declara.</p>' +
        '<p class="mq-hint">B-UX-11 · el destino de la navegación posterior no se elige por conveniencia.</p></div>';
    }

    var codigos = {
      'secreto-actual-incorrecto': 'SECRETO-ACTUAL-INCORRECTO',
      'requisito-no-cumplido': 'REQUISITO-NO-CUMPLIDO',
      'confirmacion-no-coincidente': 'CONFIRMACION-NO-COINCIDENTE',
      'formulario-vencido': 'FORMULARIO-VENCIDO'
    };

    var html = '<div class="mq-panel" style="max-width:460px">';
    if (codigos[estado]) { html += banda(codigos[estado]); }
    html += '<div class="mq-campo"><label for="cc-actual">Contraseña actual</label>' +
      '<input class="mq-input" id="cc-actual" name="current-password" autocomplete="current-password" type="password"' +
      (estado === 'secreto-actual-incorrecto' ? ' aria-invalid="true"' : '') + '></div>';
    html += '<div class="mq-campo"><label for="cc-nueva">Contraseña nueva</label>' +
      '<input class="mq-input" id="cc-nueva" name="new-password" autocomplete="new-password" type="password" aria-describedby="cc-req"' +
      (estado === 'requisito-no-cumplido' ? ' aria-invalid="true"' : '') + '>' +
      '<span class="mq-hint" id="cc-req">' + esc(D.REQUISITO_CONTRASENA.marcador) + '</span></div>';
    html += '<div class="mq-campo"><label for="cc-conf">Confirmación de la contraseña nueva</label>' +
      '<input class="mq-input" id="cc-conf" name="new-password-confirm" autocomplete="new-password" type="password"' +
      (estado === 'confirmacion-no-coincidente' ? ' aria-invalid="true"' : '') + '></div>';
    html += '<div class="mq-banda mq-banda--info" role="note">' + icono('info') +
      '<div><span>Efecto sobre la sesión en curso: sin declarar.</span>' +
      '<span class="mq-hint">B-UX-11 · el componente que lo enuncia existe; su texto no se escribe hasta que la política se declare.</span></div></div>';
    html += '<div class="mq-acciones"><a class="mq-btn" href="Listado-De-Proyectos.html">Volver</a>' +
      (estado === 'enviando' ? botonEnviando('Guardando…')
        : '<button type="button" class="mq-btn mq-btn--primario">Guardar</button>') + '</div>';
    html += '</div>';
    return html;
  };

  /* ── SUP-04 · Listado de proyectos ────────────────────────────────────── */
  function tarjetaProyecto(p, forzarEstado) {
    var mapa = { 'activo': 'activo', 'parcialmente-activo': 'degradado', 'detenido': 'detenido' };
    var estadoBase = forzarEstado || p.estado;
    var clave = mapa[estadoBase] || 'detenido';
    var etiquetaExtra = estadoBase === 'parcialmente-activo' ? 'Parcialmente activo' : null;
    var conteo = p.serviciosActivos + '/' + p.serviciosTotales + ' activos';
    var nombreAccesible = p.nombre + ', ' + (etiquetaExtra || ETIQUETAS_ESTADO[clave]) + ', ' + conteo;

    var html = '<article class="mq-tarjeta" aria-label="' + esc(nombreAccesible) + '">';
    html += '<div class="mq-fila">' + parEstado(clave, { etiqueta: etiquetaExtra || undefined }) + '</div>';
    html += '<h3>' + esc(p.nombre) + '</h3>';
    html += '<div class="mq-tarjeta-datos">' +
      '<span class="mq-literal">' + esc(p.slug) + '</span>' +
      '<span>' + esc(conteo) + '</span>' +
      (estadoBase === 'detenido'
        ? '<span>Sin cifras de consumo: mostrar cero afirmaría un consumo que no existe</span>'
        : '<span>CPU ' + n(p.cpuPorcentaje, '%') + ' · RAM ' + n(p.memoriaGb, 'GB') + '</span>') +
      '<span>red: ' + esc(p.red.modo) + ' · ' + esc(p.red.subred) + '</span>' +
      (p.cambiosPendientes ? '<span>' + n(p.cambiosPendientes) + ' cambios pendientes</span>' : '') +
      '</div>';
    html += '<div class="mq-fila"><a class="mq-btn" href="Lienzo-Del-Proyecto.html">Abrir lienzo</a>' +
      '<button type="button" class="mq-btn-icono" aria-label="Más acciones sobre ' + esc(p.nombre) + '">' + icono('list', 14) + '</button></div>';
    html += '</article>';
    return html;
  }

  R['SUP-04'] = function (sup, estado) {
    var html = '';

    if (estado === 'confirmacion-entrante') { html += banda('IDENTIDAD-CREADA'); }
    if (estado === 'exito-accion') { html += bandaOk('Proyecto creado. Se abrió su lienzo, que es su vista por defecto.'); }
    if (estado === 'identificador-en-uso') {
      html += bandaError('El identificador legible ya existe. El proyecto no se creó.');
    }
    if (estado === 'error') {
      html += bandaError('No se pudo traer el listado de proyectos. Volvé a intentar en unos segundos.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
      return html;
    }

    html += '<div class="mq-encabezado"><div>' +
      '<p class="mq-subtitulo">Cada proyecto SelfHosted agrupa los servicios de una arquitectura, con su red y su lienzo.</p></div>' +
      '<a class="mq-btn" href="Exportacion-E-Importacion.html">Importar</a>' +
      '<button type="button" class="mq-btn mq-btn--primario">' + icono('mas') + ' Nuevo proyecto</button></div>';

    if (estado === 'identificador-en-uso') {
      html += '<div class="mq-panel" style="max-width:460px;margin-bottom:var(--space-16)">' +
        '<h2 class="mq-titulo-seccion">Nuevo proyecto</h2>' +
        '<div class="mq-campo"><label for="np-slug">Identificador legible</label>' +
        '<input class="mq-input" id="np-slug" value="portal-interno" aria-invalid="true" aria-describedby="np-slug-err">' +
        '<span class="mq-error-inline" id="np-slug-err">Ya existe un proyecto con este identificador.</span></div>' +
        '<p class="mq-hint">La unicidad del nombre visible no se valida: ninguna fuente la exige (brecha B-03 de 02).</p></div>';
    }

    html += '<div class="mq-fila" style="margin-bottom:var(--space-16)">' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="lp-buscar">Buscar proyectos</label>' +
      '<input class="mq-input" id="lp-buscar" type="search" placeholder="Buscar…" style="width:220px"' +
      (estado === 'vacio-por-filtro' ? ' value="proyecto-que-no-existe"' : '') + '></div>' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="lp-estado">Filtrar por estado</label>' +
      '<select class="mq-select" id="lp-estado" style="width:170px"><option>Todos los estados</option>' +
      '<option>Activo</option><option>Parcialmente activo</option><option>Detenido</option></select></div></div>';

    if (estado === 'cargando') {
      return html + '<div class="mq-grilla-tarjetas">' +
        esqueleto(1, 'tarjeta') + esqueleto(1, 'tarjeta') + esqueleto(1, 'tarjeta') + '</div>';
    }

    if (estado === 'vacio-por-filtro') {
      return html + vacio('Ningún proyecto coincide con la búsqueda',
        'Probá con otro texto o limpiá el filtro para ver los tres proyectos declarados.',
        '<button type="button" class="mq-btn">Limpiar el filtro</button>');
    }

    if (estado === 'vacio-primer-uso') {
      html += vacio('Todavía no hay ningún proyecto SelfHosted',
        'Un proyecto agrupa los servicios de una arquitectura. Creá el primero, o incorporá lo que ya corre en el servidor.',
        '<button type="button" class="mq-btn">' + icono('mas') + ' Nuevo proyecto</button>');
      html += '<h2 class="mq-titulo-seccion" style="margin:var(--space-28) 0 var(--space-12)">Pasos sugeridos</h2>';
      html += '<p class="mq-hint" style="margin-bottom:var(--space-12)">Orientan, no bloquean. Derivación declarada como supuesto S-UX-01.</p>';
      html += '<div class="mq-grilla-tarjetas">' +
        [
          ['Crear el primer proyecto SelfHosted', 'Es el punto de entrada de todos los flujos del producto.', 'grid', '#'],
          ['Incorporar contenedores que ya corren', 'La herramienta es adoptable sobre un servidor que ya está en producción.', 'search', 'Descubrimiento-E-Incorporacion.html'],
          ['Declarar el rango de direcciones gestionado', 'Es precondición de todo servicio con dirección fija.', 'settings', 'Configuracion-Del-Sistema.html']
        ].map(function (t) {
          return '<article class="mq-tarjeta"><span class="mq-tarjeta-icono">' + icono(t[2], 18) + '</span>' +
            '<h3>' + esc(t[0]) + '</h3><p class="mq-caption" style="margin:0">' + esc(t[1]) + '</p>' +
            '<p style="margin:0"><a class="mq-btn" href="' + esc(t[3]) + '">Abrir</a></p></article>';
        }).join('') + '</div>';
      return html;
    }

    var lista;
    if (estado === 'proyecto-activo') { lista = [D.PROYECTOS[0]]; }
    else if (estado === 'proyecto-parcial') { lista = [D.PROYECTOS[1]]; }
    else if (estado === 'proyecto-detenido') { lista = [D.PROYECTOS[2]]; }
    else { lista = D.PROYECTOS; }

    var forzar = estado === 'proyecto-activo' ? 'activo' : null;
    html += '<div class="mq-grilla-tarjetas">' +
      lista.map(function (p) { return tarjetaProyecto(p, forzar); }).join('') + '</div>';
    return html;
  };

  /* ── SUP-05 · Lienzo del proyecto ─────────────────────────────────────── */

  var NODO_ANCHO = 260, NODO_ALTO = 132;

  /* La acción de alta del lienzo lleva al estado de alta del panel lateral.
     Hasta el paso 5 de esta fase no llevaba a ninguna parte: ninguna
     superficie de 03-UX-UI-DX materializaba los pasos 3 y 4 de CU-03. */
  function enlaceNuevoServicio(primario) {
    return '<a class="mq-btn' + (primario ? ' mq-btn--primario' : '') +
      '" href="Alta-De-Servicio.html">' +
      icono('mas') + ' Nuevo servicio</a>';
  }

  function nodoServicio(s, opciones) {
    var o = opciones || {};
    var estadoNodo = o.estado || s.estado;
    var etiqueta = o.etiquetaEstado || ETIQUETAS_ESTADO[estadoNodo];
    var nombreAccesible = s.nombre + ', ' + etiqueta;
    var html = '<div class="mq-nodo" data-estado="' + esc(estadoNodo) + '" style="left:' + s.posicion.x + 'px;top:' + s.posicion.y + 'px">';
    html += '<button type="button" class="mq-puerto mq-puerto--entrada" aria-label="Puerto de entrada de ' + esc(s.nombre) + '"><span></span></button>';
    html += '<button type="button" class="mq-puerto mq-puerto--salida" aria-label="Puerto de salida de ' + esc(s.nombre) + '"><span></span></button>';
    html += '<div class="mq-nodo-cabecera">' +
      '<span aria-hidden="true">' + icono(s.nombre === 'db' ? 'base' : 'caja', 18) + '</span>' +
      '<button type="button" class="mq-nodo-nombre" style="background:none;border:0;padding:0;text-align:left;cursor:pointer" ' +
      'aria-label="' + esc(nombreAccesible) + '. Abrir el panel del servicio">' + esc(s.nombre) + '</button>' +
      parEstado(estadoNodo, { etiqueta: etiqueta }) + '</div>';
    html += '<div class="mq-nodo-sub mq-literal">' + esc(s.origen.imagen) + ':' + esc(s.origen.etiqueta) + '</div>';
    if (s.metricas && !o.sinMetricas) {
      html += '<div class="mq-nodo-metricas">' +
        barraMagnitud(s.metricas.memoriaUsadaMb, s.metricas.memoriaLimiteMb, 'MB', 'Memoria de ' + s.nombre) +
        '<span class="mq-caption"> · CPU ' + n(s.metricas.cpuPorcentaje, '%') + '</span></div>';
    }
    html += '<div class="mq-nodo-red">' +
      esc(s.red.ipFija ? s.red.ipFija : 'alias ' + s.red.aliasDns) + ' · ' + esc(s.red.modo) + '</div>';
    html += '<div class="mq-nodo-pie">' + esc(s.politicaReinicio) + ' · ×' + esc(s.replicas) + ' réplicas</div>';
    if (o.causa) { html += '<div class="mq-estado-causa">' + esc(o.causa) + '</div>'; }
    html += '</div>';
    return html;
  }

  /* Agrupa las aristas del modelo en una arista visual por par de servicios. */
  function aristasVisuales(aristas) {
    var mapa = {};
    aristas.forEach(function (a) {
      var clave = a.origen + '>' + a.destino;
      if (!mapa[clave]) {
        mapa[clave] = { origen: a.origen, destino: a.destino, espera: false, referencias: [], valida: true };
      }
      mapa[clave].espera = mapa[clave].espera || a.esperaDestino;
      mapa[clave].valida = mapa[clave].valida && a.valida;
      if (a.claveVariable) { mapa[clave].referencias.push(a.claveVariable); }
    });
    return Object.keys(mapa).map(function (k) { return mapa[k]; });
  }

  /* Propuesta B-UX-01: tres canales por clase de arista. */
  function svgAristas(servicios, aristas, opciones) {
    var o = opciones || {};
    var pos = {};
    servicios.forEach(function (s) { pos[s.id] = s.posicion; });

    var partes = ['<svg class="mq-lienzo-svg" width="100%" height="100%" aria-hidden="true">',
      '<defs>',
      '<marker id="mq-punta-llena" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">',
      '<path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>',
      '<marker id="mq-punta-hueca" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">',
      '<path d="M0.5 0.5L9.5 5L0.5 9.5z" fill="none" stroke="currentColor" stroke-width="1.4"/></marker>',
      '</defs>'];

    aristas.forEach(function (a) {
      var pa = pos[a.origen], pb = pos[a.destino];
      if (!pa || !pb) { return; }
      var x1 = pa.x + NODO_ANCHO, y1 = pa.y + NODO_ALTO / 2;
      var x2 = pb.x, y2 = pb.y + NODO_ALTO / 2;
      var cx = (x1 + x2) / 2;
      var mx = cx, my = (y1 + y2) / 2;
      var invalida = o.invalida && a.origen === 101 && a.destino === 103;
      var clase = invalida ? 'mq-arista--invalida' : (a.espera ? 'mq-arista--espera' : 'mq-arista--sin-espera');
      var punta = invalida ? '' : (a.espera ? ' marker-end="url(#mq-punta-llena)"' : ' marker-end="url(#mq-punta-hueca)"');
      var color = invalida ? 'var(--color-text-danger)' : 'var(--color-text-secondary)';
      partes.push('<path class="mq-arista ' + clase + '" style="color:' + color + '" d="M' + x1 + ' ' + y1 +
        ' C' + cx + ' ' + y1 + ' ' + cx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '"' + punta + '/>');

      if (invalida) {
        partes.push('<g style="color:var(--color-text-danger)">' +
          '<circle cx="' + mx + '" cy="' + my + '" r="8" fill="var(--color-background-primary)" stroke="currentColor" stroke-width="1.4"/>' +
          '<path d="M' + (mx - 3.5) + ' ' + (my - 3.5) + 'L' + (mx + 3.5) + ' ' + (my + 3.5) +
          'M' + (mx + 3.5) + ' ' + (my - 3.5) + 'L' + (mx - 3.5) + ' ' + (my + 3.5) + '" stroke="currentColor" stroke-width="1.6"/></g>');
        partes.push('<text class="mq-arista-rotulo mq-arista-rotulo--invalida" x="' + mx + '" y="' + (my - 12) + '" text-anchor="middle">inválida</text>');
      } else if (a.espera) {
        partes.push('<g style="color:var(--color-text-secondary)">' +
          '<circle cx="' + mx + '" cy="' + my + '" r="8" fill="var(--color-background-primary)" stroke="currentColor" stroke-width="1.2"/>' +
          '<path d="M' + (mx - 2.5) + ' ' + (my - 3.5) + 'v7M' + (mx + 2.5) + ' ' + (my - 3.5) + 'v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></g>');
        partes.push('<text class="mq-arista-rotulo" x="' + mx + '" y="' + (my - 12) + '" text-anchor="middle">espera</text>');
      }
    });
    partes.push('</svg>');
    return partes.join('');
  }

  function leyendaAristas() {
    var p = D.PROPUESTA_ARISTAS;
    var html = '<div class="mq-leyenda-aristas" role="group" aria-label="Leyenda de aristas — propuesta a validar">';
    html += '<div><svg width="46" height="16" aria-hidden="true" style="color:var(--color-text-secondary)">' +
      '<path d="M2 8h30" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="22" cy="8" r="6" fill="var(--color-background-primary)" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M20 5.5v5M24 5.5v5" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M34 3l8 5-8 5z" fill="currentColor"/></svg> Declara espera al destino</div>';
    html += '<div><svg width="46" height="16" aria-hidden="true" style="color:var(--color-text-secondary)">' +
      '<path d="M2 8h30" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M34 3l8 5-8 5z" fill="none" stroke="currentColor" stroke-width="1.4"/></svg> No declara espera</div>';
    html += '<div><svg width="46" height="16" aria-hidden="true" style="color:var(--color-text-danger)">' +
      '<path d="M2 8h40" stroke="currentColor" stroke-width="2" stroke-dasharray="2 3"/>' +
      '<circle cx="22" cy="8" r="6" fill="var(--color-background-primary)" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M19.5 5.5l5 5M24.5 5.5l-5 5" stroke="currentColor" stroke-width="1.4"/></svg> Inválida · bloquea el arranque</div>';
    html += '</div>';
    html += '<div class="mq-nota-propuesta" style="margin-top:var(--space-12)"><strong>' + esc(p.titulo) + '</strong>' +
      '<p style="margin:var(--space-4) 0">' + esc(p.texto) + '</p><ul class="mq-lista-puntos">' +
      p.restricciones.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '<p class="mq-hint" style="margin:var(--space-8) 0 0">' + esc(p.nota) + '</p></div>';
    return html;
  }

  function panelActividad(proyecto, parcial) {
    var html = '<aside class="mq-panel" aria-label="Panel contextual del proyecto">';
    html += '<h2 class="mq-titulo-seccion">Actividad</h2>';
    html += '<ul class="mq-lista-limpia mq-pila-8" style="margin:var(--space-8) 0 var(--space-16)">' +
      [
        [parEstado('activo'), 'api desplegado', 'hace 2 min'],
        [parEstado('pendiente'), 'cache agregado', 'hace 5 min'],
        [parEstado('degradado'), 'conflicto de dirección resuelto', 'hace 12 min']
      ].map(function (e) {
        return '<li class="mq-caption">' + e[0] + ' ' + esc(e[1]) + '<span class="mq-hint">' + esc(e[2]) + '</span></li>';
      }).join('') + '</ul>';
    html += '<hr class="mq-separador">';
    html += '<h2 class="mq-titulo-seccion">Proyecto</h2>';
    html += filasClaveValor([
      ['Servicios', String(proyecto.serviciosTotales)],
      ['Activos', proyecto.serviciosActivos + ' de ' + proyecto.serviciosTotales],
      ['Red', proyecto.red.modo + ' · ' + proyecto.red.subred],
      ['Autoarranque', proyecto.autoArranque ? 'sí' : 'no']
    ]);
    if (parcial) {
      html += '<p class="mq-caption" style="margin-top:var(--space-12)">' +
        parEstado('degradado', { etiqueta: 'Parcialmente activo' }) +
        '<span class="mq-estado-causa">Es un estado legítimo del modelo, no una falla a resolver.</span></p>';
    }
    return html + '</aside>';
  }

  R['SUP-05'] = function (sup, estado) {
    var proyecto = D.PROYECTOS[0];
    var html = '';

    html += '<div class="mq-fila" style="margin-bottom:var(--space-12)">' +
      '<p class="mq-subtitulo" style="margin:0;margin-right:auto">' + esc(proyecto.nombre) + ' · ' + esc(proyecto.descripcion) + '</p>' +
      '<button type="button" class="mq-btn">' + icono('play') + ' Arrancar</button>' +
      '<button type="button" class="mq-btn">' + icono('stop') + ' Detener</button></div>';

    if (estado === 'error') {
      return html + bandaError('No se pudo traer el proyecto. El estado que ves puede no ser el actual.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }
    if (estado === 'canal-caido') {
      html += bandaAtencion('Se perdió la conexión con el servidor. Ningún despliegue en curso se cancela, se pausa ni se altera: lo único que se pierde es la vista. Reconectando…');
    }
    if (estado === 'arranque-bloqueado') {
      html += bandaError('El arranque quedó bloqueado por un conflicto de dirección. Se abre el informe con el ocupante identificado y sus resoluciones.') +
        '<p><a class="mq-btn" href="Informe-De-Conflicto-De-Direcciones.html">Abrir el informe de conflicto</a></p>';
    }
    if (estado === 'ciclo-rechazado') {
      html += bandaError('No se creó la arista: el trazado produce un ciclo en el subgrafo de aristas con espera. Ciclo: api → db → cache → api.');
    }
    if (estado === 'arista-sin-aporte') {
      html += bandaError('No se creó la arista: una arista tiene que aportar una referencia o una espera. Ésta no aporta ninguna de las dos.');
    }
    if (estado === 'arista-duplicada') {
      html += bandaError('Ya existe una arista de espera sin variable entre cache y db. Entre dos servicios no puede haber más de una.');
    }
    if (estado === 'arista-invalida') {
      html += bandaError('La arista de api a db referencia el host del destino y no hay canal alcanzable: queda marcada inválida y bloquea el arranque.');
    }

    /* Banner de cambios pendientes: sólo si hay cambios */
    var conBanner = ['con-datos', 'con-cambios-pendientes', 'nodo-pendiente', 'proyecto-parcial', 'canal-caido'].indexOf(estado) >= 0;
    if (conBanner) {
      html += '<div class="mq-banner-pendientes" role="region" aria-label="Cambios pendientes de aplicar">' +
        icono('alert') +
        '<span><span class="mq-contador">' + n(proyecto.cambiosPendientes) + '</span> cambios pendientes</span>' +
        '<span class="mq-acciones"><a class="mq-btn" href="Cajon-De-Cambios-Pendientes.html">Ver detalle</a>' +
        '<button type="button" class="mq-btn mq-btn--primario">Aplicar</button></span></div>';
    } else if (estado === 'sin-cambios-pendientes') {
      html += '<p class="mq-hint">Sin cambios pendientes: el banner no se muestra. Su ausencia es la información.</p>';
    }

    if (estado === 'cargando') {
      return html + progresoLineal() + '<div class="mq-lienzo-marco">' + esqueleto(3, 'bloque') +
        '<p class="mq-caption" role="status">Verificando el estado real de cada contenedor contra el motor antes de pintar el lienzo.</p></div>';
    }

    if (estado === 'vacio') {
      return html + '<div class="mq-lienzo-layout"><div>' +
        vacio('Este proyecto todavía no tiene servicios',
          'Un servicio es un contenedor con su configuración. Agregá el primero desde una imagen, un repositorio, un archivo de construcción o el catálogo.',
          enlaceNuevoServicio(true)) +
        '</div>' + panelActividad(proyecto, false) + '</div>';
    }

    /* Servicios y aristas a dibujar según el estado */
    var servicios = D.SERVICIOS.slice();
    var opcionesNodo = {};
    if (estado === 'nodo-pendiente') {
      servicios = servicios.map(function (s) { return s; });
      opcionesNodo[102] = { estado: 'pendiente' };
    }
    if (estado === 'nodo-huerfano') {
      servicios = servicios.concat([D.SERVICIO_INCORPORADO]);
    }
    if (estado === 'con-datos' || estado === 'con-cambios-pendientes' || estado === 'proyecto-parcial') {
      opcionesNodo[102] = { estado: 'fallido', causa: D.SERVICIOS[1].causa };
    }

    html += '<div class="mq-lienzo-layout"><div class="mq-lienzo-marco">';
    html += '<div class="mq-lienzo"><div class="mq-lienzo-nodos">';
    html += svgAristas(servicios, aristasVisuales(D.ARISTAS), { invalida: estado === 'arista-invalida' });
    servicios.forEach(function (s) {
      html += nodoServicio(s, opcionesNodo[s.id] || {});
    });
    html += '</div></div>';
    html += leyendaAristas();
    html += '<div class="mq-fila" style="margin-top:var(--space-12)">' +
      enlaceNuevoServicio(true) +
      '<button type="button" class="mq-btn">Ajustar encuadre</button>' +
      '<button type="button" class="mq-btn">Minimapa</button></div>';
    html += '<p class="mq-hint" style="margin-top:var(--space-8)">Mover un nodo se guarda al instante, no entra al conjunto de cambios pendientes ' +
      'y no marca redespliegue. Alternativa por teclado: enfocá un nodo y usá las teclas de dirección.</p>';
    html += '</div>';
    html += panelActividad(proyecto, estado === 'proyecto-parcial');
    html += '</div>';
    return html;
  };

  /* ── SUP-06 · Panel lateral del servicio ──────────────────────────────── */
  var PESTANAS = ['General', 'Variables', 'Red', 'Recursos', 'Montajes', 'Despliegues', 'Logs'];

  /* Nota de propuesta abierta, reutilizable por cualquier superficie. */
  function notaPropuesta(p) {
    var lista = p.restricciones || p.alcance || [];
    return '<div class="mq-nota-propuesta"><strong>' + esc(p.titulo) + '</strong>' +
      '<p style="margin:var(--space-4) 0">' + esc(p.texto) + '</p>' +
      (lista.length ? '<ul class="mq-lista-puntos">' + lista.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' : '') +
      '</div>';
  }

  /* Campo del formulario de alta, derivado de su declaración en Datos-Maqueta.
     Un campo sin ejemplo en la documentación se dibuja vacío y declara por qué:
     no se inventa el valor. */
  function campoAlta(c, opciones) {
    var o = opciones || {};
    var idc = id('alta');
    var idHint = idc + '-hint';
    var idErr = idc + '-err';
    var describe = [idHint];
    if (o.error) { describe.push(idErr); }

    var html = '<div class="mq-campo">';
    if (c.tipo !== 'booleano') {
      html += '<label for="' + idc + '">' + esc(c.etiqueta) +
        (c.requerido ? ' <span class="mq-meta">(obligatorio)</span>' : '') + '</label>';
    }

    if (c.tipo === 'seleccion') {
      if (c.enum && c.enum.length) {
        html += '<select class="mq-select" id="' + idc + '" aria-describedby="' + describe.join(' ') + '"' +
          (o.error ? ' aria-invalid="true"' : '') + '>';
        c.enum.forEach(function (v) {
          html += '<option' + (v === c.ejemplo ? ' selected' : '') + '>' + esc(v) + '</option>';
        });
        html += '</select>';
      } else {
        html += '<select class="mq-select" id="' + idc + '" aria-describedby="' + describe.join(' ') + '" disabled>' +
          '<option>Sin conjunto de valores declarado</option></select>';
      }
    } else if (c.tipo === 'booleano') {
      html += '<label class="mq-toggle" for="' + idc + '"><input type="checkbox" id="' + idc + '"' +
        (c.ejemplo === 'true' ? ' checked' : '') + ' aria-describedby="' + describe.join(' ') + '"> ' +
        '<span>' + esc(c.etiqueta) + '</span></label>';
    } else {
      html += '<input class="mq-input" type="text" id="' + idc + '"' +
        (o.error ? ' aria-invalid="true"' : '') +
        ' value="' + esc(o.valor !== undefined ? o.valor : (c.ejemplo || '')) + '"' +
        ' aria-describedby="' + describe.join(' ') + '">';
    }

    var hint = c.sinEjemplo
      ? c.sinEjemplo
      : 'Ejemplo tomado del anexo ' + (c.fuente || 'sin declarar') + '. Leyenda y ejemplos de consecuencia sin declarar (B-UX-04).';
    html += '<span class="mq-hint" id="' + idHint + '">' + esc(hint) + '</span>';
    if (o.error) {
      html += '<span class="mq-error-inline" id="' + idErr + '">' + esc(o.error) + '</span>';
    }
    return html + '</div>';
  }

  /* Estado de alta de servicio — pasos 3 y 4 de CU-03. PROPUESTA A VALIDAR. */
  function panelAltaDeServicio(estado) {
    var a = D.ALTA_SERVICIO;
    var origenElegido = estado === 'alta-rechazo-repositorio' ? 'repositorio' : 'imagen';
    var errNombre = estado === 'alta-rechazo-nombre';

    var html = '<div class="mq-panel" style="max-width:560px">';

    html += '<div class="mq-panel-cabecera"><div><h2>Nuevo servicio</h2>' +
      '<p class="mq-caption" style="margin:var(--space-4) 0 0">En ' + esc(D.PROYECTOS[0].nombre) + '. ' +
      'Todavía no hay servicio: el panel no exhibe estado de ejecución ni acciones de despliegue.</p></div>' +
      '<button type="button" class="mq-btn-icono" aria-label="Cerrar el alta sin crear el servicio">' + icono('cerrar', 14) + '</button></div>';

    html += notaPropuesta(a.propuesta);

    if (errNombre) { html += bandaError(a.rechazoNombre); }
    if (estado === 'alta-rechazo-repositorio') { html += bandaError(a.rechazoRepositorio); }

    /* Paso 3 — nombre y su condición de alias */
    html += '<h3 class="mq-titulo-seccion">Paso 3 · Nombre del servicio</h3>';
    var n3 = a.nombre;
    html += campoAlta({
      clave: n3.clave, etiqueta: n3.etiqueta, tipo: 'texto', requerido: true,
      ejemplo: errNombre ? 'Portal API' : n3.ejemploDeLaFuente, fuente: 'E-2'
    }, { error: errNombre ? n3.restriccion : null });
    html += '<div class="mq-banda mq-banda--info" role="note">' + icono('info') +
      '<div><span>' + esc(n3.advertenciaAlias) + '</span></div></div>';
    html += '<p class="mq-hint">Límites derivados de RN-01, que sí está declarada: ' + esc(n3.restriccion) + '</p>';

    /* Paso 4 — elección del origen entre las tres variantes de E-2 */
    html += '<hr class="mq-separador">';
    html += '<h3 class="mq-titulo-seccion">Paso 4 · Origen del servicio</h3>';
    html += '<p class="mq-caption">Las tres variantes que el anexo E-2 declara. El catálogo no es un cuarto origen: ' +
      'es una cuarta vía de alta que resuelve a una de estas tres.</p>';
    html += '<div class="mq-opciones" role="radiogroup" aria-label="Origen del servicio">';
    a.origenes.forEach(function (o) {
      var rid = id('org');
      html += '<label class="mq-opcion" for="' + rid + '">' +
        '<input type="radio" name="origen-servicio" id="' + rid + '"' + (o.id === origenElegido ? ' checked' : '') + '>' +
        '<span><strong>' + esc(o.etiqueta) + '</strong><span class="mq-hint">' + esc(o.descripcion) +
        (o.reglaPropia ? ' ' + esc(o.reglaPropia) : '') + '</span></span></label>';
    });
    html += '</div>';

    /* Campos del origen elegido */
    var origen = a.origenes[0];
    a.origenes.forEach(function (o) { if (o.id === origenElegido) { origen = o; } });

    html += '<h4 class="mq-titulo-seccion" style="margin-top:var(--space-16)">' + esc(origen.etiqueta) + '</h4>';
    html += '<div class="mq-grilla-campos">';
    origen.campos.forEach(function (c) {
      var err = null;
      if (estado === 'alta-rechazo-repositorio' && (c.clave === 'rama' || c.clave === 'rutaDockerfile')) {
        err = 'Este dato es obligatorio para el origen repositorio (RN-08).';
      }
      html += campoAlta(c, err ? { error: err, valor: '' } : {});
    });
    html += '</div>';

    /* Continuación: pasos 5 y 6 en las pestañas ya especificadas */
    html += '<hr class="mq-separador">';
    html += '<div class="mq-banda mq-banda--info" role="note">' + icono('info') +
      '<div><span>' + esc(a.continuacion) + '</span></div></div>';

    /* Una sola acción primaria en la superficie */
    html += '<div class="mq-acciones"><button type="button" class="mq-btn">Cancelar</button>' +
      '<button type="button" class="mq-btn mq-btn--primario" ' +
      'aria-label="Guardar el alta y agregarla al conjunto pendiente, sin desplegar">Guardar cambio</button></div>';
    html += '<p class="mq-hint">Guardar no despliega: el servicio entra al conjunto de cambios pendientes y su nodo aparece ' +
      'en el lienzo en estado pendiente de aplicar.</p>';
    return html + '</div>';
  }

  /* ── SUP-17 · Alta de servicio ─────────────────────────────────────────
     PROPUESTA A VALIDAR. Superficie propia, decidida por el agente humano en la
     segunda iteracion del paso 5, tras ver que alojar el alta en el panel
     contextual contradecia su regla de existir solo con un servicio
     seleccionado. Todavia no tiene wireframe: lo emite AG-03 en el paso 6. */
  R['SUP-17'] = function (sup, estado) {
    return panelAltaDeServicio(estado === 'con-datos' ? 'alta-de-servicio' : estado);
  };

  R['SUP-06'] = function (sup, estado) {
    var s = D.SERVICIOS[0];
    var descs = D.DESCRIPTORES.servicio;
    function desc(clave) {
      for (var i = 0; i < descs.length; i++) { if (descs[i].clave === clave) { return descs[i]; } }
      return descs[0];
    }

    var html = '<div class="mq-panel" style="max-width:520px">';

    /* Cabecera con par de estado y acciones de ejecución */
    html += '<div class="mq-panel-cabecera"><div>' +
      '<h2>' + esc(s.nombre) + '</h2>';
    if (estado === 'sin-despliegue') {
      html += parEstado('detenido', { etiqueta: 'Sin despliegue' });
    } else if (estado === 'despliegue-fallido') {
      html += parEstado('fallido', { causa: 'La imagen no existe en el registro' });
    } else if (estado === 'requiere-redespliegue') {
      html += parEstado('activo', { antiguedad: '1 h 12 min' }) +
        '<span class="mq-estado-causa">' + parEstado('pendiente', { etiqueta: 'Requiere redespliegue' }) + '</span>';
    } else {
      html += parEstado('activo', { antiguedad: '1 h 12 min' });
    }
    html += '</div><button type="button" class="mq-btn-icono" aria-label="Cerrar el panel del servicio">' + icono('cerrar', 14) + '</button></div>';

    var sinDespliegue = estado === 'sin-despliegue';
    html += '<div class="mq-fila" style="margin-bottom:var(--space-12)">' +
      '<button type="button" class="mq-btn"' + (sinDespliegue ? ' disabled' : '') + '>' + icono('refresh') + ' Reiniciar</button>' +
      (estado === 'enviando'
        ? botonEnviando('Redesplegando…')
        : '<button type="button" class="mq-btn">' + icono('play') + ' Redesplegar</button>') +
      '<button type="button" class="mq-btn"' + (sinDespliegue ? ' disabled' : '') + '>' + icono('stop') + ' Parar</button></div>';
    if (sinDespliegue) {
      html += '<p class="mq-hint">Reiniciar y parar quedan deshabilitadas: no hay despliegue sobre el que actuar.</p>';
    }

    /* Pestañas */
    html += '<div class="mq-pestanas" role="tablist" aria-label="Dimensiones de configuración del servicio">';
    PESTANAS.forEach(function (p, i) {
      var sel = (estado === 'campo-deshabilitado' && p === 'Red') ? i === 2 : i === 0;
      html += '<button type="button" class="mq-pestana" role="tab" aria-selected="' + (sel ? 'true' : 'false') +
        '" tabindex="' + (sel ? '0' : '-1') + '">' + esc(p) + '</button>';
    });
    html += '</div>';

    if (estado === 'cargando') {
      return html + esqueleto(6) + '</div>';
    }

    /* Bandas de rechazo */
    if (estado === 'error-dominio') {
      html += bandaError('La dirección 192.168.1.129 está excluida del rango gestionado. La siguiente libre es 192.168.1.141.');
    }
    if (estado === 'error-referencia') {
      html += bandaError('La expresión ${{ db.POSTGRES_USER }} forma un ciclo de valor: api · DB_USER → db · POSTGRES_USER → api · DB_USER.');
    }
    if (estado === 'cambio-guardado') {
      html += bandaOk('El cambio quedó pendiente y no aplicado. El contador del banner del lienzo subió a 5.');
    }
    if (estado === 'requiere-redespliegue') {
      html += bandaAtencion('Este servicio quedó marcado para redespliegue: cambió el valor de una variable que referencia.');
    }

    /* Cuerpo de la pestaña General o Red */
    if (estado === 'campo-deshabilitado') {
      html += '<div class="mq-grilla-campos">';
      html += campoDescriptor(desc('modoRed'), { valor: 'macvlan' });
      html += campoDescriptor(desc('ipFija'), { valor: '192.168.1.139' });
      html += '</div>';
      html += campoDescriptor(desc('publicarPuertos'), { deshabilitado: true, valor: false });
      html += '<p class="mq-hint">El control se deshabilita y declara su motivo: no se oculta. El administrador tiene que entender por qué no puede.</p>';
    } else {
      html += '<div class="mq-grilla-campos">';
      html += campoDescriptor(desc('origenTipo'), { valor: 'Imagen de registro' });
      html += campoDescriptor(desc('imagen'), { valor: s.origen.imagen });
      html += campoDescriptor(desc('etiqueta'), {
        valor: estado === 'campo-en-error' ? '' : s.origen.etiqueta,
        error: estado === 'campo-en-error' ? 'La etiqueta es obligatoria cuando la política de actualización es «fijada».' : null
      });
      html += campoDescriptor(desc('politicaActualizacion'), { valor: s.origen.politicaActualizacion });
      html += campoDescriptor(desc('politicaReinicio'), { valor: s.politicaReinicio, ayuda: estado === 'ayuda-desplegada' });
      html += campoDescriptor(desc('autoArranque'), { valor: s.autoArranque });
      html += campoDescriptor(desc('replicas'), {
        valor: estado === 'campo-en-error' ? 0 : s.replicas,
        error: estado === 'campo-en-error' ? 'Valor fuera de los límites del descriptor: el mínimo admitido es 1.' : null
      });
      html += campoDescriptor(desc('efimero'), { valor: s.efimero });
      html += '</div>';

      /* Divulgación progresiva */
      var expandido = estado === 'avanzadas-expandidas';
      html += '<div class="mq-expander"><button type="button" aria-expanded="' + (expandido ? 'true' : 'false') + '">' +
        icono('chevron', 14) + ' Opciones avanzadas</button>';
      if (expandido) {
        html += '<div class="mq-grilla-campos" style="margin-top:var(--space-12)">' +
          campoDescriptor(desc('limiteMemoriaMb'), { valor: s.recursos.limiteMemoriaMb }) +
          campoDescriptor(desc('limiteCpus'), { valor: s.recursos.limiteCpus }) + '</div>';
      }
      html += '</div>';
    }

    if (estado === 'despliegue-fallido') {
      html += '<hr class="mq-separador"><h3 class="mq-titulo-seccion">Línea de tiempo del despliegue</h3>';
      html += '<ul class="mq-lista-limpia mq-pila-8" style="margin-top:var(--space-8)">' +
        D.DESPLIEGUES[1].eventos.map(function (e) {
          return '<li class="mq-caption"><span class="mq-literal">' + esc(e.en) + '</span> · <strong>' + esc(e.tipo) +
            '</strong> · ' + esc(e.detalle) + '</li>';
        }).join('') + '</ul>';
    }

    /* Pie: guardar ≠ desplegar */
    html += '<hr class="mq-separador">';
    html += '<div class="mq-acciones">' +
      '<button type="button" class="mq-btn"' + (estado === 'edicion-sin-guardar' ? '' : ' disabled') + '>Cancelar</button>' +
      '<button type="button" class="mq-btn mq-btn--primario" aria-label="Guardar el cambio y agregarlo al conjunto pendiente, sin desplegar">' +
      'Guardar cambio</button></div>';
    html += '<p class="mq-hint">«Guardar cambio» no despliega: agrega la modificación al conjunto pendiente del proyecto. ' +
      'El despliegue ocurre al aplicar el conjunto o al pulsar «Redesplegar», que advierte la ventana de indisponibilidad al confirmar.</p>';
    html += '<p class="mq-hint">No se especifican presets: sin ejemplos declarados en los descriptores no hay de dónde componerlos (B-UX-04).</p>';
    html += '</div>';
    return html;
  };

  /* ── SUP-07 · Cajón de cambios pendientes ─────────────────────────────── */
  R['SUP-07'] = function (sup, estado) {
    var ch = D.CHANGESET;

    if (estado === 'vacio') {
      return '<div class="mq-panel" style="max-width:560px">' +
        vacio('No hay cambios pendientes',
          'El cajón no se abre y el banner del lienzo no se muestra. La superficie existe cuando hay cambios: no hay estado vacío que dibujar dentro de ella.',
          '<a class="mq-btn" href="Lienzo-Del-Proyecto.html">Volver al lienzo</a>') + '</div>';
    }

    var vistaInforme = ['con-datos-informe', 'informe-sin-redespliegues', 'informe-con-conflictos',
      'aplicando', 'aplicado-exito', 'aplicado-parcial', 'canal-caido', 'error-referencia', 'error-ambito'].indexOf(estado) >= 0;

    var html = '<div class="mq-cajon" role="region" aria-label="Cambios pendientes, ' + ch.cambios.length + ' cambios">';

    if (!vistaInforme) {
      html += '<div class="mq-panel-cabecera"><h2>Cambios pendientes (' + ch.cambios.length + ')</h2>' +
        '<button type="button" class="mq-btn-icono" aria-label="Cerrar el cajón sin descartar ni aplicar nada">' + icono('cerrar', 14) + '</button></div>';

      if (estado === 'cargando') {
        html += esqueleto(3, 'bloque');
      } else if (estado === 'rechazo-variable-referenciada') {
        html += bandaError('No se puede acumular la eliminación de la variable compartida DB_PASSWORD: la referencian api · DB_PASSWORD y db · POSTGRES_PASSWORD. El cambio no entra al conjunto.');
      }

      if (estado !== 'cargando') {
        var lista = estado === 'cambio-entidad-proyecto' ? [ch.cambios[3]] : ch.cambios;
        lista.forEach(function (c) {
          html += '<div class="mq-fila-cambio">';
          html += '<div class="mq-fila"><span class="mq-clase">' + esc(c.tipo) + '</span>' +
            '<span class="mq-clase">entidad: ' + esc(c.entidad) + '</span>' +
            '<button type="button" class="mq-btn-icono mq-empuje" aria-label="Descartar el cambio: ' + esc(c.resumen) + '">' +
            icono('cerrar', 14) + '</button></div>';
          html += '<span class="mq-resumen">' + esc(c.resumen) + '</span>';
          if (c.referenciadaPor) {
            html += '<span class="mq-caption">Referenciada por: ' +
              c.referenciadaPor.map(function (r) { return esc(r.servicio) + ' · ' + esc(r.clave); }).join(', ') + '</span>';
          }
          html += '<span class="mq-caption">Redespliega: ' +
            (c.requiereRedespliegueDe.length ? esc(c.requiereRedespliegueDe.join(', ')) : 'ningún servicio') + '</span>';
          if (c.visual) {
            html += '<span class="mq-hint">Un cambio puramente visual se guarda al instante y no sube el contador. Esta fila existe en el ejemplo del anexo E-5 y se muestra para que la distinción sea verificable.</span>';
          }
          html += '</div>';
        });
      }

      if (estado === 'ranura-asistente' || estado === 'con-datos-lista' || estado === 'cambio-entidad-proyecto') {
        html += ranuraAsistente();
      }

      html += '<hr class="mq-separador"><div class="mq-fila">' +
        '<button type="button" class="mq-btn mq-btn--destructivo">Descartar todo</button>' +
        '<span class="mq-empuje"><button type="button" class="mq-btn mq-btn--primario">Revisar y aplicar</button></span></div>';
      html += '<p class="mq-hint">Descartar un cambio restituye el estado anterior del elemento alcanzado. ' +
        'Qué ocurre cuando otros cambios dependen de él no está declarado: brecha B-UX-18.</p>';
      return html + '</div>';
    }

    /* Vista 2 — informe de impacto */
    html += '<div class="mq-panel-cabecera"><h2>Revisar y aplicar</h2>' +
      '<button type="button" class="mq-btn-icono" aria-label="Cerrar sin aplicar">' + icono('cerrar', 14) + '</button></div>';

    if (estado === 'canal-caido') {
      html += bandaAtencion('Se perdió la conexión. El despliegue continúa del lado del servidor: al reconectar, el estado se recupera consultando la operación. No se ofrece reintentar, porque duplicaría el despliegue.');
    }
    if (estado === 'error-referencia') {
      html += bandaError('El servicio api se abortó al crear el contenedor: la expresión ${{ db.SELFHOSTED_HOST }} no resuelve. Los demás contenedores no se vieron afectados.');
    }
    if (estado === 'error-ambito') {
      html += bandaError('El lote se disparó con una credencial de máquina sin el ámbito requerido. Falta el ámbito despliegues:ejecutar.');
    }

    if (estado === 'cargando') {
      return html + esqueleto(3, 'bloque') + '</div>';
    }

    var aRedesplegar = estado === 'informe-sin-redespliegues' ? [] : ch.impacto.serviciosARedesplegar;
    html += '<h3 class="mq-titulo-seccion">Se van a redesplegar</h3>';
    html += aRedesplegar.length
      ? '<ul class="mq-lista-puntos">' + aRedesplegar.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>'
      : '<p class="mq-caption">Ningún servicio. El conjunto acumula sólo cambios que no obligan a redesplegar; la lista se declara vacía y no se oculta.</p>';

    html += '<h3 class="mq-titulo-seccion" style="margin-top:var(--space-14)">Quedan sin impacto</h3>' +
      '<ul class="mq-lista-puntos">' + ch.impacto.serviciosSinImpacto.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>';

    html += '<h3 class="mq-titulo-seccion" style="margin-top:var(--space-14)">Conflictos de dirección detectados</h3>';
    if (estado === 'informe-con-conflictos') {
      html += '<ul class="mq-lista-puntos"><li>192.168.1.139 · la solicita print-server-pruebas y la ocupa print-server de «Impresion 3D»</li></ul>' +
        '<p class="mq-caption">Al aplicar, la operación deriva a <a href="Informe-De-Conflicto-De-Direcciones.html">Informe de conflicto de direcciones</a>.</p>';
    } else {
      html += '<p class="mq-caption">Ninguno.</p>';
    }

    html += bandaAtencion(ch.advertenciaIndisponibilidad);

    html += '<div class="mq-campo"><label for="cj-mensaje">Mensaje (opcional)</label>' +
      '<input class="mq-input" id="cj-mensaje" type="text" placeholder="Motivo del lote"></div>';

    if (['aplicado-exito', 'aplicado-parcial'].indexOf(estado) >= 0) {
      var resultados = estado === 'aplicado-exito'
        ? [{ servicio: 'api', replica: 1, estado: 'activo', causa: null }, { servicio: 'cache', replica: 1, estado: 'activo', causa: null }]
        : ch.resultadoPorContenedor;
      html += '<hr class="mq-separador"><h3 class="mq-titulo-seccion">Resultado por contenedor</h3>';
      html += '<ul class="mq-lista-limpia mq-pila-8" role="status" style="margin-top:var(--space-8)">' +
        resultados.map(function (r) {
          return '<li class="mq-caption">' + esc(r.servicio) + ' · réplica ' + esc(r.replica) + ' ' +
            parEstado(r.estado === 'activo' ? 'activo' : 'fallido', { causa: r.causa }) + '</li>';
        }).join('') + '</ul>';
      if (estado === 'aplicado-parcial') {
        html += '<h3 class="mq-titulo-seccion" style="margin-top:var(--space-14)">No alcanzados</h3>' +
          '<ul class="mq-lista-puntos">' + ch.noAlcanzados.map(function (na) {
            return '<li>' + esc(na.servicio) + ' — ' + esc(na.motivo) + '</li>';
          }).join('') + '</ul>' +
          '<p class="mq-caption">Es un estado legítimo del modelo, no un error de la operación.</p>';
      }
    }

    html += '<hr class="mq-separador"><div class="mq-acciones">' +
      '<button type="button" class="mq-btn">Volver</button>' +
      (estado === 'aplicando' ? botonEnviando('Aplicando…')
        : '<button type="button" class="mq-btn mq-btn--primario" aria-describedby="cj-adv">Aplicar cambios</button>') + '</div>';
    html += '<p class="mq-hint" id="cj-adv">' + esc(ch.advertenciaIndisponibilidad) + '</p>';
    return html + '</div>';
  };

  /* ── SUP-08 · Registro del contenedor ─────────────────────────────────── */
  R['SUP-08'] = function (sup, estado) {
    var reg = D.REGISTRO;
    var html = '<p><a class="mq-btn mq-btn--pill" href="Lienzo-Del-Proyecto.html">← Volver al lienzo</a></p>';
    html += '<div class="mq-fila" style="margin-bottom:var(--space-12)">' +
      '<h2 class="mq-titulo-seccion" style="margin-right:auto">Registro de ' + esc(reg.servicio) + '</h2>' +
      (estado === 'sin-contenedor' ? parEstado('huerfano') : parEstado('activo', { antiguedad: '1 h 12 min' })) + '</div>';

    html += '<div class="mq-fila" style="margin-bottom:var(--space-12)">';
    html += '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="rg-replica">Réplica</label>' +
      '<select class="mq-select" id="rg-replica" style="width:150px"><option>Réplica 1</option></select></div>';
    html += '<label class="mq-toggle"><input type="checkbox" id="rg-seguimiento"' +
      (estado === 'seguimiento-activo' ? ' checked' : '') + '> <span>Seguimiento continuo</span></label>';
    html += '<button type="button" class="mq-btn mq-empuje">' + icono('copiar') + ' Copiar</button></div>';
    html += '<p class="mq-hint" style="margin-bottom:var(--space-12)">El seguimiento es opcional y explícito. Cerrar la vista termina el flujo sin pedir confirmación: ' +
      'no hay recolección con las vistas cerradas. No se ofrece control de frecuencia ni refresco manual.</p>';

    if (estado === 'cargando') {
      return html + esqueleto(6);
    }
    if (estado === 'motor-inalcanzable') {
      return html + bandaError('El punto de acceso del motor de contenedores no responde. No se puede leer el registro en este momento.');
    }
    if (estado === 'sin-contenedor') {
      return html + bandaInfo('Este servicio no tiene contenedor vigente, de modo que no hay registro disponible. Revisá el estado del despliegue: puede estar huérfano.') +
        '<p><a class="mq-btn" href="Panel-Lateral-Del-Servicio.html">Ver el estado del despliegue</a></p>';
    }
    if (estado === 'vacio') {
      return html + vacio('El contenedor todavía no emitió ninguna línea',
        'No es un error: el proceso arrancó hace instantes y aún no escribió nada. Activá el seguimiento continuo para ver las líneas a medida que aparecen.', null);
    }

    var etiquetaFlujo = 'Seguimiento detenido. El contenido queda estático.';
    if (estado === 'seguimiento-activo') { etiquetaFlujo = 'Seguimiento activo. Las líneas nuevas aparecen al pie.'; }
    if (estado === 'flujo-interrumpido') { etiquetaFlujo = 'El flujo continuo se cortó.'; }

    html += '<pre class="mq-registro" tabindex="0" role="region" aria-label="Registro de ' + esc(reg.servicio) + ', réplica 1">' +
      esc(reg.lineas.join('\n')) + '</pre>';

    html += '<p class="mq-caption" role="status" style="margin-top:var(--space-8)">' + icono('info', 14) + ' ' + esc(etiquetaFlujo) + '</p>';
    if (estado === 'flujo-interrumpido') {
      html += '<p class="mq-hint">B-UX-13 · el intake no declara el comportamiento esperado ante el corte del flujo: ' +
        'si reconecta solo, si ofrece reconectar o si sólo informa. La representación queda pendiente y este wireframe no la elige.</p>';
    }
    html += '<p class="mq-hint">' + esc(reg.brecha) + '</p>';
    return html;
  };

  /* ── SUP-09 · Tablero de estado ───────────────────────────────────────── */
  R['SUP-09'] = function (sup, estado) {
    var t = D.TABLERO;
    var html = '';

    if (estado === 'error') {
      return bandaError('No se pudieron traer las tres capas del tablero.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }
    if (estado === 'cargando') {
      return '<div class="mq-pila">' + esqueleto(1, 'bloque') + esqueleto(1, 'bloque') + esqueleto(1, 'bloque') + '</div>';
    }
    if (estado === 'estado-sin-reconciliar') {
      html += bandaAtencion(t.estadoSinReconciliar) + '<p class="mq-hint">' + esc(t.brechaAntiguedad) + '</p>';
    }

    /* Capa 1 — servidor */
    html += '<section class="mq-seccion" data-acento="a" aria-label="Estado del servidor">' +
      '<h2 class="mq-titulo-seccion">Servidor</h2>';
    if (estado === 'lectura-servidor-no-disponible') {
      html += '<p class="mq-caption">' + esc(t.lecturaServidorNoDisponible) + '</p>' +
        '<p class="mq-hint">' + esc(t.brechaAntiguedad) + '</p>';
    } else {
      html += '<div class="mq-pila-8" style="margin-top:var(--space-8)">' +
        '<div class="mq-fila"><span class="mq-caption" style="width:60px">CPU</span>' + barraMagnitud(t.servidor.cpuPorcentaje, 100, '%', 'Uso de procesador del servidor') + '</div>' +
        '<div class="mq-fila"><span class="mq-caption" style="width:60px">RAM</span>' + barraMagnitud(t.servidor.ram.usadoGb, t.servidor.ram.totalGb, 'GB', 'Memoria del servidor') + '</div>' +
        '<div class="mq-fila"><span class="mq-caption" style="width:60px">Swap</span>' + barraMagnitud(t.servidor.swap.usadoGb, t.servidor.swap.totalGb, 'GB', 'Intercambio del servidor') + '</div>' +
        '<div class="mq-fila"><span class="mq-caption" style="width:60px">Disco /</span>' + barraMagnitud(t.servidor.disco.usadoGb, t.servidor.disco.totalGb, 'GB', 'Disco raíz del servidor') + '</div>' +
        '</div><p class="mq-caption" style="margin-top:var(--space-8)">Contenedores ' +
        n(t.servidor.contenedoresActivos) + ' activos / ' + n(t.servidor.contenedoresTotales) + ' · ' + n(t.servidor.imagenes) + ' imágenes</p>';
    }
    html += '</section>';

    /* Capa 2 — proyectos */
    html += '<section class="mq-seccion" data-acento="d" aria-label="Consumo por proyecto">' +
      '<h2 class="mq-titulo-seccion">Proyectos</h2>';
    if (estado === 'vacio') {
      html += '<p class="mq-caption">Todavía no hay proyectos declarados. El estado del servidor no depende de que los haya.</p>';
    } else {
      var proyectos = estado === 'proyecto-parcial' ? [D.PROYECTOS[1]] : D.PROYECTOS;
      html += tabla(['Proyecto', 'Estado', 'Activos', 'CPU', 'RAM', ''],
        proyectos.map(function (p) {
          var clave = p.estado === 'activo' ? 'activo' : (p.estado === 'parcialmente-activo' ? 'degradado' : 'detenido');
          var etiqueta = p.estado === 'parcialmente-activo' ? 'Parcialmente activo' : undefined;
          return '<tr><th scope="row">' + esc(p.nombre) + '</th>' +
            '<td>' + parEstado(clave, { etiqueta: etiqueta }) + '</td>' +
            '<td>' + esc(p.serviciosActivos + '/' + p.serviciosTotales) + '</td>' +
            '<td>' + n(p.cpuPorcentaje, '%') + '</td>' +
            '<td>' + n(p.memoriaGb, 'GB') + '</td>' +
            '<td class="mq-celda-acciones"><a class="mq-btn" href="Lienzo-Del-Proyecto.html">Abrir lienzo</a></td></tr>';
        }), { caption: 'Consumo por proyecto SelfHosted' });
    }
    html += '</section>';

    /* Capa 3 — contenedores */
    html += '<section class="mq-seccion" data-acento="c" aria-label="Contenedores del proyecto elegido">' +
      '<h2 class="mq-titulo-seccion">Contenedores de «' + esc(D.PROYECTOS[0].nombre) + '»</h2>';
    if (estado === 'vacio') {
      html += '<p class="mq-caption">Sin contenedores que mostrar.</p>';
    } else {
      var filas = t.contenedores.slice();
      if (estado === 'servicio-degradado') { filas = [t.contenedores[2]]; }
      if (estado === 'servicio-pausado-finalizado') { filas = [t.variantes.pausado, t.variantes.finalizado]; }
      if (estado === 'servicio-huerfano') { filas = [t.variantes.huerfano]; }
      if (estado === 'servicio-sin-despliegue') { filas = [t.variantes.sinDespliegue]; }
      if (estado === 'metricas-no-disponibles') { filas = [t.variantes.sinMetricas]; }

      html += tabla(['Servicio', 'Estado', 'CPU', 'Memoria', 'Tiempo activo', ''],
        filas.map(function (c) {
          var celdaEstado;
          if (c.estado === null) {
            celdaEstado = '<span class="mq-caption">Sin despliegue</span>';
          } else {
            celdaEstado = parEstado(c.estado, { etiqueta: c.etiqueta, causa: c.causa });
          }
          var celdaMem = (c.memoriaUsadaMb === null || c.memoriaUsadaMb === undefined)
            ? '<span class="mq-caption">' + (c.sinMetricas ? 'Métricas no disponibles' : '—') + '</span>'
            : barraMagnitud(c.memoriaUsadaMb, c.memoriaLimiteMb, 'MB', 'Memoria de ' + c.servicio);
          return '<tr><th scope="row">' + esc(c.servicio) + (c.replica ? ' · réplica ' + esc(c.replica) : '') + '</th>' +
            '<td>' + celdaEstado + '</td>' +
            '<td>' + n(c.cpuPorcentaje, '%') + '</td>' +
            '<td>' + celdaMem + '</td>' +
            '<td>' + (c.antiguedad ? esc(c.antiguedad) : '—') + '</td>' +
            '<td class="mq-celda-acciones">' +
            '<a class="mq-btn" href="Registro-Del-Contenedor.html">Registro</a> ' +
            '<button type="button" class="mq-btn" aria-label="Reiniciar el contenedor de ' + esc(c.servicio) + '">Reiniciar</button></td></tr>';
        }), { caption: 'Contenedores del proyecto elegido, una fila por réplica' });

      if (estado === 'servicio-pausado-finalizado') {
        html += '<p class="mq-hint">Pausado y finalizado se distinguen por etiqueta textual sobre el par neutro: ' +
          'el contrato visual del anexo E-18 no tiene fila propia para ninguno de los dos (brecha B-UX-12).</p>';
      }
      if (estado === 'servicio-sin-despliegue') {
        html += '<p class="mq-hint">El servicio existe mientras no se lo borre y no tiene estado de encendido: la fila va sin estado de ejecución y sin métricas.</p>';
      }
    }
    html += '</section>';

    html += '<p class="mq-hint">Sin serie temporal por diseño: no hay sondeo con las vistas cerradas, de modo que una tendencia exigiría acumular ' +
      'datos que el producto declara que no acumula. Tampoco hay control de frecuencia ni comprobación de disponibilidad por red.</p>';
    return html;
  };

  /* ── SUP-10 · Descubrimiento e incorporación ──────────────────────────── */
  R['SUP-10'] = function (sup, estado) {
    var paso2 = ['clasificacion-pendiente', 'variable-con-sugerencia', 'variable-sin-sugerencia',
      'variable-marcada', 'incorporando', 'rechazo-clasificacion-ausente', 'rechazo-nombre'].indexOf(estado) >= 0;

    if (paso2) {
      var cl = D.CLASIFICACION;
      var variables = cl.variables;
      if (estado === 'variable-con-sugerencia') { variables = [cl.variables[3]]; }
      if (estado === 'variable-sin-sugerencia') { variables = [cl.variables[2]]; }
      if (estado === 'variable-marcada') {
        variables = [Object.assign({}, cl.variables[2], { marcadaSecreta: true })];
      }

      var h = '<div class="mq-superpuesta"><header><h2>Clasificar las variables de ' + esc(cl.nombre) + '</h2>' +
        '<button type="button" class="mq-btn-icono" aria-label="Abandonar la clasificación. El servicio no se crea">' + icono('cerrar', 14) + '</button></header>';
      h += '<p class="mq-caption">' + variables.length + ' variables importadas. Marcá las que son secretas. ' +
        'Las detectadas ya vienen marcadas; podés cambiar cualquiera.</p>';

      if (estado === 'rechazo-clasificacion-ausente') {
        h += bandaError('No se puede incorporar sin la clasificación confirmada. El servicio no se creó y el contenedor sigue sin incorporar.');
      }
      if (estado === 'rechazo-nombre') {
        h += bandaError('El nombre derivado del contenedor ya existe en el proyecto destino. Corregí el nombre para continuar.');
      }

      h += tabla(['Secreta', 'Clave', 'Valor', 'Sugerencia'],
        variables.map(function (v) {
          var cid = id('cl');
          return '<tr><td><input type="checkbox" id="' + cid + '"' + (v.marcadaSecreta ? ' checked' : '') +
            ' aria-label="Marcar ' + esc(v.clave) + ' como secreta"></td>' +
            '<th scope="row" class="mq-literal">' + esc(v.clave) + '</th>' +
            '<td class="mq-literal">' + (v.marcadaSecreta
              ? '<span aria-label="valor enmascarado">••••••••</span>'
              : esc(v.valor)) + '</td>' +
            '<td>' + (v.motivoSugerencia ? esc(v.motivoSugerencia) : '<span class="mq-caption">—</span>') + '</td></tr>';
        }), { caption: 'Clasificación de las variables importadas' });

      h += '<p class="mq-hint">La heurística sugiere; no decide. Se ven todas las variables importadas, no sólo las sugeridas. ' +
        'El valor de una variable marcada como secreta viaja enmascarado incluso dentro de la carga útil de este mismo paso.</p>';
      h += bandaAtencion(cl.advertenciaCorte);
      h += '<div class="mq-acciones"><button type="button" class="mq-btn">Cancelar</button>' +
        (estado === 'incorporando' ? botonEnviando('Incorporando…')
          : '<button type="button" class="mq-btn mq-btn--primario" aria-describedby="dsc-adv">Confirmar e incorporar</button>') + '</div>';
      h += '<p class="mq-hint" id="dsc-adv">' + esc(cl.advertenciaCorte) + '</p>';
      h += '<p class="mq-hint">No hay acción de omitir ni de «usar las sugerencias y seguir»: el paso es obligatorio.</p>';
      return h + '</div>';
    }

    var html = '<p class="mq-subtitulo">El descubrimiento es de sólo lectura: listar no habilita operar. Ninguna operación de escritura se habilita desde acá.</p>';

    if (estado === 'incorporado') {
      html += bandaOk('Servicio incorporado. El nodo aparece en el lienzo ya activo, sin corte del servicio que ya corría.') +
        '<p><a class="mq-btn" href="Lienzo-Del-Proyecto.html">Ver el nodo en el lienzo</a></p>';
    }
    if (estado === 'rechazo-pertenencia') {
      html += bandaError('Ese contenedor ya pertenece al proyecto «Impresion 3D». Un contenedor pertenece a un solo proyecto SelfHosted.');
    }
    if (estado === 'motor-inalcanzable') {
      return html + bandaError('El punto de acceso del motor de contenedores no responde. No se pudieron listar los candidatos.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }

    html += '<div class="mq-fila" style="margin-bottom:var(--space-16)">' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="ds-buscar">Buscar candidatos</label>' +
      '<input class="mq-input" id="ds-buscar" type="search" placeholder="Buscar…" style="width:220px"' +
      (estado === 'vacio-por-filtro' ? ' value="contenedor-inexistente"' : '') + '></div>' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="ds-filtro">Filtrar</label>' +
      '<select class="mq-select" id="ds-filtro" style="width:180px"><option>Todos</option><option>Incorporables</option></select></div></div>';

    if (estado === 'cargando') { return html + esqueleto(5); }
    if (estado === 'vacio') {
      return html + vacio('El servidor no tiene contenedores candidatos',
        'No hay contenedores en el motor que se puedan incorporar a este proyecto. No es un error.', null);
    }
    if (estado === 'vacio-por-filtro') {
      return html + vacio('Ningún candidato coincide con la búsqueda', 'Probá con otro texto o limpiá el filtro.',
        '<button type="button" class="mq-btn">Limpiar el filtro</button>');
    }

    var candidatos = D.CANDIDATOS;
    if (estado === 'candidato-incorporable') { candidatos = [D.CANDIDATOS[0]]; }
    if (estado === 'candidato-no-incorporable') { candidatos = [D.CANDIDATOS[2]]; }
    if (estado === 'candidato-ya-incorporado') { candidatos = [D.CANDIDATOS[3]]; }

    var filas = [];
    candidatos.forEach(function (c) {
      var bloqueado = !c.adoptable;
      filas.push('<tr' + (bloqueado ? ' data-deshabilitada="si"' : '') + '>' +
        '<th scope="row">' + esc(c.nombre) + '</th>' +
        '<td class="mq-literal">' + esc(c.imagen) + '</td>' +
        '<td>' + parEstado(c.estado === 'running' ? 'activo' : 'detenido', { etiqueta: c.estado === 'running' ? 'En ejecución' : 'Detenido' }) + '</td>' +
        '<td>' + esc(c.redes[0].modo) + ' · <span class="mq-literal">' + esc(c.redes[0].ip) + '</span></td>' +
        '<td>' + n(c.variablesDetectadas) + '</td>' +
        '<td class="mq-celda-acciones">' +
        (c.adoptable
          ? '<button type="button" class="mq-btn" aria-label="Incorporar ' + esc(c.nombre) + '">Incorporar</button>'
          : (c.yaAdoptadoPor
            ? '<span class="mq-caption">No disponible</span>'
            : '<button type="button" class="mq-btn mq-btn--destructivo" aria-label="Forzar la incorporación de ' + esc(c.nombre) +
              ', que monta el punto de acceso del motor y crearía una dependencia circular de control">Forzar</button>')) +
        '</td></tr>');
      if (c.motivoNoAdoptable) {
        filas.push('<tr class="mq-fila-motivo"><td colspan="6">' + icono('alert', 14) + ' ' + esc(c.motivoNoAdoptable) + '</td></tr>');
      }
      if (c.yaAdoptadoPor) {
        filas.push('<tr class="mq-fila-motivo"><td colspan="6">' + icono('info', 14) +
          ' Ya incorporado por el proyecto «' + esc(c.yaAdoptadoPor) + '». No vuelve a ofrecerse.</td></tr>');
      }
    });

    html += tabla(['Nombre', 'Imagen', 'Estado', 'Red y dirección', 'Variables', ''], filas,
      { caption: 'Contenedores candidatos del servidor' });
    return html;
  };

  /* ── SUP-11 · Catálogo de plantillas ──────────────────────────────────── */
  R['SUP-11'] = function (sup, estado) {
    var instanciando = ['instanciando', 'nombre-sufijado', 'clave-mismo-valor', 'clave-distinto-valor',
      'rechazo-nombre', 'rechazo-referencia', 'rechazo-ciclo'].indexOf(estado) >= 0;

    if (instanciando) {
      var item = D.ITEMS_CATALOGO[1];
      var h = '<div class="mq-superpuesta"><header>' +
        '<h2>Instanciar «' + esc(item.nombre) + '» en ' + esc(D.PROYECTOS[0].nombre) + '</h2>' +
        '<button type="button" class="mq-btn-icono" aria-label="Abandonar la instanciación. No se crea nada">' + icono('cerrar', 14) + '</button></header>';
      h += '<p class="mq-caption">' + item.servicios + ' servicios y ' + item.enlaces + ' enlaces se van a crear.</p>';

      if (estado === 'rechazo-nombre') { h += bandaError('El nombre no cumple el formato admitido. Un nombre que ya existe no es este caso: se sufija sin rechazar.'); }
      if (estado === 'rechazo-referencia') { h += bandaError('La expresión ${{ db.SELFHOSTED_HOST }} de la plantilla apunta a un servicio que no existe en el destino.'); }
      if (estado === 'rechazo-ciclo') { h += bandaError('Las referencias de la plantilla forman un ciclo de valor: {{slug}}-api → {{slug}}-db → {{slug}}-api.'); }
      if (estado === 'nombre-sufijado') { h += bandaInfo('El nombre «portal-db» ya existía en el proyecto destino. Se creó como «portal-db-2».'); }
      if (estado === 'clave-mismo-valor') { h += bandaInfo('La clave DB_PASSWORD ya existe con el mismo valor. Probablemente convenga compartir. ¿Reusar la existente?'); }
      if (estado === 'clave-distinto-valor') { h += bandaInfo('La clave TZ ya existe con distinto valor. Se crearon separadas: casi seguro son cosas distintas.'); }

      item.parametros.forEach(function (p) {
        var cid = id('par');
        h += '<div class="mq-campo"><label for="' + cid + '">' + esc(p.etiqueta) +
          (p.requerido ? ' <span class="mq-meta">(obligatorio)</span>' : '') + '</label>';
        h += '<div class="mq-fila"><input class="mq-input" id="' + cid + '" type="' + (p.tipo === 'secreto' ? 'password' : 'text') + '"' +
          (p.porDefecto ? ' value="' + esc(p.porDefecto) + '"' : '') + ' style="flex:1 1 200px">';
        if (p.generar) {
          h += '<button type="button" class="mq-btn" aria-label="Generar el valor de ' + esc(p.etiqueta) +
            '. No se va a poder ver después de guardado">Generar</button>';
        }
        h += '</div>';
        h += '<span class="mq-hint">' + (p.porDefecto ? 'por defecto ' + esc(p.porDefecto) : 'Sin valor por defecto declarado') +
          ' · tipo ' + esc(p.tipo) + '</span></div>';
      });

      h += '<p class="mq-hint">Etiqueta, tipo, obligatoriedad y valor por defecto salen del descriptor del ítem: es el único caso de la solución ' +
        'en que las fuentes lo declaran. La leyenda y los ejemplos siguen faltando (B-UX-04).</p>';
      h += '<div class="mq-acciones"><button type="button" class="mq-btn">Cancelar</button>' +
        (estado === 'instanciando' ? botonEnviando('Instanciando…')
          : '<button type="button" class="mq-btn mq-btn--primario">Instanciar</button>') + '</div>';
      return h + '</div>';
    }

    var html = '<div class="mq-encabezado"><div>' +
      '<p class="mq-subtitulo">Definiciones en reposo. Nada de acá corre hasta instanciarse: no tienen despliegue, no tienen contenedor y no ocupan dirección.</p></div>' +
      '<button type="button" class="mq-btn mq-btn--primario">' + icono('mas') + ' Nueva plantilla</button></div>';

    if (estado === 'error') {
      return html + bandaError('No se pudo traer el listado del catálogo.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }
    if (estado === 'rechazo-formato') {
      html += bandaError('El archivo importado tiene una versión de formato que no está entre las admitidas.');
    }
    if (estado === 'importacion-con-perdida') {
      html += bandaAtencion('La importación se completó. Un elemento no se pudo representar y se declara en lugar de descartarse en silencio: ' +
        '«command: --cpu» — el modelo no representa la sobreescritura del comando de arranque.');
    }

    html += '<div class="mq-fila" style="margin-bottom:var(--space-16)">' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="ct-buscar">Buscar plantillas</label>' +
      '<input class="mq-input" id="ct-buscar" type="search" placeholder="Buscar…" style="width:200px"' +
      (estado === 'vacio-por-filtro' ? ' value="no-existe"' : '') + '></div>' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="ct-cat">Categoría</label>' +
      '<select class="mq-select" id="ct-cat" style="width:170px"><option>Todas las categorías</option>' +
      '<option>base-de-datos</option><option>stack</option></select></div>' +
      '<span class="mq-empuje"><button type="button" class="mq-btn">' + icono('descarga') + ' Exportar</button> ' +
      '<button type="button" class="mq-btn">Importar</button></span></div>';

    if (estado === 'cargando') {
      return html + '<div class="mq-grilla-tarjetas">' + esqueleto(1, 'tarjeta') + esqueleto(1, 'tarjeta') + '</div>';
    }
    if (estado === 'vacio') {
      return html + vacio('El catálogo está vacío',
        'Es el estado inicial de toda instalación nueva, no una anomalía: el producto no se distribuye con contenido precargado. ' +
        'Se puebla guardando un servicio como plantilla o importando un catálogo exportado.',
        '<button type="button" class="mq-btn">' + icono('mas') + ' Nueva plantilla</button> ' +
        '<button type="button" class="mq-btn">Importar un catálogo</button>');
    }
    if (estado === 'vacio-por-filtro') {
      return html + vacio('Ninguna plantilla coincide con la búsqueda', 'Probá con otro texto o limpiá el filtro.',
        '<button type="button" class="mq-btn">Limpiar el filtro</button>');
    }

    var items = D.ITEMS_CATALOGO;
    if (estado === 'item-un-servicio') { items = [D.ITEMS_CATALOGO[0]]; }
    if (estado === 'item-varios-servicios') { items = [D.ITEMS_CATALOGO[1]]; }

    html += '<div class="mq-grilla-tarjetas">' + items.map(function (it) {
      return '<article class="mq-tarjeta" aria-label="' + esc(it.nombre + ', ' + it.servicios + ' servicios') + '">' +
        '<span class="mq-tarjeta-icono">' + icono(it.categoria === 'base-de-datos' ? 'base' : 'layers', 18) + '</span>' +
        '<h3>' + esc(it.nombre) + '</h3>' +
        '<div class="mq-tarjeta-datos"><span>' + esc(it.categoria) + '</span>' +
        '<span>' + n(it.servicios) + ' servicios · ' + n(it.enlaces) + ' enlaces</span>' +
        '<span>versión de contenido ' + n(it.version) + '</span></div>' +
        '<p class="mq-caption" style="margin:0">' + esc(it.descripcion) + '</p>' +
        '<div class="mq-fila"><button type="button" class="mq-btn">Instanciar</button>' +
        '<button type="button" class="mq-btn-icono" aria-label="Más acciones sobre ' + esc(it.nombre) + '">' + icono('list', 14) + '</button></div>' +
        '</article>';
    }).join('') + '</div>';

    html += '<p class="mq-hint" style="margin-top:var(--space-16)">Donde otras superficies muestran una insignia de estado, ésta no muestra nada: ' +
      'es la señal más fuerte de que nada del catálogo corre.</p>';
    return html;
  };

  /* ── SUP-12 · Configuración del sistema ───────────────────────────────── */
  R['SUP-12'] = function (sup, estado) {
    var rango = D.RANGO_GESTIONADO;
    var descs = D.DESCRIPTORES.sistema;
    function desc(clave) {
      for (var i = 0; i < descs.length; i++) { if (descs[i].clave === clave) { return descs[i]; } }
      return descs[0];
    }

    if (estado === 'cargando') {
      return '<div class="mq-pila">' + esqueleto(1, 'bloque') + esqueleto(1, 'bloque') + esqueleto(1, 'bloque') + '</div>';
    }
    if (estado === 'error') {
      return bandaError('No se pudo traer la configuración del sistema.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }

    var html = '';

    /* Vista de un solo uso de la credencial recién emitida */
    if (estado === 'credencial-emitida') {
      html += '<div class="mq-superpuesta" style="margin-bottom:var(--space-28)"><header>' +
        '<h2>Credencial emitida</h2></header>' +
        bandaAtencion(D.CREDENCIAL_EMITIDA.aviso) +
        '<div class="mq-campo"><label for="cr-valor">Valor de la credencial</label>' +
        '<input class="mq-input mq-literal" id="cr-valor" readonly value="' + esc(D.CREDENCIAL_EMITIDA.valor) + '"></div>' +
        '<div class="mq-acciones"><button type="button" class="mq-btn">' + icono('copiar') + ' Copiar</button>' +
        '<button type="button" class="mq-btn mq-btn--primario">Cerrar</button></div>' +
        '<p class="mq-hint">Al cerrar, el valor deja de estar disponible para siempre. El listado nunca lo muestra y no hay acción de revelar, ' +
        'porque el sistema sólo guarda su resumen.</p></div>';
    }

    /* Sección 1 — rango gestionado */
    html += '<section class="mq-seccion" data-acento="a" aria-label="Rango de direcciones gestionado">';
    html += '<h2 class="mq-titulo-seccion">Rango de direcciones gestionado</h2>';
    html += '<p class="mq-subtitulo">Espacio de direcciones que esta instancia administra para los servicios con dirección fija.</p>';
    html += bandaAtencion(rango.advertencia);
    if (estado === 'rango-solapado') {
      html += bandaError('El rango declarado invade el que reparte el servidor de direcciones de la red. No se guardó.');
    }
    if (estado === 'direccion-fuera-de-rango') {
      html += bandaError('192.168.1.129 está excluida del rango gestionado. La siguiente libre es 192.168.1.141.');
    }
    html += '<div class="mq-grilla-campos">';
    html += campoDescriptor(desc('subred'), { valor: rango.subred });
    html += campoDescriptor(desc('gateway'), { valor: rango.gateway });
    html += campoDescriptor(desc('desde'), {
      valor: estado === 'direccion-fuera-de-rango' ? '192.168.1.129' : rango.desde,
      error: estado === 'direccion-fuera-de-rango' ? 'Dirección excluida. La siguiente libre del rango es 192.168.1.141.' : null
    });
    html += campoDescriptor(desc('hasta'), {
      valor: estado === 'campo-en-error' ? '192.168.1.300' : rango.hasta,
      error: estado === 'campo-en-error' ? 'No es una dirección válida del rango admitido 192.168.1.129 a 192.168.1.190.' : null
    });
    html += campoDescriptor(desc('interfazPadre'), { valor: rango.interfazPadre });
    html += campoDescriptor(desc('excluidas'), { valor: rango.excluidas.join(', ') });
    html += '</div>';
    html += '<div class="mq-banda mq-banda--info" role="note" style="margin-top:var(--space-12)">' + icono('info') +
      '<div><span>' + esc(rango.dependenciaDeEntorno) + '</span></div></div>';

    html += '<h3 class="mq-titulo-seccion" style="margin-top:var(--space-16)">Reservas</h3>';
    if (estado === 'sin-reservas') {
      html += '<p class="mq-caption">Ningún servicio declara dirección fija todavía. Las reservas se declaran desde el panel lateral de cada servicio.</p>';
    } else {
      html += tabla(['Dirección', 'Servicio', 'Proyecto', 'Activa'],
        D.RESERVAS.map(function (r) {
          return '<tr><th scope="row" class="mq-literal">' + esc(r.direccion) + '</th>' +
            '<td>' + esc(r.servicio) + '</td><td>' + esc(r.proyecto) + '</td>' +
            '<td>' + (r.activa ? 'sí' : 'no') + '</td></tr>';
        }), { caption: 'Reservas de dirección del rango gestionado' });
      html += '<p class="mq-hint">Sólo lectura desde acá: la reserva se declara en el panel lateral del servicio.</p>';
    }
    html += '</section>';

    /* Sección 2 — credenciales de máquina */
    html += '<section class="mq-seccion" data-acento="d" aria-label="Credenciales de máquina">';
    html += '<div class="mq-encabezado"><div><h2 class="mq-titulo-seccion">Credenciales de máquina</h2>' +
      '<p class="mq-subtitulo" style="margin:var(--space-4) 0 0">Las usan los automatismos para desplegar sin conocer la contraseña del administrador.</p></div>' +
      '<button type="button" class="mq-btn">' + icono('mas') + ' Emitir credencial</button></div>';
    if (estado === 'sin-credenciales') {
      html += '<p class="mq-caption">Todavía no se emitió ninguna credencial.</p>';
    } else {
      var creds = estado === 'credencial-revocada' ? [D.CREDENCIALES[1]] : D.CREDENCIALES;
      html += tabla(['Nombre', 'Prefijo', 'Ámbitos', 'Vigencia', 'Último uso', 'Estado', ''],
        creds.map(function (c) {
          return '<tr><th scope="row">' + esc(c.nombre) + '</th>' +
            '<td class="mq-literal">' + esc(c.prefijo) + '</td>' +
            '<td>' + c.ambitos.map(function (a) { return '<span class="mq-par-estado mq-estado--detenido">' + esc(a) + '</span>'; }).join(' ') + '</td>' +
            '<td>' + (c.vigenciaHasta ? esc(c.vigenciaHasta) : 'sin vencimiento') + '</td>' +
            '<td>' + esc(c.ultimoUso) + '</td>' +
            '<td>' + (c.estado === 'revocada'
              ? parEstado('fallido', { etiqueta: 'Revocada el ' + c.revocadaEn })
              : parEstado('activo', { etiqueta: 'Vigente' })) + '</td>' +
            '<td class="mq-celda-acciones">' + (c.estado === 'revocada' ? '' :
              '<button type="button" class="mq-btn mq-btn--destructivo" aria-label="Revocar la credencial ' + esc(c.nombre) +
              '. El efecto es inmediato en la primera petición posterior">Revocar</button>') + '</td></tr>';
        }), { caption: 'Credenciales de máquina emitidas' });
      html += '<p class="mq-hint">El valor nunca se muestra en el listado y no hay acción de revelar. La opción sin vencimiento se admite y se desaconseja. ' +
        'Los ámbitos no son roles del administrador: sólo aparecen acá.</p>';
    }
    html += '</section>';

    /* Sección 3 — respaldo programado */
    html += '<section class="mq-seccion" data-acento="c" aria-label="Respaldo programado">';
    html += '<h2 class="mq-titulo-seccion">Respaldo programado</h2>';
    if (estado === 'respaldo-inalcanzable') {
      html += bandaError('La última ejecución falló: el destino no respondió. La exportación anterior sigue disponible y su antigüedad crece.');
    }
    html += '<div class="mq-grilla-campos">' +
      '<div class="mq-campo"><label for="cf-destino">Destino</label>' +
      '<input class="mq-input" id="cf-destino" type="text" aria-describedby="cf-destino-hint">' +
      '<span class="mq-hint" id="cf-destino-hint">' + esc(D.RESPALDO.destinoBrecha) + '</span></div>' +
      '<div class="mq-campo"><label for="cf-periodo">Periodicidad</label>' +
      '<input class="mq-input" id="cf-periodo" type="text" aria-describedby="cf-periodo-hint">' +
      '<span class="mq-hint" id="cf-periodo-hint">' + esc(D.RESPALDO.periodicidadCota) + ' · el valor concreto no está declarado (B-UX-16)</span></div></div>';
    html += tabla(['Proyecto', 'Última exportación vigente', 'Resultado'],
      D.RESPALDO.ultimasExportaciones.map(function (e) {
        return '<tr><th scope="row">' + esc(e.proyecto) + '</th>' +
          '<td>' + (e.antiguedad ? esc(e.antiguedad) : 'nunca') + '</td>' +
          '<td>' + (e.resultado === 'exitosa' ? parEstado('activo', { etiqueta: 'Exitosa' })
            : (e.resultado === 'fallida' ? parEstado('fallido', { etiqueta: 'Fallida', causa: e.causa })
              : parEstado('detenido', { etiqueta: 'Sin exportación' }))) + '</td></tr>';
      }), { caption: 'Antigüedad de la última exportación vigente por proyecto' });
    html += '</section>';

    /* Sección 4 — retención */
    html += '<section class="mq-seccion" data-acento="b" aria-label="Retención del historial">';
    html += '<h2 class="mq-titulo-seccion">Retención del historial</h2>';
    html += '<div class="mq-grilla-campos">' +
      campoDescriptor(desc('desplieguesPorServicio'), { valor: D.RETENCION.desplieguesPorServicio }) +
      campoDescriptor(desc('diasAuditoria'), { valor: D.RETENCION.diasAuditoria }) + '</div>';
    html += '</section>';

    /* Sección 5 — identidad de la instancia */
    var variante = 'publicada';
    if (estado === 'sello-preliminar') { variante = 'preliminar'; }
    if (estado === 'sello-indeterminado') { variante = 'indeterminado'; }
    var expandido = estado === 'diagnostico-expandido' || estado === 'diagnostico-copiado';

    html += '<section class="mq-seccion" data-acento="a" aria-label="Acerca de esta instancia">';
    html += '<h2 class="mq-titulo-seccion">Acerca de esta instancia</h2>';
    html += sello(variante);
    html += '<button type="button" class="mq-btn" aria-expanded="' + (expandido ? 'true' : 'false') + '">' +
      icono('chevron', 14) + ' Diagnóstico</button>';
    if (expandido) { html += diagnostico(variante, estado === 'diagnostico-copiado'); }
    html += '</section>';

    /* Frontera de configuración: lo que NO se dibuja */
    html += '<section class="mq-seccion" aria-label="Frontera entre configuración de aplicación y de entorno">';
    html += '<h2 class="mq-titulo-seccion">Lo que esta superficie no gobierna</h2>';
    html += '<p class="mq-subtitulo">Se enumera acá como información de la maqueta. En el producto estos parámetros no se dibujan, ' +
      'ni siquiera deshabilitados: un control que no manda es peor que ninguno.</p>';
    html += '<ul class="mq-lista-puntos mq-caption">' + D.PARAMETROS_DE_ENTORNO.map(function (p) {
      return '<li><strong>' + esc(p.etiqueta) + '</strong> — ' + esc(p.donde) + '</li>';
    }).join('') + '</ul>';
    html += '</section>';

    return html;
  };

  /* ── SUP-13 · Variables compartidas del proyecto ──────────────────────── */
  R['SUP-13'] = function (sup, estado) {
    var formulario = ['campo-en-error', 'rechazo-referencia-en-valor', 'clave-mismo-valor', 'clave-distinto-valor'].indexOf(estado) >= 0;

    var html = '<div class="mq-encabezado"><div>' +
      '<p class="mq-subtitulo">Definidas una vez, usables desde cualquier servicio del proyecto. Rotar un valor es editar un solo lugar.</p></div>' +
      '<button type="button" class="mq-btn mq-btn--primario">' + icono('mas') + ' Nueva variable</button></div>';

    if (estado === 'error') {
      return html + bandaError('No se pudo traer el listado de variables compartidas.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }
    if (estado === 'cambio-guardado') {
      html += bandaOk('El cambio quedó pendiente y no aplicado. El contador del banner del lienzo subió.');
    }
    if (estado === 'con-servicios-marcados') {
      html += bandaAtencion('Se editó el valor de TZ. Quedó pendiente de redespliegue 1 servicio: api · TZ quedará obsoleta al aplicar.');
    }
    if (estado === 'rechazo-referencia') {
      html += '<div class="mq-superpuesta" style="margin-bottom:var(--space-16)"><header><h2>No se puede eliminar DB_PASSWORD</h2>' +
        '<button type="button" class="mq-btn-icono" aria-label="Cerrar">' + icono('cerrar', 14) + '</button></header>' +
        '<p class="mq-caption">La referencian los siguientes servicios y claves. La variable no se elimina y el cambio no entra al conjunto pendiente.</p>' +
        '<ul class="mq-lista-puntos"><li>api · DB_PASSWORD</li><li>db · POSTGRES_PASSWORD</li></ul>' +
        '<div class="mq-acciones"><button type="button" class="mq-btn mq-btn--primario">Entendido</button></div></div>';
    }

    if (formulario) {
      html += '<div class="mq-panel" style="max-width:460px;margin-bottom:var(--space-16)">' +
        '<h2 class="mq-titulo-seccion">Nueva variable</h2>';
      if (estado === 'clave-mismo-valor') {
        html += bandaInfo('Ya existe una variable TZ con este mismo valor. Probablemente convenga compartir. Se creó el objeto nuevo igual; podés reusar la existente.');
      }
      if (estado === 'clave-distinto-valor') {
        html += bandaInfo('Ya existe una variable TZ con otro valor. Se crearon separadas: casi seguro son cosas distintas. No se ofrece reusar.');
      }
      if (estado === 'rechazo-referencia-en-valor') {
        html += bandaError('Una variable compartida contiene un literal o material secreto. No admite una expresión de referencia en su valor.');
      }
      html += '<div class="mq-campo"><label for="vc-clave">Clave</label>' +
        '<input class="mq-input" id="vc-clave" value="' + (estado === 'campo-en-error' ? '2TZ' : 'TZ') + '"' +
        (estado === 'campo-en-error' ? ' aria-invalid="true" aria-describedby="vc-clave-err"' : '') + '>' +
        (estado === 'campo-en-error' ? '<span class="mq-error-inline" id="vc-clave-err">La clave no puede empezar con un dígito.</span>' : '') + '</div>';
      html += '<div class="mq-campo"><label for="vc-valor">Valor</label>' +
        '<input class="mq-input" id="vc-valor" value="' +
        (estado === 'rechazo-referencia-en-valor' ? '${{ db.SELFHOSTED_HOST }}' : 'America/Argentina/Buenos_Aires') + '"' +
        (estado === 'rechazo-referencia-en-valor' ? ' aria-invalid="true"' : '') + '></div>';
      html += '<div class="mq-campo"><label class="mq-toggle"><input type="checkbox" id="vc-secreta"> <span>Es secreta</span></label>' +
        '<span class="mq-hint">Al marcarla: se cifra en reposo, se muestra enmascarada, nunca se devuelve en claro y nunca se escribe en una exportación.</span></div>';
      html += '<div class="mq-campo"><label for="vc-desc">Descripción</label>' +
        '<input class="mq-input" id="vc-desc" value="Zona horaria comun a los tres servicios"></div>';
      html += '<div class="mq-acciones"><button type="button" class="mq-btn">Cancelar</button>' +
        '<button type="button" class="mq-btn mq-btn--primario">Guardar cambio</button></div>';
      html += '</div>';
    }

    html += '<div class="mq-fila" style="margin-bottom:var(--space-16)">' +
      '<div class="mq-campo" style="margin:0"><label class="mq-sr-only" for="vc-buscar">Buscar variables</label>' +
      '<input class="mq-input" id="vc-buscar" type="search" placeholder="Buscar…" style="width:220px"' +
      (estado === 'vacio-por-filtro' ? ' value="no-existe"' : '') + '></div></div>';

    if (estado === 'cargando') { return html + esqueleto(4); }
    if (estado === 'vacio') {
      return html + vacio('Este proyecto no tiene variables compartidas',
        'Declará una sola vez lo que varios servicios usan: la zona horaria, una credencial de base, un endpoint común.',
        '<button type="button" class="mq-btn">' + icono('mas') + ' Nueva variable</button>');
    }
    if (estado === 'vacio-por-filtro') {
      return html + vacio('Ninguna variable coincide con la búsqueda', 'Probá con otro texto o limpiá el filtro.',
        '<button type="button" class="mq-btn">Limpiar el filtro</button>');
    }

    var vars = D.VARIABLES_COMPARTIDAS;
    if (estado === 'variable-secreta') { vars = [D.VARIABLES_COMPARTIDAS[1]]; }
    if (estado === 'variable-huerfana') { vars = [D.VARIABLES_COMPARTIDAS[2]]; }

    html += tabla(['Clave', 'Valor', 'Secreta', 'Usada por', ''],
      vars.map(function (v) {
        return '<tr><th scope="row" class="mq-literal">' + esc(v.clave) + '<span class="mq-hint">' + esc(v.descripcion) + '</span></th>' +
          '<td class="mq-literal">' + (v.secreta ? '<span aria-label="valor enmascarado">••••••••</span>' : esc(v.valor)) + '</td>' +
          '<td>' + (v.secreta ? 'sí' : 'no') + '</td>' +
          '<td>' + (v.usadaPor
            ? n(v.usadaPor) + ' servicios'
            : '<span class="mq-par-estado mq-estado--degradado">' + icono('alert', 12) + ' Sin uso</span>') + '</td>' +
          '<td class="mq-celda-acciones">' +
          '<button type="button" class="mq-btn" aria-label="Editar la variable ' + esc(v.clave) + ' — ' + esc(v.descripcion) + '">Editar</button> ' +
          '<button type="button" class="mq-btn mq-btn--destructivo" aria-label="Eliminar la variable ' + esc(v.clave) + ' — ' + esc(v.descripcion) + '">Eliminar</button>' +
          '</td></tr>';
      }), { caption: 'Variables compartidas del proyecto' });

    html += '<p class="mq-hint">La clave no identifica: dos variables pueden llamarse igual y cada referencia resuelve a su propio objeto. ' +
      'Por eso la descripción acompaña siempre a la clave. No hay acción de revelar el valor de una variable secreta.</p>';

    if (estado === 'variable-huerfana') {
      html += '<p class="mq-caption" role="status" style="margin-top:var(--space-12)">' + icono('info', 14) +
        ' Aviso de higiene: esta variable no la referencia nadie. Se informa y no bloquea nada.</p>';
    }
    return html;
  };

  /* ── SUP-14 · Informe de conflicto de direcciones ─────────────────────── */
  R['SUP-14'] = function (sup, estado) {
    var c = D.CONFLICTO;

    if (estado === 'cargando') {
      return '<div class="mq-superpuesta">' + progresoLineal() +
        '<p class="mq-caption" role="status">Validando las direcciones. La validación se resuelve sin consultar al motor de contenedores.</p></div>';
    }
    if (estado === 'arranque-procedido') {
      return '<div class="mq-superpuesta">' +
        bandaOk('La resolución liberó la dirección y el proyecto arrancó. La superficie se cierra y el lienzo refleja el arranque.') +
        '<p><a class="mq-btn" href="Lienzo-Del-Proyecto.html">Volver al lienzo</a></p></div>';
    }
    if (estado === 'arranque-parcial') {
      return '<div class="mq-superpuesta">' +
        '<p class="mq-caption">' + parEstado('degradado', { etiqueta: 'Parcialmente activo' }) + '</p>' +
        '<p class="mq-caption">Arrancaron ia-api e ia-webui. print-server-pruebas quedó excluido por el conflicto de dirección. ' +
        'Es un estado legítimo del modelo: no lleva tratamiento de error ni acción de reparar.</p>' +
        '<p><a class="mq-btn" href="Lienzo-Del-Proyecto.html">Volver al lienzo</a></p></div>';
    }

    var bloque, titulo;
    if (estado === 'conflicto-duplicado-interno') { bloque = c.conflictoDuplicadoInterno; }
    else if (estado === 'conflicto-fuera-de-rango') { bloque = c.conflictoFueraDeRango; }
    else { bloque = c.conflictos[0]; }

    var html = '<div class="mq-superpuesta" role="dialog" aria-labelledby="cf-titulo">';
    html += '<header><h2 id="cf-titulo">No se puede arrancar «' + esc(c.proyecto) + '»</h2>' +
      '<button type="button" class="mq-btn-icono" aria-label="Volver al lienzo sin resolver. Nada se modifica">' + icono('cerrar', 14) + '</button></header>';

    if (estado === 'sugerencia-caducada') { html += bandaError(c.sugerenciaCaducada); }
    if (estado === 'error') {
      html += bandaError('No se pudo aplicar la resolución. Ninguna reserva se modificó y el informe sigue disponible.');
    }

    html += '<p class="mq-caption">1 conflicto de dirección impide el arranque.</p>';

    html += '<div class="mq-bloque-conflicto" role="group" aria-label="Conflicto en la dirección ' + esc(bloque.direccion) + '">';
    html += '<h3 class="mq-titulo-seccion mq-literal">' + esc(bloque.direccion) + '</h3>';

    if (bloque.clase === 'entre-proyectos') {
      html += filasClaveValor([
        ['Lo solicita', bloque.servicioSolicitante.nombre + ' de ' + bloque.servicioSolicitante.proyecto],
        ['Lo ocupa', bloque.ocupadaPor.nombre + ' de ' + bloque.ocupadaPor.proyecto, false],
        ['Estado del ocupante', parEstado('activo'), true]
      ]);
    } else if (bloque.clase === 'duplicado-interno') {
      html += '<p class="mq-caption">Duplicado interno: <strong>' + esc(bloque.servicios[0].nombre) + '</strong> y <strong>' +
        esc(bloque.servicios[1].nombre) + '</strong> del mismo proyecto declaran la misma dirección. Bloquea siempre.</p>' +
        '<p class="mq-hint">La resolución de detener el proyecto en conflicto no se ofrece: el ocupante es del propio proyecto. ' +
        'Una resolución que no aplica se omite, no se dibuja deshabilitada.</p>';
    } else {
      html += '<p class="mq-caption">' + esc(bloque.motivo) + ' La solicita <strong>' + esc(bloque.servicios[0].nombre) + '</strong>.</p>';
    }

    html += '<h4 class="mq-titulo-seccion" style="margin-top:var(--space-12)">Resoluciones</h4>';
    html += '<div class="mq-opciones" role="radiogroup" aria-label="Resoluciones posibles de este conflicto">';
    bloque.resoluciones.forEach(function (r, i) {
      var rid = id('res');
      var elegida = estado !== 'sin-resolucion-elegida' && i === 0;
      html += '<label class="mq-opcion" for="' + rid + '">' +
        '<input type="radio" name="resolucion" id="' + rid + '"' + (elegida ? ' checked' : '') + '>' +
        '<span><strong>' + esc(r.etiqueta) + '</strong><span class="mq-hint">' + esc(r.consecuencia) + '</span></span></label>';
    });
    html += '</div></div>';

    if (bloque.clase === 'entre-proyectos') {
      html += '<p class="mq-caption">Servicios sin conflicto: ' +
        c.serviciosSinConflicto.map(function (s) { return esc(s.nombre); }).join(', ') + '</p>';
    }

    html += '<div class="mq-acciones"><a class="mq-btn" href="Lienzo-Del-Proyecto.html">Volver al lienzo</a>' +
      (estado === 'aplicando'
        ? botonEnviando('Aplicando…')
        : '<button type="button" class="mq-btn mq-btn--primario"' +
          (estado === 'sin-resolucion-elegida' ? ' disabled' : '') + '>Aplicar resolución</button>') + '</div>';
    html += '<p class="mq-hint">No se ofrece arrancar igual, no se sugiere qué resolución elegir y el resultado parcial no se presenta como un fracaso.</p>';
    return html + '</div>';
  };

  /* ── SUP-15 · Exportación e importación ───────────────────────────────── */
  R['SUP-15'] = function (sup, estado) {
    var e = D.EXPORTACION;
    var modoImportacion = ['importacion-selector', 'importacion-interpretando', 'informe-sin-perdida',
      'informe-con-perdida', 'rechazo-nombre', 'rechazo-referencia', 'rechazo-ciclo', 'rechazo-formato'].indexOf(estado) >= 0;

    if (!modoImportacion) {
      var h = '<div class="mq-superpuesta"><header><h2>Exportar «' + esc(D.PROYECTOS[0].nombre) + '»</h2>' +
        '<button type="button" class="mq-btn-icono" aria-label="Cerrar">' + icono('cerrar', 14) + '</button></header>';

      if (estado === 'exportacion-cambios-pendientes') { h += bandaAtencion(e.advertenciaCambiosPendientes); }
      if (estado === 'referencia-no-resoluble') {
        h += bandaError(e.causaReferenciaNoResoluble + ' No se emite ningún archivo con la expresión sin resolver.');
      }
      if (estado === 'exportacion-entregada') {
        h += bandaOk('Exportado. Los tres archivos quedaron disponibles.');
      }
      if (estado === 'error') {
        h += bandaError('La exportación falló. No quedó ningún archivo parcial.');
      }

      h += '<h3 class="mq-titulo-seccion">Qué se va a generar</h3>';
      h += '<div class="mq-pila-8" style="margin:var(--space-8) 0 var(--space-14)">';
      e.artefactos.forEach(function (a) {
        var aid = id('art');
        h += '<label class="mq-opcion" for="' + aid + '"><input type="checkbox" id="' + aid + '" checked>' +
          '<span><strong>' + esc(a.etiqueta) + '</strong>' +
          '<span class="mq-hint"><strong>Preserva:</strong> ' + esc(a.preserva) + '</span>' +
          '<span class="mq-hint"><strong>No preserva:</strong> ' + esc(a.noPreserva) + '</span></span></label>';
      });
      h += '</div>';
      h += bandaAtencion(e.advertenciaSecretos);
      h += '<p class="mq-hint">El archivo de composición es autosuficiente sin el manifiesto: el manifiesto agrega, no reemplaza. ' +
        'El conjunto de cambios pendientes no se exporta.</p>';
      h += '<div class="mq-acciones"><button type="button" class="mq-btn">Cancelar</button>' +
        (estado === 'exportacion-generando' ? botonEnviando('Generando…')
          : '<button type="button" class="mq-btn mq-btn--primario" aria-describedby="ex-adv">Exportar</button>') + '</div>';
      h += '<p class="mq-hint" id="ex-adv">' + esc(e.advertenciaSecretos) + '</p>';
      h += '<p class="mq-hint">B-UX-17 · el mapa de navegación del anexo E-18 no incluye ninguna ruta de exportación ni de importación. ' +
        'La ubicación de esta superficie queda por confirmar.</p>';
      return h + '</div>';
    }

    var html = '<div class="mq-superpuesta"><header><h2>Importar como proyecto SelfHosted nuevo</h2>' +
      '<button type="button" class="mq-btn-icono" aria-label="Cerrar">' + icono('cerrar', 14) + '</button></header>';

    if (estado === 'rechazo-nombre') { html += bandaError('Un nombre de servicio no cumple el formato o colisiona dentro del proyecto nuevo. No se creó nada.'); }
    if (estado === 'rechazo-referencia') { html += bandaError('Una expresión apunta a un servicio que no existe en el archivo. No se creó nada.'); }
    if (estado === 'rechazo-ciclo') { html += bandaError('Las dependencias con espera forman un ciclo: ia-api → ia-webui → ia-video → ia-api. No se creó nada.'); }
    if (estado === 'rechazo-formato') { html += bandaError('La versión de formato del manifiesto no está entre las admitidas.'); }

    if (['importacion-selector', 'importacion-interpretando', 'rechazo-nombre', 'rechazo-referencia',
      'rechazo-ciclo', 'rechazo-formato'].indexOf(estado) >= 0) {
      html += '<div class="mq-campo"><label for="im-archivo">Archivo a importar</label>' +
        '<input class="mq-input" id="im-archivo" type="file" aria-describedby="im-hint">' +
        '<span class="mq-hint" id="im-hint">Admite el archivo en el formato estándar de composición y, opcionalmente, el manifiesto propio que lo acompaña.</span></div>';
      html += '<p class="mq-hint">Sin manifiesto, el proyecto se crea igual: la disposición del lienzo se asigna inicialmente y no hay nivel de variable compartida que restituir.</p>';
      html += '<div class="mq-acciones"><button type="button" class="mq-btn">Cancelar</button>' +
        (estado === 'importacion-interpretando' ? botonEnviando('Interpretando…')
          : '<button type="button" class="mq-btn mq-btn--primario">Importar</button>') + '</div>';
      return html + '</div>';
    }

    var inf = e.informe;
    html += '<p class="mq-caption">Se creó «' + esc(inf.nombreCreado) + '».</p>';
    html += '<h3 class="mq-titulo-seccion">Se crearon</h3><ul class="mq-lista-puntos">' +
      inf.creados.map(function (c) { return '<li>' + n(c.cantidad) + ' ' + esc(c.etiqueta) + '</li>'; }).join('') + '</ul>';
    html += '<h3 class="mq-titulo-seccion" style="margin-top:var(--space-14)">No se pudo representar</h3>';
    if (estado === 'informe-con-perdida') {
      html += '<ul class="mq-lista-puntos">' + inf.noRepresentables.map(function (nr) {
        return '<li><span class="mq-literal">' + esc(nr.elemento) + '</span> — ' + esc(nr.motivo) + '</li>';
      }).join('') + '</ul>';
    } else {
      html += '<p class="mq-caption">Nada. Todo el archivo se pudo representar.</p>' +
        '<p class="mq-hint">La lista se declara vacía y no se omite: una lista ausente se leería como «no hubo pérdida» sin haberlo verificado.</p>';
    }
    html += '<div class="mq-acciones"><button type="button" class="mq-btn">Cerrar</button>' +
      '<a class="mq-btn mq-btn--primario" href="Lienzo-Del-Proyecto.html">Abrir el lienzo</a></div>';
    return html + '</div>';
  };

  /* ── SUP-16 · Revisión de higiene ─────────────────────────────────────── */
  R['SUP-16'] = function (sup, estado) {
    var hg = D.HIGIENE;
    var html = '<p class="mq-subtitulo">Condiciones detectadas en el registro del proyecto. Ninguna impide operar.</p>';

    if (estado === 'error') {
      return html + bandaError('La detección no pudo completarse. El registro queda intacto: esta superficie es de lectura y no lo modifica.') +
        '<p><button type="button" class="mq-btn">' + icono('refresh') + ' Reintentar</button></p>';
    }
    if (estado === 'cargando') { return html + esqueleto(4, 'bloque'); }
    if (estado === 'vacio') {
      return html + vacio('No hay advertencias',
        'El registro de este proyecto no tiene condiciones detectadas. Es un estado normal, no un logro.', null);
    }
    if (estado === 'rechazo-eliminar') {
      html += bandaError(hg.rechazoEliminar + ' La variable no se elimina.');
    }

    var grupos = hg.grupos;
    if (estado === 'variable-huerfana') { grupos = [hg.grupos[0]]; }
    if (estado === 'nombre-repetido') { grupos = [hg.grupos[1]]; }
    if (estado === 'clave-mismo-valor') {
      grupos = [{ id: hg.grupos[2].id, titulo: hg.grupos[2].titulo, filas: [hg.grupos[2].filas[0]] }];
    }
    if (estado === 'clave-distinto-valor') {
      grupos = [{ id: hg.grupos[2].id, titulo: hg.grupos[2].titulo, filas: [hg.grupos[2].filas[1]] }];
    }
    if (estado === 'referencia-sin-uso') { grupos = [hg.grupos[3]]; }

    var etiquetasAccion = { ver: 'Ver', eliminar: 'Eliminar', renombrar: 'Renombrar', reusar: 'Reusar' };

    grupos.forEach(function (g) {
      html += '<section class="mq-seccion" data-acento="c" aria-label="' + esc(g.titulo + ', ' + g.filas.length + ' condiciones') + '">';
      html += '<div class="mq-fila"><h2 class="mq-titulo-seccion" style="margin-right:auto">' + esc(g.titulo) + '</h2>' +
        '<span class="mq-par-estado mq-estado--detenido">' + g.filas.length + '</span></div>';
      html += '<ul class="mq-lista-limpia mq-pila-8" style="margin-top:var(--space-12)">';
      g.filas.forEach(function (f) {
        html += '<li class="mq-fila"><span class="mq-caption" style="margin-right:auto">' +
          '<strong class="mq-literal">' + esc(f.principal) + '</strong> — ' + esc(f.secundario) + '</span>' +
          f.acciones.map(function (a) {
            return '<button type="button" class="mq-btn' + (a === 'eliminar' ? ' mq-btn--destructivo' : '') +
              '" aria-label="' + esc(etiquetasAccion[a] + ' ' + f.principal + ' — ' + f.secundario) + '">' +
              esc(etiquetasAccion[a]) + '</button>';
          }).join(' ') + '</li>';
      });
      html += '</ul></section>';
    });

    html += '<p class="mq-hint">Los grupos sin condiciones no se dibujan. No hay acción de descartar un aviso: descartarlo lo volvería invisible ' +
      'sin haberlo resuelto. La acción de reusar se ofrece sólo cuando el valor coincide.</p>';
    html += '<p class="mq-hint">' + esc(hg.brechaFrecuencia) + '</p>';
    return html;
  };

  /* ── Índice de la maqueta ─────────────────────────────────────────────── */
  function renderIndice() {
    var m = D.MAQUETA;
    var total = 0;
    D.SUPERFICIES.forEach(function (s) { total += s.estados.length; });

    var html = '<section class="mq-seccion" data-acento="a" aria-label="Cómo se usa la maqueta">';
    html += '<h2 class="mq-titulo-seccion">Cómo se usa</h2>';
    html += '<ul class="mq-lista-puntos mq-caption">' +
      '<li>Abrí cualquier superficie. En cada una, la <strong>barra de validación</strong> de arriba permite alternar sus estados sin recargar.</li>' +
      '<li>La barra es un instrumento de la maqueta y <strong>no se traslada al producto</strong>.</li>' +
      '<li>El interruptor de <strong>recarga automática</strong> arranca apagado, recuerda su estado en el navegador y se deshabilita con su motivo cuando la maqueta se abre desde <code>file://</code>.</li>' +
      '<li>Podés corregirla por prompt, o editando a mano los archivos y avisando «revisá la maqueta y tomá las correcciones».</li>' +
      '</ul></section>';

    html += '<section class="mq-seccion" data-acento="d" aria-label="Superficies de la maqueta">';
    html += '<h2 class="mq-titulo-seccion">Las 16 superficies</h2>';
    html += '<p class="mq-subtitulo">' + total + ' estados demostrables en total. La correspondencia superficie ↔ caso de uso ' +
      'es la de <code>Experiencia-De-Uso.md</code> §9.2, que es su fuente única.</p>';
    html += tabla(['#', 'Superficie', 'Propósito', 'CU', 'Estados'],
      D.SUPERFICIES.map(function (s) {
        return '<tr><td class="mq-literal">' + esc(s.id) + '</td>' +
          '<th scope="row"><a href="' + esc(s.archivo) + '">' + esc(s.nombre) + '</a>' +
          '<span class="mq-hint">' + esc(s.wireframe) + '</span></th>' +
          '<td>' + esc(s.proposito) + '</td>' +
          '<td class="mq-literal">' + esc(s.cu.join(', ')) + '</td>' +
          '<td>' + n(s.estados.length) + '</td></tr>';
      }), { caption: 'Superficies maquetadas, con su caso de uso y su cantidad de estados' });
    html += '</section>';

    html += '<section class="mq-seccion" data-acento="c" aria-label="Contrato de campos que la maqueta exhibe">';
    html += '<h2 class="mq-titulo-seccion">Contrato de campos que la maqueta exhibe</h2>';
    html += '<p class="mq-subtitulo">Los datos viven exclusivamente en <code>assets/js/Datos-Maqueta.js</code>. ' +
      'Ningún HTML los hardcodea. Cada campo declara su tipo, su ejemplo, la entidad de la que proviene y el anexo del intake que lo declara.</p>';
    html += tabla(['Campo', 'Tipo', 'Ejemplo', 'Entidad de origen', 'Anexo'],
      D.CONTRATO_CAMPOS.map(function (c) {
        return '<tr><th scope="row" class="mq-literal">' + esc(c.campo) + '</th>' +
          '<td>' + esc(c.tipo) + '</td>' +
          '<td class="mq-literal">' + esc(c.ejemplo) + '</td>' +
          '<td>' + esc(c.entidad) + '</td>' +
          '<td class="mq-literal">' + esc(c.anexo) + '</td></tr>';
      }), { caption: 'Contrato de campos de la maqueta' });
    html += '</section>';

    var alta = D.ALTA_SERVICIO.propuesta;
    html += '<section class="mq-seccion" data-acento="b" aria-label="Propuesta abierta: alta de servicio">';
    html += '<h2 class="mq-titulo-seccion">Propuesta abierta a validar · alta de servicio</h2>';
    html += notaPropuesta(alta);
    html += '<p class="mq-caption">Se ve en funcionamiento en ' +
      '<a href="Alta-De-Servicio.html">Alta de servicio, superficie propia («alta de servicio»</a>, ' +
      'y se alcanza desde el botón «Nuevo servicio» del ' +
      '<a href="Lienzo-Del-Proyecto.html">lienzo</a>, que hasta el paso 5 de esta fase no llevaba a ninguna parte.</p>';
    html += '</section>';

    var p = D.PROPUESTA_ARISTAS;
    html += '<section class="mq-seccion" data-acento="b" aria-label="Propuesta abierta: distinción de aristas">';
    html += '<h2 class="mq-titulo-seccion">Propuesta abierta a validar · ' + esc(p.brecha) + '</h2>';
    html += '<div class="mq-nota-propuesta"><strong>' + esc(p.titulo) + '</strong>' +
      '<p style="margin:var(--space-4) 0">' + esc(p.texto) + '</p>' +
      '<ul class="mq-lista-puntos">' + p.restricciones.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>';
    html += tabla(['Clase de arista', 'Canales que la distinguen'],
      p.reglas.map(function (r) {
        return '<tr><th scope="row">' + esc(r.titulo) + '</th><td>' + esc(r.canales) + '</td></tr>';
      }), { caption: 'Propuesta de distinción visual de aristas' });
    html += '<p class="mq-hint">' + esc(p.nota) + '</p>';
    html += '<p class="mq-caption">Se ve en funcionamiento en <a href="Lienzo-Del-Proyecto.html">Lienzo del proyecto</a>, ' +
      'y su clase inválida en <a href="Lienzo-Del-Proyecto.html#estado=arista-invalida">el estado «arista inválida»</a>.</p>';
    html += '</section>';

    html += '<section class="mq-seccion" aria-label="Sello de versión de la maqueta">';
    html += '<h2 class="mq-titulo-seccion">Sello de esta iteración</h2>';
    html += filasClaveValor([
      ['Proyecto', m.proyecto],
      ['Modelo UX-UI aplicado', m.modeloUxUi],
      ['Fecha de la iteración', m.fechaIteracion],
      ['Plataforma soportada', m.navegadorSoportado]
    ]);
    html += '</section>';
    return html;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     7. Arranque y conmutación de estados
     ═══════════════════════════════════════════════════════════════════════ */

  var estadoActual = null;
  var superficieActual = null;

  function estadoPorDefecto(sup) {
    for (var i = 0; i < sup.estados.length; i++) {
      if (sup.estados[i].predeterminado) { return sup.estados[i].id; }
    }
    return sup.estados[0].id;
  }

  function etiquetaEstado(sup, idEstado) {
    for (var i = 0; i < sup.estados.length; i++) {
      if (sup.estados[i].id === idEstado) { return sup.estados[i].etiqueta; }
    }
    return idEstado;
  }

  function anunciar(texto) {
    var el = document.getElementById('mq-anuncio');
    if (el) { el.textContent = texto; }
  }

  function pintarSuperficie(sup, idEstado) {
    var destino = document.getElementById('superficie');
    if (!destino) { return; }
    var render = R[sup.id];
    destino.innerHTML = render ? render(sup, idEstado) : '<p>Sin renderizador para ' + esc(sup.id) + '.</p>';
    estadoActual = idEstado;
    anunciar('Estado de la superficie: ' + etiquetaEstado(sup, idEstado));
  }

  /* Barra reducida para el índice: sin selector de estado, con el rótulo,
     el selector de superficie y el interruptor de recarga automática. */
  function barraValidacionIndice() {
    var m = D.MAQUETA;
    var html = '<span class="mq-barra-rotulo">' + esc(m.rotuloBarra) + '</span>';
    html += '<div class="mq-barra-fila">';
    html += '<div class="mq-barra-campo"><label for="mq-sel-superficie">Ir a la superficie</label>' +
      '<select id="mq-sel-superficie"><option value="">Elegí una superficie…</option>';
    D.SUPERFICIES.forEach(function (s) {
      html += '<option value="' + esc(s.archivo) + '">' + esc(s.id) + ' · ' + esc(s.nombre) + '</option>';
    });
    html += '</select></div>';
    var puede = Recarga.disponible();
    html += '<div class="mq-barra-campo">' +
      '<input type="checkbox" id="mq-recarga"' + (puede && Recarga.activa() ? ' checked' : '') +
      (puede ? '' : ' disabled aria-describedby="mq-recarga-motivo"') + '>' +
      '<label for="mq-recarga">Recarga automática</label></div>';
    if (!puede) {
      html += '<span class="mq-barra-motivo" id="mq-recarga-motivo">' +
        'Deshabilitada: la maqueta se abrió desde el sistema de archivos (file://) y la consulta de versión de recurso no funciona. ' +
        'Servila desde un servidor local para habilitarla.</span>';
    }
    html += '<span class="mq-barra-motivo mq-empuje">' + esc(m.navegadorSoportado) + '</span>';
    html += '</div>';
    return html;
  }

  function montarIndice() {
    var barra = document.getElementById('barra-validacion');
    if (barra) {
      barra.setAttribute('role', 'region');
      barra.setAttribute('aria-label', D.MAQUETA.rotuloBarra);
      barra.innerHTML = barraValidacionIndice();
    }
    var destino = document.getElementById('superficie');
    if (destino) { destino.innerHTML = renderIndice(); }
    var pie = document.getElementById('sello-pie');
    if (pie) { pie.innerHTML = pieMaqueta(); }
    conectarBarra();
  }

  function conectarBarra() {
    var selSup = document.getElementById('mq-sel-superficie');
    if (selSup) {
      selSup.addEventListener('change', function () {
        if (this.value) { global.location.href = this.value; }
      });
    }
    var chk = document.getElementById('mq-recarga');
    if (chk && Recarga.disponible()) {
      if (Recarga.activa()) { Recarga.arrancar(); }
      chk.addEventListener('change', function () {
        Recarga.fijar(this.checked);
        if (this.checked) { Recarga.arrancar(); } else { Recarga.detener(); }
      });
      document.addEventListener('visibilitychange', function () {
        if (!Recarga.activa()) { return; }
        if (document.hidden) { Recarga.detener(); } else { Recarga.arrancar(); }
      });
    }
  }

  function montar() {
    var body = document.body;
    var idSup = body.getAttribute('data-superficie');
    if (idSup === 'INDICE') { montarIndice(); return; }
    var sup = D.superficie(idSup);
    if (!sup) { return; }
    superficieActual = sup;

    /* Barra de validación. El estado inicial admite enlace directo por
       fragmento (#estado=<id>) para poder compartir un estado concreto. */
    var barra = document.getElementById('barra-validacion');
    var inicial = estadoPorDefecto(sup);
    var frag = (global.location.hash || '').replace(/^#estado=/, '');
    if (frag) {
      for (var k = 0; k < sup.estados.length; k++) {
        if (sup.estados[k].id === frag) { inicial = frag; break; }
      }
    }
    if (barra) {
      barra.setAttribute('role', 'region');
      barra.setAttribute('aria-label', D.MAQUETA.rotuloBarra);
      barra.innerHTML = barraValidacion(sup, inicial);
    }

    /* Shell */
    if (sup.shell === 'trabajo') {
      var nav = document.getElementById('nav-lateral');
      if (nav) { nav.innerHTML = navLateral(sup); }
      var topbar = document.getElementById('topbar');
      if (topbar) {
        topbar.innerHTML = '<span class="mq-topbar-titulo">SelfHosted · ' + esc(sup.nombre) + '</span>' + barraIdentidad();
      }
    }

    var pie = document.getElementById('sello-pie');
    if (pie) { pie.innerHTML = pieMaqueta(); }

    pintarSuperficie(sup, inicial);

    /* Conmutación de estados sin recargar */
    var selEstado = document.getElementById('mq-sel-estado');
    if (selEstado) {
      selEstado.addEventListener('change', function () {
        pintarSuperficie(sup, this.value);
        try { global.history.replaceState(null, '', '#estado=' + this.value); } catch (e) { /* sin historial */ }
      });
    }

    /* Navegación entre superficies y recarga automática (apagada por defecto,
       con su estado persistido en el navegador) */
    conectarBarra();

    /* Disclosures y pestañas de demostración: mantienen el foco y no navegan */
    document.addEventListener('click', function (ev) {
      var t = ev.target.closest ? ev.target.closest('[aria-expanded]') : null;
      if (t && t.tagName === 'BUTTON') {
        t.setAttribute('aria-expanded', t.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      }
    });
  }

  global.Maqueta = {
    montar: montar,
    pintar: pintarSuperficie,
    anunciar: anunciar,
    Recarga: Recarga
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})(window);
