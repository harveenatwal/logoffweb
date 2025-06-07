## 3D Perspective Carousel Component: Developer Specification

### 1. Overview

This document outlines the requirements for a responsive, interactive, and automatically rotating 3D perspective carousel component. The carousel will display 14 static images arranged in a "barrel distortion" effect, providing a unique visual experience. The implementation should be suitable for a Next.js environment.

### 2. Core Features & Behavior

- **Total Items:** The carousel will always display exactly 14 frames.
- **Responsiveness:** The number of visible frames and potentially the overall scaling will adapt to different screen sizes:
  - **Studio Display:** 9 frames visible.
  - **MacBook:** 6 frames visible.
  - **Phone:** 3 frames visible.
- **Navigation:**
  - **Dragging/Swiping:** Primary user interaction for navigation. The user can drag the carousel horizontally to rotate through the frames.
  - **No Pagination Dots:** Visual pagination indicators are not required.
- **Automatic Rotation:**
  - **Direction:** Clockwise.
  - **Speed:** 30 seconds for a complete rotation of all 14 frames.
  - **Interruption:** Automatic rotation will pause immediately upon any user interaction (dragging).
  - **Resumption:** Automatic rotation will resume after 5 seconds of user inactivity.
- **Initial State:** When the page loads, Frame 0 (the first frame in the provided array) will be centered and in the most prominent position.

### 3. Visual & Aesthetic Requirements

- **Overall Layout (`.carousel` / outermost container):**
  - Full width (100% of parent container).
  - Fixed height: `240px`.
  - CSS properties:
    ```css
    transform-style: preserve-3d;
    user-select: none; /* Disables text selection */
    touch-action: none; /* Prevents default touch behaviors like scrolling */
    /* `transform: perspective(500px) rotateY(...)` will be applied here dynamically */
    ```
- **3D Perspective (`.carousel` / outermost container):**
  - The `perspective(500px)` transform is applied to the outermost container responsible for rotating the entire carousel. This value creates a strong "barrel distortion" effect where central items are recessed/compressed and items at the edges are larger/expanded.
- **Frame Appearance:**
  - **No Blur:** Frames will remain sharp regardless of their position or depth in the 3D space.
  - **No Opacity Changes:** Frames will maintain full opacity (100%) regardless of their position or depth.
  - **Scaling (Barrel Distortion):**
    - Frames at the _far visible edges_ of the carousel will be the largest.
    - Frames in the _absolute center_ of the visible carousel will be scaled down to approximately **70%** of the size of the largest edge frames.
    - This scaling will be achieved implicitly through the `perspective` and the fixed `rotateY` transforms of the arms and frames, combined with their positioning. Explicit `scale()` transforms on the individual frames for this effect are not required if the CSS structure correctly achieves it.
  - **Fixed Gap:** A consistent visual gap will be maintained between frames.
    - The gap will be approximately **5% of the original (unscaled) width of a single frame**.

### 4. Component Structure (Based on provided CSS snippets)

The carousel structure will be highly reliant on specific CSS `transform` properties and element relationships to achieve the 3D effect.

- **`.carousel` (Outermost Container):**
  - Receives `perspective(500px)` and the dynamic `rotateY` for user interaction.
  - `transform-style: preserve-3d;`
  - `user-select: none;`
  - `touch-action: none;`
- **`.main` (Intermediate Container):**
  - `transform-style: preserve-3d;`
- **`.framer-y5exkv` (Identified as the `Arms` container):**
  - This container holds all 7 individual `arm` elements.
  - `width: 1200px;` (Effective width of the entire arm arrangement).
  - `display: flex; flex-direction: row;` (Arranges arms horizontally).
  - `justify-content: center; align-items: center;`
  - `gap: 10px;` (Gap between individual arms).
  - `height: min-content;`
  - `overflow: visible;`
  - `padding: 0;`
  - `position: relative;`
  - `transform-style: preserve-3d;`
- **`.arms` (Individual Arm Wrapper - potentially redundant or a specific Framer class):**
  - `width: 1px;`
  - `flex: 1 0 0px;`
  - `flex-direction: column;`
  - `height: min-content;`
  - `overflow: visible;`
  - `padding: 0;`
  - `position: relative;`
  - `transform-style: preserve-3d;`
