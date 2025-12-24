import type { Meta, StoryObj } from '@storybook/react';
import { Carousel as CarouselComponent } from '../../components/Carousel';
import { SummaryCard } from '../../components/Card';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../../components/storybook/codeBlockStyles';

// Dummy component for Storybook
const CarouselExample = () => null;

const meta: Meta<typeof CarouselExample> = {
  title: 'Gallery/Carousel',
  component: CarouselExample,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CarouselExample>;

// Pizza restaurant data for SummaryCard (compact) carousel
const pizzaRestaurants = [
  {
    id: 'little-nonas',
    title: "Little Nona's",
    subtitle: '1427 Via Campania',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    description: 'Award-winning Neapolitan pies in North Beach.',
    badge: '4.8',
    features: ['$$$', 'Neapolitan', 'Wood-fired'],
  },
  {
    id: 'dough-re-mi',
    title: 'Dough-Re-Mi',
    subtitle: '512 Harmony Avenue',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    description: 'Focaccia-style squares, late-night favorite.',
    badge: '4.6',
    features: ['$$', 'Focaccia', 'Late-night'],
  },
  {
    id: 'slice-society',
    title: 'Slice Society',
    subtitle: '839 Valencia Street',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    description: 'Lively slice shop with a cult following.',
    badge: '4.9',
    features: ['$', 'Slices', 'Casual'],
  },
  {
    id: 'wood-fired-heaven',
    title: 'Wood Fired Heaven',
    subtitle: '234 Mission Street',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    description: 'Traditional wood-fired with imported ingredients.',
    badge: '4.7',
    features: ['$$$', 'Wood-fired', 'Traditional'],
  },
  {
    id: 'margherita-express',
    title: 'Margherita Express',
    subtitle: '678 Columbus Avenue',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-6.png',
    description: 'Fresh mozzarella and basil prepared daily with authentic Italian ingredients.',
    badge: '4.5',
    features: ['$$', 'Margherita', 'Fresh'],
  },
  {
    id: 'pesto-dreams',
    title: 'Pesto Dreams',
    subtitle: '456 Grant Avenue',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-5.png',
    description: 'Unique pesto-based variations and seasonal specials.',
    badge: '4.4',
    features: ['Pesto', 'Creative'],
  },
];

// Single comprehensive story
export const Carousel: Story = {
  render: () => {
    return (
      <div
        style={{
          maxWidth: '768px',
          margin: '0 auto',
          fontFamily:
            'var(--ai-font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
        }}
      >
        {/* Header Section */}
        <section style={{ marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '12px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            🎠 Carousel - Restaurant Showcase
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--ai-color-text-secondary)',
              margin: 0,
              lineHeight: '1.6',
            }}
          >
            A horizontal scrolling carousel showcasing rich card content. Perfect for restaurant
            listings, product catalogs, or content discovery experiences in your ChatGPT App.
          </p>
        </section>

        {/* Live Demo */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Live Demo
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <CarouselComponent>
              {pizzaRestaurants.map((restaurant) => (
                <SummaryCard
                  key={restaurant.id}
                  style={{ width: '220px' }}
                  images={restaurant.image}
                  title={restaurant.title}
                  subtitle={restaurant.subtitle}
                  badge={restaurant.badge}
                  size="compact"
                  imageAspectRatio="4/3"
                  metadata={restaurant.features.map((f) => ({ label: f, separator: '•' }))}
                  description={restaurant.description}
                  buttonText="Order now"
                  onButtonClick={() => alert(`Order from ${restaurant.title}`)}
                />
              ))}
            </CarouselComponent>
          </div>

          <div
            style={{
              padding: '16px',
              background: 'var(--ai-color-bg-secondary)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              border: '1px solid var(--ai-color-border)',
            }}
          >
            <strong style={{ color: 'var(--ai-color-text-primary)' }}>✨ Features:</strong>
            <ul
              style={{
                margin: '8px 0 0 0',
                paddingLeft: '20px',
                lineHeight: '1.6',
              }}
            >
              <li>Scroll horizontally to browse restaurants</li>
              <li>Rich cards with images, descriptions, and actions</li>
              <li>Interactive time slot selection</li>
              <li>Touch/swipe support on mobile devices</li>
              <li>Smooth snap-to-item carousel behavior</li>
            </ul>
          </div>
        </section>

        {/* Data Structure Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Data Structure
          </h2>

          <p
            style={{
              fontSize: '14px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
              lineHeight: '1.6',
            }}
          >
            Define your carousel items with rich content including images, descriptions, and
            metadata.
          </p>

          <div style={codeBlockStyles.primary}>
            <pre
              style={{
                margin: 0,
                color: 'var(--ai-color-text-primary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {`type FeatureItem = string | { icon?: IconName; label: string };

interface SummaryCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  badge: string;
  badgeIcon?: IconName;     // Optional icon in badge (e.g., "star")
  features: FeatureItem[];  // Flexible: strings or icon-label pairs
}

// Example:
const items: SummaryCardItem[] = [
  {
    id: 'item-1',
    title: 'Restaurant Name',
    subtitle: '123 Main Street',
    image: 'https://example.com/image.jpg',
    description: 'A brief description of the restaurant',
    badge: '4.8',
    badgeIcon: 'star',
    features: [
      '$$$',                              // Price level
      'Italian Cuisine',                  // Type
      { icon: 'check-circle-filled', label: 'Verified' }, // With icon
    ],
  },
  // ... more items
];`}
            </pre>
          </div>

          <div
            style={{
              background: 'var(--ai-color-bg-secondary)',
              border: '1px solid var(--ai-color-border)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
            }}
          >
            <p style={{ margin: '0 0 12px 0' }}>
              <strong style={{ color: 'var(--ai-color-text-primary)' }}>💡 Pro Tip:</strong> Use the{' '}
              <code
                style={{
                  background: 'var(--ai-color-bg-primary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                }}
              >
                badgeIcon
              </code>{' '}
              prop to display icons alongside ratings (e.g., star-filled, verified). SummaryCard
              with size="compact" is optimized for discovery/carousel layouts with 4:3 images and
              dense typography.
            </p>
          </div>
        </section>

        {/* Usage Section */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Quick Start
          </h2>

          <div style={codeBlockStyles.primary}>
            <pre
              style={{
                margin: 0,
                color: 'var(--ai-color-text-primary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {`import { Carousel } from '@ainativekit/ui';
import { SummaryCard } from '@ainativekit/ui';

// 1. Define your carousel items with flexible features
const items = [
  {
    id: 'item-1',
    title: 'Restaurant Name',
    subtitle: 'Location Address',
    image: 'https://example.com/image.jpg',
    description: 'Award-winning restaurant with seasonal menu',
    badge: '4.8',
    badgeIcon: 'star',
    // Features can be strings OR objects with icons
    features: [
      '$$$',                              // Simple string
      'Italian',                          // Simple string
      { icon: 'check-circle-filled', label: 'Verified' }, // With icon
    ],
  },
  {
    id: 'item-2',
    title: 'Another Restaurant',
    subtitle: 'Downtown Location',
    image: 'https://example.com/image2.jpg',
    description: 'Popular spot for casual dining',
    badge: '4.6',
    badgeIcon: 'star',
    features: ['$$', 'Casual', 'Open Late'],
  },
  // ... more items
];

// 2. Render the carousel with SummaryCard (compact)
function MyCarousel() {
  return (
    <CarouselComponent>
      {items.map((item) => (
        <SummaryCard
          key={item.id}
          style={{ width: '220px' }}
          images={item.image}
          title={item.title}
          subtitle={item.subtitle}
          badge={item.badge}
          size="compact"
          imageAspectRatio="4/3"
          metadata={item.features.map(f => ({ label: f, separator: '•' }))}
          description={item.description}
          buttonText="Order now"
          onButtonClick={() => handleOrder(item.id)}
        />
      ))}
    </CarouselComponent>
  );
}`}
            </pre>
          </div>
        </section>

        {/* Component Props Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Component Props
          </h2>

          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--ai-color-text-primary)',
              }}
            >
              Carousel Component
            </h3>

            <PropsTable
              hideThemeColumn
              rows={[
                {
                  name: 'children',
                  description: 'Array of carousel items (typically cards wrapped in divs)',
                },
                {
                  name: 'align',
                  description: 'Carousel alignment: "start" | "center" (default: "center")',
                },
                {
                  name: 'loop',
                  description: 'Enable infinite loop carousel (default: false)',
                },
              ]}
            />
          </div>

          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--ai-color-text-primary)',
              }}
            >
              SummaryCard Component (Card Content)
            </h3>

            <PropsTable
              hideThemeColumn
              rows={[
                {
                  name: 'image',
                  description: 'Card image URL (4:3 aspect ratio recommended)',
                },
                {
                  name: 'imageAlt',
                  description: 'Alt text for the image (accessibility)',
                },
                {
                  name: 'title',
                  description: 'Main heading text (uses bodyEmph typography)',
                },
                {
                  name: 'subtitle',
                  description: 'Location or secondary text (uses caption typography)',
                },
                {
                  name: 'badge',
                  description: 'Rating or badge content (e.g., "4.8", "9.2")',
                },
                {
                  name: 'badgeIcon',
                  description: 'Icon for the badge (e.g., "star", "star-filled", "verified")',
                },
                {
                  name: 'features',
                  description:
                    'Array of feature items (strings or {icon, label} objects with dot separator)',
                },
                {
                  name: 'description',
                  description: 'Short description (clamped to 2 lines with ellipsis)',
                },
                {
                  name: 'buttonText',
                  description: 'Primary button text (default: "Order now")',
                },
                {
                  name: 'onButtonClick',
                  description: 'Callback when the primary button is clicked',
                },
                {
                  name: 'width',
                  description: 'Card width (default: "220px")',
                },
              ]}
            />
          </div>
        </section>

        {/* Use Cases Section */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Use Cases
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              {
                emoji: '🍕',
                title: 'Restaurant Listings',
                desc: 'Browse restaurants with ratings, reviews, and availability',
              },
              {
                emoji: '🛍️',
                title: 'Product Showcase',
                desc: 'Display product catalogs with images, prices, and descriptions',
              },
              {
                emoji: '🏨',
                title: 'Hotel/Travel Search',
                desc: 'Show accommodations with amenities and booking options',
              },
              {
                emoji: '🎬',
                title: 'Content Discovery',
                desc: 'Browse movies, shows, articles with rich previews',
              },
            ].map((useCase) => (
              <div
                key={useCase.title}
                style={{
                  background: 'var(--ai-color-bg-secondary)',
                  border: '1px solid var(--ai-color-border)',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{useCase.emoji}</div>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--ai-color-text-primary)',
                  }}
                >
                  {useCase.title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',
                    color: 'var(--ai-color-text-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  {useCase.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Components */}
        <section>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Related Components
          </h2>

          <div
            style={{
              background: 'var(--ai-color-bg-secondary)',
              border: '1px solid var(--ai-color-border)',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--ai-color-text-secondary)',
            }}
          >
            <p style={{ margin: '0 0 12px 0' }}>
              This carousel gallery uses <strong>SummaryCard (compact)</strong>, which pairs well
              with:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>
                <strong>SummaryCard (size="compact")</strong> - Optimized for discovery/carousel
                layouts with 4:3 images and dense typography
              </li>
              <li>
                <strong>SummaryCard (default)</strong> - General-purpose cards with flexible image
                layouts (1 or multiple images)
              </li>
              <li>
                <strong>ImageCard</strong> - Image-focused cards with minimal text overlay
              </li>
              <li>
                <strong>Chip</strong> - For feature tags, ratings, and interactive badges in cards
              </li>
              <li>
                <strong>Icon</strong> - Icon support in badges and throughout card content
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  },
};
