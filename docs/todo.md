# 3D Perspective Carousel: Project TODO

This checklist outlines all the necessary steps to build the responsive 3D perspective carousel component according to the developer specification.

## Phase 1: Project Setup & Static Structure

- [x] **Initialize Project Structure** ✅ COMPLETED

  - [x] Create component folder: `components/PerspectiveCarousel/`
  - [x] Create component file: `components/PerspectiveCarousel/index.tsx`
  - [x] Create CSS module: `components/PerspectiveCarousel/styles.module.css`
  - [x] Create image data file: `lib/imageData.ts`

- [x] **Populate Initial Files** ✅ COMPLETED

  - [x] Add `imageUrls` array with 14 placeholder image URLs to `lib/imageData.ts`.
  - [x] Set up the basic `PerspectiveCarousel` React component in `index.tsx`.
  - [x] Import `imageUrls` and `styles.module.css` into the component.
  - [x] Define component props to accept an array of image URLs.

- [x] **Build the Static DOM** ✅ COMPLETED
  - [x] Render the root wrapper `div` (`.carouselWrapper`).
  - [x] Render the main perspective `div` (`.carousel`).
  - [x] Render the rotating container for the arms (`.armsContainer`).
  - [x] Programmatically generate 7 "arm" `div`s (`.arm`).
  - [x] Programmatically generate 2 "frame" `div`s (`.frame`) inside each arm.
  - [x] Place an `<img>` tag inside each frame, connecting it to the `imageUrls` data.

## Phase 2: Static 3D Visual Implementation

- [x] **Apply Base CSS for Layout** ✅ COMPLETED

  - [x] Style `.carouselWrapper` with fixed height (`240px`), full width, and `perspective: 500px`.
  - [x] Style `.carousel` and `.armsContainer` for absolute centering and `transform-style: preserve-3d`.
  - [x] Style `.arm` with correct dimensions (`240px` x `1400px`) and flex properties (`justify-content: space-between`, `align-items: center`).
  - [x] Style `.frame` with correct dimensions (`370px` x `260px`).
  - [x] Style `<img>` tags with `object-fit: cover`.
  - [x] Apply `user-select: none` and `touch-action: none` to the main wrapper.

- [x] **Apply Static 3D Transforms** ✅ COMPLETED

  - [x] Dynamically apply the `rotateY` transform to each of the 7 `.arm` elements using inline styles (`style={{...}}`) to arrange them in a circle.
  - [x] Dynamically apply an initial `translateZ` to each `.arm` to define the carousel's radius.
  - [x] Apply the fixed `transform: rotateY(90deg) translateZ(-130px)` to the first frame in each arm.
  - [x] Apply the fixed `transform: rotateY(-90deg) translateZ(-130px)` to the second frame in each arm.

- [x] **Verification** ✅ COMPLETED
  - [x] Confirm the carousel renders as a static 3D barrel/cylinder.
  - [x] Verify that Frame 0 (the first image) is positioned front-and-center.
  - [x] Check that the "barrel distortion" effect from the `perspective` property is visible.

## Phase 3: Interactivity with Framer Motion

- [x] **Integrate Framer Motion** ✅ COMPLETED

  - [x] Install the `framer-motion` package.
  - [x] Convert the `.armsContainer` `div` to a `motion.div`.
  - [x] Initialize `useMotionValue(0)` to control the `rotateY` property.
  - [x] Apply the motion value to the `motion.div`'s `style` prop.

- [x] **Implement Drag-to-Rotate** ✅ COMPLETED

  - [x] Add the `drag="x"` prop to a suitable drag surface `motion.div`.
  - [x] Add `useState` to track the committed rotation angle.
  - [x] Implement the `onDrag` event handler to update the `rotateY` motion value based on drag offset.
  - [x] Implement the `onDragEnd` event handler to update the committed rotation state.

- [x] **Verification** ✅ COMPLETED
  - [x] Test that the user can click and drag horizontally to rotate the carousel.
  - [x] Confirm the rotation feels smooth and directly maps to the drag gesture.

## Phase 4: Automatic Rotation & Controls

- [x] **Implement Auto-Rotation** ✅ COMPLETED

  - [x] Initialize `useAnimation` controls from Framer Motion.
  - [x] Link the animation controls to the rotating `motion.div`.
  - [x] Create a function (`startAutoRotate`) that starts an infinite, linear animation of `rotateY` by -360 degrees over 30 seconds.
  - [x] Use a `useEffect` hook to call `startAutoRotate` on component mount.

- [x] **Implement Pause/Resume Logic** ✅ COMPLETED

  - [x] Call `controls.stop()` within the `onDragStart` event handler.
  - [x] Use `setTimeout` within the `onDragEnd` handler to call `startAutoRotate` after 5 seconds of inactivity.
  - [x] Use `useRef` to hold the timer ID so it can be cleared if a new drag starts before the 5 seconds are up.

- [x] **Verification** ✅ COMPLETED
  - [x] Check that the carousel rotates clockwise automatically on page load.
  - [x] Verify that any user interaction (a click or drag start) immediately pauses the rotation.
  - [x] Confirm that rotation resumes from its last position exactly 5 seconds after the interaction ends.

## Phase 5: Responsiveness

- [x] **Create Custom Responsive Hook** ✅ COMPLETED

  - [x] Create a new file `hooks/useResponsiveCarousel.ts`.
  - [x] Implement the hook using `useState`, `useEffect`, and `window.matchMedia`.
  - [x] Define breakpoints for "Phone," "MacBook," and "Studio Display."
  - [x] The hook should return an object containing the appropriate `perspective` and `translateZ` values for the current breakpoint.
  - [x] Ensure the hook adds and cleans up window resize event listeners properly.

- [x] **Integrate Responsive Values** ✅ COMPLETED

  - [x] Import and call the `useResponsiveCarousel` hook in the main component.
  - [x] Apply the dynamic `perspective` value to the `.carouselWrapper` style.
  - [x] Update the dynamic `translateZ` value in the inline style for each `.arm`.

- [x] **Verification** ✅ COMPLETED
  - [x] Test the component at different viewport widths.
  - [x] Confirm ~3 frames are primarily visible on small screens.
  - [x] Confirm ~6 frames are primarily visible on medium screens.
  - [x] Confirm ~9 frames are primarily visible on large screens.

## Phase 6: Finalization & Cleanup

- [ ] **Component Refinement**

  - [ ] Ensure the component properly receives and uses the `imageUrls` prop.
  - [ ] Add a fallback to default data if the prop is not provided.

- [ ] **Code Quality & Documentation**

  - [ ] Add TypeScript types/interfaces for component props (`PerspectiveCarouselProps`).
  - [ ] Add a check to ensure the `imageUrls` prop contains exactly 14 items.
  - [ ] Add descriptive comments to complex logic (transforms, animation controls, drag handlers).
  - [ ] Remove all `console.log` statements and unused code.
  - [ ] Review CSS class names for clarity and consistency.

- [ ] **Final Review**
  - [ ] Perform a final, end-to-end test of all features: rendering, dragging, auto-play, pause/resume, and responsiveness.
  - [ ] Read through the code one last time to ensure it is clean, efficient, and maintainable.
  - [ ] Mark the project as complete.
