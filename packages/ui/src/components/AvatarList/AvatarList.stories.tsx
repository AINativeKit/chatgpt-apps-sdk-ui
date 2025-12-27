import type { Meta } from '@storybook/react';
import { AvatarList } from './AvatarList';

const meta: Meta<typeof AvatarList> = {
  title: 'Components/AvatarList',
  component: AvatarList,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      description: 'Optional section title displayed above the list',
      control: false,
      table: { type: { summary: 'string' } },
    },
    items: {
      description: 'Array of items to display',
      control: false,
      table: { type: { summary: 'AvatarListItem[]' } },
    },
    avatarSize: {
      description: 'Size of the avatar in pixels',
      control: false,
      table: { type: { summary: 'number' }, defaultValue: { summary: '32' } },
    },
    className: {
      description: 'Additional class name',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const sampleReviews = [
  {
    id: '1',
    title: 'Sarah Chen',
    image: 'https://i.pravatar.cc/150?u=sarah',
    metadata: '5 stars • 2 days ago',
    description: 'Absolutely loved this place! The views were incredible and the service was top-notch.',
  },
  {
    id: '2',
    title: 'Michael Rodriguez',
    image: 'https://i.pravatar.cc/150?u=michael',
    metadata: '4 stars • 1 week ago',
    description: 'Great experience overall. Would definitely recommend to friends and family.',
  },
  {
    id: '3',
    title: 'Emily Watson',
    metadata: '5 stars • 2 weeks ago',
    description: 'Perfect getaway spot. Clean, comfortable, and exactly as described.',
  },
];

const sampleTeam = [
  {
    id: '1',
    title: 'Alex Thompson',
    image: 'https://i.pravatar.cc/150?u=alex',
    metadata: 'Engineering Lead',
    description: 'Responsible for frontend architecture and team coordination.',
  },
  {
    id: '2',
    title: 'Jordan Lee',
    image: 'https://i.pravatar.cc/150?u=jordan',
    metadata: 'Senior Developer',
    description: 'Focuses on React components and design system implementation.',
  },
  {
    id: '3',
    title: 'Casey Morgan',
    image: 'https://i.pravatar.cc/150?u=casey',
    metadata: 'UX Designer',
    description: 'Creates user-centered designs and maintains design consistency.',
  },
];

// Base example
export const Base = () => {
  return <AvatarList title="Reviews" items={sampleReviews} />;
};

Base.parameters = {
  docs: {
    description: {
      story: 'Basic avatar list with title, metadata, and description.',
    },
    source: {
      code: `<AvatarList
  title="Reviews"
  items={[
    { id: '1', title: 'Sarah Chen', image: '...', metadata: '5 stars', description: '...' },
    { id: '2', title: 'Michael Rodriguez', image: '...', metadata: '4 stars', description: '...' },
  ]}
/>`,
    },
  },
};

// Without title
export const WithoutTitle = () => {
  return <AvatarList items={sampleReviews} />;
};

WithoutTitle.parameters = {
  docs: {
    description: {
      story: 'Avatar list without a section title.',
    },
    source: {
      code: `<AvatarList items={reviews} />`,
    },
  },
};

// Large avatars
export const LargeAvatars = () => {
  return <AvatarList title="Team Members" items={sampleTeam} avatarSize={48} />;
};

LargeAvatars.parameters = {
  docs: {
    description: {
      story: 'Use `avatarSize` to customize avatar dimensions.',
    },
    source: {
      code: `<AvatarList title="Team Members" items={team} avatarSize={48} />`,
    },
  },
};

// Initials fallback
export const InitialsFallback = () => {
  return (
    <AvatarList
      title="Recent Activity"
      items={[
        { id: '1', title: 'John Doe', metadata: 'Just now', description: 'Created a new document' },
        { id: '2', title: 'Jane Smith', metadata: '5 minutes ago', description: 'Updated project settings' },
        { id: '3', title: 'Bob Wilson', metadata: '1 hour ago', description: 'Added a comment on the task' },
      ]}
    />
  );
};

InitialsFallback.parameters = {
  docs: {
    description: {
      story: 'When no image is provided, initials are generated from the title.',
    },
    source: {
      code: `<AvatarList
  title="Recent Activity"
  items={[
    { id: '1', title: 'John Doe', metadata: 'Just now', description: '...' },
  ]}
/>`,
    },
  },
};

// Minimal items
export const MinimalItems = () => {
  return (
    <AvatarList
      title="Participants"
      items={[
        { id: '1', title: 'Alice Johnson', image: 'https://i.pravatar.cc/150?u=alice', metadata: 'Host' },
        { id: '2', title: 'Bob Smith', image: 'https://i.pravatar.cc/150?u=bob', metadata: 'Co-host' },
        { id: '3', title: 'Charlie Brown', image: 'https://i.pravatar.cc/150?u=charlie', metadata: 'Member' },
      ]}
    />
  );
};

MinimalItems.parameters = {
  docs: {
    description: {
      story: 'Items with just title and metadata, no description.',
    },
    source: {
      code: `<AvatarList
  title="Participants"
  items={[
    { id: '1', title: 'Alice Johnson', image: '...', metadata: 'Host' },
  ]}
/>`,
    },
  },
};

// Empty state
export const Empty = () => {
  return <AvatarList title="No Items" items={[]} />;
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Empty list returns null (renders nothing).',
    },
    source: {
      code: `<AvatarList title="No Items" items={[]} />`,
    },
  },
};
