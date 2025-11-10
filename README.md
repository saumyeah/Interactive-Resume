# Interactive Resume Project

This is a dynamic, interactive resume page built with React and Vite. It allows users to filter projects by skill, search for keywords, and view work experience.

**Live URL:** **[https://saumyeah.github.io/Interactive-Resume](https://saumyeah.github.io/Interactive-Resume)**



---

###  Tech Stack & Decisions

* **Framework:** React (with Vite)
* **Styling:** Plain CSS (with a "glassmorphism" / gradient design)
* **Data:** `resume.json` - All resume data is loaded from a local JSON file, making it easy to update without touching the code.
* **Deployment:** GitHub Pages (using the `gh-pages` package to auto-build and deploy from the `dist` folder).

---

###  Setup & Run Instructions

To run this project locally on your own machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/saumyeah/Interactive-Resume.git](https://github.com/saumyeah/Interactive-Resume.git)
    ```
2.  **Navigate to the project folder:**
    ```bash
    cd Interactive-Resume
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the local development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) (or the URL shown in your terminal) in your browser.

---

###  Hardcoded Credentials

* **None.** This project is self-contained and does not require any API keys or external service credentials to run.

---

###  Known Trade-offs & Future Work

What I would do "if I had more time":

* **Trade-off:** The "Download PDF" button currently uses `window.print()`. This works, but the styling for printing (`@media print`) can be tricky to perfect.
* **Future Work:**
    * I would replace the print method with a library like `html2pdf.js` to generate a perfect, pixel-controlled PDF directly from a component.
    * Add a "View" toggle to switch between the current list view and a more visual "card" view for projects.
    * Animate the skill filters and project list for a smoother user experience.