- **`.framer-x3jz9j` (Actual `Arm` container - one of 7 instances):**
  - `height: 240px;`
  - `width: 1400px;` (Crucial for frame positioning within the arm).
  - `justify-content: space-between; align-items: center;` (Positions the two frames horizontally).
  - `display: flex; flex-direction: row; flex-wrap: nowrap;`
  - `overflow: visible;`
  - `padding: 0;`
  - `position: relative;` (Potentially `position: absolute` with `left`/`top` for fine-tuning as seen in `arm 2` example).
  - `transform-style: preserve-3d;`
  - **Static `transform: rotateY(...)`:** Each of the 7 arms will have a fixed `rotateY` transform to distribute them in a circular formation. For 7 arms, this would be 360deg / 7, applied incrementally (e.g., `rotateY(0deg)`, `rotateY(51.42deg)`, `rotateY(102.84deg)`, etc.). The specific starting offset will define which arm is "front and center".
- **Individual Frames (2 per arm):**
  - `height: 370px;`
  - `width: 260px;`
  - `flex: none;`
  - `position: relative;`
  - **Fixed `transform: rotateY(...)`:**
    - **Frame 1 in arm:** `transform: rotateY(90deg);`
    - **Frame 2 in arm:** `transform: rotateY(-90deg);`
  - **Vertical Alignment:** Frames should be **vertically centered** within their parent `arm` container. The overflow beyond the `240px` arm height is expected and should be visible.

### 5. Content & Data Handling

- **Content Type:** Each of the 14 frames will display a **static image**.
- **Image Fitting:** Images will be fitted using the `cover` method within their 260px x 370px frame, preserving aspect ratio and potentially cropping.
- **Image Optimization:** A single image size will suffice for all frames; no responsive image optimization (e.g., `srcset`, `sizes`) is required.
- **Data Input:** The image URLs for all 14 frames will be provided to the carousel component as a **static array prop**. The order of images in the array corresponds directly to `Frame 0`, `Frame 1`, ..., `Frame 13`.

### 6. Technical Considerations & Implementation Details

- **Next.js Compatibility:** The component should be a React component, compatible with Next.js rendering.
- **Animation Library:** Given the complexity of the 3D transforms, dragging, and auto-play, a robust animation library is highly recommended.
  - **Framer Motion** or **React Spring** are strong candidates for achieving the precise 3D transforms, smooth dragging physics, and controlled auto-play behavior.
  - The `rotateY` on the main carousel container will be animated to facilitate dragging and auto-rotation.
- **Drag Logic:**
  - Capture `pointerdown`, `pointermove`, `pointerup` (or `mousedown`, `mousemove`, `mouseup` for desktop; `touchstart`, `touchmove`, `touchend` for mobile).
  - Calculate drag distance to determine the rotation angle for the main carousel container.
  - Implement inertia/deceleration for the rotation after a drag ends.
- **Auto-Rotation Logic:**
  - Use `requestAnimationFrame` or `setTimeout`/`setInterval` (with proper cleanup) for the continuous clockwise rotation.
  - Implement a mechanism to detect user interaction (e.g., `pointerdown`, `touchstart`) to pause the auto-rotation.
  - Use a timer (5 seconds) after `pointerup` or `touchend` to resume auto-rotation if no further interaction occurs.
- **CSS `transform-origin`:** While explicit `transform-origin` on individual frames might not be necessary _if_ the structure naturally provides the barrel effect, ensure the default `center center` behavior (or any specific setting) aligns with the desired visual outcome. The main effect comes from the `perspective` and arm/frame rotations.
- **Vertical Centering of Frames:** Since frames are taller than arms, use flexbox properties (`align-items: center` on the arm) or absolute positioning with `top: 50%; transform: translateY(-50%);` for vertical centering.
- **Error Handling:** Not applicable for missing frames, as it's guaranteed there will always be 14 frames. Handle potential issues with invalid image URLs (e.g., display a placeholder or default image).

### 7. Deliverables

- A reusable Next.js/React component for the 3D Perspective Carousel.
- All necessary CSS/SCSS/Tailwind classes for styling and 3D effects.
- Clear documentation on props accepted by the component.
