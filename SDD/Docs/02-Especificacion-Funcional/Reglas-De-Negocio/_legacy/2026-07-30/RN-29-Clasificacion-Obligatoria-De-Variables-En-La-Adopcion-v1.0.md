# RN-29 — Clasificación obligatoria de variables en la incorporación

**Proyecto:** SelfHosted Service
**Documento:** RN-29-Clasificacion-Obligatoria-De-Variables-En-La-Adopcion.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-29. **Autoría declarada en la fuente:** Enunciado **[D]**, decisión D-2. Exigibilidad **[D-i]**, sin revisar: el código de rechazo se consume declarándolo revisable.

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

**[D]:** la incorporación de un contenedor no se completa sin el paso de clasificación de variables: se presentan todas las variables importadas, las que la heurística sugiere vienen premarcadas como secretas, y el usuario puede marcar o desmarcar cualquiera. La heurística sugiere; no decide.

## 2. Justificación

Una configuración real del parque lleva una clave simétrica en una variable cuyo nombre no contiene ninguno de los fragmentos de la heurística, y con la regla anterior esa clave se importaba en claro sin que nadie se enterara. De las tres resoluciones planteadas, el agente humano del proyecto eligió la que no vuelve a apostar a que la lista de fragmentos esté completa: el secreto se declara, no se infiere.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Adopción.

Se evalúa en el tercero de los cuatro pasos de la incorporación —descubrir, elegir, clasificar y confirmar— y en la confirmación.

## 4. Consecuencia si se viola

**[D-i]:** `422` si se intenta confirmar la incorporación sin clasificación. Que el servicio no se cree es **[D]**: es lo que significa que la incorporación no se complete.

## 5. CU afectados

CU-06, CU-07, CU-08.

## 6. Pruebas que la verifican

- T-17: importar una variable que la heurística no detecta. Llega al paso de clasificación desmarcada, y sin confirmación no hay servicio creado.
- T-17b: importar una variable que la heurística sí detecta. Llega premarcada con su motivo de sugerencia.
- T-32: marcar en el paso de clasificación una variable que la heurística no detectó. Queda cifrada en reposo, con recarga manual pendiente.
- T-33: confirmar la incorporación sin enviar la clasificación. Rechazado `422`; el servicio no se crea.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
