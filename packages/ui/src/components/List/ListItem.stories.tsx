import type { Meta, StoryObj } from '@storybook/react';
import { ListItem, type ListItemProps } from './ListItem';

/**
 * ListItem is used inside List's renderItem function to display individual rows.
 * This stories file exists to provide argTypes for MDX documentation.
 */
const meta: Meta<ListItemProps> = {
  title: 'Internal/ListItem',
  component: ListItem,
  tags: ['!autodocs', '!dev', '!sidebar'],
  argTypes: {
    title: {
      description: 'Primary title for the row',
      table: { type: { summary: 'ReactNode' } },
    },
    subtitle: {
      description: 'Optional supporting text',
      table: { type: { summary: 'ReactNode' } },
    },
    media: {
      description: 'Visual shown to the left of the text',
      table: { type: { summary: 'string | ReactNode' } },
    },
    mediaAlt: {
      description: 'Alt text for media when URL is provided',
      table: { type: { summary: 'string' } },
    },
    rank: {
      description: 'Rank or index shown on desktop',
      table: { type: { summary: 'ReactNode' } },
    },
    features: {
      description: 'Feature list displayed below the subtitle',
      table: { type: { summary: 'Feature[]' } },
    },
    metadata: {
      description: 'Metadata rendered inline on mobile, separate column on desktop',
      table: { type: { summary: 'ReactNode' } },
    },
    action: {
      description: 'Trailing action element',
      table: { type: { summary: 'ReactNode' } },
    },
    onActionClick: {
      description: 'Callback when action element is clicked',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    onClick: {
      description: 'Callback when row is clicked',
      control: false,
      table: { type: { summary: '() => void' } },
    },
    interactive: {
      description: 'Enable hover/focus states without onClick',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    hideMetadataOnMobile: {
      description: 'Hide metadata from inline mobile row',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      description: 'Shows skeleton placeholder',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<ListItemProps>;

export const Default: Story = {
  args: {
    title: 'List Item Title',
    subtitle: 'Subtitle text',
  },
};
