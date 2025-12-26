import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  useDisplayMode,
  useMaxHeight,
  useOpenAiGlobal,
  useWidgetProps,
  useWidgetState,
  SetGlobalsEvent,
  type DisplayMode,
  type OpenAiGlobals,
  type OpenAiApi,
} from '../hooks/openai';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Card } from '../components/Card';

type PlaygroundToolOutput = { message: string };

type PlaygroundArgs = {
  openaiTheme: 'light' | 'dark';
  displayMode: DisplayMode;
  maxHeight: number;
  locale: string;
  toolMessage: string;
  initialWidgetCount: number;
  safeAreaTop: number;
  safeAreaBottom: number;
  safeAreaLeft: number;
  safeAreaRight: number;
};

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
        window.dispatchEvent(
          new SetGlobalsEvent({
            globals: { widgetState: state },
          })
        );
      },
      callTool: async (name: string, args: Record<string, unknown>) => ({
        result: `Mocked callTool(${name}) with args: ${JSON.stringify(args)}`,
      }),
      sendFollowUpMessage: async () => {
        // no-op mock
      },
      openExternal: () => {
        // no-op mock
      },
      requestDisplayMode: async ({ mode }: { mode: DisplayMode }) => {
        if (typeof window !== 'undefined' && window.openai) {
          Object.assign(window.openai, { displayMode: mode });
          window.dispatchEvent(
            new SetGlobalsEvent({
              globals: { displayMode: mode },
            })
          );
        }

        return { mode };
      },
    };

    window.openai = base;
  }

  return window.openai as (OpenAiApi & OpenAiGlobals) | null;
};

const updateOpenAiGlobals = (changes: Partial<OpenAiGlobals>) => {
  if (typeof window === 'undefined') {
    return;
  }

  const api = ensureOpenAi();
  if (!api) {
    return;
  }

  Object.assign(api, changes);
  window.dispatchEvent(
    new SetGlobalsEvent({
      globals: changes,
    })
  );
};

const useSeedOpenAiGlobals = (args: PlaygroundArgs) => {
  const lastWidgetSeed = useRef<number | null>(null);

  useEffect(() => {
    ensureOpenAi();
  }, []);

  useEffect(() => {
    const safeArea = {
      insets: {
        top: args.safeAreaTop,
        bottom: args.safeAreaBottom,
        left: args.safeAreaLeft,
        right: args.safeAreaRight,
      },
    };

    updateOpenAiGlobals({
      theme: args.openaiTheme,
      displayMode: args.displayMode,
      maxHeight: args.maxHeight,
      locale: args.locale,
      safeArea,
      toolOutput: { message: args.toolMessage },
    });
  }, [
    args.displayMode,
    args.maxHeight,
    args.locale,
    args.openaiTheme,
    args.safeAreaBottom,
    args.safeAreaLeft,
    args.safeAreaRight,
    args.safeAreaTop,
    args.toolMessage,
  ]);

  useEffect(() => {
    if (lastWidgetSeed.current === args.initialWidgetCount) {
      return;
    }

    lastWidgetSeed.current = args.initialWidgetCount;
    updateOpenAiGlobals({
      widgetState: { count: args.initialWidgetCount },
    });
  }, [args.initialWidgetCount]);
};

const HostControlPanel: React.FC = () => {
  const cycleDisplayMode = () => {
    const current = window.openai?.displayMode ?? 'inline';
    const modes: DisplayMode[] = ['inline', 'pip', 'fullscreen'];
    const next = modes[(modes.indexOf(current) + 1) % modes.length];
    updateOpenAiGlobals({ displayMode: next });
  };

  const sendHostMessage = () => {
    updateOpenAiGlobals({
      toolOutput: {
        message: `Host says hello @ ${new Date().toLocaleTimeString()}`,
      },
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '12px',
        background: 'var(--color-surface-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
      }}
    >
      <Button color="primary" variant="solid" onClick={cycleDisplayMode}>
        Cycle Display Mode
      </Button>
      <Button color="secondary" variant="ghost" onClick={sendHostMessage}>
        Push Host Tool Message
      </Button>
    </div>
  );
};

