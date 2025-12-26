import type { Meta } from '@storybook/react';
import { Card, type CardProps } from './Card';
import { Features } from '../Feature/Features';
import {
  Clock,
  CalendarToday,
  Chat,
} from '@openai/apps-sdk-ui/components/Icon';

const meta: Meta<CardProps> = {
  title: 'Composed Components/Cards/Cards',
  component: Card,
  tags: ['!dev'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    elevationLevel: { table: { defaultValue: { summary: '1' } } },
    border: { table: { defaultValue: { summary: 'heavy' } } },
    interactive: { table: { defaultValue: { summary: 'false' } } },
    loading: { table: { defaultValue: { summary: 'false' } } },
    error: { table: { defaultValue: { summary: 'false' } } },
    errorTitle: { table: { defaultValue: { summary: 'Something went wrong' } } },
    errorMessage: { table: { defaultValue: { summary: 'Unable to load content' } } },
  },
};

export default meta;

// Base story
export const Base = (args: CardProps) => (
  <Card {...args}>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>
      A simple card with title and description. Cards are flexible containers for content.
    </Card.Description>
  </Card>
);

Base.args = {
  elevationLevel: 1,
};

Base.parameters = {
  docs: {
    source: {
      code: `<Card elevationLevel={1}>
  <Card.Title>Card Title</Card.Title>
  <Card.Description>
    A simple card with title and description.
  </Card.Description>
</Card>`,
    },
  },
};

// Interactive card
export const Interactive = (args: CardProps) => (
  <Card {...args}>
    <Card.Title>Interactive Card</Card.Title>
    <Card.Description>Hover to see elevation increase</Card.Description>
  </Card>
);

Interactive.args = {
  elevationLevel: 1,
  interactive: true,
};

Interactive.parameters = {
  docs: {
    source: {
      code: `<Card elevationLevel={1} interactive>
  <Card.Title>Interactive Card</Card.Title>
  <Card.Description>Hover to see elevation increase</Card.Description>
</Card>`,
    },
  },
};

// Elevation levels
export const ElevationLevels = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
      alignItems: 'start',
    }}
  >
    {([0, 1, 2, 3, 4] as const).map((level) => (
      <Card
        key={level}
        elevationLevel={level}
        border="default"
        style={{ minHeight: '120px' }}
      >
        <strong>Elevation {level}</strong>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px', marginTop: '8px' }}>
          {level === 0 ? 'No shadow' : `Shadow level ${level}`}
        </div>
      </Card>
    ))}
  </div>
);

ElevationLevels.parameters = {
  docs: {
    source: {
      code: `<Card elevationLevel={0}>No shadow</Card>
<Card elevationLevel={1}>Shadow level 1</Card>
<Card elevationLevel={2}>Shadow level 2</Card>
<Card elevationLevel={3}>Shadow level 3</Card>
<Card elevationLevel={4}>Shadow level 4</Card>`,
    },
  },
};

// Compound components
export const CompoundComponents = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <Card>
      <Card.Title>Simple Title</Card.Title>
      <Card.Description>
        Use compound components for semantic structure and consistent styling.
      </Card.Description>
    </Card>

    <Card>
      <Card.Header>
        <Card.Title as="h3">With Header & Footer</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>Clear content hierarchy with dedicated sections.</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Card.Actions align="end">
          <Card.ActionButton variant="solid">Action</Card.ActionButton>
        </Card.Actions>
      </Card.Footer>
    </Card>
  </div>
);

CompoundComponents.parameters = {
  docs: {
    source: {
      code: `<Card>
  <Card.Header>
    <Card.Title as="h3">With Header & Footer</Card.Title>
  </Card.Header>
  <Card.Body>
    <Card.Description>Content goes here</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Card.Actions align="end">
      <Card.ActionButton variant="solid">Action</Card.ActionButton>
    </Card.Actions>
  </Card.Footer>
</Card>`,
    },
  },
};

// With image
export const WithImage = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <Card>
      <Card.Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
        alt="Square aspect ratio"
        aspectRatio="1 / 1"
      />
      <Card.Body>
        <Card.Title as="h4">Square (1:1)</Card.Title>
        <Card.Description>Perfect for avatars and thumbnails</Card.Description>
      </Card.Body>
    </Card>

    <Card>
      <Card.Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
        alt="Widescreen aspect ratio"
        aspectRatio="16 / 9"
      />
      <Card.Body>
        <Card.Title as="h4">Widescreen (16:9)</Card.Title>
        <Card.Description>Ideal for video thumbnails</Card.Description>
      </Card.Body>
    </Card>

    <Card>
      <Card.Image
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
        alt="Classic photo aspect ratio"
        aspectRatio="3 / 2"
      />
      <Card.Body>
        <Card.Title as="h4">Classic (3:2)</Card.Title>
        <Card.Description>Traditional photography ratio</Card.Description>
      </Card.Body>
    </Card>
  </div>
);

WithImage.parameters = {
  docs: {
    source: {
      code: `<Card>
  <Card.Image
    src="https://example.com/image.jpg"
    alt="Description"
    aspectRatio="16 / 9"
  />
  <Card.Body>
    <Card.Title as="h4">Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Body>
</Card>`,
    },
  },
};

// Loading state
export const Loading = (args: CardProps) => <Card {...args} style={{ minHeight: '200px' }} />;

Loading.args = {
  loading: true,
};

