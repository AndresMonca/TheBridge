# TheBridge - Milestone 1

## Guía de desarrollo y distribución del trabajo

Esta guía coordina el trabajo de los cuatro integrantes. Está escrita en español para facilitar la colaboración interna. La interfaz, el README académico, los textos visibles de la aplicación y los mensajes de la interfaz deben permanecer en inglés.

---

## 1. Estado actual del repositorio

Repositorio definitivo:

~~~text
https://github.com/ninjasilver3692077/TheBridge.git
~~~

Commit inicial local:

~~~text
241fb20 chore: initialize TheBridge milestone 1 foundation
~~~

El commit inicial contiene:

- README.md
- AI-LOG.md
- DECISIONS.md
- figma-link.txt
- .gitignore
- index.html
- my-books.html
- add-book.html
- create-listing.html
- listing.html
- requests.html
- about.html
- assets/
- css/
- js/

Si el commit todavía no aparece en GitHub, la persona que tiene el repositorio local debe ejecutar:

~~~bash
git push -u origin main
~~~

No se debe ejecutar git init otra vez ni crear otro repositorio.

---

## 2. Contexto común del producto

### Concepto

TheBridge es un prototipo frontend académico que conecta estudiantes que poseen libros físicos con estudiantes que desean acceder a ellos.

La plataforma permite publicar un libro bajo una de estas modalidades:

- Exchange: intercambio.
- Loan: préstamo.
- Rental: alquiler.
- Sale: venta.

La interacción y la entrega se consideran presenciales entre personas de una comunidad académica pequeña.

### Problema

Los estudiantes suelen tener libros que ya no utilizan mientras otros estudiantes los necesitan. Actualmente estas interacciones ocurren en chats, grupos o mensajes individuales, donde la información se dispersa y es difícil saber qué libro está disponible y bajo qué modalidad.

TheBridge centraliza el descubrimiento de libros, la información de cada publicación y las solicitudes simuladas.

### Usuarios objetivo

- Estudiantes universitarios.
- Comunidades académicas pequeñas.
- Personas físicamente cercanas que puedan coordinar una entrega presencial.

Milestone 1 no está dirigido a marketplaces públicos, pagos, logística, comunidades masivas ni transacciones reales.

### Flujo principal

~~~text
Find a book
-> Add your book
-> Choose how to share
-> Publish
-> Receive requests
-> Connect with another student
~~~

### User stories de Milestone 1

- US-01: As a student, I want to explore publications to find books that interest me.
- US-02: As a user, I want to search and filter publications to quickly find books under the modality I need.
- US-03: As an owner, I want to register a book I own so I can offer it on the platform.
- US-04: As an owner, I want to create a publication and choose whether I want to exchange, loan, rent, or sell my book.
- US-05: As a student, I want to send a request about a publication to express my interest.
- US-06: As an owner, I want to review received requests and accept or reject them.

---

## 3. Alcance técnico obligatorio

### Stack

- HTML.
- Tailwind CSS o CSS compatible con la referencia visual acordada.
- JavaScript vanilla.
- Datos simulados y estado local del frontend.

### No implementar en Milestone 1

- Backend.
- Base de datos.
- Supabase.
- Autenticación real.
- Pagos.
- Chat.
- Notificaciones reales.
- API propia.
- ORM.
- Persistencia real.
- Lógica de transacciones.
- Administración.
- Geolocalización.
- React, Next.js, Vite u otra dependencia innecesaria.

Open Library puede considerarse una mejora posterior. Primero deben funcionar correctamente los flujos con datos mock.

### Reglas de negocio

- Exchange no exige especificar un libro deseado.
- Si no se especifica, la interfaz puede mostrar Open to offers.
- Loan exige una duración.
- Rental exige precio y duración.
- Sale exige precio.
- Las solicitudes son simuladas y no tienen persistencia real.

---

## 4. Reglas de idioma y comentarios

- Toda la interfaz visible debe estar en inglés.
- README.md, AI-LOG.md y la documentación académica deben estar en inglés.
- Esta guía interna está en español para el equipo.
- Los comentarios del código deben estar en español.
- Los comentarios deben explicar intención, flujo, validación, cambios de estado o decisiones no obvias.
- No llenar el código con comentarios que solo repitan lo que ya expresa una etiqueta HTML o una instrucción evidente.

Ejemplo de comentario apropiado:

~~~js
// Conservamos el filtro activo para que el usuario pueda restablecer la búsqueda sin perder el contexto.
~~~

---

## 5. Dirección visual y accesibilidad compartida

### Dirección visual

