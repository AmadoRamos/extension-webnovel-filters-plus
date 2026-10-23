# WebNovel Filtros+

Extensión para Chrome/Brave que agrega filtros extra a las páginas de categorías de [webnovel.com](https://www.webnovel.com) (por ejemplo `/stories/fanfic-video-games`).

WebNovel solo carga 20 libros a la vez, así que la extensión recorre varias páginas de la categoría y muestra solo los que cumplen tus filtros:

- Capítulos mínimos y máximos
- Score mínimo
- Publicado desde una fecha
- Tags que debe tener (todos) y tags que no debe tener (cualquiera), en español o inglés
- Palabras a excluir del título o la descripción

Los filtros aparecen en la página, debajo de "Ordenar por", y respetan el estado y el orden que tengas elegidos. Los tags que va encontrando se guardan para autocompletar los campos de tags.

## Instalación

1. Descarga o clona este repositorio.
2. Abre `chrome://extensions` (o `brave://extensions`).
3. Activa el **Modo de desarrollador**.
4. Haz clic en **Cargar descomprimida** y elige la carpeta del repositorio.
5. Abre una categoría en webnovel.com y busca la sección **Filtros+**.

Para actualizarla después de cambios, pulsa el ícono de recargar en la tarjeta de la extensión.

## Tests

```bash
node --test
```
