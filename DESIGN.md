# Design Brief

## Purpose & Context
Performance-driven e-commerce storefront for protein and gym supplements. Target: fitness enthusiasts seeking premium, high-protein products with clear nutritional transparency.

## Tone & Aesthetic
Energetic yet refined. Precision-focused, modern fitness identity. Sharp corners, bold primaries, minimal ornamentation. Confidence through clarity over decoration.

## Color Palette

| Name | Role | Light | Dark |
|------|------|-------|------|
| Primary (Electric Blue-Teal) | CTAs, focus states | `0.55 0.18 250` | `0.68 0.19 250` |
| Accent (Electric Lime) | Highlights, badges, protein % | `0.7 0.22 130` | `0.78 0.24 130` |
| Secondary (Warm Sand) | Supporting context, inputs | `0.8 0.06 90` | `0.7 0.06 90` |
| Destructive (Red) | Errors, remove actions | `0.58 0.19 25` | `0.62 0.22 25` |
| Background | Page canvas | `0.98 0 0` | `0.11 0 0` |
| Foreground | Primary text | `0.12 0 0` | `0.96 0 0` |

## Typography
- **Display**: General Sans (bold, geometric, athletic brand presence)
- **Body**: DM Sans (clean, legible, modern sans-serif)
- **Mono**: Geist Mono (technical specifications, code-like UX)

## Shape Language
- Border-radius: 0.375rem (sharp, modern tech aesthetic)
- Corners on cards: crisp, minimal (no rounded excess)
- Minimal shadows: elevation through subtle lift (2–8px, low opacity)

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | Sticky dark card, border-bottom | Navigation, logo, cart icon, search |
| Sidebar | Light muted `bg-sidebar`, borders | Filters: category checkboxes, price range, protein % |
| Product Grid | Bordered cards, image-first | 3–4 col responsive grid with product info |
| Footer | Dark muted `bg-card`, border-top | Links, legal, brand info |

## Component Patterns
- **Product Card**: Image → protein badge (accent) → brand/name → price → add-to-cart (primary)
- **Filter Checkbox**: Label + checkbox, hover state on secondary
- **Button Hierarchy**: Primary (electric teal) for add-to-cart; secondary (sand) for view/learn; destructive (red) for remove
- **Badge**: Accent background, small text, tight padding (protein %, new, bestseller)

## Motion & Transitions
- Standard smooth transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Button hover: subtle lift (shadow-lift), no rotate/scale
- Cart badge: pulse on add (optional, if performance permits)

## Layout Constraints
- Mobile-first responsive (sm: 320px, md: 768px, lg: 1024px)
- Container max-width: 1400px
- Sidebar sticky on md+ viewports

## Signature Detail
Protein % displayed as electric lime badge on every product card — this is the primary differentiator in supplement commerce. Badge drives immediate product scanning.

## Constraints & Anti-Patterns
- No gradients (except in background data viz)
- No rounded corners >8px (maintain sharp, modern feel)
- No scattered animations (only smooth transitions & focus states)
- No stock/low-stock blur overlays (use clear badge instead)
- No generic e-commerce clichés (warm tones, soft shadows)
