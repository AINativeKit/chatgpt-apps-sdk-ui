import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { CloseBold } from '@openai/apps-sdk-ui/components/Icon';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    open: {
      description: 'Whether the sidebar is open',
      control: false,
      table: { type: { summary: 'boolean' } },
    },
    position: {
      description: 'Which side the sidebar appears on',
      control: false,
      table: { type: { summary: "'left' | 'right'" }, defaultValue: { summary: "'right'" } },
    },
    width: {
      description: 'Width of the sidebar. Uses `--sidebar-width` token by default',
      control: false,
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '--sidebar-width' } },
    },
    top: {
      description: 'Offset from the top edge. Uses `--sidebar-top` token by default',
      control: false,
      table: { type: { summary: 'string' }, defaultValue: { summary: '--sidebar-top' } },
    },
    bottom: {
      description: 'Offset from the bottom edge. Uses `--sidebar-bottom` token by default',
      control: false,
      table: { type: { summary: 'string' }, defaultValue: { summary: '--sidebar-bottom' } },
    },
    inset: {
      description: 'Horizontal offset from the edge. Uses `--sidebar-inset` token by default',
      control: false,
      table: { type: { summary: 'string' }, defaultValue: { summary: '--sidebar-inset' } },
    },
    onClose: {
      description: 'Optional callback when close is requested',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    children: {
      description: 'Content to display inside the sidebar',
      control: false,
      table: { type: { summary: 'React.ReactNode' } },
    },
    className: {
      description: 'Additional class name for the sidebar container',
      control: false,
      table: { type: { summary: 'string' } },
    },
    contentClassName: {
      description: 'Additional class name for the content wrapper',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    position: 'relative',
    height: '400px',
    background: 'var(--color-surface-secondary)',
    overflow: 'hidden',
  }}>
    {children}
  </div>
);

const SidebarContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
    {onClose && (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'calc(var(--spacing) * 4)' }}>
        <Button color="secondary" variant="ghost" uniform size="sm" onClick={onClose}>
          <CloseBold />
        </Button>
      </div>
    )}
    <h3 style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>Sidebar Content</h3>
    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'calc(var(--spacing) * 4)' }}>
      This is a sidebar panel that slides in from the edge of the screen.
      It can contain any content like forms, details, or navigation.
    </p>
    <Button color="primary" variant="solid" size="md">
      Primary Action
    </Button>
  </div>
);

// Base example
export const Base = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
        <Button onClick={() => setOpen(true)} color="primary" variant="solid">
          Open Sidebar
        </Button>
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)}>
        <SidebarContent onClose={() => setOpen(false)} />
      </Sidebar>
    </Container>
  );
};

Base.parameters = {
  docs: {
    description: {
      story: 'Default right-aligned sidebar with animated slide-in.',
    },
    source: {
      code: `const [open, setOpen] = useState(false);

<Sidebar open={open} onClose={() => setOpen(false)}>
  <YourContent />
</Sidebar>`,
    },
  },
};

// Left position
export const LeftPosition = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
        <Button onClick={() => setOpen(true)} color="primary" variant="solid">
          Open Left Sidebar
        </Button>
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} position="left">
        <SidebarContent onClose={() => setOpen(false)} />
      </Sidebar>
    </Container>
  );
};

LeftPosition.parameters = {
  docs: {
    description: {
      story: 'Sidebar positioned on the left edge.',
    },
    source: {
      code: `<Sidebar open={open} onClose={onClose} position="left">
  <YourContent />
</Sidebar>`,
    },
  },
};

// Custom width
export const CustomWidth = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
        <Button onClick={() => setOpen(true)} color="primary" variant="solid">
          Open Wide Sidebar
        </Button>
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} width={480}>
        <SidebarContent onClose={() => setOpen(false)} />
      </Sidebar>
    </Container>
  );
};

CustomWidth.parameters = {
  docs: {
    description: {
      story: 'Override the default width of 356px.',
    },
    source: {
      code: `<Sidebar open={open} onClose={onClose} width={480}>
  <YourContent />
</Sidebar>`,
    },
  },
};

// Full height
export const FullHeight = () => {
  const [open, setOpen] = useState(true);
  return (
    <Container>
      <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
        <Button onClick={() => setOpen(true)} color="primary" variant="solid">
          Open Full Height Sidebar
        </Button>
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} top="0" bottom="0" inset="0">
        <SidebarContent onClose={() => setOpen(false)} />
      </Sidebar>
    </Container>
  );
};

FullHeight.parameters = {
  docs: {
    description: {
      story: 'Set offsets to 0 for a full-height sidebar flush with the edges.',
    },
    source: {
      code: `<Sidebar open={open} onClose={onClose} top="0" bottom="0" inset="0">
  <YourContent />
</Sidebar>`,
    },
  },
};
