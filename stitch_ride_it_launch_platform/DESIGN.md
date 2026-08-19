---
name: Kinetic Horizon
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fa'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: auto
  max-width: 1200px
---

## Brand & Style

The design system embodies a "Kinetic Horizon" aesthetic—a fusion of modern minimalism and premium mobility tech. It is designed to feel airy, efficient, and deeply trustworthy for users navigating vehicle rentals in an urban environment. 

The style is characterized by high-clarity interfaces, generous whitespace, and a sophisticated use of light. By prioritizing a "Modern Corporate" approach with subtle "Glassmorphism" accents, the UI evokes a sense of reliability and forward-thinking innovation. Every interaction should feel smooth and frictionless, mirroring the physical experience of a premium ride.

## Colors

The palette is anchored by a crisp, warm white surface that provides a premium, clean canvas. **Primary Blue (#3B82F6)** is used strategically for calls to action and active states, signaling motion and technology. 

- **Primary:** High-visibility blue for primary actions and brand presence.
- **Secondary:** A subtle violet-leaning blue used for secondary accents or data visualization.
- **Surfaces:** Use `#FAFAFA` for the main background to reduce eye strain while maintaining a bright feel. Use `#F3F4F6` for grouped content blocks, such as card containers or section dividers.
- **Typography:** Contrast is strictly enforced using Dark Charcoal for readability and Medium Gray for metadata and supporting descriptions.

## Typography

This design system utilizes a dual-font strategy. **Outfit** is used for headlines to provide a modern, geometric, and friendly character. **Inter** is used for all body copy and UI labels to ensure maximum legibility and a systematic, functional feel.

Headlines should use tight letter spacing to appear more "designed" and premium. Body text relies on a generous 1.5x line height to ensure information density never feels overwhelming during a quick rental checkout or vehicle search.

## Layout & Spacing

The layout follows a **Fluid-to-Fixed** hybrid model. On mobile devices, use a 4-column grid with 20px side margins. On desktop, the content is centered within a 1200px container using a 12-column grid.

The spacing rhythm is based on a **4px baseline grid**. Components should generally use `16px (md)` or `24px (lg)` padding to maintain an airy, premium feel. Vertical rhythm between sections should be significant (40px or 64px) to clearly demarcate different stages of the user journey.

## Elevation & Depth

Hierarchy is established through a combination of **Tonal Layers** and **Ambient Shadows**. Surfaces do not "float" aggressively; instead, they sit subtly above the background.

- **Level 0 (Background):** `#FAFAFA`
- **Level 1 (Cards/Inputs):** White (#FFFFFF) with a 1px border of `#E5E7EB`.
- **Level 2 (Active/Hover):** White (#FFFFFF) with a soft, diffused shadow: `0px 4px 20px rgba(31, 41, 55, 0.08)`.
- **Level 3 (Modals/Popovers):** White (#FFFFFF) with a deep, soft shadow: `0px 12px 32px rgba(31, 41, 55, 0.12)`.

Avoid harsh blacks in shadows; use the Charcoal text color at low opacities to ensure shadows feel integrated into the "warm" environment.

## Shapes

The design system utilizes a **Rounded** shape language to appear approachable and modern. The standard radius for primary elements like buttons and cards is `12px (0.75rem)`. 

Small components like checkboxes or tags should scale down to `4px` or `8px` to maintain visual proportion, while large hero sections or containers can scale up to `24px` for a softer, more organic look.

## Components

### Buttons
- **Primary:** Solid `#3B82F6` with white text. High-contrast, 12px radius, medium weight typography.
- **Secondary:** Ghost style with `#E5E7EB` border and `#1F2937` text.
- **State Changes:** On hover, primary buttons should shift slightly darker; on press, they should scale down to 98% for tactile feedback.

### Input Fields
- **Default:** White background, 1px border (`#E5E7EB`), 12px radius. 
- **Active State:** Border shifts to `#3B82F6` with a soft blue outer glow (2px spread).
- **Labels:** Always placed above the field in `label-md` style for clarity.

### Cards
- Vehicle cards should use a 1px border rather than a heavy shadow to maintain the "Minimal" aesthetic. 
- Use a 16px internal padding. Images should have a top-only 12px radius to sit flush with the card's top edge.

### Chips & Badges
- Used for vehicle status (e.g., "Available", "Low Fuel").
- Style: Subdued backgrounds (10% opacity of the accent color) with full-opacity text of the same hue.

### Mobility Specifics
- **Map Markers:** Circular with a 2px white border and a soft shadow. Use the Primary Blue for the active vehicle and Secondary Gray for others.
- **Booking Bar:** A fixed bottom sheet on mobile, using a Level 3 elevation to stay prominent above map views.