# SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0

Artefacto derivado. El orquestador SDD lo construyó a partir de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13, siguiendo `Intake-Rules.md` §4 y el formato de `SOLUTION-MANIFEST-template.md`. No se completa a mano.

---

## §1 Bloque de solución

| Campo | Valor |
|---|---|
| Nombre de solución | SelfHosted.Service.Core |
| `Nombre-Solucion` | `SelfHosted-Service-Core` |
| `NombreSolucionCodigo` | `SelfHosted` |
| Proyecto principal | `SelfHosted-Web` |
| Intake (origen) | `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` (de su §13 se deriva este manifiesto) |
| Documento | `SOLUTION-MANIFEST-SelfHosted-Service-Core-v1.0.md` |
| Versión | 1.0 |
| Fecha | 2026-07-27 |
| Estado | Aprobado (confirmación explícita del humano, 2026-07-27) |

Nota de derivación de `NombreSolucionCodigo`. El algoritmo de normalización de `Master-Prompt.md` §3.2 aplicado al nombre legible produciría `SelfHostedServiceCore`. El intake §13 declara explícitamente la forma del nombre de solución en código como `SelfHosted`, porque la raíz de los nombres de código ya está fijada por la estructura de `/src` del análisis integrado. El valor declarado prevalece sobre el derivado, y los nombres de código resultantes coinciden exactamente con los directorios de `/src` de §16 y con la identidad de cada bloque §17.

### §1.1 Perfil de convención de nombres

| Parámetro | Valor | Notas |
|---|---|---|
| Forma del nombre de solución en código | `SelfHosted` | Declarado en `SOLUTION-INTAKE` §13, no derivado |
| Separador de segmentos | `.` | Separa la raíz de la solución del sufijo de rol |
| Prefijo de paquetes redistribuibles | `Aplicada` | No se aplica: ningún proyecto de esta solución es redistribuible |

---

## §2 Tabla de proyectos

| `Nombre-Proyecto` | `nombre-proyecto-codigo` | `project_type` (D8) | Rol en la solución | `redistribuible` | Dependencias | Path `/src` |
|---|---|---|---|---|---|---|
| `SelfHosted-Web` | `SelfHosted.Web` | `web-monolith` | Punto de entrada único: páginas Blazor Interactive Server, controladores REST `/api/v1` y servicios en segundo plano, en un solo proceso (principal) | false | `SelfHosted-Application`, `SelfHosted-Infrastructure`, `SelfHosted-Domain` | `src/SelfHosted.Web/` |
| `SelfHosted-Application` | `SelfHosted.Application` | `library` | Casos de uso por módulo y abstracciones de salida (`IContenedorEngine`, repositorios, reloj del sistema) | false | `SelfHosted-Domain` | `src/SelfHosted.Application/` |
| `SelfHosted-Infrastructure` | `SelfHosted.Infrastructure` | `library` | Adaptadores: persistencia con EF Core sobre SQLite, cliente del motor de contenedores, métricas del host y exportación | false | `SelfHosted-Application`, `SelfHosted-Domain` | `src/SelfHosted.Infrastructure/` |
| `SelfHosted-Domain` | `SelfHosted.Domain` | `library` | Entidades, invariantes y reglas de negocio, sin dependencias externas | false | — | `src/SelfHosted.Domain/` |

Los proyectos de prueba (`SelfHosted.Domain.Tests`, `SelfHosted.Application.Tests`, `SelfHosted.Integration.Tests`) no son proyectos de la composición: son artefactos de la estrategia de testing de cada proyecto (§17 P.6) y viven bajo `/tests`.

---

## §3 Grafo de dependencias

```text
SelfHosted-Domain  ->  SelfHosted-Application  ->  SelfHosted-Infrastructure  ->  SelfHosted-Web
        \                       \                            \-------------------------^
         \                       \-------------------------------------------------------^
          \------------------------------------------------------------------------------^
```

Orden topológico:

```text
nivel 0: SelfHosted-Domain
nivel 1: SelfHosted-Application
nivel 2: SelfHosted-Infrastructure
nivel 3: SelfHosted-Web  (principal)
```

Ningún nivel tiene más de un proyecto, de modo que no hay paralelización posible: la generación es estrictamente secuencial.

---

## §4 Validaciones bloqueantes

| Validación | Resultado |
|---|---|
| Cada `project_type` pertenece al conjunto cerrado D8 | Cumple: `web-monolith` ×1, `library` ×3 |
| Hay exactamente un proyecto principal | Cumple: `SelfHosted-Web` |
| Sin colisión de `Nombre-Proyecto` ni de `nombre-proyecto-codigo` | Cumple: cuatro nombres distintos en ambas formas |
| Cada dependencia referencia un proyecto existente | Cumple: las seis aristas resuelven contra la tabla de §2 |
| El grafo de dependencias es acíclico | Cumple: cuatro niveles topológicos estrictos |
| §13 del intake es recorrible | Cumple: sin filas de ejemplo, perfil de convención declarado, campos bloqueantes completos |
| Los `redistribuible: true` arrancan con el prefijo de organización | No aplica: ningún proyecto es redistribuible |

---

## Control de cambios

| Versión | Fecha | Cambios | Autor |
|---|---|---|---|
| 1.0 | 2026-07-27 | Manifiesto inicial derivado de `SOLUTION-INTAKE-SelfHosted-Service-Core-v1.0.md` §13 durante la fase de validación de intake. Cuatro proyectos, un principal (`SelfHosted-Web`, `web-monolith`) y tres librerías, con grafo acíclico de cuatro niveles topológicos. `NombreSolucionCodigo` tomado de la declaración explícita del perfil de convención de §13 en lugar del algoritmo de normalización de `Master-Prompt.md` §3.2. | Orquestador SDD |
