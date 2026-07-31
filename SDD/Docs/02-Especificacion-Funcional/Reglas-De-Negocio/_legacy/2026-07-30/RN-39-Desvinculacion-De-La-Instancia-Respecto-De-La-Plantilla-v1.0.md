# RN-39 — Desvinculación de la instancia respecto de la plantilla

**Proyecto:** SelfHosted Service
**Documento:** RN-39-Desvinculacion-De-La-Instancia-Respecto-De-La-Plantilla.md
**Versión:** 1.0
**Estado:** Propuesto
**Fecha:** 2026-07-29
**Autor:** Analista Funcional Senior (AG-02)

**Trazabilidad upstream:** SOLUTION-INTAKE-SelfHosted-Service anexo E-16, fila RN-39; anexo E-6 §20.6.4, las cinco consecuencias del vínculo débil; anexo E-2 §20.2.4, el campo de procedencia del servicio instanciado. **Autoría declarada en la fuente:** **[D]** completa, decisión **D-14** del agente humano del proyecto, 2026-07-29. Su enunciado **es** el contenido de la decisión y no hubo nada que derivar.

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

**Cambiar un ítem del catálogo no afecta a los servicios ya instanciados desde él, y borrarlo tampoco.** El vínculo es **débil y sólo en calidad de origen**.

Las cinco consecuencias exigibles, que son lo que impide que se implemente como una relación fuerte por descuido:

| Aspecto | Qué exige la regla |
| --- | --- |
| Qué se guarda | Una **copia** del identificador, el nombre y la versión de contenido del ítem, **no una clave foránea** |
| Borrar la plantilla | **Permitido y sin efecto** sobre los servicios instanciados. **No se emite advertencia de «en uso»**, porque no está en uso |
| Servicio cuya plantilla ya no existe | Sigue respondiendo de dónde salió. **No es un servicio huérfano** y no se señala como tal |
| Versión de contenido más nueva | **No se notifica** al servicio instanciado |
| Para qué sirve entonces la procedencia | Para responder de dónde salió una configuración, y para agrupar en los informes. Nada más |

## 2. Justificación

El servicio instanciado **se constituye y tiene su propio ciclo de vida**. Al instanciar se copia el subgrafo resuelto, y desde ese momento el servicio es una configuración como cualquier otra: se edita, se aplica, se despliega y se elimina sin consultar de dónde vino.

La alternativa —instancias vivas que se actualizan cuando la plantilla cambia— **convertiría el catálogo en un gestor de configuración, que es otro producto**. Y traería consigo un problema que este producto no tiene por qué resolver: qué hacer cuando la plantilla cambia un campo que el usuario ya editó a mano en la instancia.

**Por qué la copia y no la referencia, dicho con precisión.** Una clave foránea obligaría a una de dos cosas al borrar el ítem: impedir el borrado, o dejar el servicio apuntando a nada. La copia permite las dos cosas que se quieren a la vez: borrar el ítem libremente, y que el servicio siga pudiendo responder «vino de tal plantilla, versión tal».

**Por qué no se notifica una versión más nueva, que es la consecuencia menos obvia.** Un aviso de «hay una versión nueva de esta plantilla» **instala la expectativa de un botón para actualizar**, que es precisamente lo que esta decisión descarta. Mostrar el aviso sin ofrecer la acción es peor que no mostrarlo: le informa al usuario de algo que no puede hacer.

## 3. Ámbito de aplicación

**Momento de validación declarado en el anexo E-16:** edición y borrado de un ítem; instanciación.

Es una **invariante del modelo**, no una validación de entrada: no hay una operación del usuario que la regla pueda rechazar. Se verifica por prueba, comprobando que las operaciones sobre el ítem no producen ningún efecto sobre los servicios instanciados.

## 4. Consecuencia si se viola

No hay respuesta de error: es una invariante. Su violación se manifiesta como uno de estos cuatro defectos, y son los que la prueba busca:

- El borrado del ítem falla, o pide una confirmación adicional por instancias existentes.
- El borrado del ítem modifica o elimina algún servicio instanciado.
- Editar el ítem cambia algo de un servicio ya instanciado.
- Un servicio cuya plantilla se borró queda señalado como huérfano, o pierde la respuesta a de dónde salió.

## 5. CU afectados

CU-16, CU-17.

## 6. Pruebas que la verifican

**Brecha declarada**: el anexo E-22 no declara casos para esta regla, que es nueva. 08-Calidad-Y-Pruebas debe derivar cuatro, uno por cada defecto de §4:

- Instanciar un ítem, editar el ítem cambiando su imagen y su etiqueta, y verificar que el servicio instanciado **no cambia** y sigue declarando la versión de contenido con la que se instanció.
- Instanciar un ítem, borrar el ítem, y verificar que el borrado **no pide confirmación adicional** y que el servicio sigue existiendo y funcionando.
- Sobre el mismo caso, verificar que el servicio **sigue respondiendo** de qué plantilla y qué versión salió.
- Verificar que un servicio cuya plantilla ya no existe **no** aparece señalado como huérfano: ese estado está reservado al servicio cuyo contenedor desapareció del motor.

Las pruebas se realizan en 08-Calidad-Y-Pruebas. El anexo E-16 declara que el catálogo está pensado para que cada regla se traduzca en una prueba automatizada.

## 7. Control de cambios

| Versión | Fecha | Cambios |
| --- | --- | --- |
| 1.0 | 2026-07-29 | Versión inicial. Regla nueva, emitida por §22.3 del documento de trabajo `SDD/Estado/Redefinicion-Servicio.md` v2.0. Formaliza la decisión D-14 del agente humano del proyecto del 2026-07-29, que cerró una pregunta que no tenía respuesta en ninguna parte: verificado, cero menciones en CU-16 y CU-17 sobre actualizar instancias o propagar cambios de una plantilla. Transcribe el enunciado, el momento de validación y la naturaleza de invariante que el anexo E-16 del intake v2.4 declara |
