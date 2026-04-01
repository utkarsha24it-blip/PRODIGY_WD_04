# PRODIGY_WD_04
Personal Portfolio Website
This is a **complete React JSX single-file portfolio website** for *Utkarsha Tarde*. It includes **all components, styles, and logic in one file**, making it a full **frontend portfolio application**.

Here’s a clear explanation 👇

---

# 🔷 1. Overview of the File

* Built using **React (Functional Components + Hooks)**
* Uses:

  * `useState` → for managing state (menu, form, etc.)
  * `useEffect` → for side effects (scroll, styles)
  * `useRef` → for animations (scroll reveal)
* Contains:

  * **CSS (inside JS)**
  * **UI Components**
  * **Animations**
  * **Form handling**

👉 It is a **dark-themed modern portfolio website**

---

# 🔷 2. Global Styles (CSS inside JS)

```js
const STYLES = `...`
```

* All CSS is written inside a **JavaScript string**
* Injected into `<head>` using `useEffect`
* Defines:

  * Colors (dark theme + gold accent)
  * Fonts (Playfair Display, DM Sans)
  * Layout styles
  * Animations
  * Responsive design

👉 This approach is called **CSS-in-JS**

---

# 🔷 3. Custom Hook – Scroll Animation

```js
function useReveal()
```

* Uses **Intersection Observer**
* When section enters screen:
  → Adds class `visible`
* Creates smooth **fade-in animation**

👉 Used in sections like:

* About
* Skills
* Projects
* Education
* Contact

---

# 🔷 4. Navbar Component

```js
function Navbar()
```

### Features:

* Fixed top navigation bar
* Changes style when scrolling
* Mobile hamburger menu
* Smooth scrolling to sections

### Sections:

* Home
* About
* Skills
* Projects
* Education
* Contact

👉 Uses:

* `useState` → menu toggle
* `useEffect` → scroll detection

---

# 🔷 5. Home Component

```js
function Home()
```

### Contains:

* Name: **Utkarsha Tarde**
* Role: Web Developer / MERN Stack
* Description
* Buttons:

  * View Projects
  * Contact Me
* Skills tags (HTML, CSS, React, etc.)

### Special Feature:

* **SVG Profile Avatar**
* Animated elements (fade, glow, grid)

👉 First impression section (Hero section)

---

# 🔷 6. About Component

```js
function About()
```

### Includes:

* Personal introduction
* College:

  * Pillai College of Arts, Commerce & Science
* Information list:

  * Degree
  * Year
  * Location (Mumbai)
  * Focus (Full Stack)

### Visual:

* Animated **SVG illustration (laptop + coding)**

---

# 🔷 7. Skills Component

```js
function Skills()
```

### Categories:

1. Programming Languages
2. Frameworks & Libraries
3. Databases
4. Tools

### Example Skills:

* JavaScript (80%)
* React (75%)
* MongoDB (70%)

### Feature:

* Animated **progress bars**

👉 Uses Intersection Observer to animate bars

---

# 🔷 8. Projects Component

```js
function Projects()
```

### Projects Included:

1. 👟 Shoe Store (MERN)
2. 🌐 Portfolio Website
3. 📝 Task Manager App

### Each project has:

* Technologies used
* Description
* Features list
* Buttons:

  * GitHub
  * Live Demo

👉 Shows real development work

---

# 🔷 9. Education Component

```js
function Education()
```

### Timeline style:

* B.Sc IT (Present)
* HSC (2021–2023)
* SSC (2021)

### Feature:

* Vertical timeline UI

---

# 🔷 10. Contact Component

```js
function Contact()
```

### Includes:

* Contact details:

  * Email
  * Phone
  * Location
  * LinkedIn
  * GitHub

### Contact Form:

* Name
* Email
* Subject
* Message

### Feature:

* Shows **“Message Sent”** after submit

👉 Uses `useState` for form handling

---

# 🔷 11. Footer Component

```js
function Footer()
```

* Displays:

  * Copyright
  * Social links (GitHub, LinkedIn)
* Auto-updates year using:

```js
new Date().getFullYear()
```

---

# 🔷 12. Main App Component

```js
export default function App()
```

### Responsibilities:

* Injects CSS into `<head>`
* Renders all sections:

  * Navbar
  * Home
  * About
  * Skills
  * Projects
  * Education
  * Contact
  * Footer

---

# ✅ Key Features of This Project

✔ Single file React portfolio
✔ Dark aesthetic UI
✔ Smooth scrolling navigation
✔ Responsive design (mobile + desktop)
✔ Animated sections
✔ Skill progress bars
✔ Contact form with validation
✔ SVG graphics (no images used)

---

# 🎯 Simple Exam Description (Important ⭐)

This file represents a **React-based personal portfolio website** built using functional components and hooks. It includes multiple sections such as Home, About, Skills, Projects, Education, and Contact. The application uses CSS-in-JS for styling, Intersection Observer for animations, and state management for interactivity like navigation and form handling. It provides a responsive and modern user interface showcasing personal and professional details.




