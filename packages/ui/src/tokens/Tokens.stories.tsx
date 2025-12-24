import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { colors, typography, radius, elevation } from './index';
import { spacing as spacingRaw } from './spacing'; // Use raw for display in Storybook
import type { ElevationLevel } from './elevation';
import { Card, SummaryCard } from '../components/Card';
import { List, ListItem } from '../components/List';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { PropsTable } from './PropsTable';
import { codeBlockStyles } from '../components/storybook/codeBlockStyles';

const meta: Meta = {
  title: 'Design Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Helper component for color swatches
const ColorSwatch: React.FC<{ name: string; value: string; cssVariable: string }> = ({
  name,
  value,
  cssVariable,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${cssVariable})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      elevationLevel={1}
      interactive
      onClick={handleCopy}
      style={{
        cursor: 'pointer',
        padding: '0',
        overflow: 'hidden',
      }}
      title="Click to copy CSS variable"
    >
      <div
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: value,
        }}
      />
      <div
        style={{
          padding: 'var(--ai-spacing-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600 }}>
          {name}
          {copied && (
            <span style={{ marginLeft: '8px', color: 'var(--ai-color-accent-green)' }}>✓</span>
          )}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--ai-color-text-secondary)',
            fontFamily: 'monospace',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--ai-color-text-tertiary)',
            fontFamily: 'monospace',
          }}
        >
          {cssVariable}
        </div>
      </div>
    </Card>
  );
};

const COLOR_CATEGORY_TO_VAR_PREFIX: Record<string, string> = {
  background: 'bg',
  text: 'text',
  icon: 'icon',
  accent: 'accent',
  outline: 'outline',
};

