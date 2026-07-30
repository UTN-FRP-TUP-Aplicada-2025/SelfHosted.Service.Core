# RN-32 — Variables provistas por el sistema y prefijo reservado

**Proyecto:** SelfHosted Service
**Documento:** RN-32-Variables-Provistas-Por-El-Sistema-Y-Prefijo-Reservado.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-32. **Autoría declarada en la fuente:** Enunciado **[D]**, decisiones D-6 y D-9. Nombres y exigibilidad **[D-i]**, sin revisar: se consumen declarándolos revisables.

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

**[D]:** cada servicio expone un conjunto de variables provistas por el sistema, de sólo lectura, que el usuario no declara ni edita y que son referenciables como cualquier otra. El conjunto es exactamente el host interno y el nombre del servicio: no hay variable de puerto, el puerto se escribe literal. **[D-i]:** llevan un prefijo reservado, se nombran en inglés, ninguna es secreta, y el usuario no puede declarar ni editar una variable propia cuya clave empiece con ese prefijo.

## 2. Justificación

Las variables provistas son lo que hace que un solo mecanismo de vínculo alcance: con el host provisto como variable, el enlace de host y puerto deja de necesitar existir como cosa aparte. El prefijo reservado es lo que impide que una variable del usuario colisione con una provista.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Alta y edición de variables.

Se evalúa al declarar o editar una variable de servicio, y en la resolución de toda referencia a una variable provista.

## 4. Consecuencia si se viola

Respuesta `422` al declarar o editar una clave con el prefijo reservado.

## 5. CU afectados

CU-03, CU-04, CU-35.

## 6. Pruebas que la verifican

- T-49: declarar en un servicio una variable con la clave del host provisto. Rechazado `422`: el prefijo está reservado.
- T-38: desplegar un servicio con referencias a variables provistas de otro. El contenedor recibe los valores resueltos.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
