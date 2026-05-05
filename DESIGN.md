# Design Brief

## Direction

Warm Analog Refined — a service booking platform with cream-and-teal aesthetics that feels professional, approachable, and trustworthy.

## Tone

Refined minimalism; elegant but approachable. Deliberately avoids corporate coldness while maintaining the professionalism expected of a service business.

## Differentiation

Warm cream background paired with deep teal primary accent creates a distinctive, luxury-yet-approachable visual identity unusual for service booking platforms.

## Color Palette

| Token              | OKLCH            | Role                            |
| ------------------ | ---------------- | ------------------------------- |
| background         | 0.96 0.015 75    | Warm cream base                 |
| foreground         | 0.2 0.03 50      | Warm dark text                  |
| card               | 1.0 0.0 0        | Pure white surfaces             |
| primary            | 0.42 0.14 240    | Deep teal buttons & focus       |
| accent             | 0.72 0.17 70     | Warm amber highlights           |
| muted              | 0.92 0.02 75     | Secondary backgrounds           |
| destructive        | 0.5 0.2 25       | Cancel/delete actions           |
| border             | 0.88 0.025 75    | Light warm borders              |

## Typography

- Display: Lora (serif) — headings, hero text, section titles
- Body: General Sans (sans-serif) — paragraphs, labels, form text
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Gentle elevation via subtle shadows and layered background tones; no drop shadows, instead relying on background color differentiation and minimal borders.

## Structural Zones

| Zone    | Background       | Border                | Notes                                    |
| ------- | ---------------- | --------------------- | ---------------------------------------- |
| Header  | card (white)     | border (warm light)   | Brand, provider auth area                |
| Content | background (cream) | —                   | Alternate muted for sections             |
| Footer  | secondary (light cream) | border (warm light) | Links, legal, minimal visual weight      |

## Spacing & Rhythm

Spacious layout with 2rem gaps between major sections, card padding 1.5–2rem, micro-spacing 0.5–1rem. Generous whitespace builds trust and clarity.

## Component Patterns

- Buttons: Teal primary (`bg-primary text-primary-foreground`), subtle hover via opacity, rounded-lg (6px)
- Cards: White background with light warm border, rounded-lg, minimal shadow
- Badges: Accent (amber) for secondary status, primary (teal) for active, muted for inactive
- Form inputs: Light cream background, warm border, teal focus ring

## Motion

- Entrance: Fade-in over 0.3s on page load
- Hover: Button opacity 0.9 with color transition smooth
- Decorative: Subtle floating on hover for service cards

## Constraints

- No vibrant saturated colors; all accents use warm tones for cohesion
- Maintain AA+ contrast in all light/dark combos
- Radii consistent at 6px (subtle, professional)
- No drop shadows; use color layering and borders

## Signature Detail

Warm cream background with deep teal primary and amber accent — a distinctive, professional palette that avoids service industry clichés while conveying trustworthiness and refinement.