- Fondo crema o cálido.
- Superficies blancas.
- Bordes redondeados.
- Sombras suaves.
- Portadas como elemento protagonista.
- Estética editorial.
- Sidebar vertical en desktop.
- Navegación inferior en móvil.
- Panel contextual derecho en pantallas grandes cuando aplique.
- Primario coral o terracota.
- Exchange: violeta.
- Loan: verde.
- Rental: naranja.
- Sale: coral o rojo.
- Tipografía Manrope o una alternativa similar.

### Tamaños a revisar

- Mobile: aproximadamente 375px.
- Tablet: aproximadamente 768px.
- Desktop: aproximadamente 1440px.

No debe existir scroll horizontal accidental.

### Accesibilidad

- HTML semántico.
- label asociado a cada control.
- alt significativo para portadas e imágenes.
- Navegación por teclado.
- Foco visible.
- aria-live para mensajes dinámicos cuando corresponda.
- aria-invalid para errores de validación.
- role="dialog" y aria-modal="true" para modales.
- Escape debe cerrar los modales.
- Los estados no deben comunicarse únicamente mediante color.

---

## 6. Contrato común de datos mock

El integrante 1 debe definir y documentar este contrato antes de que los demás creen datos diferentes. Los nombres pueden ajustarse mediante Pull Request, pero no deben cambiarse de manera aislada.

~~~js
{
  id: "book-01",
  title: "Dune",
  author: "Frank Herbert",
  cover: "assets/covers/dune.jpg",
  modality: "Exchange",
  condition: "Good condition",
  description: "A physical copy available for an academic community exchange.",
  desiredBook: "1984",
  price: null,
  duration: null,
  owner: "Juan",
  university: "Universidad de La Sabana",
  status: "Available"
}
~~~

Publicaciones iniciales sugeridas:

- Dune - Frank Herbert - Exchange - Good condition - desired book: 1984.
- 1984 - George Orwell - Sale - 35.000 COP - Like new.
- The Hobbit - J.R.R. Tolkien - Loan - 14 days.
- The Great Gatsby - F. Scott Fitzgerald - Rental - 8.000 COP - 7 days.

Cada pantalla debe reutilizar estos datos o una adaptación explícita, evitando crear publicaciones contradictorias.

---

## 7. Flujo de ramas y orden de integración

### Rama principal

~~~text
main
~~~

main debe contener únicamente cambios revisados y funcionales.

### Ramas de trabajo

~~~text
feature/design-system-marketplace
feature/my-books-add-book
feature/listings
feature/requests-about-docs
~~~

### Orden recomendado

1. Publicar el commit inicial en main.
2. Integrar el sistema visual y Marketplace.
3. Crear las otras ramas desde el main actualizado.
4. Integrar My Books y Add Book.
5. Integrar Create Listing y Listing Details.
6. Integrar Requests, About y documentación de colaboración.
7. Revisar todo el flujo integrado.
8. Configurar GitHub Pages.

Las ramas deben ser cortas y deben eliminarse después del merge si el equipo lo acuerda.

---

## 8. Integrante 1 - Sistema visual y Marketplace

### Objetivo

Construir la estructura compartida de la aplicación y el Marketplace funcional. Este trabajo define el lenguaje visual y el contrato de datos que utilizarán los demás integrantes.

### Rama

~~~bash
git switch main
git pull origin main
git switch -c feature/design-system-marketplace
~~~

### Archivos permitidos

~~~text
index.html
css/
js/data.js
js/navigation.js
js/marketplace.js
assets/
~~~

No modificar las páginas de los otros integrantes salvo que sea necesario para corregir un enlace global y se documente en el Pull Request.

### Tareas paso a paso

1. Crear el archivo global de estilos o la estructura Tailwind acordada.
2. Definir colores, tipografía, espacios, bordes, sombras y estados de foco.
3. Crear el sidebar de desktop.
4. Crear la navegación inferior para móvil.
5. Crear el header y el contenedor responsive compartido.
6. Definir el contrato de datos mock en js/data.js.
7. Crear las tarjetas de publicaciones.
8. Mostrar las cuatro modalidades con badges identificables.
9. Implementar búsqueda por título y autor.
10. Implementar filtro por modalidad.
11. Implementar selección de publicación.
12. Crear quick view para desktop.
13. Crear estado de resultados vacíos.
14. Verificar enlaces hacia las siete páginas.
15. Revisar 375px, 768px y 1440px.

### Commits sugeridos

~~~text
feat: build shared responsive layout and design tokens
feat: define mock book data and marketplace cards
feat: implement marketplace search and modality filters
~~~