// Colors Story
const ColorsComponent: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>Color Tokens</h1>

      {/* Color Swatches - shown first */}
      <section style={{ marginBottom: '64px' }}>
        <p style={{ marginBottom: '24px', color: 'var(--ai-color-text-secondary)' }}>
          Select a color below to copy its CSS variable. Light and dark theme variations are
          displayed side by side for easy reference.
        </p>

        <div style={{ display: 'grid', gap: '48px' }}>
          {(['light', 'dark'] as const).map((theme) => (
            <section key={theme}>
              <header
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}
              >
                <div>
                  <h2 style={{ marginBottom: '8px', textTransform: 'capitalize' }}>
                    {theme} theme
                  </h2>
                  <p
                    style={{
                      color: 'var(--ai-color-text-secondary)',
                      margin: 0,
                      fontFamily: 'monospace',
                    }}
                  >
                    Palette: colors.{theme}
                  </p>
                </div>
              </header>

              {Object.entries(colors[theme]).map(([category, categoryValue]) => {
                // Skip complex nested objects like 'state'
                if (
                  category === 'state' ||
                  (typeof categoryValue === 'object' &&
                    !('primary' in categoryValue) &&
                    !('light' in categoryValue) &&
                    !('blue' in categoryValue))
                ) {
                  return null;
                }

                return (
                  <div key={`${theme}-${category}`} style={{ marginBottom: '32px' }}>
                    <h3 style={{ marginBottom: '16px', textTransform: 'capitalize' }}>
                      {category}
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '24px',
                      }}
                    >
                      {(() => {
                        const prefix =
                          COLOR_CATEGORY_TO_VAR_PREFIX[category] ?? category.replace(/\s+/g, '-');
                        const entries =
                          typeof categoryValue === 'string'
                            ? [['value', categoryValue]]
                            : Object.entries(categoryValue as Record<string, string>);

                        return entries.map(([name, value]) => {
                          // Skip if value is an object
                          if (typeof value === 'object') {
                            return null;
                          }

                          const isSingleValue = typeof categoryValue === 'string';
                          const cssVariable = isSingleValue
                            ? `--ai-color-${prefix}`
                            : `--ai-color-${prefix}-${name}`;
                          const displayName = isSingleValue ? category : name;

                          return (
                            <ColorSwatch
                              key={`${theme}-${category}-${name}`}
                              name={displayName}
                              value={value as string}
                              cssVariable={cssVariable}
                            />
                          );
                        });
                      })()}
                    </div>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Usage</h2>
        <pre style={{ ...codeBlockStyles.primary, marginBottom: '24px', whiteSpace: 'pre' }}>
          <code>{`/* In your CSS */
color: var(--ai-color-text-primary);
background: var(--ai-color-bg-primary);
border: 1px solid var(--ai-color-outline-default);`}</code>
        </pre>
      </section>

      {/* Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Reference</h2>
        <PropsTable
          rows={[
            {
              name: 'background',
              description:
                'Primary, secondary, and tertiary background colors for surfaces and containers',
              theme: 'Light & Dark',
            },
            {
              name: 'text',
              description:
                'Primary, secondary, and tertiary text colors with varying contrast levels',
              theme: 'Light & Dark',
            },
            {
              name: 'icon',
              description: 'Icon colors that match text hierarchy',
              theme: 'Light & Dark',
            },
            {
              name: 'accent',
              description:
                'Accent colors (blue, green, orange) for interactive elements and status',
              theme: 'Light & Dark',
            },
            {
              name: 'outline',
              description: 'Border and divider colors',
              theme: 'Light & Dark',
            },
          ]}
        />
      </section>
    </div>
  );
};

export const Colors: StoryObj = {
  render: () => <ColorsComponent />,
};

// Typography Story
const TypographyComponent = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`var(--ai-font-${name.toLowerCase()})`);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>Typography Tokens</h1>

      {/* Visual Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <p style={{ marginBottom: '24px', color: 'var(--ai-color-text-secondary)' }}>
          Select a typography style below to copy its CSS variable. Each sample displays the actual
          size, weight, and spacing for easy reference.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '24px',
          }}
        >
          {Object.entries(typography).map(([name, value]) => (
            <Card
              key={name}
              elevationLevel={1}
              interactive
              onClick={() => handleCopy(name)}
              style={{ cursor: 'pointer' }}
              title="Click to copy CSS variable"
            >
              <div
                style={{
                  fontSize: value.fontSize,
                  lineHeight: value.lineHeight,
                  fontWeight: value.fontWeight,
                  letterSpacing: value.letterSpacing,
                  marginBottom: '12px',
                }}
              >
                The quick brown fox
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--ai-color-text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '14px' }}>
                  {name}
                  {copied === name && (
                    <span style={{ marginLeft: '8px', color: 'var(--ai-color-accent-green)' }}>
                      ✓
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    fontSize: '11px',
                  }}
                >
                  <span>{value.fontSize}</span>
                  <span>·</span>
                  <span>{value.lineHeight}</span>
                  <span>·</span>
                  <span>weight {value.fontWeight}</span>
                  <span>·</span>
                  <span>letter {value.letterSpacing}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Usage</h2>
        <pre style={{ ...codeBlockStyles.primary, marginBottom: '24px', whiteSpace: 'pre' }}>
          <code>{`/* Method 1: Direct class usage (RECOMMENDED - Simple & Clear) */
<h1 className="ai-heading1">Page Title</h1>
<p className="ai-body">Body text</p>
<span className="ai-caption">Small caption</span>

/* Method 2: Type-safe with TypeScript (RECOMMENDED - Best DX) */
import { typography } from '@ainativekit/ui/tokens';

<h1 className={typography.heading1.className}>Title</h1>
<p className={typography.body.className}>Body text</p>

/* Method 3: CSS Variables (For custom combinations) */
.custom-text {
  font-size: var(--ai-font-size-body);
  line-height: var(--ai-line-height-body);
  font-weight: var(--ai-font-weight-body);
  letter-spacing: var(--ai-letter-spacing-body);
  /* + your custom styles */
}

/* Method 4: JavaScript/TypeScript token value access */
import { typography } from '@ainativekit/ui/tokens';
const fontSize = typography.heading1.fontSize; // '36px'
const className = typography.heading1.className; // 'ai-heading1'`}</code>
        </pre>
      </section>

      {/* Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Reference</h2>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'heading1',
              description:
                'Large headings and page titles (36px, weight 600, -0.1px letter spacing)',
            },
            {
              name: 'heading2',
              description:
                'Section headings and major subsections (24px, weight 600, -0.25px letter spacing)',
            },
            {
              name: 'heading3',
              description:
                'Subsection headings and card titles (18px, weight 600, -0.45px letter spacing)',
            },
            {
              name: 'body',
              description:
                'Standard body text and paragraphs (16px, weight 400, -0.4px letter spacing)',
            },
            {
              name: 'bodyEmph',
              description:
                'Emphasized body text with increased weight (16px, weight 600, -0.4px letter spacing)',
            },
            {
              name: 'bodySmall',
              description:
                'Smaller body text for secondary content (14px, weight 400, -0.3px letter spacing)',
            },
            {
              name: 'bodySmallEmph',
              description: 'Emphasized small text (14px, weight 600, -0.3px letter spacing)',
            },
            {
              name: 'caption',
              description:
                'Captions, labels, and metadata (12px, weight 400, -0.1px letter spacing)',
            },
            {
              name: 'captionEmph',
              description:
                'Emphasized captions and labels (12px, weight 600, -0.1px letter spacing)',
            },
            {
              name: 'button',
              description:
                'Button labels and interactive controls (15px, weight 500, -0.24px letter spacing)',
            },
            {
              name: 'badge',
              description:
                'Badge labels and status indicators (14px, weight 600, 0px letter spacing)',
            },
          ]}
        />
      </section>
    </div>
  );
};

export const Typography: StoryObj = {
  render: () => <TypographyComponent />,
};

// Spacing Story
const spacingOrder: Array<keyof typeof spacingRaw> = [64, 32, 24, 20, 16, 12, 10, 8, 6, 4, 2, 1, 0];

const SpacingComponent = () => {
  const [copied, setCopied] = React.useState<number | null>(null);

  const handleCopy = (name: number) => {
    navigator.clipboard.writeText(`var(--ai-spacing-${name})`);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>Spacing Tokens</h1>

      {/* Visual Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <p style={{ marginBottom: '24px', color: 'var(--ai-color-text-secondary)' }}>
          Select a spacing value below to copy its CSS variable. Visual representation shows the
          actual size for easy reference.
        </p>

        <div
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          }}
        >
          {spacingOrder.map((name) => {
            const value = spacingRaw[name];
            const numeric = parseInt(value, 10);
            const borderWidth = numeric > 2 ? 2 : 1;
            const containerSize = 120;
            const squareSize = Math.max(
              borderWidth * 2,
              Math.min(numeric, containerSize - borderWidth * 2)
            );
            const accent = 'var(--ai-color-accent-blue)';
            const fill = 'rgba(2, 133, 255, 0.12)';

            return (
              <Card
                key={name}
                elevationLevel={1}
                interactive
                onClick={() => handleCopy(name)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
                title="Click to copy CSS variable"
              >
                <div
                  style={{
                    width: `${containerSize}px`,
                    height: `${containerSize}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {numeric === 0 ? (
                    <div style={{ fontSize: '24px', color: 'var(--ai-color-text-tertiary)' }}>
                      ∅
                    </div>
                  ) : numeric <= 2 ? (
                    <div
                      style={{
                        width: `${numeric}px`,
                        height: '2px',
                        backgroundColor: accent,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: `${squareSize}px`,
                        height: `${squareSize}px`,
                        backgroundColor: fill,
                        border: `${borderWidth}px solid ${accent}`,
                        borderRadius: '0px',
                      }}
                    />
                  )}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>
                    {value}
                    {copied === name && (
                      <span style={{ marginLeft: '8px', color: 'var(--ai-color-accent-green)' }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--ai-color-text-secondary)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {name}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Usage</h2>
        <pre style={{ ...codeBlockStyles.primary, marginBottom: '24px', whiteSpace: 'pre' }}>
          <code>{`/* Use spacing variables for consistent layout */
.container {
  padding: var(--ai-spacing-16); /* 32px */
  margin-bottom: var(--ai-spacing-8); /* 16px */
  gap: var(--ai-spacing-4); /* 8px */
}

/* For dynamic spacing in JavaScript/TypeScript */
import { spacing } from '@ainativekit/ui';
const padding = spacing[16]; // '32px'`}</code>
        </pre>
      </section>

      {/* Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Reference</h2>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: '0',
              description: 'Zero spacing - Use for removing space (0px)',
            },
            {
              name: '1',
              description: 'Minimal spacing for tight layouts (2px)',
            },
            {
              name: '2',
              description: 'Extra small spacing for subtle separation (4px)',
            },
            {
              name: '4',
              description: 'Small spacing for compact components (8px)',
            },
            {
              name: '6',
              description: 'Medium-small spacing for related elements (12px)',
            },
            {
              name: '8',
              description: 'Base spacing unit - Most common default (16px)',
            },
            {
              name: '10',
              description: 'Medium spacing for component padding (20px)',
            },
            {
              name: '12',
              description: 'Medium-large spacing for sections (24px)',
            },
            {
              name: '16',
              description: 'Large spacing for card padding and gaps (32px)',
            },
            {
              name: '20',
              description: 'Extra large spacing for major sections (40px)',
            },
            {
              name: '24',
              description: 'Very large spacing for page sections (48px)',
            },
            {
              name: '32',
              description: 'Extra extra large for major layouts (64px)',
            },
            {
              name: '64',
              description: 'Maximum spacing for page-level separation (128px)',
            },
          ]}
        />
      </section>
    </div>
  );
};

export const Spacing: StoryObj = {
  render: () => <SpacingComponent />,
};

// Radius Story
const RadiusComponent = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`var(--ai-radius-${name})`);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>Border Radius Tokens</h1>

      {/* Visual Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <p style={{ marginBottom: '24px', color: 'var(--ai-color-text-secondary)' }}>
          Select a radius value below to copy its CSS variable. Visual representation shows the
          actual curvature.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {Object.entries(radius).map(([name, value]) => (
            <Card
              key={name}
              elevationLevel={1}
              interactive
              onClick={() => handleCopy(name)}
              style={{
                cursor: 'pointer',
                padding: '0',
                overflow: 'hidden',
              }}
              title="Click to copy CSS variable"
            >
              <div
                style={{ padding: 'var(--ai-spacing-8) var(--ai-spacing-8) 0 var(--ai-spacing-8)' }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '120px',
                    backgroundColor: 'rgba(2, 133, 255, 0.08)',
                    border: '3px solid var(--ai-color-accent-blue)',
                    borderRadius: value,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div
                style={{
                  padding: 'var(--ai-spacing-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '14px' }}>
                  {name}
                  {copied === name && (
                    <span style={{ marginLeft: '8px', color: 'var(--ai-color-accent-green)' }}>
                      ✓
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--ai-color-text-secondary)',
                    fontFamily: 'monospace',
                  }}
                >
                  {value}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Usage</h2>
        <pre style={{ ...codeBlockStyles.primary, marginBottom: '24px', whiteSpace: 'pre' }}>
          <code>{`/* Use radius variables for consistent rounded corners */
.card {
  border-radius: var(--ai-radius-xl); /* 24px */
}

.button {
  border-radius: var(--ai-radius-full); /* fully rounded (pill) */
}

.input {
  border-radius: var(--ai-radius-base); /* 12px */
}

/* For dynamic radius in JavaScript/TypeScript */
import { radius } from '@ainativekit/ui';
const cardRadius = radius.xl; // '24px'`}</code>
        </pre>
      </section>

      {/* Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Reference</h2>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'none',
              description: 'No rounding - Sharp corners (0px)',
            },
            {
              name: 'sm',
              description: 'Small radius for subtle rounding (4px)',
            },
            {
              name: 'md',
              description: 'Medium radius for moderate rounding (8px)',
            },
            {
              name: 'base',
              description: 'Base radius - Default for most components (12px)',
            },
            {
              name: 'lg',
              description: 'Large radius for prominent rounding (16px)',
            },
            {
              name: 'xl',
              description: 'Extra large radius for cards and containers (24px)',
            },
            {
              name: 'full',
              description: 'Fully rounded - For circles and pill buttons (9999px)',
            },
          ]}
        />
      </section>
    </div>
  );
};

export const Radius: StoryObj = {
  render: () => <RadiusComponent />,
};

// Elevation Story
const ElevationComponent: React.FC = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (theme: 'light' | 'dark', level: ElevationLevel) => {
    const name = level.toString();
    navigator.clipboard.writeText(`var(--ai-elevation-${name}-shadow)`);
    setCopied(`${theme}-${name}`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '32px' }}>Elevation (Shadow) Tokens</h1>

      {/* Visual Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <p style={{ marginBottom: '24px', color: 'var(--ai-color-text-secondary)' }}>
          Select an elevation card to copy its CSS variable. Both light and dark themes are shown to
          compare how shadows and overlays combine at each elevation level.
        </p>

        <div style={{ display: 'grid', gap: '48px' }}>
          {(['light', 'dark'] as const).map((theme) => {
            const themeColors = colors[theme];

            return (
              <section key={theme}>
                <header style={{ marginBottom: '24px' }}>
                  <h2 style={{ textTransform: 'capitalize', marginBottom: '4px' }}>
                    {theme} theme
                  </h2>
                  <p style={{ margin: 0, color: 'var(--ai-color-text-secondary)' }}>
                    Surface: {themeColors.background.primary} · Text: {themeColors.text.primary}
                  </p>
                </header>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '32px',
                  }}
                >
                  {Object.entries(elevation).map(([name, value]) => {
                    const level = Number(name) as ElevationLevel;
                    const overlay = theme === 'dark' ? value.darkOverlay : value.lightOverlay;
                    const mixedSurface = `color-mix(in srgb, ${themeColors.background.primary} 88%, ${overlay})`;

                    return (
                      <div
                        key={`${theme}-${name}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleCopy(theme, level)}
                        title="Click to copy CSS variable"
                      >
                        <Card
                          elevationLevel={level}
                          border="default"
                          interactive={false}
                          style={{
                            width: '80%',
                            minHeight: '150px',
                            padding: 'var(--ai-spacing-12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: value.shadow,
                            background: mixedSurface,
                            color: themeColors.text.primary,
                            marginBottom: '8px',
                          }}
                        >
                          <span style={{ fontSize: '32px', fontWeight: 600 }}>{level}</span>
                        </Card>
                        <div style={{ fontWeight: 600 }}>
                          elevation-{level}
                          {copied === `${theme}-${level}` && (
                            <span
                              style={{ marginLeft: '8px', color: 'var(--ai-color-accent-green)' }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'var(--ai-color-text-secondary)',
                            fontFamily: 'monospace',
                            wordBreak: 'break-all',
                          }}
                        >
                          {value.shadow}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: 'var(--ai-color-text-tertiary)',
                            fontFamily: 'monospace',
                            marginTop: '4px',
                          }}
                        >
                          Overlay ({theme}): {overlay}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Usage</h2>
        <pre style={{ ...codeBlockStyles.primary, marginBottom: '24px', whiteSpace: 'pre' }}>
          <code>{`/* Method 1: Direct class usage (RECOMMENDED - Simple & Clear) */
<div className="ai-elevation-1">Card content</div>
<div className="ai-elevation-3">Dropdown menu</div>

/* Method 2: Type-safe with TypeScript (RECOMMENDED - Best DX) */
import { elevation } from '@ainativekit/ui/tokens';

<div className={elevation[1].className}>Card</div>
<div className={elevation[3].className}>Menu</div>

/* Method 3: Use elevation via Card component prop (RECOMMENDED for Cards) */
<Card elevationLevel={1}>Content</Card>
<Card elevationLevel={3}>Content</Card>

/* Method 4: CSS Variables (For custom background colors) */
.custom-card {
  /* Apply shadow only */
  box-shadow: var(--ai-elevation-1-shadow);
  /* Then set your custom background */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Or apply shadow + overlay to custom color */
.custom-tinted-card {
  box-shadow: var(--ai-elevation-2-shadow);
  background: color-mix(in srgb,
    #667eea 92%,
    var(--ai-elevation-2-overlay));
}

/* Method 5: JavaScript/TypeScript token value access */
import { elevation } from '@ainativekit/ui/tokens';
const shadow = elevation[1].shadow; // '0px 4px 16px rgba(0,0,0,0.05)'
const darkOverlay = elevation[1].darkOverlay; // 'rgba(255,255,255,0.05)'
const lightOverlay = elevation[1].lightOverlay; // 'rgba(0,0,0,0)'
const className = elevation[1].className; // 'ai-elevation-1'`}</code>
        </pre>
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ai-color-text-secondary)' }}>
          <strong>Note:</strong> Utility classes (.ai-elevation-*) now apply both shadow AND overlay
          (using bg-primary + overlay tint). For custom background colors, use Method 4 to manually
          apply shadow to your color.
        </p>
      </section>

      {/* Reference Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Reference</h2>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: '0',
              description: 'No elevation - Flat surface with no shadow',
            },
            {
              name: '1',
              description: 'Subtle elevation - Gentle shadow for cards and containers (default)',
            },
            {
              name: '2',
              description: 'Low elevation - Moderate shadow for interactive elements',
            },
            {
              name: '3',
              description: 'Medium elevation - Noticeable shadow for dropdowns and menus',
            },
            {
              name: '4',
              description: 'High elevation - Strong shadow for modals and dialogs',
            },
            {
              name: '5',
              description: 'Maximum elevation - Highest shadow for tooltips and overlays',
            },
          ]}
        />
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--ai-color-text-secondary)' }}>
          <strong>Note:</strong> Each elevation level includes both shadow and overlay values. The
          utility classes (.ai-elevation-*) apply both automatically using bg-primary + overlay
          tint. Dark theme uses white overlays to lighten elevated surfaces.
        </p>
      </section>
    </div>
  );
};

export const Elevation: StoryObj = {
  render: () => <ElevationComponent />,
};

// Token Helper Functions Component
const TokenHelpersComponent: React.FC = () => {
  const [copiedHelper, setCopiedHelper] = React.useState<string | null>(null);

  const handleCopyHelper = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopiedHelper(name);
    setTimeout(() => setCopiedHelper(null), 2000);
  };

  const helperExamples = [
    {
      name: 'cssVar.spacing()',
      description: 'Generate CSS variable for spacing',
      code: `import { cssVar } from '@ainativekit/ui/tokens';

// Returns CSS variable string
cssVar.spacing(4)   // 'var(--ai-spacing-4)'
cssVar.spacing(12)  // 'var(--ai-spacing-12)'
cssVar.spacing(24)  // 'var(--ai-spacing-24)'`,
      usage: `<div style={{
  padding: cssVar.spacing(12),
  gap: cssVar.spacing(6),
  marginBottom: cssVar.spacing(8)
}} />`,
    },
    {
      name: 'cssVar.color()',
      description: 'Generate CSS variable for colors',
      code: `import { cssVar } from '@ainativekit/ui/tokens';

// Returns CSS variable string
cssVar.color('text-primary')     // 'var(--ai-color-text-primary)'
cssVar.color('bg-secondary')     // 'var(--ai-color-bg-secondary)'
cssVar.color('accent-blue')      // 'var(--ai-color-accent-blue)'`,
      usage: `<div style={{
  color: cssVar.color('text-primary'),
  backgroundColor: cssVar.color('bg-secondary'),
  borderColor: cssVar.color('border-heavy')
}} />`,
    },
    {
      name: 'cssVar.radius()',
      description: 'Generate CSS variable for border radius',
      code: `import { cssVar } from '@ainativekit/ui/tokens';

// Returns CSS variable string
cssVar.radius('sm')    // 'var(--ai-radius-sm)'
cssVar.radius('base')  // 'var(--ai-radius-base)'
cssVar.radius('full')  // 'var(--ai-radius-full)'`,
      usage: `<div style={{
  borderRadius: cssVar.radius('base'),
  overflow: 'hidden'
}} />`,
    },
    {
      name: 'applyTypography()',
      description: 'Apply complete typography styles',
      code: `import { applyTypography } from '@ainativekit/ui/tokens';

// Returns complete CSS properties object
applyTypography('heading-lg')
// Returns: {
//   fontSize: '24px',
//   lineHeight: '32px',
//   fontWeight: 600,
//   letterSpacing: '-0.01em'
// }`,
      usage: `<h1 style={applyTypography('heading-lg')}>
  Page Title
</h1>

// Or spread into existing styles
<div style={{
  ...applyTypography('body'),
  color: cssVar.color('text-secondary')
}} />`,
    },
    {
      name: 'applyElevation()',
      description: 'Apply elevation shadow and overlay',
      code: `import { applyElevation } from '@ainativekit/ui/tokens';

// Returns shadow and overlay CSS properties
applyElevation(2)
// Returns: {
//   boxShadow: 'var(--ai-elevation-2-shadow)',
//   '--card-overlay-light': 'var(--ai-elevation-2-overlay-light)',
//   '--card-overlay-dark': 'var(--ai-elevation-2-overlay-dark)'
// }`,
      usage: `<Card style={applyElevation(2)}>
  Elevated content
</Card>

// Or with dynamic elevation
const [hovered, setHovered] = useState(false);
<div
  style={applyElevation(hovered ? 3 : 1)}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
/>`,
    },
    {
      name: 'cssVar.opacity()',
      description: 'Generate CSS variable for opacity presets',
      code: `import { cssVar } from '@ainativekit/ui/tokens';

// Returns CSS variable string
cssVar.opacity('subtle')   // 'var(--ai-opacity-subtle)'
cssVar.opacity('muted')    // 'var(--ai-opacity-muted)'
cssVar.opacity('disabled') // 'var(--ai-opacity-disabled)'`,
      usage: `<div style={{
  opacity: cssVar.opacity('subtle')
}} />

// For disabled states
<button
  disabled
  style={{ opacity: cssVar.opacity('disabled') }}
/>`,
    },
    {
      name: 'varWithFallback()',
      description: 'CSS variable with fallback value',
      code: `import { varWithFallback } from '@ainativekit/ui/tokens';

// Provides fallback if CSS variable not defined
varWithFallback('--custom-color', '#000000')
// Returns: 'var(--custom-color, #000000)'`,
      usage: `<div style={{
  color: varWithFallback('--brand-color', '#007AFF')
}} />`,
    },
    {
      name: 'Direct Token Values',
      description: 'Access raw token values directly',
      code: `import { spacing, colors, typography, radius } from '@ainativekit/ui/tokens';

// Direct access to values
spacing[16]              // '32px'
colors.light.text.primary  // '#1a1a1a'
typography.heading1.fontSize // '36px'
radius.base              // '8px'`,
      usage: `// Use when you need the actual value, not CSS variable
const CARD_PADDING = spacing[12]; // '24px'

// Useful for calculations
const doubleSpacing = parseInt(spacing[8]) * 2 + 'px';

// Or for non-CSS contexts
console.log(\`Font size: \${typography.body.fontSize}\`);`,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '8px' }}>Token Helper Functions</h1>
      <p style={{ marginBottom: '32px', color: 'var(--ai-color-text-secondary)' }}>
        Utility functions for using design tokens in TypeScript/React components. These helpers
        provide type-safe access to tokens with IDE autocomplete.
      </p>

      {/* Important Note */}
      <div
        style={{
          padding: '16px',
          marginBottom: '32px',
          backgroundColor: 'var(--ai-color-accent-blue)',
          color: 'white',
          borderRadius: 'var(--ai-radius-base)',
        }}
      >
        <strong>Important:</strong> These helpers are for TypeScript/JSX only. In CSS modules, use
        CSS variables directly: <code style={{ opacity: 0.9 }}>var(--ai-spacing-4)</code>
      </div>

      {/* Helper Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {helperExamples.map((helper) => (
          <div
            key={helper.name}
            style={{
              padding: '24px',
              backgroundColor: 'var(--ai-color-bg-secondary)',
              borderRadius: 'var(--ai-radius-base)',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ marginBottom: '4px', fontSize: '18px', fontWeight: 600 }}>
                {helper.name}
              </h3>
              <p style={{ color: 'var(--ai-color-text-secondary)', fontSize: '14px' }}>
                {helper.description}
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7 }}>
                  Import & Basic Usage:
                </strong>
              </div>
              <div
                style={{
                  position: 'relative',
                  padding: '12px',
                  backgroundColor: 'var(--ai-color-bg-tertiary)',
                  borderRadius: 'var(--ai-radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }}
              >
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  <code>{helper.code}</code>
                </pre>
                <button
                  onClick={() => handleCopyHelper(helper.code, helper.name + '-import')}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    backgroundColor: 'var(--ai-color-bg-primary)',
                    border: '1px solid var(--ai-color-border-light)',
                    borderRadius: 'var(--ai-radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  {copiedHelper === helper.name + '-import' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div>
              <div style={{ marginBottom: '8px' }}>
                <strong style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7 }}>
                  React/JSX Example:
                </strong>
              </div>
              <div
                style={{
                  position: 'relative',
                  padding: '12px',
                  backgroundColor: 'var(--ai-color-bg-tertiary)',
                  borderRadius: 'var(--ai-radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                }}
              >
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  <code>{helper.usage}</code>
                </pre>
                <button
                  onClick={() => handleCopyHelper(helper.usage, helper.name + '-usage')}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    backgroundColor: 'var(--ai-color-bg-primary)',
                    border: '1px solid var(--ai-color-border-light)',
                    borderRadius: 'var(--ai-radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  {copiedHelper === helper.name + '-usage' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* When to Use Which Approach */}
      <section style={{ marginTop: '48px' }}>
        <h2 style={{ marginBottom: '16px' }}>When to Use Each Approach</h2>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--ai-color-bg-secondary)',
              borderRadius: 'var(--ai-radius-base)',
            }}
          >
            <h3
              style={{
                marginBottom: '8px',
                fontSize: '16px',
                color: 'var(--ai-color-accent-green)',
              }}
            >
              ✅ Use CSS Variables in CSS Modules
            </h3>
            <code
              style={{
                fontSize: '13px',
                backgroundColor: 'var(--ai-color-bg-tertiary)',
                padding: '8px',
                borderRadius: '4px',
                display: 'block',
              }}
            >
              {`.button { gap: var(--ai-spacing-4); }`}
            </code>
            <p
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color: 'var(--ai-color-text-secondary)',
              }}
            >
              Best for static styles, better performance, theme-aware
            </p>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--ai-color-bg-secondary)',
              borderRadius: 'var(--ai-radius-base)',
            }}
          >
            <h3
              style={{
                marginBottom: '8px',
                fontSize: '16px',
                color: 'var(--ai-color-accent-blue)',
              }}
            >
              ℹ️ Use Helpers in TypeScript/JSX
            </h3>
            <code
              style={{
                fontSize: '13px',
                backgroundColor: 'var(--ai-color-bg-tertiary)',
                padding: '8px',
                borderRadius: '4px',
                display: 'block',
              }}
            >
              {`style={{ gap: cssVar.spacing(4) }}`}
            </code>
            <p
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color: 'var(--ai-color-text-secondary)',
              }}
            >
              Best for inline styles, dynamic values, type safety with autocomplete
            </p>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--ai-color-bg-secondary)',
              borderRadius: 'var(--ai-radius-base)',
            }}
          >
            <h3
              style={{
                marginBottom: '8px',
                fontSize: '16px',
                color: 'var(--ai-color-text-tertiary)',
              }}
            >
              🔧 Use Direct Values for Calculations
            </h3>
            <code
              style={{
                fontSize: '13px',
                backgroundColor: 'var(--ai-color-bg-tertiary)',
                padding: '8px',
                borderRadius: '4px',
                display: 'block',
              }}
            >
              {`const padding = spacing[16]; // '32px'`}
            </code>
            <p
              style={{
                marginTop: '8px',
                fontSize: '14px',
                color: 'var(--ai-color-text-secondary)',
              }}
            >
              Best for JavaScript calculations, non-CSS contexts, build-time values
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const TokenHelpers: StoryObj = {
  render: () => <TokenHelpersComponent />,
};