const ReactiveComponentDemo: React.FC = () => {
  const displayMode = useDisplayMode();

  // Calculate card width based on display mode
  const getCardWidth = (mode: DisplayMode | null | undefined) => {
    switch (mode) {
      case 'inline':
        return '100%';
      case 'pip':
        return '300px';
      case 'fullscreen':
        return '600px';
      default:
        return '100%';
    }
  };

  const cardWidth = getCardWidth(displayMode);

  return (
    <div style={{ maxWidth: cardWidth, transition: 'max-width 0.3s ease' }}>
      <Card interactive elevationLevel={2}>
        <Card.Body>
          <Card.Title>Live Hook Demonstration</Card.Title>
          <Card.Description>This card's width changes based on display mode</Card.Description>

          <div
            style={{
              marginTop: '16px',
              display: 'grid',
              gap: '12px',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--color-surface-secondary)',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Display Mode
              </div>
              <div style={{ fontSize: '16px' }}>{displayMode || '—'}</div>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor: 'var(--color-surface-secondary)',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Card Width
              </div>
              <div style={{ fontSize: '16px' }}>{cardWidth}</div>
            </div>
          </div>

          <p
            style={{
              margin: '16px 0 0 0',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Try cycling display modes to see the card width change!
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

const HooksDashboard: React.FC<{ initialWidgetCount: number }> = ({ initialWidgetCount }) => {
  const displayMode = useDisplayMode();
  const maxHeight = useMaxHeight();
  const locale = useOpenAiGlobal('locale');
  const theme = useOpenAiGlobal('theme');
  const safeArea = useOpenAiGlobal('safeArea');
  const toolOutput = useWidgetProps<PlaygroundToolOutput>(() => ({
    message: '',
  }));
  const [widgetState, setWidgetState] = useWidgetState<Record<string, unknown>>(() => ({
    count: initialWidgetCount,
  }));

  const currentCount = (widgetState as { count?: number })?.count ?? 0;

  const safeAreaDisplay = useMemo(() => {
    if (!safeArea) {
      return null;
    }
    const { top, right, bottom, left } = safeArea.insets;
    return `${top}px / ${right}px / ${bottom}px / ${left}px`;
  }, [safeArea]);

  const increment = (delta: number) => {
    setWidgetState((prev) => {
      const current = (prev as { count?: number }) ?? { count: 0 };
      return { count: Math.max(0, (current.count ?? 0) + delta) };
    });
  };

  const resetToInitial = () => {
    setWidgetState({ count: initialWidgetCount } as Record<string, unknown>);
  };

  const clearWidgetState = () => {
    setWidgetState({ count: 0 } as Record<string, unknown>);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        padding: '16px',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        background: 'var(--color-surface)',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 8px', fontSize: '18px' }}>Hook Readout</h3>
        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr',
            gap: '6px 12px',
            margin: 0,
          }}
        >
          <dt>Theme</dt>
          <dd>{theme ?? '—'}</dd>

          <dt>Locale</dt>
          <dd>{locale ?? '—'}</dd>

          <dt>Display Mode</dt>
          <dd>{displayMode ?? '—'}</dd>

          <dt>Max Height</dt>
          <dd>{maxHeight ?? '—'}</dd>

          <dt>Safe Area (TRBL)</dt>
          <dd>{safeAreaDisplay ?? '—'}</dd>

          <dt>Tool Output Message</dt>
          <dd>{toolOutput?.message || '—'}</dd>

          <dt>Widget Count</dt>
          <dd>{currentCount}</dd>
        </dl>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '4px',
        }}
      >
        <Button color="primary" variant="solid" onClick={() => increment(1)}>
          Increment Count
        </Button>
        <Button
          color="secondary"
          variant="outline"
          onClick={() => increment(-1)}
          disabled={currentCount === 0}
        >
          Decrement Count
        </Button>
        <Button color="secondary" variant="ghost" onClick={resetToInitial}>
          Reset to Initial
        </Button>
        <Button color="secondary" variant="ghost" onClick={clearWidgetState}>
          Clear (null)
        </Button>
      </div>
    </div>
  );
};

const OpenAiHooksPlayground: React.FC<PlaygroundArgs> = (args) => {
  useSeedOpenAiGlobals(args);

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        maxWidth: '760px',
        margin: '0 auto',
        padding: '24px',
      }}
    >
      {/* Introduction Section */}
      <section style={{ marginBottom: '12px' }}>
        <h1 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: '700' }}>
          🪝 OpenAI Hooks Playground
        </h1>
        <p
          style={{
            margin: '0 0 8px 0',
            color: 'var(--color-text-secondary)',
            fontSize: '16px',
            lineHeight: '1.5',
          }}
        >
          These hooks give you access to the ChatGPT Apps SDK environment, allowing your component
          to react to host events, manage state, and communicate with the ChatGPT host.
        </p>
        <p
          style={{ margin: '0 0 8px 0', color: 'var(--color-text-secondary)', fontSize: '14px' }}
        >
          <strong>Available hooks:</strong>
        </p>
        <ul
          style={{
            margin: '0',
            paddingLeft: '20px',
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
          }}
        >
          <li>
            <strong>useOpenAiGlobal()</strong> - Access global SDK properties (theme, locale,
            display mode, etc.)
          </li>
          <li>
            <strong>useWidgetState()</strong> - Manage your widget state that persists across host
            updates
          </li>
          <li>
            <strong>useWidgetProps()</strong> - Get tool input/output from the host
          </li>
          <li>
            <strong>useDisplayMode()</strong> - React to display mode changes (inline, pip,
            fullscreen)
          </li>
          <li>
            <strong>useMaxHeight()</strong> - Constrain your component to the available height
          </li>
        </ul>

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: 'var(--color-surface-secondary)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              margin: '0',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.5',
            }}
          >
            📖 <strong>Need detailed documentation?</strong> Check out the{' '}
            <a
              href="https://github.com/AINativeKit/chatgpt-apps-sdk-ui/blob/main/packages/ui/docs/guides/useOpenAiGlobal.md"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--blue-400)',
                textDecoration: 'none',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none';
              }}
            >
              complete useOpenAiGlobal guide
            </a>{' '}
            for data structure patterns, real-world examples, troubleshooting, and best practices.
          </p>
        </div>
      </section>

      {/* Interactive Playground Section */}
      <section
        style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: '600' }}>
          🎮 Interactive Playground
        </h2>
        <p
          style={{ margin: '0 0 12px', color: 'var(--color-text-secondary)', fontSize: '14px' }}
        >
          Try adjusting the controls below or using the Storybook controls panel to simulate host
          environment changes and see how the hooks respond in real-time.
        </p>

        <HostControlPanel />
        <HooksDashboard initialWidgetCount={args.initialWidgetCount} />
      </section>

      {/* Reactive Component Section */}
      <section>
        <ReactiveComponentDemo />
      </section>
    </div>
  );
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Hooks/ChatGPT SDK Integration',
  render: (args) => <OpenAiHooksPlayground {...args} />,
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
  args: {
    openaiTheme: 'light',
    displayMode: 'inline',
    maxHeight: 480,
    locale: 'en-US',
    toolMessage: 'Hello from the host environment 👋',
    initialWidgetCount: 1,
    safeAreaTop: 12,
    safeAreaBottom: 24,
    safeAreaLeft: 0,
    safeAreaRight: 0,
  },
  argTypes: {
    openaiTheme: {
      control: { type: 'inline-radio' },
      options: ['light', 'dark'],
    },
    displayMode: {
      control: { type: 'inline-radio' },
      options: ['inline', 'pip', 'fullscreen'],
    },
    locale: {
      control: { type: 'text' },
    },
    toolMessage: {
      control: { type: 'text' },
    },
    maxHeight: {
      control: { type: 'number', min: 200, max: 1200, step: 20 },
    },
    initialWidgetCount: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
    },
    safeAreaTop: {
      control: { type: 'number', min: 0, max: 64, step: 1 },
    },
    safeAreaBottom: {
      control: { type: 'number', min: 0, max: 64, step: 1 },
    },
    safeAreaLeft: {
      control: { type: 'number', min: 0, max: 64, step: 1 },
    },
    safeAreaRight: {
      control: { type: 'number', min: 0, max: 64, step: 1 },
    },
  },
};

export default meta;

export const Playground: StoryObj<PlaygroundArgs> = {};
