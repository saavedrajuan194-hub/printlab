# PrintLab

Sitio web de **PrintLab**: figuras, dragones articulados, llaveros y pasañuelos personalizados impresos en 3D. Santa Rosa, La Pampa.

HTML, CSS y JavaScript vanilla · estética cyberpunk / tech-lab · responsive · respeta "reducir movimiento".

## Cómo verlo
Abrí `index.html` en el navegador.

## Estructura
- `index.html`: contenido de todas las secciones
- `styles.css`: estilos, colores y animaciones (los colores están arriba de todo, en `:root`)
- `script.js`: animaciones, cursor, galería, holograma 3D y formulario de WhatsApp
- `img/`: fotos de trabajos y logo (optimizadas en formato .webp)

## Pendiente antes de publicar
- [ ] **Testimonios:** son ejemplos marcados con `[Ejemplo]`. Cambialos por mensajes reales de clientes (con su permiso).
- [ ] **Redes:** poner los links reales de Instagram/TikTok en el footer de `index.html`.
- [ ] **Precios:** revisar que sigan vigentes ($3.000 común / $4.000 personalizado).

## Agregar una foto nueva a la galería
1. Subí la foto a `img/` (ideal: vertical, menos de 300 KB).
2. Copiá un bloque `<figure class="card ...">` en la sección Galería de `index.html` y cambiá `src`, `alt`, el título y `data-cat` (`figuras`, `dragones`, `llaveros` o `scout`).