// Responsive Breakpoints Component
const ResponsiveBreakpointsComponent: React.FC = () => {
  const pizzaPlaces = [
    {
      id: '1',
      name: "Tony's Pizza Napoletana",
      city: 'North Beach',
      rating: 4.8,
      thumbnail:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
    },
    {
      id: '2',
      name: 'Golden Boy Pizza',
      city: 'North Beach',
      rating: 4.6,
      thumbnail:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
    },
  ];

  React.useEffect(() => {
    const updateViewportWidth = () => {
      const width = window.innerWidth;
      const viewportSpan = document.getElementById('viewport-width');
      const viewportSpanList = document.getElementById('viewport-width-list');
      if (viewportSpan) viewportSpan.textContent = String(width);
      if (viewportSpanList) viewportSpanList.textContent = String(width);
    };
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '100%' }}>
      <div style={{ marginBottom: 'var(--ai-spacing-24)' }}>
        <h1
          style={{
            fontSize: 'var(--ai-font-size-h2)',
            fontWeight: 'var(--ai-font-weight-h2)',
            marginBottom: 'var(--ai-spacing-8)',
          }}
        >
          Responsive Breakpoint Reference
        </h1>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          This guide shows how AINativeKit UI components respond at different viewport widths. Try
          resizing your browser to see the responsive behavior.
        </p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: 'var(--ai-spacing-16)',
            fontSize: 'var(--ai-font-size-body-small)',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: 'var(--ai-color-bg-secondary)',
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  textAlign: 'left',
                  fontWeight: 'var(--ai-font-weight-semibold)',
                  borderBottom: '2px solid var(--ai-color-border-default)',
                }}
              >
                Breakpoint
              </th>
              <th
                style={{
                  backgroundColor: 'var(--ai-color-bg-secondary)',
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  textAlign: 'left',
                  fontWeight: 'var(--ai-font-weight-semibold)',
                  borderBottom: '2px solid var(--ai-color-border-default)',
                }}
              >
                Value
              </th>
              <th
                style={{
                  backgroundColor: 'var(--ai-color-bg-secondary)',
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  textAlign: 'left',
                  fontWeight: 'var(--ai-font-weight-semibold)',
                  borderBottom: '2px solid var(--ai-color-border-default)',
                }}
              >
                Used By
              </th>
              <th
                style={{
                  backgroundColor: 'var(--ai-color-bg-secondary)',
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  textAlign: 'left',
                  fontWeight: 'var(--ai-font-weight-semibold)',
                  borderBottom: '2px solid var(--ai-color-border-default)',
                }}
              >
                Behavior
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <code>tablet</code>
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <code>640px</code>
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                List
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                Desktop layout active (ensures button is top-right at 768px ChatGPT widget width)
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <code>desktop</code>
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <code>768px</code>
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                Card, SummaryCard, Album
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                Button auto-width, optimized layouts (ChatGPT Desktop widget = 768px)
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <code>desktop-wide</code>
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <code>1024px</code>
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                FullscreenMap
              </td>
              <td
                style={{
                  padding: 'var(--ai-spacing-4) var(--ai-spacing-6)',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                Sidebar visible, fullscreen layouts for wide screens
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: 'var(--ai-spacing-24)' }}>
        <h2
          style={{
            fontSize: 'var(--ai-font-size-h2)',
            fontWeight: 'var(--ai-font-weight-h2)',
            marginBottom: 'var(--ai-spacing-8)',
          }}
        >
          SummaryCard - Button Width (768px breakpoint)
        </h2>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          At <strong>768px and above</strong>, buttons automatically switch from full-width to
          auto-width. This ensures optimal display in ChatGPT Desktop widgets (768px width).
        </p>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          <strong>Try this:</strong> Resize your browser below and above 768px to see the button
          width change.
        </p>

        <div
          style={{
            border: '2px solid var(--ai-color-border-default)',
            borderRadius: 'var(--ai-radius-xl)',
            padding: 'var(--ai-spacing-8)',
            marginBottom: 'var(--ai-spacing-12)',
            backgroundColor: 'var(--ai-color-bg-secondary)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--ai-font-size-caption)',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: 'var(--ai-spacing-4)',
              fontFamily: 'monospace',
            }}
          >
            Current viewport: <span id="viewport-width"></span>px (Button switches at ≥768px)
          </div>
          <div style={{ maxWidth: '360px' }}>
            <SummaryCard
              elevationLevel={1}
              images="https://persistent.oaistatic.com/pizzaz/pizzaz-1.png"
              title="Little Nona's"
              subtitle="1427 Via Campania, North Beach"
              badge="9.2"
              badgeVariant="soft"
              description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park."
              metadata={[
                { icon: 'star', label: '9.2 rating' },
                { icon: 'map-pin', label: 'North Beach' },
              ]}
              buttonText="Reserve Table"
              onButtonClick={() => alert('Reservation clicked!')}
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--ai-spacing-24)' }}>
        <h2
          style={{
            fontSize: 'var(--ai-font-size-h2)',
            fontWeight: 'var(--ai-font-weight-h2)',
            marginBottom: 'var(--ai-spacing-8)',
          }}
        >
          List - Layout Change (640px breakpoint)
        </h2>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          At <strong>640px and above</strong>, the List header button moves from bottom (mobile) to
          top-right (desktop). This ensures the desktop layout is active at 768px ChatGPT widget
          width.
        </p>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          <strong>Try this:</strong> Resize your browser below and above 640px to see the "Save
          List" button position change.
        </p>

        <div
          style={{
            border: '2px solid var(--ai-color-border-default)',
            borderRadius: 'var(--ai-radius-xl)',
            padding: 'var(--ai-spacing-8)',
            marginBottom: 'var(--ai-spacing-12)',
            backgroundColor: 'var(--ai-color-bg-secondary)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--ai-font-size-caption)',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: 'var(--ai-spacing-4)',
              fontFamily: 'monospace',
            }}
          >
            Current viewport: <span id="viewport-width-list"></span>px (Layout switches at ≥640px)
          </div>
          <List
            header={{
              title: 'Top Pizza Places',
              subtitle: 'Best pizzerias in San Francisco',
              thumbnail:
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
              action: (
                <Button color="primary" variant="solid">
                  Save List
                </Button>
              ),
            }}
            items={pizzaPlaces}
            renderItem={(place, index) => (
              <ListItem
                key={place.id}
                rank={index + 1}
                title={place.name}
                features={[{ icon: 'star', label: `${place.rating}` }]}
                media={place.thumbnail}
                mediaAlt={place.name}
                metadata={place.city}
                onClick={() => alert(`Selected ${place.name}`)}
                interactive
              />
            )}
          />
        </div>
      </div>

      <div style={{ marginBottom: 'var(--ai-spacing-24)' }}>
        <h2
          style={{
            fontSize: 'var(--ai-font-size-h2)',
            fontWeight: 'var(--ai-font-weight-h2)',
            marginBottom: 'var(--ai-spacing-8)',
          }}
        >
          ChatGPT Widget Strategy
        </h2>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          <strong>Key Insight:</strong> ChatGPT Desktop widgets are exactly 768px wide. Our
          breakpoint strategy ensures optimal display:
        </p>
        <ul
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            paddingLeft: 'var(--ai-spacing-16)',
            lineHeight: 1.8,
          }}
        >
          <li>
            <strong>List component</strong> uses 640px so it's in desktop mode at 768px (button in
            top-right)
          </li>
          <li>
            <strong>Card components</strong> use 768px to show auto-width buttons at ChatGPT widget
            size
          </li>
          <li>
            <strong>Map component</strong> uses 1024px for sidebar (fullscreen only on wide screens)
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: 'var(--ai-spacing-24)' }}>
        <h2
          style={{
            fontSize: 'var(--ai-font-size-h2)',
            fontWeight: 'var(--ai-font-weight-h2)',
            marginBottom: 'var(--ai-spacing-8)',
          }}
        >
          Implementation Notes
        </h2>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          <strong>Why hardcoded pixel values?</strong> CSS custom properties cannot be used in{' '}
          <code>@media</code> query conditions - this is a fundamental browser limitation. Our
          approach follows industry best practices (Tailwind CSS, Bootstrap, Material-UI).
        </p>
        <p
          style={{
            fontSize: 'var(--ai-font-size-body)',
            color: 'var(--ai-color-text-secondary)',
            marginBottom: 'var(--ai-spacing-12)',
            lineHeight: 1.6,
          }}
        >
          The design tokens in <code>tokens.css</code> serve as documentation and reference for
          developers:
        </p>
        <div
          style={{
            fontSize: 'var(--ai-font-size-body-small)',
            color: 'var(--ai-color-text-secondary)',
            fontFamily: 'monospace',
            backgroundColor: 'var(--ai-color-bg-tertiary)',
            padding: 'var(--ai-spacing-8)',
            borderRadius: 'var(--ai-radius-base)',
            overflowX: 'auto',
          }}
        >
          --ai-breakpoint-tablet: 640px;
          <br />
          --ai-breakpoint-desktop: 768px;
          <br />
          --ai-breakpoint-desktop-wide: 1024px;
        </div>
      </div>
    </div>
  );
};

export const ResponsiveBreakpoints: StoryObj = {
  render: () => <ResponsiveBreakpointsComponent />,
};
