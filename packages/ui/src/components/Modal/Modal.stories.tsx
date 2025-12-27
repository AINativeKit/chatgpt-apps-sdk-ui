import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { CloseBold } from '@openai/apps-sdk-ui/components/Icon';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['!dev'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    open: {
      description: 'Whether the modal is open',
      control: false,
      table: { type: { summary: 'boolean' } },
    },
    width: {
      description: 'Width of the modal. Uses `--modal-width` token by default',
      control: false,
      table: { type: { summary: 'number | string' }, defaultValue: { summary: '--modal-width' } },
    },
    maxWidth: {
      description: 'Maximum width. Uses `--modal-max-width` token by default',
      control: false,
      table: { type: { summary: 'string' }, defaultValue: { summary: '--modal-max-width' } },
    },
    maxHeight: {
      description: 'Maximum height. Uses `--modal-max-height` token by default',
      control: false,
      table: { type: { summary: 'string' }, defaultValue: { summary: '--modal-max-height' } },
    },
    showBackdrop: {
      description: 'Whether to show the backdrop',
      control: false,
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    closeOnBackdropClick: {
      description: 'Whether clicking the backdrop closes the modal',
      control: false,
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    closeOnEscape: {
      description: 'Whether pressing Escape closes the modal',
      control: false,
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    lockBodyScroll: {
      description: 'Whether to prevent body scroll when modal is open',
      control: false,
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    contained: {
      description: 'Use absolute positioning within a container instead of fixed',
      control: false,
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onClose: {
      description: 'Callback when the modal should close',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    children: {
      description: 'Content to display inside the modal',
      control: false,
      table: { type: { summary: 'React.ReactNode' } },
    },
    className: {
      description: 'Additional class name for the modal container',
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

const ModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'calc(var(--spacing) * 4)' }}>
      <Button color="secondary" variant="ghost" uniform size="sm" onClick={onClose}>
        <CloseBold />
      </Button>
    </div>
    <h3 style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>Modal Content</h3>
    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'calc(var(--spacing) * 4)' }}>
      This is a modal dialog that appears centered on the screen with a backdrop.
      Click outside or press Escape to close.
    </p>
    <div style={{ display: 'flex', gap: 'calc(var(--spacing) * 3)' }}>
      <Button color="primary" variant="solid" size="md" onClick={onClose}>
        Confirm
      </Button>
      <Button color="secondary" variant="outline" size="md" onClick={onClose}>
        Cancel
      </Button>
    </div>
  </div>
);

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    position: 'relative',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--color-surface-secondary)',
    overflow: 'hidden',
  }}>
    {children}
  </div>
);

// Base example
export const Base = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setOpen(true)} color="primary" variant="solid">
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} contained>
        <ModalContent onClose={() => setOpen(false)} />
      </Modal>
    </Container>
  );
};

Base.parameters = {
  docs: {
    description: {
      story: 'Default modal with backdrop and animated entrance.',
    },
    source: {
      code: `const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)}>
  <YourContent />
</Modal>`,
    },
  },
};

// Wide modal
export const WideModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setOpen(true)} color="primary" variant="solid">
        Open Wide Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} width={560} contained>
        <ModalContent onClose={() => setOpen(false)} />
      </Modal>
    </Container>
  );
};

WideModal.parameters = {
  docs: {
    description: {
      story: 'Override the default width for larger content.',
    },
    source: {
      code: `<Modal open={open} onClose={onClose} width={560}>
  <YourContent />
</Modal>`,
    },
  },
};

// Persistent modal
export const PersistentModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setOpen(true)} color="primary" variant="solid">
        Open Persistent Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} closeOnBackdropClick={false} contained>
        <div style={{ padding: 'calc(var(--spacing) * 4)' }}>
          <h3 style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>Persistent Modal</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'calc(var(--spacing) * 4)' }}>
            This modal won't close when clicking the backdrop.
            You must use the button below to close it.
          </p>
          <Button color="primary" variant="solid" size="md" onClick={() => setOpen(false)}>
            Close Modal
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

PersistentModal.parameters = {
  docs: {
    description: {
      story: 'Disable backdrop click to require explicit action to close.',
    },
    source: {
      code: `<Modal open={open} onClose={onClose} closeOnBackdropClick={false}>
  <YourContent />
</Modal>`,
    },
  },
};

// Scrollable content
export const ScrollableContent = () => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setOpen(true)} color="primary" variant="solid">
        Open Scrollable Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} maxHeight="300px" contained>
        <div style={{ padding: 'calc(var(--spacing) * 4)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'calc(var(--spacing) * 4)' }}>
            <Button color="secondary" variant="ghost" uniform size="sm" onClick={() => setOpen(false)}>
              <CloseBold />
            </Button>
          </div>
          <h3 style={{ marginBottom: 'calc(var(--spacing) * 3)' }}>Scrollable Content</h3>
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} style={{ color: 'var(--color-text-secondary)', marginBottom: 'calc(var(--spacing) * 3)' }}>
              This is paragraph {i + 1} of scrollable content. The modal has a limited height
              so the content scrolls within it.
            </p>
          ))}
        </div>
      </Modal>
    </Container>
  );
};

ScrollableContent.parameters = {
  docs: {
    description: {
      story: 'Set a max height to enable scrolling within the modal.',
    },
    source: {
      code: `<Modal open={open} onClose={onClose} maxHeight="300px">
  <div style={{ overflowY: 'auto' }}>
    <YourScrollableContent />
  </div>
</Modal>`,
    },
  },
};
