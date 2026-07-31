# RN-34 — Aporte obligatorio de la arista

**Proyecto:** SelfHosted Service
**Documento:** RN-34-Aporte-Obligatorio-De-La-Arista.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-34. **Autoría declarada en la fuente:** **[D-i]** completa, sin revisar. Se consume declarándola revisable.

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

Toda arista debe aportar un vínculo: o referencia una variable del destino —y entonces lleva la clave de la variable de origen y la del destino, las dos o ninguna—, o declara espera al destino, o ambas cosas. Al crear una arista el sistema propone el valor de la espera —la propone verdadera si la referencia apunta al host del destino— y el usuario puede cambiarlo. Entre dos servicios no puede haber más de una arista de espera sin variable.

## 2. Justificación

Es lo que impide que quede una fila sin significado en el modelo. Que el sistema proponga la espera y no la imponga es lo que permite expresar las cuatro combinaciones alcanzables de esperar y referenciar el host, que son independientes entre sí.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Creación y edición de la arista.

Se evalúa al crear y al editar una arista, desde el lienzo o desde la importación de un archivo de composición.

## 4. Consecuencia si se viola

Respuesta `422` en una arista que no referencia ni espera; `409` en una segunda arista de espera sin variable entre el mismo par.

## 5. CU afectados

CU-04, CU-08, CU-11, CU-16, CU-35.

## 6. Pruebas que la verifican

- T-12 y T-53: trazar la flecha en el lienzo. El sistema escribe una referencia y propone la espera.
- T-50: trazar la flecha hacia un servicio que declara dos puertos. El sistema pregunta cuál antes de escribir la expresión.
- T-56: crear dos aristas de espera sin variable entre el mismo par. La segunda se rechaza con `409`.
- T-57: crear una arista sin referencia y con la espera desmarcada. Rechazado `422`.
- T-54: importar una dependencia explícita sin variable que la mencione. Se crea una arista sin variable y con espera declarada.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
