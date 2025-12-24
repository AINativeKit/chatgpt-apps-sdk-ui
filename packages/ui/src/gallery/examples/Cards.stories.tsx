import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard, SummaryCard, ListCard } from '../../components/Card';
import { codeBlockStyles } from '../../components/storybook/codeBlockStyles';

// Dummy component for Storybook
const CardsExample = () => null;

const meta: Meta<typeof CardsExample> = {
  title: 'Gallery/Cards',
  component: CardsExample,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CardsExample>;

const CardsComponent = () => {
  const [selectedCard, setSelectedCard] = useState<string>('none');
  const featuredImagePrimary = 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png';
  const featuredImageSecondary = 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png';
  const featuredImageTertiary = 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png';

  return (
    <div
      style={{
        maxWidth: '1200px',
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
          🎨 Card Components
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--ai-color-text-secondary)',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          Flexible card components for displaying content in different layouts. From image galleries
          to summaries and lists, cards are the building blocks for structured content presentation.
          Each card type is optimized for specific use cases.
        </p>
      </section>

      {/* Live Examples */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ai-color-text-primary)',
          }}
        >
          Live Examples
        </h2>

        {/* ImageCard Example */}
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            📸 ImageCard - Image-First Content
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Large background image with text overlay, title, and action button. Perfect for
            restaurants, products, hotels, and featured content with strong visual hierarchy.
          </p>

          {/* Standard Variant */}
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '12px',
              marginTop: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Standard Variant
          </h4>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Full-featured variant with prominent display, badges, and clear call-to-action buttons.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '24px',
              maxWidth: '1050px',
            }}
          >
            {[
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                title: "Tony's Pizzeria",
                subtitle: 'Award-Winning',
                badge: 'NEW',
                badgeVariant: 'soft' as const,
              },
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
                title: 'Golden Boy Pizza',
                subtitle: 'Since 1994',
              },
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
                title: 'Pizzeria Delfina',
                subtitle: 'Sophisticated Italian',
              },
            ].map((item, i) => (
              <div key={i}>
                <ImageCard
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  badge={item.badge}
                  badgeVariant={item.badgeVariant}
                  interactive
                  actionIcon="plus-add-md"
                  actionLabel={`Add ${item.title} to cart`}
                  onAction={() => console.log(`Added ${item.title}`)}
                />
              </div>
            ))}
          </div>

          {/* Compact Variant */}
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '12px',
              marginTop: '32px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Compact Variant
          </h4>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Space-efficient version for carousels, horizontal scrolling lists, and discovery feeds.
            Perfect for browsing and quick interaction.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {[
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                title: "Tony's Pizzeria",
                subtitle: 'Napoletana',
              },
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
                title: 'Golden Boy Pizza',
                subtitle: 'By-the-Slice',
              },
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
                title: 'Pizzeria Delfina',
                subtitle: 'Authentic',
              },
              {
                image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                title: 'Pepo Pizza',
                subtitle: 'Sicilian',
              },
            ].map((item, i) => (
              <div key={i}>
                <ImageCard
                  size="compact"
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                  interactive
                  actionIcon="star"
                  actionLabel={`Save ${item.title}`}
                  onAction={() => console.log(`Saved ${item.title}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SummaryCard Example */}
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            📊 SummaryCard - Flexible Image Layouts
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Display content summaries with flexible image layouts—from single hero images to
            multi-image grids. Perfect for restaurant listings, product summaries, and content
            previews.
          </p>

          {/* Single Image */}
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '12px',
              marginTop: '24px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Single Hero Image
          </h4>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Full-width primary image for featured content with prominent visual hierarchy.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              marginBottom: '24px',
              maxWidth: '700px',
            }}
          >
            {[
              {
                images: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                title: "Tony's Pizzeria",
                subtitle: 'Downtown Location',
                badge: '9.2',
                badgeVariant: 'soft' as const,
                description:
                  'Award-winning Napoletana pizza. A family-owned favorite since 1985 with authentic Italian recipes.',
              },
              {
                images: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
                title: 'Golden Boy Pizza',
                subtitle: 'Mission District',
                badge: '8.9',
                badgeVariant: 'soft' as const,
                description:
                  'Famous by-the-slice pizzeria. Fresh ingredients and traditional techniques keep crowds coming.',
              },
            ].map((item, i) => (
              <div key={i}>
                <SummaryCard
                  images={item.images}
                  title={item.title}
                  subtitle={item.subtitle}
                  badge={item.badge}
                  badgeVariant={item.badgeVariant}
                  description={item.description}
                  buttonText="View Details"
                />
              </div>
            ))}
          </div>

          {/* Multiple Images */}
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '600',
              marginBottom: '12px',
              marginTop: '32px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            Multiple Images (2-4 Grid)
          </h4>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Grid layouts showcase multiple products or menu items in balanced layouts.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '24px',
              maxWidth: '1050px',
            }}
          >
            {[
              {
                images: [
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
                ],
                title: 'Menu Showcase',
                subtitle: 'Popular Items',
                badge: 'Featured',
                badgeVariant: 'soft' as const,
                description:
                  'Explore our most-loved dishes. Hand-crafted with premium ingredients.',
              },
              {
                images: [
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
                ],
                title: "Chef's Selection",
                subtitle: "This Week's Specials",
                badge: 'Hot',
                badgeVariant: 'soft' as const,
                description: 'Limited-time seasonal specials created by our head chef.',
              },
              {
                images: [
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
                  'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                ],
                title: 'Photo Gallery',
                subtitle: 'Restaurant Collection',
                badge: 'Gallery',
                badgeVariant: 'soft' as const,
                description:
                  'Complete visual showcase with 2x2 image grid layout for rich content.',
              },
            ].map((item, i) => (
              <div key={i}>
                <SummaryCard
                  images={item.images}
                  title={item.title}
                  subtitle={item.subtitle}
                  badge={item.badge}
                  badgeVariant={item.badgeVariant}
                  description={item.description}
                  buttonText="View"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ListCard Example */}
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            📋 ListCard - Item Collections
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Common list card configurations with optional header, top image, and action buttons.
            Perfect for menus, playlists, order summaries, and content collections.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '24px',
              maxWidth: '1050px',
            }}
          >
            {[
              {
                title: 'Featured Pizzas',
                headerActionLabel: 'Edit featured pizzas',
                topImage:
                  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
                items: [
                  {
                    title: 'Pepperoni Pizza',
                    subtitle: 'Classic favorite',
                    description:
                      'Cupped pepperoni with mozzarella, finished with oregano and olive oil.',
                    actionLabel: 'Add to cart',
                  },
                  {
                    title: 'Margherita Pizza',
                    subtitle: 'Traditional Italian',
                    description: 'Fresh mozzarella, tomatoes, basil, and extra virgin olive oil.',
                    actionLabel: 'Add to cart',
                  },
                  {
                    title: 'Veggie Supreme',
                    subtitle: 'Garden fresh',
                    description: 'Bell peppers, onions, mushrooms, olives, and fresh vegetables.',
                    actionLabel: 'Add to cart',
                  },
                ],
                buttonText: 'View All',
              },
              {
                title: 'Order Summary',
                headerActionLabel: 'Edit order',
                items: [
                  {
                    title: 'Pepperoni Pizza',
                    subtitle: 'Classic favorite',
                    description:
                      'Cupped pepperoni with mozzarella, finished with oregano and olive oil.',
                    actionLabel: 'Add to cart',
                  },
                  {
                    title: 'Margherita Pizza',
                    subtitle: 'Traditional Italian',
                    description: 'Fresh mozzarella, tomatoes, basil, and extra virgin olive oil.',
                    actionLabel: 'Add to cart',
                  },
                ],
                buttonText: 'Place Order',
              },
              {
                title: 'Quick Add',
                items: [
                  {
                    title: 'Pepperoni Pizza',
                    subtitle: 'Classic favorite',
                    description:
                      'Cupped pepperoni with mozzarella, finished with oregano and olive oil.',
                    onItemAction: () => console.log('Add'),
                    actionLabel: 'Add',
                  },
                  {
                    title: 'Margherita Pizza',
                    subtitle: 'Traditional Italian',
                    description: 'Fresh mozzarella, tomatoes, basil, and extra virgin olive oil.',
                    onItemAction: () => console.log('Add'),
                    actionLabel: 'Add',
                  },
                ],
              },
            ].map((config, i) => (
              <div key={i}>
                <ListCard
                  headerTitle={config.title}
                  headerActionLabel={config.headerActionLabel}
                  onHeaderAction={() => console.log('Header action')}
                  items={config.items}
                  topImage={config.topImage}
                  buttonText={config.buttonText}
                  onButtonClick={() => console.log('Button clicked')}
                  style={{ maxWidth: '375px' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SummaryCard Compact Example (replaces DiscoveryCard) */}
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: 'var(--ai-color-text-primary)',
            }}
          >
            ⭐ SummaryCard Compact - Featured Recommendations
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ai-color-text-secondary)',
              marginBottom: '16px',
            }}
          >
            Premium featured content with 4:3 aspect ratio images, ratings, feature highlights, and
            strong visual prominence. Perfect for discovery browsing, restaurant recommendations,
            and spotlights. Uses compact size variant for denser layout.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 280px))',
              gap: '16px',
              margin: '0 0 24px 0',
              maxWidth: '1200px',
              width: 'fit-content',
              justifyContent: 'start',
            }}
          >
            {[
              {
                image: featuredImagePrimary,
                title: "Tony's Pizzeria",
                subtitle: 'Downtown SF',
                badge: '4.9',
                badgeIcon: 'star',
                features: ['Napoletana', 'Wood-fired'],
                description: 'Family-owned since 1985. Award-winning authentic recipes.',
              },
              {
                image: featuredImageSecondary,
                title: 'Golden Boy Pizza',
                subtitle: 'Mission District',
                badge: '4.7',
                badgeIcon: 'star',
                features: ['$$$', 'Focaccia', 'Fresh daily'],
                description: 'Famous by-the-slice since 1994. Legendary in the city.',
              },
              {
                image: featuredImageTertiary,
                title: 'Top Rated This Month',
                subtitle: 'Local Favorite',
                badge: '🔥 Trending',
                badgeIcon: undefined,
                features: [],
                description: 'What the community is ordering most right now.',
              },
            ].map((item, i) => (
              <SummaryCard
                key={i}
                images={item.image}
                title={item.title}
                subtitle={item.subtitle}
                badge={item.badge}
                size="compact"
                imageAspectRatio="4/3"
                metadata={item.features.map((f) => ({ label: f, separator: '•' }))}
                description={item.description}
                buttonText={i === 2 ? 'Discover' : 'Order now'}
                onButtonClick={() => console.log(`Action for ${item.title}`)}
                style={{ width: '280px' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Component Selection Guide */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ai-color-text-primary)',
          }}
        >
          Component Selection Guide
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              title: '📸 ImageCard',
              description: 'Visual-first content with image, title, and metadata.',
              bestFor: 'Product listings, galleries, restaurant/hotel finder, image-heavy content',
              features: [
                'Large image display',
                'Title + subtitle',
                'Flexible actions',
                'Selection state',
              ],
            },
            {
              title: '📊 SummaryCard',
              description: 'Compact data summary with metrics and status.',
              bestFor: 'Dashboard metrics, project status, achievement summaries, KPI display',
              features: [
                'Optional images',
                'Title + subtitle',
                'Badge + description',
                'Button support',
              ],
            },
            {
              title: '📋 ListCard',
              description: 'Structured data in list format with metadata.',
              bestFor: 'To-do lists, steps, collections, structured data, action items',
              features: [
                'Top image',
                'List items with metadata',
                'Header + button',
                'Flexible layout',
              ],
            },
            {
              title: '⭐ SummaryCard Compact',
              description: 'Dense layout with compact typography (replaces DiscoveryCard).',
              bestFor: 'Featured products, spotlight content, recommendations, carousels',
              features: [
                '4:3 aspect ratio',
                'Compact typography',
                'Badge support',
                'Metadata separators',
              ],
            },
          ].map((card, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                border: '1px solid var(--ai-color-border-light)',
                borderRadius: '8px',
                background: 'var(--ai-color-bg-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                ...(selectedCard === card.title
                  ? {
                      borderColor: 'var(--ai-color-accent-blue)',
                      background: 'var(--ai-color-bg-secondary)',
                      boxShadow: '0 0 0 2px var(--ai-color-accent-blue)',
                    }
                  : {}),
              }}
              onClick={() => setSelectedCard(card.title)}
            >
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: 'var(--ai-color-text-primary)',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--ai-color-text-secondary)',
                  margin: '0 0 12px 0',
                  fontStyle: 'italic',
                }}
              >
                {card.description}
              </p>
              <div
                style={{
                  fontSize: '12px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--ai-color-border-light)',
                }}
              >
                <strong style={{ color: 'var(--ai-color-text-primary)' }}>Best for:</strong>
                <p style={{ margin: '4px 0 0 0', color: 'var(--ai-color-text-secondary)' }}>
                  {card.bestFor}
                </p>
              </div>
              <div style={{ fontSize: '12px' }}>
                <strong style={{ color: 'var(--ai-color-text-primary)' }}>Features:</strong>
                <ul
                  style={{
                    margin: '4px 0 0 0',
                    paddingLeft: '20px',
                    color: 'var(--ai-color-text-secondary)',
                  }}
                >
                  {card.features.map((feature, i) => (
                    <li key={i} style={{ fontSize: '11px' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Practices Section */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ai-color-text-primary)',
          }}
        >
          Best Practices for Developers
        </h2>

        <div style={{ display: 'grid', gap: '24px' }}>
          {[
            {
              title: '✓ Choose the Right Card Type',
              description: 'Select based on content type and user intent:',
              details: [
                'ImageCard: Visual-heavy content needing strong visual hierarchy',
                'SummaryCard: Metrics, KPIs, status at a glance (use size="compact" for denser layout)',
                'ListCard: Structured multi-item data with metadata',
              ],
            },
            {
              title: '✓ Image Optimization',
              description: 'Always optimize images for web:',
              details: [
                'Use responsive image formats (WebP with JPEG fallback)',
                'Compress images to reduce bundle size',
                'Provide appropriate aspect ratios (16:9 recommended)',
                'Add alt text for accessibility',
              ],
            },
            {
              title: '✓ Content Structure',
              description: 'Keep content concise and scannable:',
              details: [
                'Use clear, descriptive titles (avoid generic names)',
                'Keep descriptions under 100 characters when possible',
                'Use subtitle/metadata for secondary context',
                'Limit actions to 2-3 primary actions per card',
              ],
            },
            {
              title: '✓ Accessibility',
              description: 'Make cards accessible to all users:',
              details: [
                'Include alt text for images',
                'Use semantic HTML and ARIA labels',
                'Ensure sufficient color contrast (WCAG AA minimum)',
                'Support keyboard navigation for interactive cards',
              ],
            },
            {
              title: '✓ Performance',
              description: 'Optimize card rendering:',
              details: [
                'Lazy load images when cards are below viewport',
                'Memoize card components to prevent unnecessary re-renders',
                'Use pagination or virtual scrolling for large lists',
                'Optimize component props to avoid deep re-renders',
              ],
            },
            {
              title: '✓ Responsive Design',
              description: 'Cards should work on all device sizes:',
              details: [
                'Use responsive grid layouts (auto-fit, minmax)',
                'Adjust font sizes for mobile screens',
                'Stack cards vertically on mobile (1 column)',
                'Test on real devices, not just browser resizing',
              ],
            },
          ].map((practice, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                borderLeft: '4px solid var(--ai-color-accent-blue)',
                background: 'var(--ai-color-bg-secondary)',
                borderRadius: '4px',
              }}
            >
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: 'var(--ai-color-text-primary)',
                }}
              >
                {practice.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--ai-color-text-secondary)',
                  margin: '0 0 12px 0',
                }}
              >
                {practice.description}
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '12px',
                  color: 'var(--ai-color-text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {practice.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ai-color-text-primary)',
          }}
        >
          Real-World Use Cases
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              title: '🍕 Restaurant Finder',
              description: 'ImageCard grid for browsing restaurants with ratings and cuisines',
            },
            {
              title: '📱 Product Catalog',
              description:
                'Mix of ImageCard and SummaryCard (compact) for featured and regular items',
            },
            {
              title: '✈️ Travel Guide',
              description: 'ImageCard for attractions + ListCard for itineraries and guides',
            },
            {
              title: '📊 Dashboard',
              description: 'SummaryCard for KPIs and metrics with real-time updates',
            },
            {
              title: '📚 Learning Platform',
              description: 'ListCard for course steps + SummaryCard (compact) for featured courses',
            },
            {
              title: '🏥 Service Locator',
              description: 'ImageCard for locations + SummaryCard for hours/ratings',
            },
            {
              title: '🛍️ E-commerce',
              description: 'SummaryCard (compact) for sale items + ImageCard for regular products',
            },
            {
              title: '✅ Task Manager',
              description: 'ListCard for to-do items with metadata and progress tracking',
            },
          ].map((useCase, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'var(--ai-color-bg-primary)',
                border: '1px solid var(--ai-color-border-light)',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: 'var(--ai-color-text-primary)',
                }}
              >
                {useCase.title}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--ai-color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Reference */}
      <section style={{ marginBottom: '64px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ai-color-text-primary)',
          }}
        >
          Quick Reference
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
            {`// ImageCard - Visual-first content
<ImageCard
  image="url-or-object"
  title="Product Name"
  subtitle="Category"
  selected={isSelected}
  onClick={handleClick}
/>

// SummaryCard - Metrics & Status
<SummaryCard
  title="Metric Title"
  subtitle="Category"
  badge="Value"
  description="Optional text"
/>

// ListCard - Structured Data
<ListCard
  headerTitle="List Title"
  items={itemsArray}
  topImage="optional-url"
/>

// SummaryCard Compact - Featured
<SummaryCard
  images="url"
  title="Title"
  badge="Featured"
  size="compact"
  imageAspectRatio="4/3"
  description="Description"
/>`}
          </pre>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '24px',
            color: 'var(--ai-color-text-primary)',
          }}
        >
          Key Features
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
              title: 'Multiple Variants',
              description: '3 specialized card types with compact size variant',
            },
            {
              title: 'Responsive Design',
              description: 'Adapts seamlessly to mobile, tablet, and desktop',
            },
            {
              title: 'Selection State',
              description: 'Built-in selected state for interactive applications',
            },
            {
              title: 'Flexible Content',
              description: 'Support for images, text, metadata, actions, and lists',
            },
            { title: 'Accessibility', description: 'Full WCAG compliance with semantic HTML' },
            { title: 'Customizable', description: 'Styled with CSS variables for easy theming' },
            { title: 'Performance', description: 'Optimized rendering and lazy loading support' },
            {
              title: 'Developer-Friendly',
              description: 'Simple props-based API with TypeScript support',
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'var(--ai-color-bg-primary)',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  color: 'var(--ai-color-text-primary)',
                }}
              >
                ✓ {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--ai-color-text-secondary)',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Single unified story
export const Cards: Story = {
  render: () => <CardsComponent />,
};