Loading.parameters = {
  docs: {
    source: {
      code: `<Card loading />`,
    },
  },
};

// Error state
export const Error = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <Card error style={{ minHeight: '200px' }}>
      <p>This content won't show</p>
    </Card>

    <Card
      error
      errorTitle="Failed to load"
      errorMessage="Unable to fetch the requested data"
      style={{ minHeight: '200px' }}
    >
      <p>This content won't show</p>
    </Card>

    <Card
      error
      errorTitle="Connection failed"
      errorMessage="Could not reach the server"
      onErrorRetry={() => alert('Retry clicked!')}
      style={{ minHeight: '200px' }}
    >
      <p>This content won't show</p>
    </Card>
  </div>
);

Error.parameters = {
  docs: {
    source: {
      code: `// Default error
<Card error />

// Custom error message
<Card
  error
  errorTitle="Failed to load"
  errorMessage="Unable to fetch the requested data"
/>

// With retry action
<Card
  error
  errorTitle="Connection failed"
  errorMessage="Could not reach the server"
  onErrorRetry={() => handleRetry()}
/>`,
    },
  },
};

// Real-world examples
export const RealWorld = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    {/* Product Card */}
    <Card elevationLevel={1} interactive>
      <Card.Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Card.Title>Premium Headphones</Card.Title>
          <Card.Badge>New</Card.Badge>
        </div>
      </Card.Header>
      <Card.Image
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        alt="Premium headphones"
      />
      <Card.Body>
        <Card.Description>
          High-quality wireless headphones with active noise cancellation and 30-hour battery life.
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Card.Actions align="stretch">
          <Card.ActionButton variant="outline">Details</Card.ActionButton>
          <Card.ActionButton variant="solid">Add to Cart</Card.ActionButton>
        </Card.Actions>
      </Card.Footer>
    </Card>

    {/* Article Card */}
    <Card elevationLevel={1} interactive>
      <Card.Header>
        <Card.BadgeGroup>
          <Card.Badge>ChatGPT Apps</Card.Badge>
          <Card.Badge>AI-Native</Card.Badge>
        </Card.BadgeGroup>
      </Card.Header>
      <Card.Image
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
        alt="Article preview"
      />
      <Card.Body>
        <Card.Title as="h3">Building AI-Native UIs</Card.Title>
        <Card.Description>
          Build modern, accessible UI with AINativeKit. Master reusable component patterns that scale.
        </Card.Description>
        <Card.Meta>
          <Features
            items={[
              { icon: <Clock />, label: '10 min read' },
              { icon: <CalendarToday />, label: 'October 30, 2025' },
            ]}
          />
        </Card.Meta>
      </Card.Body>
      <Card.Footer>
        <Card.Actions align="start">
          <Card.ActionButton variant="solid">Read More</Card.ActionButton>
        </Card.Actions>
      </Card.Footer>
    </Card>

    {/* Venue Card */}
    <Card elevationLevel={1} interactive>
      <Card.Image
        src="https://images.unsplash.com/photo-1686836715835-65af22ea5cd4?w=400&h=200&fit=crop"
        alt="Artisan Bistro"
      />
      <Card.Body>
        <Card.Title as="h3">Artisan Bistro</Card.Title>
        <Card.Description>
          Cozy French bistro with locally-sourced ingredients and an extensive wine selection.
        </Card.Description>
        <Card.Meta>
          <Features items={[{ icon: <Chat />, label: '4.8★' }, '128 reviews', '$$', 'Open now']} />
        </Card.Meta>
      </Card.Body>
      <Card.Footer>
        <Card.Actions align="stretch">
          <Card.ActionButton variant="outline">Details</Card.ActionButton>
          <Card.ActionButton variant="solid">Book Table</Card.ActionButton>
        </Card.Actions>
      </Card.Footer>
    </Card>
  </div>
);

RealWorld.parameters = {
  docs: {
    source: {
      code: `// Product card
<Card elevationLevel={1} interactive>
  <Card.Header>
    <Card.Title>Premium Headphones</Card.Title>
    <Card.Badge>New</Card.Badge>
  </Card.Header>
  <Card.Image src="..." alt="Product" />
  <Card.Body>
    <Card.Description>Product description</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Card.Actions align="stretch">
      <Card.ActionButton variant="outline">Details</Card.ActionButton>
      <Card.ActionButton variant="solid">Add to Cart</Card.ActionButton>
    </Card.Actions>
  </Card.Footer>
</Card>`,
    },
  },
};

// All states showcase
export const States = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
      gap: '24px',
      alignItems: 'start',
    }}
  >
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Loading
      </div>
      <Card loading style={{ minHeight: '200px' }} />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Error
      </div>
      <Card error errorMessage="Failed to load content" style={{ minHeight: '200px' }} />
    </div>
    <div>
      <div style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
        Normal
      </div>
      <Card style={{ minHeight: '200px' }}>
        <Card.Title>Normal Card</Card.Title>
        <Card.Description>Content displays normally</Card.Description>
      </Card>
    </div>
  </div>
);

States.parameters = {
  docs: {
    source: {
      code: `// Loading state
<Card loading />

// Error state
<Card error errorMessage="Failed to load content" />

// Normal state
<Card>
  <Card.Title>Normal Card</Card.Title>
  <Card.Description>Content displays normally</Card.Description>
</Card>`,
    },
  },
};
