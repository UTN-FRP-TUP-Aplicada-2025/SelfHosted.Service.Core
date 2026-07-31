# 02-Especificacion-Funcional — SelfHosted Service

**Proyecto:** SelfHosted Service
**Documento:** README.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

Punto de entrada navegable de la categoría, para revisores externos: 03-UX-UI-DX, 05-Arquitectura-Tecnica, 06-Backlog-Tecnico, 07-Plan-Sprint y 08-Calidad-Y-Pruebas.

---

## Tabla de contenido

- [1. Por dónde empezar](#1-por-dónde-empezar)
- [2. Estructura de la carpeta](#2-estructura-de-la-carpeta)
- [3. Casos de uso vigentes](#3-casos-de-uso-vigentes)
- [4. Reglas de negocio vigentes](#4-reglas-de-negocio-vigentes)
- [5. Modelo y reglas conceptuales vigentes](#5-modelo-y-reglas-conceptuales-vigentes)
- [6. Qué consume cada categoría downstream](#6-qué-consume-cada-categoría-downstream)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Por dónde empezar

[Especificacion-Funcional.md](Especificacion-Funcional.md) es el índice maestro: trae la matriz de trazabilidad de necesidad de negocio a caso de uso, a regla de negocio y a historia de usuario, la verificación de cobertura bidireccional y las diecinueve brechas abiertas con su destinatario.

Un revisor que sólo quiera entender qué hace el producto puede leer, en este orden: CU-01 y CU-03, que declaran el proyecto SelfHosted y el servicio; CU-04, que es el mecanismo de vínculo del que dependen el orden de arranque, el marcado de redespliegue y la exportación; CU-22 y CU-24, que son la edición transaccional; y CU-07, que es el flujo diferencial del producto.

## 2. Estructura de la carpeta

| Ruta | Contenido |
| --- | --- |
| [Especificacion-Funcional.md](Especificacion-Funcional.md) | Índice maestro con la matriz de trazabilidad y las brechas |
| [Casos-De-Uso/](Casos-De-Uso/) | 36 casos de uso, uno por archivo |
| [Reglas-De-Negocio/](Reglas-De-Negocio/) | 37 reglas de negocio, una por archivo |
| [Modelo-Datos/Modelo-Conceptual.md](Modelo-Datos/Modelo-Conceptual.md) | Modelo conceptual con 14 entidades, su diagrama y su glosario |
| [Modelo-Datos/reglas-conceptuales-de-modelo/](Modelo-Datos/reglas-conceptuales-de-modelo/) | 18 reglas conceptuales del modelo, una por archivo |

Ningún archivo lleva sufijo de versión en el nombre: la versión vive en el campo de su cabecera. No hay carpeta de versiones superadas, porque ésta es la primera emisión de la categoría.

## 3. Casos de uso vigentes

Los 36 en estado `Propuesto`, versión 1.0. Agrupados por la necesidad de negocio que los origina.

**NB-01, visibilidad unificada de la arquitectura.** [CU-01](Casos-De-Uso/CU-01-Alta-De-Proyecto.md) da de alta un proyecto SelfHosted con su modo de red. [CU-02](Casos-De-Uso/CU-02-Listado-Renombrado-Y-Eliminacion-De-Proyectos.md) lista, renombra y elimina proyectos. [CU-03](Casos-De-Uso/CU-03-Alta-Y-Configuracion-De-Servicio.md) declara un servicio con las ocho dimensiones que el parque real exige. [CU-04](Casos-De-Uso/CU-04-Composicion-Del-Lienzo.md) compone el lienzo y traza las aristas de dependencia. [CU-05](Casos-De-Uso/CU-05-Persistencia-Y-Recuperacion-De-La-Disposicion.md) conserva la disposición del lienzo. [CU-36](Casos-De-Uso/CU-36-Revision-De-Higiene-Del-Registro.md) informa las condiciones de higiene del registro sin bloquear.

**NB-02, adoptabilidad del parque existente.** [CU-06](Casos-De-Uso/CU-06-Descubrimiento-De-Contenedores-Adoptables.md) descubre los contenedores candidatos con su motivo de no incorporabilidad. [CU-07](Casos-De-Uso/CU-07-Incorporacion-Con-Confirmacion-Explicita.md) los incorpora sin recrearlos, con clasificación obligatoria de variables. [CU-08](Casos-De-Uso/CU-08-Traduccion-De-La-Configuracion-Observada.md) traduce la configuración observada al modelo de servicio.

**NB-03, reproducibilidad de la arquitectura.** [CU-09](Casos-De-Uso/CU-09-Exportacion-En-Formato-De-Composicion.md) exporta al formato estándar de composición con los secretos vacíos. [CU-10](Casos-De-Uso/CU-10-Exportacion-Del-Manifiesto-Propio.md) exporta el manifiesto propio que preserva la disposición. [CU-11](Casos-De-Uso/CU-11-Importacion-Como-Proyecto-Nuevo.md) importa como proyecto SelfHosted nuevo con su informe. [CU-12](Casos-De-Uso/CU-12-Exportacion-Programada-A-Destino-Externo.md) ejecuta la exportación programada hacia un destino externo.

**NB-04, el alta deja de ser copiar y adaptar.** [CU-13](Casos-De-Uso/CU-13-Despliegue-Desde-Imagen-De-Registro.md) despliega desde imagen de registro. [CU-14](Casos-De-Uso/CU-14-Consulta-Del-Registro-Del-Contenedor.md) consulta el registro del contenedor. [CU-15](Casos-De-Uso/CU-15-Despliegue-Construyendo-La-Imagen.md) despliega construyendo la imagen. [CU-16](Casos-De-Uso/CU-16-Alta-Desde-Plantilla-Del-Catalogo.md) instancia un ítem del catálogo creando el conjunto completo. [CU-17](Casos-De-Uso/CU-17-Mantenimiento-Del-Catalogo.md) mantiene el catálogo. [CU-34](Casos-De-Uso/CU-34-Variables-Compartidas-Del-Proyecto.md) declara las variables compartidas del proyecto. [CU-35](Casos-De-Uso/CU-35-Valor-Expresado-Como-Referencia.md) expresa un valor como referencia a otra variable.

**NB-05, arranque previsible y conflictos anticipados.** [CU-18](Casos-De-Uso/CU-18-Arranque-Y-Parada-Con-Autoarranque.md) arranca y detiene respetando el orden del grafo de arranque. [CU-19](Casos-De-Uso/CU-19-Rango-Gestionado-Y-Reserva-De-Direccion.md) gobierna el rango de direcciones y sus reservas. [CU-20](Casos-De-Uso/CU-20-Validacion-De-Conflicto-De-Direcciones.md) valida el conflicto sin acceder al motor. [CU-21](Casos-De-Uso/CU-21-Informe-De-Conflicto-Y-Resolucion.md) emite el informe y aplica la resolución elegida.

**NB-06, cambios revisados y aplicados en lote.** [CU-22](Casos-De-Uso/CU-22-Acumulacion-De-Cambios-Pendientes.md) acumula los cambios distinguiendo los visuales. [CU-23](Casos-De-Uso/CU-23-Descarte-De-Un-Cambio-Individual.md) descarta un cambio individual. [CU-24](Casos-De-Uso/CU-24-Aplicacion-En-Lote.md) aplica el lote redesplegando sólo lo afectado. [CU-25](Casos-De-Uso/CU-25-Calculo-Del-Informe-De-Impacto.md) calcula el informe de impacto antes de ejecutar.

**NB-07, atribución del consumo del servidor.** [CU-26](Casos-De-Uso/CU-26-Lectura-Del-Estado-Del-Servidor.md) lee el estado del servidor. [CU-27](Casos-De-Uso/CU-27-Vista-Por-Proyecto-Y-Por-Contenedor.md) baja al estado por proyecto SelfHosted y por contenedor. [CU-28](Casos-De-Uso/CU-28-Reconciliacion-Con-El-Motor-De-Contenedores.md) reconcilia con el motor y señala el servicio huérfano.

**NB-08, control de acceso y credenciales de máquina.** [CU-29](Casos-De-Uso/CU-29-Alta-Del-Administrador-En-El-Primer-Arranque.md) da de alta el administrador en el primer arranque. [CU-30](Casos-De-Uso/CU-30-Inicio-Y-Cierre-De-Sesion.md) inicia y cierra sesión. [CU-31](Casos-De-Uso/CU-31-Cambio-De-Contrasena.md) cambia la contraseña exigiendo la actual. [CU-32](Casos-De-Uso/CU-32-Emision-Y-Revocacion-De-Credenciales-De-Maquina.md) emite, lista y revoca credenciales de máquina. [CU-33](Casos-De-Uso/CU-33-Disparo-De-Despliegue-Con-Credencial-De-Ambito-Minimo.md) dispara un despliegue con credencial de ámbito mínimo.

## 4. Reglas de negocio vigentes

Las 37 del anexo E-16 del intake, en estado `Propuesto`, versión 1.0, en [Reglas-De-Negocio/](Reglas-De-Negocio/). El índice maestro trae la tabla completa con su autoría declarada y sus casos de uso afectados.

Agrupadas por lo que restringen: **el servicio y su configuración**, RN-01, RN-02, RN-07, RN-08, RN-09, RN-10, RN-19; **la red y las direcciones**, RN-03, RN-06, RN-18; **el vínculo entre servicios**, RN-04, RN-05, RN-14, RN-34; **las variables y sus referencias**, RN-21, RN-22, RN-23, RN-24, RN-27, RN-28, RN-32; **la edición transaccional y el despliegue**, RN-12, RN-13, RN-20, RN-31; **la incorporación del parque existente**, RN-11, RN-29; **la exportación y la importación**, RN-25, RN-26; **los secretos y la auditoría**, RN-15, RN-16, RN-17; **el catálogo**, RN-30, RN-36; **la identidad del modelo y su higiene**, RN-33, RN-35, RN-37.

Advertencia de consumo: **catorce de las dieciséis especificaciones derivadas siguen sin revisar**. Toda parte de regla marcada `[D-i]` se consume declarándola revisable y nunca como requisito cerrado del cliente.

## 5. Modelo y reglas conceptuales vigentes

[Modelo-Conceptual.md](Modelo-Datos/Modelo-Conceptual.md), en estado `Propuesto`, versión 1.0, con catorce entidades conceptuales sobre las once tablas que declara el anexo E-9, su diagrama, su glosario y su tabla de trazabilidad de entidad a caso de uso y a regla.

Las 18 reglas conceptuales están en [reglas-conceptuales-de-modelo/](Modelo-Datos/reglas-conceptuales-de-modelo/), todas en estado `Propuesto`, versión 1.0. Son obligatorias porque el modelo supera las diez entidades.

## 6. Qué consume cada categoría downstream

| Categoría | Qué consume de acá |
| --- | --- |
| 03-UX-UI-DX | Los flujos principales y alternativos de cada CU, sin su detalle visual, que es de esa categoría; y las tres brechas de maquetado que el anexo E-18 dejó abiertas (B-07) |
| 05-Arquitectura-Tecnica | El modelo conceptual y sus 18 reglas, la dimensión de componentes esperados de cada CU —que es referencia tentativa, igual que los trece nombres de actor no humano acuñados por esta categoría según §8 del índice maestro— y las **siete** brechas de diseño que esta categoría delega (B-06, B-08, B-10, B-14, B-15, B-16, B-17) |
| 06-Backlog-Tecnico | Las 118 historias de usuario previstas de la matriz de §6 del índice maestro, con su numeración provisional (B-19) |
| 07-Plan-Sprint | El orden de dependencia entre CU que las precondiciones declaran, y los anclajes de épica que quedaron abiertos (B-18) |
| 08-Calidad-Y-Pruebas | Los criterios de aceptación de los 36 CU, las 37 RN con su caso del anexo E-22, las **tres** reglas sin caso ejecutable propio —RN-02, RN-08 y RN-10— y la mitad de RN-28 que el anexo deja sin cubrir (B-05) |

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Correcciones absorbidas dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5. §6 corregía dos conteos que afectan a lo que consume el downstream: las brechas delegadas a 05-Arquitectura-Tecnica son siete y la fila decía seis, y las reglas sin caso ejecutable propio son tres y la fila decía dos. La fila de 05 suma además la advertencia sobre los nombres de actor no humano acuñados por esta categoría. Origen: hallazgos H-02, H-04 y H-11 del informe [Audit/B-02-03-r1.md](../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial del índice navegable de la categoría, emitido junto con los 36 casos de uso, las 37 reglas de negocio, el modelo conceptual y las 18 reglas conceptuales |