### Criterios de aceptación

- Marketplace muestra publicaciones simuladas.
- Search funciona por título y autor.
- Los cuatro filtros funcionan.
- El estado sin resultados es visible y entendible.
- Quick view funciona en desktop.
- Sidebar y navegación móvil son consistentes.
- No hay scroll horizontal accidental.
- No aparecen textos en español en la interfaz.
- No hay errores en consola.

### Pull Request

Título recomendado:

~~~text
feat: add shared layout and marketplace experience
~~~

La descripción debe incluir archivos modificados, decisiones visuales, pruebas manuales y capturas de mobile y desktop.

---

## 9. Integrante 2 - My Books y Add Book

### Objetivo

Implementar la biblioteca personal simulada y el flujo para registrar un libro propio.

### Rama

Crear la rama después de integrar el Pull Request del integrante 1:

~~~bash
git switch main
git pull origin main
git switch -c feature/my-books-add-book
~~~

### Archivos permitidos

~~~text
my-books.html
add-book.html
js/my-books.js
js/add-book.js
~~~

Se pueden añadir imágenes en assets/ si son necesarias y se documenta su origen.

### Tareas de My Books

1. Mostrar libros que pertenecen al usuario.
2. Representar los estados Available, Published y Loaned.
3. Mostrar portada, título, autor y estado.
4. Añadir una acción hacia Create Listing desde un libro disponible.
5. Crear un empty state para una biblioteca sin libros.
6. Mantener los mismos componentes visuales definidos por el integrante 1.

### Tareas de Add Book

1. Mostrar estado inicial.
2. Permitir buscar un libro con datos mock.
3. Mostrar estado de loading simulado.
4. Mostrar resultados.
5. Mostrar estado sin resultados.
6. Mostrar estado de error simulado.
7. Permitir seleccionar un resultado.
8. Permitir seleccionar condición física.
9. Permitir agregar notas opcionales.
10. Validar los campos realmente obligatorios.
11. Usar aria-invalid en campos inválidos.
12. Mostrar mensaje de éxito mediante una región aria-live.

### Commits sugeridos

~~~text
feat: add personal library states and listing entry point
feat: implement mock book search and selection flow
feat: add add-book validation and feedback states
~~~

### Criterios de aceptación

- My Books muestra libros disponibles, publicados y prestados.
- Existe empty state.
- Add Book funciona con datos mock.
- Se pueden ver resultados, seleccionar un libro y registrar condición.
- Se muestran loading, error, sin resultados, validación y éxito.
- El flujo no llama a un backend ni a una API externa.
- Los mensajes son visibles y accesibles.
- La página funciona en mobile y desktop.

### Pull Request

Título recomendado:

~~~text
feat: implement personal library and add book flow
~~~

Debe incluir pasos para verificar búsqueda, selección, validación y éxito.

---

## 10. Integrante 3 - Create Listing y Listing Details

### Objetivo

Permitir crear una publicación según la modalidad elegida y revisar el detalle de una publicación con solicitud simulada.

### Rama

~~~bash
git switch main
git pull origin main
git switch -c feature/listings
~~~

### Archivos permitidos

~~~text
create-listing.html
listing.html
js/create-listing.js
js/listing.js
~~~

### Tareas de Create Listing

1. Mostrar el libro que se desea publicar.
2. Crear el selector de modalidad.
3. Cambiar dinámicamente los campos al seleccionar Exchange, Loan, Rental o Sale.
4. Para Exchange, mostrar el libro deseado como opcional.
5. Permitir publicar Exchange sin libro deseado.
6. Mostrar Open to offers cuando corresponda.
7. Para Loan, exigir duración.
8. Para Rental, exigir precio y duración.
9. Para Sale, exigir precio.
10. Mostrar errores junto a los campos correspondientes.
11. Mantener la información introducida cuando falle una validación.
12. Mostrar un estado de publicación exitosa simulado.

### Tareas de Listing Details

1. Mostrar portada.
2. Mostrar título y autor.
3. Mostrar modalidad y condición.
4. Mostrar descripción.
5. Mostrar precio, duración o preferencia según corresponda.
6. Mostrar propietario y universidad.
7. Mostrar la acción correcta:
   - Request Exchange
   - Request Loan
   - Request Rental
   - Request Purchase
8. Para Exchange, abrir un modal para seleccionar un libro propio simulado.
9. Permitir cerrar el modal con botón, click externo y Escape.
10. Mostrar Request sent successfully después de la solicitud.

### Commits sugeridos

