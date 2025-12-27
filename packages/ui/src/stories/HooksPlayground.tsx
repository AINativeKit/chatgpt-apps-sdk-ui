import React, { useEffect, useMemo } from 'react';
import {
  useDisplayMode,
  useMaxHeight,
  useOpenAiGlobal,
  useWidgetProps,
  useWidgetState,
  useTheme,
  SetGlobalsEvent,
  type DisplayMode,
  type OpenAiGlobals,
  type OpenAiApi,
} from '../hooks/openai';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Badge } from '@openai/apps-sdk-ui/components/Badge';
import { CodeBlock } from '@openai/apps-sdk-ui/components/CodeBlock';
import { Card } from '../components/Card';

type PlaygroundToolOutput = { message: string };

const ensureOpenAi = (): (OpenAiApi & OpenAiGlobals) | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!window.openai) {
    const base: OpenAiApi & OpenAiGlobals = {
      theme: 'light',
      userAgent: {
        device: { type: 'desktop' },
        capabilities: { hover: true, touch: false },
      },
      locale: 'en-US',
      maxHeight: 480,
      displayMode: 'inline',
      safeArea: {
        insets: { top: 0, bottom: 0, left: 0, right: 0 },
      },
      toolInput: {},
      toolOutput: { message: 'Hello from host' },
      toolResponseMetadata: null,
      widgetState: { count: 0 },
      setWidgetState: async (state: Record<string, unknown>) => {
        if (typeof window === 'undefined' || !window.openai) {
          return;
        }
        Object.assign(window.openai, { widgetState: state });
        window.dispatchEvent(new SetGlobalsEvent({ globals: { widgetState: state } }));
      },
      callTool: async (name: string, args: Record<string, unknown>) => ({
        result: `Mocked callTool(${name}) with args: ${JSON.stringify(args)}`,
      }),
      sendFollowUpMessage: async () => {},
      openExternal: () => {},
      requestDisplayMode: async ({ mode }: { mode: DisplayMode }) => {
        if (typeof window !== 'undefined' && window.openai) {
          Object.assign(window.openai, { displayMode: mode });
          window.dispatchEvent(new SetGlobalsEvent({ globals: { displayMode: mode } }));
        }
        return { mode };
      },
    };
    window.openai = base;
  }

  return window.openai as (OpenAiApi & OpenAiGlobals) | null;
};

const updateOpenAiGlobals = (changes: Partial<OpenAiGlobals>) => {
  if (typeof window === 'undefined') return;
  const api = ensureOpenAi();
  if (!api) return;
  Object.assign(api, changes);
  window.dispatchEvent(new SetGlobalsEvent({ globals: changes }));
};

// Reusable styled components
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ margin: '0 0 16px', fontSize: '20px', fontWeight: '600' }}>{children}</h2>
);

const SectionDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ margin: '0 0 16px', color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
    {children}
  </p>
);

const InfoCard: React.FC<{ label: string; value: React.ReactNode; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <div
    style={{
      padding: '12px 16px',
      backgroundColor: highlight ? 'var(--color-accent-subtle)' : 'var(--color-surface-secondary)',
      borderRadius: '8px',
      border: highlight ? '1px solid var(--color-accent)' : '1px solid transparent',
    }}
  >
    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
      {label}
    </div>
    <div style={{ fontSize: '15px', fontWeight: 500, fontFamily: 'var(--font-family-mono, monospace)' }}>
      {value ?? '—'}
    </div>
  </div>
);

// Hook documentation data
const hookDocs = [
  {
    name: 'useOpenAiGlobal',
    description: 'Access any global SDK property',
    example: `const theme = useOpenAiGlobal('theme');
const locale = useOpenAiGlobal('locale');`,
  },
  {
    name: 'useDisplayMode',
    description: 'Get current display mode (inline, pip, fullscreen)',
    example: `const displayMode = useDisplayMode();
// Returns: 'inline' | 'pip' | 'fullscreen'`,
  },
  {
    name: 'useMaxHeight',
    description: 'Get the maximum height constraint for your widget',
    example: `const maxHeight = useMaxHeight();
// Use to constrain scrollable areas`,
  },
  {
    name: 'useWidgetState',
    description: 'Persist state across host re-renders',
    example: `const [state, setState] = useWidgetState(() => ({
  count: 0
}));`,
  },
  {
    name: 'useWidgetProps',
    description: 'Access tool input/output from the host',
    example: `const props = useWidgetProps(() => ({
  defaultValue: 'fallback'
}));`,
  },
  {
    name: 'useTheme',
    description: 'Get current theme (light/dark)',
    example: `const { theme } = useTheme();
// theme: 'light' | 'dark' | null`,
  },
];

const HookCard: React.FC<{ hook: (typeof hookDocs)[0] }> = ({ hook }) => (
  <div
    style={{
      padding: '16px',
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '12px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <code
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-family-mono, monospace)',
        }}
      >
        {hook.name}()
      </code>
    </div>
    <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
      {hook.description}
    </p>
    <CodeBlock language="tsx">{hook.example}</CodeBlock>
  </div>
);

