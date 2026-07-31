# RN-40 — Protección de la imagen conservada y de la imagen ajena

**Proyecto:** SelfHosted Service
**Documento:** RN-40-Proteccion-De-La-Imagen-Conservada-Y-De-La-Imagen-Ajena.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-40; anexo E-23, la imagen como objeto con identidad y las siete decisiones que deja abiertas. **Autoría declarada en la fuente:** **[D-i]**, especificación de integración `DI-17`, **sin revisar**.

> **Esta regla depende de siete decisiones abiertas y lo declara.** Las pendientes `Q-15` a `Q-21` de §19 del intake condicionan **el modo de disparo de la limpieza**, no la protección: la regla declara qué no se puede tocar, y no cuándo ni quién limpia. Se consume declarándola revisable, y **no puede darse por implementable hasta que `Q-15` se cierre**, porque sin el registro del digesto por despliegue no hay entidad imagen sobre la que aplicarla.

---

## Tabla de contenido

- [1. Enunciado de la regla](#1-enunciado-de-la-regla)
- [2. Justificación](#2-justificación)
- [3. Ámbito de aplicación](#3-ámbito-de-aplicación)
- [4. Consecuencia si se viola](#4-consecuencia-si-se-viola)
- [5. CU afectados](#5-cu-afectados)
- [6. Pruebas que la verifican](#6-pruebas-que-la-verifican)
- [7. Control de cambios](#7-control-de-cambios)

---

## 1. Enunciado de la regla

**Una imagen marcada como conservada no se limpia, y una imagen ajena no se toca.**

Ninguna operación de limpieza puede eliminar:

1. Una imagen con la **marca de conservada**, aunque ningún despliegue activo la referencie.
2. Una imagen que **no lleva la marca de pertenencia del producto**, cualquiera sea su estado. Es la imagen `ajena`: la que el producto ve en el almacén y no administra.

## 2. Justificación

**La segunda mitad es la que vuelve practicable cualquier limpieza.** El motor de contenedores es uno y compartido: el mismo almacén de imágenes lo usan el producto, el parque de contenedores que nadie incorporó a un proyecto, y el automatismo de integración continua que construye en el propio servidor. Una operación de limpieza sin esta protección es una **operación destructiva sobre trabajo de otro**, y el producto no tiene forma de saber qué rompió. La regla conservadora —lo que no lleva la marca del producto, no se toca— es lo único que la hace segura.

**La primera mitad protege la única razón por la que se conservarían imágenes que nada usa.** Se retienen cincuenta despliegues por servicio, que el usuario ve en la línea de tiempo del panel. Si volver a uno de ellos va a ser posible, la imagen que ese despliegue usó tiene que seguir existiendo; y una limpieza que borra «lo que ningún despliegue activo referencia» borraría exactamente eso. Sin esta mitad, la limpieza destruye la capacidad que la conservación existe para habilitar.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** toda operación de limpieza de imágenes.

Alcanza a la limpieza cualquiera sea su disparo —manual, sugerida o programada—, que es precisamente lo que `Q-17` deja abierto. La regla es indiferente al disparo, y por eso puede declararse sin esperar esa decisión.

**Lo que esta regla no declara, y hay que no leerlo como declarado:** cuándo se limpia, quién puede limpiar, con qué credencial y con qué ámbito, si el usuario puede marcar una imagen como conservada y con qué alcance, y qué pasa con la política de actualización al volver a un despliegue anterior. Son las pendientes `Q-17` a `Q-21`, todas abiertas.

## 4. Consecuencia si se viola

La imagen **se excluye de la operación** y el informe de la limpieza declara por qué: conservada, o ajena. No es un rechazo de la operación completa: la limpieza procede sobre el resto y declara qué dejó y con qué motivo, que es el mismo patrón con el que la aplicación en lote informa lo que no alcanzó (RN-31).

Una limpieza que elimina una imagen protegida es un defecto de la clase más grave que este producto puede tener, porque es **pérdida de datos ajenos y no recuperable**.

## 5. CU afectados

CU-15, CU-37, CU-38.

## 6. Pruebas que la verifican

**Brecha declarada**: el anexo E-22 no declara casos para esta regla, que es nueva, y el anexo E-23 aporta las entradas. 08-Calidad-Y-Pruebas debe derivar tres:

- Una imagen con la marca de conservada y sin ningún despliegue activo que la referencie. La limpieza **no la elimina** y el informe declara por qué.
- Una imagen con procedencia ajena, sin marca de pertenencia del producto. La limpieza **no la toca**, aunque cumpla todos los demás criterios de descarte.
- Una imagen del producto, sin marca de conservada y sin despliegues que la referencien. La limpieza **sí la elimina**: es el caso positivo, y sin él las dos pruebas anteriores pasarían con una limpieza que no hace nada.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Regla nueva, emitida por §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0, que verificó que el intake no tenía **nada** sobre limpieza, poda, espacio en disco ni retención de imágenes, mientras se retienen cincuenta despliegues por servicio cuyas imágenes nadie administra. Transcribe el enunciado, el momento de validación y la respuesta que el anexo E-16 del intake v2.4 declara. **Declara en su cabecera y en §3 las siete decisiones abiertas de las que depende**, y qué no queda declarado por ellas, en lugar de presumirlas resueltas |
