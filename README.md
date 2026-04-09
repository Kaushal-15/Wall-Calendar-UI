# Wall Calendar UI 🗓️

An ultra-premium, highly tactile web-based calendar application inspired by physical designer wall calendars. This project evolves the traditional "SaaS-style" date picker into an immersive, skeuomorphic productivity tool.

## 🚀 Live Demo & Demonstration
- **Live Demo (Vercel): https://wall-calendar-ui-two.vercel.app/

- **Video Walkthrough:** https://drive.google.com/file/d/1lPJYBjDmXyHtrdkYQYHJ5fWStaQndelD/view?usp=sharing

## ✨ Core Features
- **3D Page Flip Mechanics:** Features a highly refined 3D CSS physics engine. When users flip months, the page practically "lifts" utilizing `translateZ`, casting dynamic drop-shadows and playing a crisp paper-flip acoustic sound.
- **Dynamic 12-Month Design System:** The entire UI—from the core typography to the immersive ambient background shadow—reacts programmatically to the active month. The background projects an Apple-style blurred aura derived directly from the seasonal hero image.
- **Date Range Selection:** Seamless, intuitive grid interaction allowing users to click and select specific target date ranges. Saturdays and Sundays automatically receive subtle visual distinctions.
- **Deluxe Planner Notes Panel:** Overhauled standard "to-do" lists into a multi-section productivity suite, featuring:
  - **Top 3 Priorities:** A dedicated section enforcing strict priority management, complete with a visual completion progress meter.
  - **Habit Tracker:** Scoped daily habits independent of standard priorities.
  - **Persistent, Month-Scoped Storage:** Built on a custom custom `storage.js` localized engine. Priorities and notes are tightly scoped to the specific `year-month-targetDate` keys so data never bleeds across selections.
  - **Page Flip Animation with effects and real Audio experience of the page flip has also been added and also shown in the Video Demo also.**

## 🛠️ Technology Stack & Design Choices
- **React.js (Create React App):** For robust component modularity and precise state control across month flips and date-range logic.
- **Tailwind CSS:** Selected for highly sophisticated styling. The UI eschews simple blocks for a "printed paper" aesthetic—incorporating SVG noise filters, `mix-blend` shadows, and rim lighting.
- **Framer Motion:** Drives the incredibly smooth mounting, layout shifts, selection ring bounces, and UI transitions across the interface.
- **Date-Fns:** Ensures mathematically precise calendar logic without the bundle-heavy weight of monolithic date libraries.


## Screenshots
<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/ab16b38f-1b17-41ee-a694-3e3d87e83220" />

----> DARK THEME <----
<img width="1919" height="903" alt="image" src="https://github.com/user-attachments/assets/a3115520-fb4b-489e-ae38-8463ba7c404a" />

----> Implemenation image of the Features  <----
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/5282ae03-6763-4e33-bbac-5512b1b1c73b" />

## 💻 How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone [your-repo-link-here]
   cd wall-calendar-ui
   ```

2. **Install Dependencies**
   Make sure you have Node installed (v16+ recommended).
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```
   *The application will automatically boot up at `http://localhost:3000` via Webpack.*

## 📐 Evaluation Constraints Addressed
1. **Day Range Selection:** Fully functional across the custom responsive grid components. 
2. **Notes Feature:** Elevated into a full layout encompassing goals, progress bars, and localized persistent storage.
3. **Responsiveness:** Entire layout scales down from a wide `row` base into an elegant `flex-col` stack for mobile, keeping touch targets (day cells) at an accessible 40x40px minimum.