~~~text
feat: add dynamic listing form by sharing modality
feat: validate listing-specific fields
feat: implement listing details and request modal
~~~

### Criterios de aceptación

- El formulario cambia según la modalidad.
- Exchange no bloquea la publicación sin libro deseado.
- Los campos obligatorios se validan correctamente.
- Listing Details contiene la información requerida.
- El modal es accesible y se puede cerrar con Escape.
- La solicitud cambia la interfaz a un estado de éxito.
- No se crean transacciones reales ni persistencia.

### Pull Request

Título recomendado:

~~~text
feat: add listing creation and listing details
~~~

Debe incluir una tabla o lista de las validaciones verificadas para cada modalidad.

---

## 11. Integrante 4 - Requests, About y documentación

### Objetivo

Implementar la gestión visual de solicitudes y mantener la documentación de colaboración y alcance alineada con el producto.

### Rama

~~~bash
git switch main
git pull origin main
git switch -c feature/requests-about-docs
~~~

### Archivos permitidos

~~~text
requests.html
about.html
js/requests.js
CONTRIBUTING.md
README.md
AI-LOG.md
~~~

No debe modificar la lógica de las pantallas de otros integrantes sin coordinar un Pull Request separado.

### Tareas de Requests

1. Crear tabs Received y Sent.
2. Mostrar solicitudes Pending, Accepted y Rejected.
3. Mostrar acciones Accept y Reject cuando corresponda.
4. Actualizar dinámicamente el estado después de la acción.
5. Mostrar mensajes que expliquen el nuevo estado.
6. Mantener los estados entendibles aunque el color no esté disponible.
7. Verificar navegación por teclado en tabs y botones.

### Tareas de About

1. Explicar el problema.
2. Explicar los usuarios objetivo.
3. Explicar por qué una web app.
4. Explicar la solución propuesta.
5. Mostrar el flujo principal.
6. Mostrar las seis user stories.
7. Mostrar el equipo cuando los nombres estén confirmados.
8. No inventar roles ni nombres pendientes.

### Tareas de documentación

Crear CONTRIBUTING.md con:

- modelo GitHub Flow;
- nombres de branches;
- commits pequeños en inglés;
- revisión obligatoria por Pull Request;
- verificación manual requerida;
- regla de no implementar backend;
- regla de idioma;
- regla de comentarios en español.

Actualizar AI-LOG.md con cada uso significativo de IA:

- prompt o tarea;
- sugerencia recibida;
- cambios adoptados;
- cambios hechos manualmente;
- pruebas realizadas;
- aprendizaje.

### Commits sugeridos

~~~text
feat: implement request tabs and status actions
feat: add project information and team context
docs: add collaboration and review guidelines
docs: record frontend implementation decisions
~~~

### Criterios de aceptación

- Received y Sent funcionan como tabs.
- Accept y Reject actualizan el estado.
- Pending, Accepted y Rejected son visibles.
- About explica TheBridge sin contenido de PlayReal.
- README y AI-LOG no afirman que funciones pendientes ya estén terminadas.
- La documentación coincide con el alcance real.

### Pull Request

Título recomendado:

~~~text
feat: add request management and project information
~~~

Si el Pull Request incluye documentación adicional, describirla por separado.

---

## 12. Procedimiento de trabajo individual

### Preparar el repositorio

~~~bash
git clone https://github.com/ninjasilver3692077/TheBridge.git
cd TheBridge
git switch main
git pull origin main
~~~

### Crear la rama propia

~~~bash
git switch -c feature/nombre-de-la-tarea
~~~

### Trabajar en commits pequeños

Antes de cada commit:

~~~bash
git status
git diff
~~~

Después:

~~~bash
git add archivos-relacionados
git commit -m "feat: describe the completed behavior"
~~~

La descripción del commit debe estar en inglés y representar exactamente el cambio.

### Verificar antes de subir

- Abrir las páginas modificadas.
- Probar los estados principales.
- Revisar desktop, tablet y mobile.
- Revisar teclado y foco.
- Confirmar que no hay errores en consola.
- Confirmar que no se rompieron los enlaces.
- Buscar contenido accidental de PlayReal.

Comando útil:

~~~bash
rg -n "PlayReal|Supabase|React|Next.js|Vite" .
~~~

Cada resultado debe revisarse. Si aparece una referencia que no corresponde al alcance, debe eliminarse.

### Subir la rama

~~~bash
git push -u origin feature/nombre-de-la-tarea
~~~

### Crear Pull Request

El Pull Request debe incluir:

