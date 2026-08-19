# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Dashboard readability preference

For this performance dashboard, favor a larger, presentation-friendly desktop scale: readable 12–16px labels, prominent KPI values, and generously sized charts/cards over a dense compact clone. The user explicitly asked to increase text and visual proportions on 2026-07-20.

## Dashboard visual preference

Favor a restrained, professional enterprise-dashboard look: pale grey canvas, white cards with soft borders/shadows, a single calm blue primary color, and minimal decorative elements. Preserve the current information architecture while refining hierarchy and whitespace.

Use a polished, presentation-ready finish: consistent section rhythm, light data-card dividers, and subtle hover elevation only where it reinforces an interactive card.

## P/S Line Performance Report

The P/S line performance report follows the platform-performance drill-down convention. P-line hierarchy is region to P5 to P4 to P3, with P3 binding views for S3/S2 contributions. S-line hierarchy is S6 to S3 to S2 to S1, with service member detail available from S2.

## Default landing page

The app should open directly to `P线业绩统计报表` by default instead of the homepage dashboard.
