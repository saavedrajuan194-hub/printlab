# PrintLab — Design system

Dirección: **laboratorio técnico de noche**. Fondo negro como el del logo, un solo azul eléctrico para todo lo que se toca, violeta sólo como acento decorativo, y fotos reales de las piezas como protagonistas. Lo "futurista" sale de detalles medidos (grilla tipo cama de impresora, etiquetas de ficha técnica, la línea con el cubo del logo), no de brillos por todos lados.

Sitio sólo en modo oscuro (`color-scheme: dark`): la marca es negra y las fotos están tomadas a la luz del día, así que el contraste las hace resaltar.

Todos los valores viven como variables en `css/styles.css` (`:root`). En el código se usan los nombres, nunca los valores sueltos.

## Color

| Token | Valor | Rol |
|---|---|---|
| `--bg` | `#07080B` | Fondo de la página (el negro del logo) |
| `--surface` | `#0E1116` | Bandas y tarjetas |
| `--surface-2` | `#151A21` | Hover de tarjetas, filas de precios |
| `--border` | `#232A34` | Bordes y divisores |
| `--border-strong` | `#334050` | Bordes de botones secundarios, inputs |
| `--text` | `#EEF2F7` | Texto principal (17:1 sobre `--bg`) |
| `--text-muted` | `#9AA6B5` | Texto secundario (8:1 sobre `--bg`) |
| `--primary` | `#1E9BF0` | Botones primarios, links, precios (azul de "LAB") |
| `--primary-hover` | `#4DB2F5` | Hover de botón primario |
| `--on-primary` | `#04121F` | Texto sobre `--primary` (6.3:1) |
| `--accent` | `#7B2FE0` | Violeta del logo. Sólo decorativo: cubo, final de la línea de marca. Nunca para texto |
| `--accent-text` | `#B48CFF` | Si hace falta texto violeta (etiquetas), 7:1 sobre `--bg` |
| `--focus` | `#8FD0FF` | Anillo de foco del teclado |
| `--success` | `#3DDC97` | Confirmaciones (ej. "Copiado") |
| `--warning` | `#F5B83D` | Avisos |
| `--error` | `#FF6B6B` | Errores |

El degradé azul → violeta se usa **sólo** en la línea fina de marca (la del logo, con el cubo al medio). No va en botones, fondos ni títulos.

## Tipografía

- **Exo 2** (Google Fonts) — títulos, wordmark, etiquetas técnicas. Pesos 600 y 800, itálica 800 para el wordmark y el título principal.
- **Barlow** (Google Fonts) — texto corrido y botones. Pesos 400, 500 y 600.

| Token | Tamaño / interlineado | Uso |
|---|---|---|
| `--fs-xs` | 13px / 1.4 | Etiquetas técnicas (mayúsculas, +0.12em de espaciado) |
| `--fs-sm` | 14px / 1.5 | Pies de foto, notas |
| `--fs-base` | 17px / 1.6 | Texto corrido |
| `--fs-lg` | 19px / 1.55 | Bajadas |
| `--fs-xl` | 24px / 1.3 | Títulos de tarjeta, precios |
| `--fs-2xl` | clamp(28px → 40px) / 1.15 | Títulos de sección |
| `--fs-3xl` | clamp(40px → 72px) / 1.02 | Título principal |

Texto corrido con un ancho máximo de `65ch`.

## Espaciado

Escala de 4px: `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128.

- Ancho de contenido: `--container` 1200px, con 20px de margen lateral en celular.
- Separación entre secciones: `--section` = clamp(64px → 128px).

## Forma y profundidad

- Radios: `--r-sm` 4px (chips, etiquetas) · `--r-md` 8px (botones, inputs) · `--r-lg` 14px (fotos, tarjetas).
- Sombras: ninguna en reposo. Una sola sombra/brillo, `--glow`, sólo en el hover del botón primario.

## Componentes

- **Botón primario**: fondo `--primary`, texto `--on-primary`, Barlow 600. Hover: `--primary-hover` + `--glow`. Foco: anillo `--focus` de 2px separado 3px. Deshabilitado: 45% de opacidad.
- **Botón secundario**: borde `--border-strong`, texto `--text`. Hover: borde `--primary`.
- **Botón discreto**: sólo texto `--text-muted` con subrayado al hover.
- **Links**: `--primary`, subrayado con separación.
- **Chips de filtro**: borde `--border`, radio `--r-sm`; activo = fondo `--primary` y texto `--on-primary`.
- **Tarjeta de trabajo**: foto 3:4 con `--r-lg`, abajo nombre (Barlow 600) y etiqueta técnica (Exo 2, `--fs-xs`, `--text-muted`).
- **Fila de precio**: ficha técnica en filas, nombre + descripción a la izquierda y precio grande a la derecha, divididas por `--border`.
- **Navegación**: barra fija arriba, fondo `--bg` al 85% con borde inferior al bajar. En celular, menú desplegable.
- **Pie**: logo redondo, datos de contacto, ciudad.

## Imágenes e íconos

- **Fotos**: siempre piezas reales, sin filtros ni retoques de color. WebP en dos tamaños (480 y 960 de ancho). Recorte 3:4 en la grilla; la foto completa se ve en el visor.
- **Íconos**: SVG en línea, trazo de 1.75px, puntas redondeadas, 24×24, color `currentColor`. Nada de emojis como íconos.
- **Motivo de marca**: la línea fina azul → violeta con un cubo al medio, igual que en el logo. Se usa como divisor y como eje de los pasos de "Cómo trabajamos".
- **Fondo técnico**: grilla de 32px en `--border` al 40% de opacidad, sólo detrás del encabezado principal.