1. Qué se implementó.
2. Qué archivos se modificaron.
3. Qué requisitos se cubrieron.
4. Qué verificaciones manuales se realizaron.
5. Qué queda pendiente.
6. Capturas cuando el cambio sea visual.

---

## 13. Reglas para evitar conflictos

- No trabajar directamente sobre main después del commit inicial.
- No editar el mismo archivo que otro integrante sin coordinarlo.
- No cambiar nombres de campos del contrato mock sin avisar.
- No crear una segunda navegación con estilos diferentes.
- No duplicar colores y espaciados en cada página.
- No agregar dependencias sin una razón académica comprobable.
- No convertir el proyecto a React o Vite.
- No agregar backend para resolver estados simulados.
- No integrar APIs externas antes de tener el flujo mock completo.
- No modificar alcance para agregar funcionalidades futuras.

Si aparece una decisión de arquitectura que afecta a más de una pantalla, se debe registrar en DECISIONS.md antes de implementarla.

---

## 14. Revisión del Pull Request

La persona revisora debe comprobar:

### Alcance

- El cambio pertenece a la tarea asignada.
- Evita backend y dependencias innecesarias.
- No implementa funcionalidades futuras.

### Producto

- El flujo representa correctamente TheBridge.
- Se respetan Exchange, Loan, Rental y Sale.
- Se respeta que Exchange puede estar Open to offers.

### UI

- Usa el sistema visual común.
- Funciona en 375px, 768px y 1440px.
- No hay scroll horizontal.
- Los estados vacíos, errores y éxito son comprensibles.

### Accesibilidad

- Los controles tienen labels o nombres accesibles.
- El foco es visible.
- Los mensajes dinámicos se anuncian cuando corresponde.
- Los modales funcionan con Escape.
- El estado se entiende sin depender solo del color.

### Código

- Los comentarios en español explican la intención no obvia.
- La interfaz y los textos están en inglés.
- Se evitó duplicación innecesaria.
- No hay errores en consola.

---

## 15. Definition of Done de Milestone 1

Milestone 1 no se considera terminado hasta verificar:

- [ ] TheBridge está claramente explicado.
- [ ] Problem Statement completo.
- [ ] Target Users definidos.
- [ ] Why a Web Application documentado.
- [ ] Las seis User Stories están incluidas.
- [ ] Figma y wireframes disponibles.
- [ ] El prototipo es navegable.
- [ ] Marketplace funciona.
- [ ] Search funciona.
- [ ] Filters funcionan.
- [ ] My Books funciona visualmente.
- [ ] Add Book tiene interacción.
- [ ] Create Listing es dinámico.
- [ ] Listing Details permite solicitud simulada.
- [ ] Requests permite Accept y Reject.
- [ ] Empty, error y validation states están representados.
- [ ] Responsive revisado.
- [ ] Accesibilidad básica revisada.
- [ ] README actualizado.
- [ ] AI-LOG actualizado.
- [ ] figma-link.txt actualizado.
- [ ] Los cuatro integrantes realizaron trabajo real.
- [ ] Existen Pull Requests y revisiones coherentes.
- [ ] No hay errores JavaScript en consola.
- [ ] No hay enlaces rotos.
- [ ] GitHub Pages funciona.
- [ ] No queda contenido de PlayReal.
- [ ] No se implementó backend innecesariamente.

---

## 16. Commits recomendados por integrante

Todos los mensajes deben estar en inglés.

### Integrante 1

~~~text
feat: build shared responsive layout and design tokens
feat: define mock book data and marketplace cards
feat: implement marketplace search and modality filters
~~~

### Integrante 2

~~~text
feat: add personal library states and listing entry point
feat: implement mock book search and selection flow
feat: add add-book validation and feedback states
~~~

### Integrante 3

~~~text
feat: add dynamic listing form by sharing modality
feat: validate listing-specific fields
feat: implement listing details and request modal
~~~

### Integrante 4

~~~text
feat: implement request tabs and status actions
feat: add project information and team context
docs: add collaboration and review guidelines
~~~

Tipos convencionales:

- feat: nueva funcionalidad.
- fix: corrección.
- docs: documentación.
- refactor: reorganización sin cambiar el comportamiento.
- test: verificación o pruebas.
- chore: configuración o mantenimiento.

---

## 17. Referencias del proyecto

- Repositorio: https://github.com/ninjasilver3692077/TheBridge
- Figma Make: https://www.figma.com/make/Fh7DrqXhusW66w2eVxv4Dg/User-dashboard?t=NN69DYi6AcyQXqIb-1
- Decisiones actuales: DECISIONS.md
- Contexto académico: README.md
- Registro de IA: AI-LOG.md
