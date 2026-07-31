> **Bloque de archivado.** Estado: `Superado`. Copia completa y autocontenida de la versión 1.0 de `CU-15-Despliegue-Construyendo-La-Imagen.md`, tomada el 2026-07-29 antes de incorporar a la especificación las definiciones de alta y configuración de servicios y de ítems del catálogo que `SDD/Estado/Redefinicion-Servicio.md` v2.0 establece en su parte normativa (§16 a §23). La versión vigente es `../../CU-15-Despliegue-Construyendo-La-Imagen.md`. El cuerpo de este snapshot no se modifica.

# CU-15 — Despliegue construyendo la imagen

**Proyecto:** SelfHosted Service
**Documento:** CU-15-Despliegue-Construyendo-La-Imagen.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Necesidad de negocio upstream:** [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md)
**Trazabilidad upstream:** SOLUTION-INTAKE §4 capacidad F-10; anexo E-2, variantes de origen por repositorio remoto y por archivo de construcción local; anexo E-3, evento de construcción de la línea de tiempo; anexo E-17, transición de construcción de la máquina de estados; §17.P.3, restricción de rutas; E-16 RN-08, RN-24, RN-31

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

Permitir que el administrador despliegue un servicio cuya imagen se construye —desde un archivo de construcción local o desde un repositorio remoto—, con seguimiento del progreso de la construcción, para cubrir los orígenes que el parque real usa además de la imagen ya publicada.

## 2. Actores

| Actor | Tipo | Rol |
| --- | --- | --- |
| Administrador de la solución | Primario | Solicita el despliegue del servicio con origen de construcción |
| Módulo de despliegue | Sistema | Dispara la construcción, sigue su progreso y crea el contenedor con la imagen resultante |
| Motor de contenedores | Sistema | Construye la imagen y crea el contenedor |

Los nombres de los actores no humanos son **denominaciones acuñadas por esta categoría**, salvo los seis que trazan a una fuente: `Motor de contenedores`, `Destino externo`, `Automatismo de integración continua`, `Sincronizador de estado`, `Módulo de descubrimiento` y `Resolutor de referencias`. Los acuñados no son componentes declarados y no condicionan la descomposición: su correspondencia con los módulos que el intake §17.P.2 sí declara la fija 05-Arquitectura-Tecnica. La convención completa, nombre por nombre, está en [Especificacion-Funcional.md](../Especificacion-Funcional.md) §8.

## 3. Precondiciones

- El servicio está declarado con origen por repositorio remoto o por archivo de construcción local, con los datos que RN-08 exige cuando el origen es repositorio (CU-03).
- El proyecto SelfHosted tiene su red creada (CU-01).
- El administrador tiene sesión iniciada (CU-30).

## 4. Flujo principal

1. El administrador solicita desplegar el servicio.
2. El sistema registra un despliegue en estado pendiente.
3. El sistema verifica que el origen declare lo que necesita para construir: ruta del archivo de construcción y rama cuando el origen es un repositorio (RN-08).
4. El sistema dispara la construcción de la imagen y el despliegue pasa a estado de construcción.
5. El sistema sigue el progreso de la construcción y lo refleja en la línea de tiempo del despliegue.
6. Si la construcción termina bien, el despliegue pasa a creando; si falla, pasa a fallido con su error.
7. El sistema resuelve las referencias de las variables inmediatamente antes de crear el contenedor (RN-24).
8. El sistema crea y arranca el contenedor con la imagen construida.
9. El sistema marca el resultado por contenedor y registra el evento de auditoría (RN-17).

## 5. Flujos alternativos

**FA-01 — Origen por archivo de construcción local.**
Disparador: el origen del servicio es un archivo de construcción local en lugar de un repositorio remoto.
Pasos: el sistema usa el contexto de construcción y los argumentos declarados, sin clonar ningún repositorio. Toda ruta que se pase al motor la interpreta el sistema de archivos del host.
Punto de retorno: paso 4.

**FA-02 — Reconstrucción en cada despliegue.**
Disparador: el servicio declara que se reconstruye en cada despliegue.
Pasos: la construcción se ejecuta siempre; en caso contrario se reutiliza la imagen ya construida.
Punto de retorno: paso 4.

**FA-03 — Servicio efímero.**
Disparador: el servicio está marcado como efímero.
Pasos: se reconstruye en cada uso y no conserva estado propio.
Punto de retorno: paso 4.

## 6. Excepciones y errores

| Código | Causa | Respuesta del sistema |
| --- | --- | --- |
| `422` de origen incompleto | El origen es repositorio y falta la ruta del archivo de construcción o la rama | Rechazo (RN-08) |
| Construcción fallida | La construcción de la imagen termina con error | El despliegue queda fallido con su error identificable, sin afectar a los demás contenedores de la operación (RN-31) |
| `422` de referencia no resoluble | Una referencia del servicio no resuelve a una variable de ámbito válido | El despliegue de ese servicio se aborta con la causa identificada y no se crea el contenedor (RN-21, RN-24) |
| Ruta no interpretable | La ruta de contexto de construcción no existe en el sistema de archivos que interpreta el motor | El error se traduce a una causa propia identificable. El intake declara que la ruta la interpreta el sistema de archivos del host y no el del entorno de desarrollo |

