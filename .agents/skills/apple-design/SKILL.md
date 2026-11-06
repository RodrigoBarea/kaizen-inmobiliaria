---
name: apple-design
description: "Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent materials and depth, typography (optical sizing, tracking, leading), reduced-motion, or the design foundations (feedback, spatial consistency, restraint) behind Apple-style interfaces."
---

# Apple Design

How Apple builds interfaces that stop feeling like a computer and start feeling like an extension of you. This knowledge comes from Apple's WWDC design talks — chiefly *Designing Fluid Interfaces* (WWDC 2018) — distilled and translated into the web platform (CSS, Pointer Events, requestAnimationFrame, spring libraries like Motion/Framer Motion).

The through-line: an interface feels alive when motion starts from the current on-screen value, inherits the user's velocity, projects momentum forward, and can be grabbed and reversed at any instant. Springs are the tool that makes all of this natural, because they are inherently interruptible and velocity-aware.

## The Core Idea

> "When we align the interface to the way we think and move, something magical happens — it stops feeling like a computer and starts feeling like a seamless extension of us."

An interface is fluid when it behaves like the physical world: things respond instantly, move continuously, carry momentum, resist at boundaries, and can be redirected mid-motion.

Apple frames design as serving four human needs: safety/predictability, understanding, achievement, and joy.

---

## 1. Response — Kill Latency
- The moment lag appears, directness falls off a cliff.
- Respond on pointer-down/press, not only on release:
```css
/* Feedback lives on the press, and it's instant */
.button:active {
  transform: scale(0.97);
  transition: transform 100ms ease-out;
}
```
- Audit debounces, artificial timers, and input delays. Feedback must be continuous.

---

## 2. Direct Manipulation — 1:1 Tracking
- Touch and content move together.
- Use Pointer Events with `setPointerCapture`.
- Respect the grab offset from where the user touched.

---

## 3. Interruptibility
- Every animation must be interruptible and redirectable at any moment.
- Never lock out input during a transition.
- Animate from the live presentation value, never the target value.

---

## 4. Behavior Over Animation — Use Springs
- Replace fixed-duration easing with springs.
- Apple's two parameters:
  - **Damping ratio**: controls overshoot (1.0 = critically damped, no bounce).
  - **Response**: how quickly the value reaches the target (0.3s - 0.4s for UI).
- Default: Damping 1.0 (critically damped, elegant, calm). Add slight bounce (~0.8) only for momentum gestures.

---

## 5. Spatial Consistency & Anchored Origins
- Enter and exit along the same path.
- Anchor interactions to their trigger source (`transform-origin`).
- Mirror easing on reversible transitions.

---

## 6. Materials & Depth — Translucency Conveys Hierarchy
- Translucent materials as floating functional layers (`backdrop-filter: blur(20px) saturate(180%)`).
- Subtle light-catching top edge highlight (`border-top: 1px solid rgba(255, 255, 255, 0.4)` or hairline border).
- Material weight encodes hierarchy: darker/heavier for structure, lighter for actionable chrome.

---

## 7. Typography — Optical Sizing, Tracking, Leading
- **Tracking (letter-spacing)**: Large display headings want negative tracking (`-0.02em` to `-0.03em`), small badges want slightly positive tracking (`+0.02em` to `+0.05em`).
- **Leading (line-height)**: Inverse to size. Tight leading on large headings (`1.05` to `1.15`), comfortable leading on body (`1.5` to `1.65`).
- Emphasize with weight and contrast before size alone.

---

## 8. Reduced Motion & Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
@media (prefers-reduced-transparency: reduce) {
  .translucent-surface {
    background-color: var(--solid-surface) !important;
    backdrop-filter: none !important;
  }
}
```
