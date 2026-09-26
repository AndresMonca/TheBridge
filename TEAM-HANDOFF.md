# TheBridge — Integrante 1 handoff (Milestone 1)

Esta guía es interna para el equipo. La interfaz y la documentación académica deben permanecer en inglés.

## Base que ya queda cerrada

- Home y Marketplace están separados: `index.html` y `marketplace.html`.
- El logo oficial es `assets/brand/thebridge-logo.svg` y no debe reinterpretarse.
- El hero aprobado es `assets/hero/find-your-bridge.webp` y no debe reemplazarse sin acuerdo del equipo.
- El sistema visual usa azul, índigo y violeta como identidad de marca.
- El layout compartido usa sidebar en desktop y bottom navigation en mobile.
- El modo claro/oscuro, estado online/offline y contador del review cart son globales.
- `js/data.js` es el contrato de datos compartido para las publicaciones mock.
- Marketplace implementa búsqueda, filtros, favoritos, quick view, Open Library, estados async y review cart simulado.

## Reglas para los demás integrantes

1. No crear una segunda navegación ni otra paleta.
2. Reutilizar Manrope, bordes, radios, espaciados, focus rings y superficies ya definidos.
3. No cambiar nombres de campos de `js/data.js` sin coordinarlo.
4. Mantener toda la interfaz visible en inglés.
5. No implementar backend, pagos reales, autenticación real ni persistencia real en Milestone 1.
6. Mantener responsive en 375 px, 768 px, 1280 px y 1440 px.
7. Mantener HTML semántico, labels, alt, foco visible y estados que no dependan solo del color.
8. Si una decisión afecta varias pantallas, documentarla antes de cambiar la base compartida.

## Navegación final de la base

- Home → `index.html`
- Marketplace → `marketplace.html`
- My Books → `my-books.html`
- Add Book → `add-book.html`
- Create Listing → `create-listing.html`
- Listing Details → `listing.html`
- Requests → `requests.html`
- About → `about.html`

## Integración por compañero

### Integrante 2

Debe sustituir los shells de `my-books.html` y `add-book.html` por su implementación real, manteniendo navegación, header, dark mode, responsive y componentes visuales compartidos.

### Integrante 3

Debe sustituir `create-listing.html` y `listing.html` por su implementación real, reutilizando el contrato de datos y las cuatro modalidades definidas.

### Integrante 4

Debe sustituir `requests.html` y completar `about.html`/documentación sin cambiar la identidad visual ni afirmar que existe backend o pagos reales.

## Assets bloqueados

- `assets/brand/thebridge-logo.svg`
- `assets/hero/find-your-bridge.webp`

Estos dos assets están aprobados y se consideran parte de la identidad final de esta entrega.