## 7. Postcondiciones

**En caso de éxito:** existe una imagen construida y un contenedor creado y arrancado a partir de ella; la línea de tiempo del despliegue registra el evento de construcción con su duración; el estado del nodo refleja el estado real.

**En caso de fallo:** el despliegue queda fallido con la causa —de construcción, de resolución o de creación—; ningún otro contenedor de la operación se ve afectado.

## 8. Criterios de aceptación

| ID | Given | When | Then |
| --- | --- | --- | --- |
| CA-01 | Un servicio con origen por archivo de construcción local, con su contexto y sus argumentos declarados | El administrador lo despliega | El sistema construye la imagen, registra el evento de construcción en la línea de tiempo y crea el contenedor con la imagen resultante |
| CA-02 | Un servicio con origen por repositorio remoto y sin rama declarada | El administrador intenta darlo de alta o desplegarlo | El sistema rechaza con `422` por falta de la rama |
| CA-03 | Un servicio cuya construcción termina con error | El administrador lo despliega dentro de una operación que alcanza a otros servicios | Ese despliegue queda fallido con su error y los demás contenedores conservan su resultado |
| CA-04 | Un servicio con una referencia válida y una construcción exitosa | El administrador lo despliega | El contenedor recibe las variables ya resueltas, con valores y no expresiones |

## 9. Trazabilidad

| Dimensión | Referencia |
| --- | --- |
| Necesidad de negocio | [NB-04](../../01-Necesidades-Negocio/Necesidades-De-Negocio/NB-04-Alta-De-Servicio-Sin-Copiar-Y-Adaptar.md) |
| Reglas de negocio aplicables | RN-08, RN-17, RN-21, RN-24, RN-31. Reglas conceptuales: RC-18 |
| Historias de usuario a generar en 06 | US-CU-15-1 (desplegar construyendo la imagen desde un archivo local), US-CU-15-2 (desplegar construyendo la imagen desde un repositorio remoto), US-CU-15-3 (seguir el progreso de la construcción) |
| Componentes esperados en 05 | Capa `Web`, controlador del recurso de despliegue y vista de progreso; capa `Application`, módulo de servicios y despliegues; capa `Domain`, agregado `Despliegues`; capa `Infrastructure`, `Contenedores`. Referencia tentativa |
| Tests previstos en 08 | Casos a derivar por 08-Calidad-Y-Pruebas para RN-08, que no tiene caso propio en el anexo E-22. T-31 y T-38 verifican el resultado por contenedor y la resolución previa, que este caso de uso comparte con CU-13 |

Los identificadores de historia de usuario llevan la forma `US-CU-XX-n` y son **provisionales**: la numeración definitiva es potestad de 06-Backlog-Tecnico. La forma se eligió para que ningún identificador emitido acá colisione con la numeración que 06 asigne.

## 10. Notas y supuestos

- **Brecha declarada:** RN-08 no tiene caso ejecutable propio en el anexo E-22. Destinatario: 08-Calidad-Y-Pruebas.
- El intake declara que toda ruta que la aplicación le pase al motor la interpreta el sistema de archivos del host, y que el directorio de datos de trabajo debe estar montado en la misma ruta absoluta en los dos lados. Es materia de 05-Arquitectura-Tecnica y condiciona este caso de uso.
- El seguimiento del progreso de construcción es una capacidad declarada de F-10 y no una derivación de esta categoría.

## 11. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Corrección absorbida dentro de la versión 1.0, sin subirla y sin archivar, por la política de versionado de `Master-Prompt.md` §5: el documento está en estado `Propuesto` y la corrección proviene del audit de su propia fase de emisión. §2 suma la declaración de que los nombres de los actores no humanos son denominaciones acuñadas por esta categoría y no componentes declarados, con la salvedad de los seis que sí trazan a una fuente. Ningún actor cambia de nombre y ningún flujo se altera: lo que se corrige es que la categoría afirmaba que todo dato trazaba y trece de los diecinueve nombres de actor no humano no lo cumplían. Origen: hallazgo H-04 del informe [Audit/B-02-03-r1.md](../../Audit/B-02-03-r1.md) |
| 1.0 | 2026-07-29 | Versión inicial, derivada de la necesidad de negocio upstream y de las secciones del intake citadas en la cabecera |

## 13. Interacción multiusuario y concurrencia

Sección opcional admitida por §4.3 de `Rules-Especificacion-Funcional.md` para el tipo `web-monolith`. Conserva el número que esa sección le asigna, de modo que la numeración salta del 11 al 13 por construcción de la regla y no por omisión.

El despliegue con construcción es más largo que el despliegue desde imagen ya publicada y ocupa la serialización por proyecto SelfHosted durante más tiempo. El intake declara esa serialización en §17.P.10.

