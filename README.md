# PrintLab

Sitio web de PrintLab: diseño e impresión 3D a medida en Santa Rosa, La Pampa. Llaveros, figuras, dragones articulados y piezas personalizadas.

- HTML, CSS y JavaScript vanilla (sin librerías ni instalación)
- Estética futurista / tech-lab, sacada del logo
- Responsive (celular, tablet y compu), se puede usar sólo con teclado

## Cómo verlo

Abrí `index.html` en el navegador.

## Estructura

```
index.html          La página (todas las secciones y los textos)
css/styles.css      Estilos. Los colores y medidas están arriba, en :root
js/main.js          Menú del celular, filtros de la galería y visor de fotos
assets/img/         Fotos en WebP (versión chica "-sm" para la grilla y grande para el visor)
DESIGN.md           Sistema de diseño: colores, tipografías, espacios y componentes
```

## Cambios comunes

- **Precios**: buscá `price-value` en `index.html`. Acordate de actualizar también la fecha en `price-note` y el "Llaveros desde" de la sección de inicio.
- **Agregar un trabajo a la galería**: copiá un bloque `<li class="work" ...>` dentro de `data-gallery`, cambiá la foto, el nombre, la etiqueta y `data-cat` (`figuras`, `llaveros`, `scouts` u `hogar`). Las fotos van en `assets/img/`, en dos tamaños: 480 y 960 px de ancho.
- **WhatsApp**: el número está en los links `https://wa.me/5492954239121`. El texto que aparece escrito al abrir el chat va después de `?text=`.

## Publicarlo gratis con GitHub Pages

1. En GitHub, entrá al repositorio → **Settings** → **Pages**.
2. En **Branch** elegí `main` y la carpeta `/ (root)`, y guardá.
3. En un par de minutos queda online en `https://<usuario>.github.io/printlab/`.

Cuando tenga dominio propio, cambiá la ruta de `og:image` en `index.html` por la dirección completa (por ejemplo `https://printlab.com.ar/assets/img/og-printlab.jpg`) para que la vista previa se vea al compartir el link por WhatsApp.
