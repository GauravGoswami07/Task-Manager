Vanilla JS Task Manager

A feature-rich, client-side task management application built with pure HTML, CSS, and JavaScript — no frameworks or libraries. This project demonstrates core DOM manipulation concepts, event handling, local storage persistence, and browser rendering fundamentals.


Features


Add, edit, and delete tasks with title and category
Mark tasks as complete/pending with a toggle
Live stats showing pending and completed task counts
Dark/Light mode toggle with smooth transitions and animated icon
Local Storage persistence — tasks survive page refresh
Attribute vs Property demo — interactive console demonstration
Event propagation demo — switch between bubbling and capturing modes
Browser rendering pipeline — visual reference for the DOM/CSSOM flow



Project Structure

├── index.html      # Application markup and layout
├── style.css       # Theming, layout, and component styles
└── script.js       # All application logic and DOM interactions


Getting Started

No build tools or dependencies required.


Clone or download the repository
Open index.html directly in any modern browser


bash# Optional: serve locally to avoid any browser restrictions
npx serve .
# or
python -m http.server 8080


Concepts Demonstrated

DOM Manipulation (no innerHTML)

All task cards are built entirely using the DOM API — createElement, createTextNode, appendChild, and removeChild. This avoids XSS risks and keeps the rendering pipeline explicit.

Attributes vs Properties

The demo section shows the difference between an element's HTML attribute (the initial value in markup, accessed via getAttribute) and its live DOM property (the current runtime value, accessed directly on the element object). Changing one does not always change the other.

Event Delegation

A single click listener on the #taskList container handles all button actions (complete, edit, delete) across every task card. Action types are identified via data-action attributes, and the task ID is read from the nearest .task-card parent using closest().

Event Propagation

The propagation demo lets you switch between bubbling (events travel from child → parent) and capturing (events travel from parent → child) using radio buttons. Listeners are re-applied cleanly by cloning nodes to remove stale handlers.

Local Storage

The full task array is serialised to JSON and stored in localStorage on every render. On page load, it is deserialised and hydrated back into the UI so no tasks are lost between sessions.

CSS Custom Properties & Theming

The colour scheme is defined as CSS variables in :root. The dark theme overrides those variables scoped to body[data-theme="dark"]. Toggling the theme is a single setAttribute call — no class juggling needed.


Task Categories

Tasks can be assigned one of three categories:

CategoryUse caseStudyAcademic or learning tasksWorkProfessional or project tasksPersonalDay-to-day personal items


Theme Toggle

The header button switches between light and dark mode. The icon updates between 🌙 and ☀️ and the label changes between "Dark Mode" and "Light Mode". The icon also rotates subtly in dark mode via a CSS transition on .btn-icon.


Browser Rendering Pipeline (Reference)

The app includes a static visual reference showing how the browser turns HTML and CSS into pixels:

HTML → Parsing → Tokenization → DOM Tree ─┐
                                           ├─→ Render Tree → Layout & Paint
CSS  → Parsing → CSSOM Tree ───────────────┘


Browser Compatibility

Works in all modern browsers that support:


localStorage
dataset / data-* attributes
CSS custom properties (var())
Element.closest()
Element.replaceWith()



License

This project is intended for educational purposes. Feel free to use, modify, and extend it.
