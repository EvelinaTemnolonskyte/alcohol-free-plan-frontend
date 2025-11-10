## alcohol-free-plan-frontend

This project is a **mobile-only frontend web application** built as part of my **technical assignment**.  
The quiz guides users through a short set of questions to create a **personalized Alcohol-Free Plan** based on their responses.  
Users begin by selecting their gender, proceed through six interactive quiz questions with dynamic progress indicators, and finish on a summary page displaying tailored results, insights, and a live countdown timer.

##  Used Technologies

- **React** – for component-based architecture  
- **Next.js** – with App Router and file-system based routing  
- **Tailwind CSS** – for styling  
- **TypeScript** – for type safety  

##  Pages Overview

The project has three main pages, each implemented as a `page.tsx` file inside the `app` folder:

- **Landing Page**  
  File: `/app/page.tsx`  
  Purpose: Allows the user to select their gender, which is stored in the context. Clicking a gender navigates to the Quiz Page.

- **Quiz Page**  
  File: `/app/quiz/page.tsx`  
  Purpose: Guides the user through six interactive questions. Answers are stored in the context.

- **Checkout / Summary Page**  
  File: `/app/checkout/page.tsx`  
  Purpose: Displays a personalized summary based on the quiz answers. Shows a live countdown timer, summary cards with badges, and a comparison image based on the selected gender.


## Development Solutions and Architecture

The core logic of the application is organized into several **reusable and modular components**:

* **`Header`**: Displays the logo, optional back button, and step indicator for quiz navigation.
* **`ProgressBar`**: Provides a visual representation of the user's progress through the quiz.
* **`QuizQuestion`**: Renders each quiz question and manages user interactions, including option selection and dynamic styling.
* **`StepIndicator`**: Embedded within the header, this component shows the current question number relative to the total (e.g., `5/6`).
* **`SummaryCard`**: Displays a single result category, including its badge and percentage (e.g., "Cravings" or "Desire to change"). The component dynamically adjusts styling based on the value and semantic meaning of the category.
* **`Timer`**: Implements a countdown timer, using React’s `useEffect` hook to handle updates and resets efficiently.

This component-based architecture was intentionally designed to promote **reusability, maintainability, and separation of concerns**.  

* **Reusability:** Components are designed to be generic and flexible.  
   - `Header` can be used across multiple pages for consistent branding and navigation.

   - `ProgressBar` and `StepIndicator` can be reused in any multi-step workflow or process that requires visual progress tracking.

   - `SummaryCard` is fully dynamic, allowing it to display any result category without hardcoding values, making it suitable for future expansions of the quiz or other reporting dashboards.

   - `QuizQuestion` is built to handle any type of question and options dynamically, avoiding repetitive code for different quiz steps. By passing question data and options as props, the same component can render multiple question types while maintaining consistent styling and behavior, significantly reducing duplication.  

   - `Timer`  is designed to be reusable for any countdown scenario. It can be easily integrated wherever a live timer is needed by simply passing the initial time and label as props, without modifying internal logic. This makes it flexible for future features like limited-time offers, quiz time limits, or other countdown-based UI elements.

* **Maintainability:** By isolating logic within self-contained components, each piece can be updated, tested, or replaced independently, reducing the risk of introducing bugs.

### Global State Management
The `QuizProvider` component uses a simple `useState` hook for `gender` and `answers` (stored as `Record<number, string>`) and exposes setter functions (`setGender`, `setAnswer`) via `QuizContext.Provider`.  

Currently, only the `gender` value is used to determine which before/after image is displayed on the Checkout page. However, because all user answers are already stored in context, it would be straightforward to implement dynamic result logic in the future, where the summary and badges are calculated based on the quiz responses.

### Note on Result Logic in Checkout page

The assignment did not provide a detailed specification or algorithm for interpreting quiz answers to generate the summary percentages.  

As a result, the **results displayed on the Checkout page are statically defined** in the project.


### Dynamic Styling in `QuizQuestion`

The quiz includes different types of questions. While most options follow a standard style, some questions (e.g., "Yes / No / I'm not sure") require **contextual, mood-based styling** — for instance, green for "Yes," yellow for "I'm not sure" and red for "No."

* **Implementation (`type` Prop):**  
  To handle this, a custom `type` property (`'positive'`, `'neutral'`, `'negative'`) was added to each option object. The internal `getOptionStyle` function uses this `type` property within a `switch` statement to apply **type-specific borders and background colors**.  

This approach allows for **dynamic, context-aware styling** that reflects the sentiment of each option, while keeping the core quiz logic clean and reusable.

This achieves a "mood" or "sentiment" styling without complicating the core question logic.

## Dynamic Categorization with SummaryCard

The `SummaryCard` component is responsible for translating a percentage score into a contextual badge and progress bar color.

Badge/Color Logic: The component receives a value (percentage) and determines its range (low to veryHigh). It then uses a nested switch statement to assign a dynamic badgeText (VERY STRONG, TOO HIGH, etc.) and a corresponding color for the progress bar.

- **`isPositive = true`** (e.g., *"Desire to change"*): Higher percentages correspond to a **more favorable outcome** — in other words, the higher the value, the better the result.  
- **`isPositive = false`** (e.g., *"Cravings"*): Higher percentages correspond to a **less favorable outcome** — that is, the higher the value, the worse the result.


### Live Countdown Timer

The `Timer` component displays the reserved price countdown, providing real-time feedback to the user.

#### Implementation Using `useEffect`

The countdown logic is implemented in the parent component using the **React `useEffect` hook**, as required by the assignment.

* **Purpose of `useEffect`:** The hook is ideal for managing side effects, such as continuously updating a timer.  

  1. **Initialization:** Within `useEffect`, `setInterval` is used to decrement the `timeLeft` state every 1000ms (1 second).  
  2. **Cleanup:** `useEffect` returns a cleanup function that calls `clearInterval`, ensuring the interval is properly cleared when the component unmounts (e.g., if the user navigates away). This prevents memory leaks and guarantees stable performance, which is essential for reliable React applications.

## Set up

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
git clone https://github.com/your-username/alcohol-free-plan-frontend.git
cd alcohol-free-plan-frontend

### 2. Install Dependencies

npm install

### 3. Run the Development Server

npm run dev