const LiveDemo: React.FC = () => {
  const displayMode = useDisplayMode();
  const maxHeight = useMaxHeight();
  const locale = useOpenAiGlobal('locale');
  const { theme } = useTheme();
  const safeArea = useOpenAiGlobal('safeArea');
  const toolOutput = useWidgetProps<PlaygroundToolOutput>(() => ({ message: '' }));
  const [widgetState, setWidgetState] = useWidgetState<{ count: number }>(() => ({ count: 0 }));

  const safeAreaDisplay = useMemo(() => {
    if (!safeArea) return null;
    const { top, right, bottom, left } = safeArea.insets;
    return `${top} ${right} ${bottom} ${left}`;
  }, [safeArea]);

  const cycleDisplayMode = () => {
    const modes: DisplayMode[] = ['inline', 'pip', 'fullscreen'];
    const currentIndex = modes.indexOf(displayMode ?? 'inline');
    const next = modes[(currentIndex + 1) % modes.length];
    updateOpenAiGlobals({ displayMode: next });
  };

  const toggleTheme = () => {
    updateOpenAiGlobals({ theme: theme === 'light' ? 'dark' : 'light' });
  };

  const sendMessage = () => {
    updateOpenAiGlobals({
      toolOutput: { message: `Message at ${new Date().toLocaleTimeString()}` },
    });
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-secondary)',
          borderRadius: '12px',
        }}
      >
        <Button color="primary" variant="solid" onClick={cycleDisplayMode}>
          Cycle Display Mode
        </Button>
        <Button color="secondary" variant="outline" onClick={toggleTheme}>
          Toggle Theme
        </Button>
        <Button color="secondary" variant="ghost" onClick={sendMessage}>
          Send Message
        </Button>
      </div>

      {/* Live Values Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        <InfoCard
          label="Display Mode"
          value={
            <Badge color={displayMode === 'fullscreen' ? 'success' : displayMode === 'pip' ? 'warning' : 'info'}>
              {displayMode}
            </Badge>
          }
          highlight={displayMode === 'fullscreen'}
        />
        <InfoCard label="Theme" value={theme} />
        <InfoCard label="Locale" value={locale} />
        <InfoCard label="Max Height" value={maxHeight ? `${maxHeight}px` : null} />
        <InfoCard label="Safe Area" value={safeAreaDisplay} />
        <InfoCard label="Tool Output" value={toolOutput?.message || '—'} />
      </div>

      {/* Widget State Demo */}
      <Card elevationLevel={1}>
        <Card.Body>
          <Card.Title>Widget State</Card.Title>
          <Card.Description>State persists across host re-renders</Card.Description>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <Button
              color="secondary"
              variant="outline"
              onClick={() => setWidgetState((prev) => ({ count: Math.max(0, prev.count - 1) }))}
              disabled={widgetState.count === 0}
            >
              −
            </Button>
            <span style={{ fontSize: '24px', fontWeight: 600, minWidth: '48px', textAlign: 'center' }}>
              {widgetState.count}
            </span>
            <Button
              color="secondary"
              variant="outline"
              onClick={() => setWidgetState((prev) => ({ count: prev.count + 1 }))}
            >
              +
            </Button>
            <Button
              color="secondary"
              variant="ghost"
              onClick={() => setWidgetState({ count: 0 })}
              style={{ marginLeft: 'auto' }}
            >
              Reset
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export const HooksPlayground: React.FC = () => {
  useEffect(() => {
    ensureOpenAi();
    updateOpenAiGlobals({
      theme: 'light',
      displayMode: 'inline',
      maxHeight: 480,
      locale: 'en-US',
      safeArea: { insets: { top: 12, bottom: 24, left: 0, right: 0 } },
      toolOutput: { message: 'Hello from the host' },
      widgetState: { count: 0 },
    });
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 12px', fontSize: '32px', fontWeight: 700 }}>OpenAI Integration</h1>
        <p style={{ margin: 0, fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          React hooks for integrating with the ChatGPT Apps SDK. Access host environment data, manage persistent
          state, and respond to display mode changes.
        </p>
      </header>

      {/* Live Demo Section */}
      <section style={{ marginBottom: '48px' }}>
        <SectionTitle>Live Demo</SectionTitle>
        <SectionDescription>
          Interact with the controls below to simulate ChatGPT host environment changes and see how hooks respond
          in real-time.
        </SectionDescription>
        <LiveDemo />
      </section>

      {/* Available Hooks */}
      <section style={{ marginBottom: '48px' }}>
        <SectionTitle>Available Hooks</SectionTitle>
        <SectionDescription>
          Import these hooks from <code style={{ fontFamily: 'var(--font-family-mono, monospace)' }}>@ainativekit/ui</code> to
          access ChatGPT SDK features in your components.
        </SectionDescription>
        <div style={{ display: 'grid', gap: '16px' }}>
          {hookDocs.map((hook) => (
            <HookCard key={hook.name} hook={hook} />
          ))}
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <SectionTitle>Quick Start</SectionTitle>
        <SectionDescription>Here's how to use these hooks in your ChatGPT app:</SectionDescription>
        <CodeBlock language="tsx">{`import { useDisplayMode, useTheme, useWidgetState } from '@ainativekit/ui';

function MyWidget() {
  const displayMode = useDisplayMode();
  const { theme } = useTheme();
  const [state, setState] = useWidgetState(() => ({ count: 0 }));

  return (
    <div style={{ maxHeight: displayMode === 'pip' ? 300 : 'auto' }}>
      <h1>Count: {state.count}</h1>
      <button onClick={() => setState(s => ({ count: s.count + 1 }))}>
        Increment
      </button>
    </div>
  );
}`}</CodeBlock>
      </section>
    </div>
  );
};
