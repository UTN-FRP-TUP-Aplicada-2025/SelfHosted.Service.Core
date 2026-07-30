# RN-24 — Resolución de la referencia inmediatamente antes de crear el contenedor

**Proyecto:** SelfHosted Service
**Documento:** RN-24-Resolucion-De-La-Referencia-Antes-De-Crear-El-Contenedor.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-24. **Autoría declarada en la fuente:** **[D]** completa, decisión D-6.

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

La referencia se resuelve en el backend inmediatamente antes de crear el contenedor. El contenedor recibe el valor, nunca la expresión.

## 2. Justificación

El valor en claro de un secreto existe sólo en memoria, entre el descifrado y la llamada de creación al motor, y no se persiste ni se registra en auditoría. Que el contenedor reciba el valor y no la expresión es lo que hace que el proceso que corre adentro no tenga que conocer el mecanismo de referencias.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** Creación del contenedor.

Se evalúa en cada creación de contenedor, cualquiera sea la operación que la haya disparado.

## 4. Consecuencia si se viola

Invariante. Una referencia no resoluble aborta el despliegue de ese servicio con la causa identificada (RN-21), sin afectar a los demás contenedores de la operación (RN-31).

## 5. CU afectados

CU-13, CU-15, CU-16, CU-18, CU-24, CU-33, CU-35.

## 6. Pruebas que la verifican

- T-38: desplegar el servicio 101 del anexo E-2, que tiene seis referencias. Ninguna variable del contenedor contiene la expresión ni el marcador del vínculo: lo que viaja es el valor.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-22 declara los casos con entrada concreta y resultado esperado, y el anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Transcripción del enunciado, del momento de validación y de la respuesta ante incumplimiento que declara el anexo E-16 del intake. No se reinterpreta ninguno de los tres |
