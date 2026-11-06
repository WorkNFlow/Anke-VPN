---
name: 21st-and-library-integration
description: Seamlessly integrate external UI components (from 21st.dev, React Bits, Aceternity UI, Magic UI, shadcn/ui) into an existing project. Refactors colors, typography, borders, and motion to match the project's DESIGN.md so the component never looks like a disconnected alien element.
---

# 21st.dev & UI Component Library Integration

## Overview
When students copy stunning components from **21st.dev**, **React Bits**, **Aceternity UI**, or **shadcn/ui**, the biggest beginner mistake is pasting them "as-is". This results in mismatched fonts, foreign purple/blue accent colors, clashing border radii, broken dark modes, and disjointed page hierarchy.

This skill enforces strict rules to **harmonize any external component into the host project's visual identity and codebase**.

---

## The Golden Law of Component Integration

> **NEVER paste a third-party component raw.**  
> Every imported component must be refactored to consume the host project's tokens, typography, spacing rhythm, and motion curves defined in `design.md` or `globals.css`.

---

## 4-Step Harmonization Workflow

### Step 1: Scan Host Project Design Tokens
Before touching the imported component, inspect the project's design system:
1. **Typography**: What are the heading and body font classes? (e.g., `font-sans`, `font-display`, custom `@font-face`).
2. **Color Tokens**: Check CSS variables in `globals.css` / `index.css` (e.g., `hsl(var(--primary))`, `bg-background`, `text-foreground`, `border-border`).
3. **Corner Radii**: What is the dominant radius? (`rounded-2xl`, `rounded-xl`, or flat `rounded-none`).
4. **Atmosphere / Aesthetic**: Is the site warm editorial, high-end Apple/Linear dark glass, or brutalist?

---

### Step 2: Refactor Colors & Eliminating Hardcoded Values
Look for hardcoded values inside the imported component and replace them immediately:

| Hardcoded in 21st.dev / Template | Replace With Host Token | Why |
|---|---|---|
| `#000000`, `#ffffff`, `#09090b` | `bg-background`, `text-foreground`, `bg-card` | Ensures clean Dark/Light mode support |
| `#6366f1` (Indigo), `#3b82f6` (Blue) | `bg-primary`, `text-primary`, `ring-primary` | Matches project brand identity |
| `border-gray-200`, `border-zinc-800` | `border-border` or `border-white/10` | Eliminates mismatched divider lines |
| Arbitrary dropshadows (`shadow-xl`) | Project ambient shadow or `shadow-[var(--shadow)]` | Prevents harsh dirty shadows |

---

### Step 3: Align Typography & Shape
1. **Strip Foreign Font Families**: If the component imported `font-['Inter']` or inline Google fonts, remove them and apply project font utilities.
2. **Align Corner Radii**: If the project uses soft `rounded-3xl` cards, change the component's `rounded-lg` or `rounded-md` to match the project's concentric radii.
3. **Icon Set Consistency**: If the project uses Lucide icons with `stroke-width={1.5}`, do not introduce heavy FontAwesome or filled icons from the component snippet. Replace with the project's icon library.

---

### Step 4: Motion & Physics Alignment
Components from 21st.dev often feature intense Framer Motion animations. Tune them to match the site's tempo:
1. **Duration & Easing**: If the rest of the site uses snappy `200ms ease-out`, adjust the imported spring damping/stiffness so it doesn't drag or bounce jarringly.
2. **Reduced Motion**: Wrap motion components with `@media (prefers-reduced-motion)` or Framer Motion's `useReducedMotion()`.
3. **Z-Index Quarantine**: Check `z-[999]` or high z-indexes in tooltips/popovers to ensure they don't break sticky headers or modal dialogs.

---

## Code Example: Before & After Harmonization

### Before (Raw 21st.dev snippet pasted into project)
```tsx
// ❌ Clashes with project: hardcoded purple, foreign font, fixed black bg, rigid radius
export function GlowingCard({ title, desc }) {
  return (
    <div className="bg-[#0f0f11] font-['Inter'] p-6 rounded-lg border border-purple-500/20 shadow-2xl hover:border-purple-500">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 mt-2">{desc}</p>
      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded">
        Explore
      </button>
    </div>
  );
}
```

### After (Harmonized with host project)
```tsx
// ✅ Blends seamlessly: uses CSS variables, project radii, brand font, and concentric borders
import { ArrowRight } from "lucide-react";

export function GlowingCard({ title, desc }) {
  return (
    <div className="group relative bg-card text-card-foreground p-6 rounded-2xl border border-border/60 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md">
      <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{desc}</p>
      <button className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98]">
        Explore
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
```

---

## Integration Checklist
- [ ] Were all hardcoded hex colors and arbitrary gradients converted to project CSS variables?
- [ ] Are corner radii aligned with the rest of the application?
- [ ] Are fonts and icons using the project's standard packages?
- [ ] Does the component behave responsively on mobile without triggering horizontal overflow?
- [ ] Does it look balanced in both Light and Dark modes?
