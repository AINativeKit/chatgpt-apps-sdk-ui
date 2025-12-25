import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
// Skeleton removed - using inline skeleton in components
import { Features } from '../Feature/Features';
import {
  Clock,
  CalendarToday,
  Chat,
  Maps,
} from '@openai/apps-sdk-ui/components/Icon';
import { PropsTable } from '../../tokens/PropsTable';
import { codeBlockStyles } from '../storybook/codeBlockStyles';

const meta: Meta<typeof Card> = {
  title: 'Composed Components/Cards/Cards',
  component: Card,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Main unified Card showcase component
const CardsComponent: React.FC = () => {
  return (
    <div style={{ padding: '48px' }}>
      <h1 style={{ marginBottom: '64px', alignItems: 'start' }}>Card System</h1>

      {/* Introduction */}
      <section style={{ marginBottom: '128px' }}>
        <p
          style={{
            marginBottom: '48px',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-text-lg-size)',
            lineHeight: '1.6',
          }}
        >
          Flexible container component supporting both simple content and complex compound layouts.
          Use Card as a basic container or compose sophisticated layouts with compound components.
        </p>
      </section>

      {/* Basic Cards */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Basic Cards</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Simple cards with direct children - perfect for basic content
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
            alignItems: 'start',
          }}
        >
          <Card elevationLevel={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>Default Card</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                Simple card with elevation level 1
              </span>
            </div>
          </Card>

          <Card elevationLevel={1} interactive>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>Interactive Card</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                Hover to see elevation increase
              </span>
            </div>
          </Card>

          <Card elevationLevel={2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600 }}>Higher Elevation</span>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                Elevation level 2 for more depth
              </span>
            </div>
          </Card>
        </div>

        <details style={{ marginTop: '16px', cursor: 'pointer' }}>
          <summary style={{ fontWeight: 600, marginBottom: '12px' }}>
            Show all elevation levels
          </summary>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '16px',
              alignItems: 'start',
            }}
          >
            {([0, 1, 2, 3, 4, 5] as const).map((level) => (
              <Card
                key={level}
                elevationLevel={level}
                border="default"
                style={{
                  minHeight: '120px',
                  padding: 'var(--spacing-3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <strong>Elevation {level}</strong>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                  {level === 0 ? 'No shadow' : `Shadow level ${level}`}
                </div>
              </Card>
            ))}
          </div>
        </details>
      </section>

      {/* Compound Components - Simple */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Compound Components - Simple Layouts</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Structured layouts using Card.Title, Card.Description, and semantic sections
          </p>
        </header>

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
      </section>

      {/* Card.Image with Aspect Ratio */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Card.Image with Aspect Ratio</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Control image dimensions with the aspectRatio prop for consistent layouts
          </p>
        </header>

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
              <Card.Description>
                Perfect for avatars, product thumbnails, or Instagram-style images
              </Card.Description>
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
              <Card.Description>
                Ideal for video thumbnails and landscape photography
              </Card.Description>
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
              <Card.Description>
                Traditional photography ratio for balanced composition
              </Card.Description>
            </Card.Body>
          </Card>

          <Card>
            <Card.Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
              alt="Portrait aspect ratio"
              aspectRatio="2 / 3"
            />
            <Card.Body>
              <Card.Title as="h4">Portrait (2:3)</Card.Title>
              <Card.Description>
                Vertical orientation for portraits and mobile-first content
              </Card.Description>
            </Card.Body>
          </Card>

          <Card>
            <Card.Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop"
              alt="No aspect ratio (natural)"
            />
            <Card.Body>
              <Card.Title as="h4">Natural (No Ratio)</Card.Title>
              <Card.Description>
                Image uses its natural dimensions when aspectRatio is not specified
              </Card.Description>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Loading States */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Loading States</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Cards support loading states with built-in skeleton UI
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              Default Loading
            </h3>
            <Card elevationLevel={1} loading style={{ minHeight: '280px' }}>
              <p>This content won't show while loading</p>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Uses built-in skeleton with shimmer animation
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              Custom Skeleton
            </h3>
            <Card
              elevationLevel={1}
              loading
              skeleton={
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-tertiary)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          width: '40%',
                          height: 16,
                          backgroundColor: 'var(--color-bg-tertiary)',
                          borderRadius: 4,
                          marginBottom: '8px',
                        }}
                      />
                      <div
                        style={{
                          width: '60%',
                          height: 16,
                          backgroundColor: 'var(--color-bg-tertiary)',
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      height: 150,
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderRadius: 8,
                      marginBottom: '12px',
                    }}
                  />
                  <div
                    style={{
                      width: '80%',
                      height: 16,
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderRadius: 4,
                      marginBottom: '8px',
                    }}
                  />
                  <div
                    style={{
                      width: '90%',
                      height: 16,
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderRadius: 4,
                    }}
                  />
                </>
              }
              style={{ minHeight: '320px' }}
            >
              <p>Custom skeleton layout</p>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Custom layout with avatar, image, and text placeholders
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              Not Loading
            </h3>
            <Card elevationLevel={1}>
              <Card.Header>
                <Card.Title>Normal Content</Card.Title>
                <Card.Description>This card shows content immediately</Card.Description>
              </Card.Header>
              <Card.Body>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                  Regular card content displayed normally without any loading state
                </p>
              </Card.Body>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Standard card for comparison
            </p>
          </div>
        </div>
      </section>

      {/* Error States */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Error States</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Cards support error states with built-in error messaging and retry actions
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              Default Error
            </h3>
            <Card elevationLevel={1} error style={{ minHeight: '280px' }}>
              <p>This content won't show when error state is active</p>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Use <code>error</code> prop to show default error message
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              Custom Error Message
            </h3>
            <Card
              elevationLevel={1}
              error
              errorTitle="Failed to load"
              errorMessage="Unable to fetch the requested data. Please try again."
              style={{ minHeight: '280px' }}
            >
              <p>This content won't show when error state is active</p>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Use <code>errorTitle</code> and <code>errorMessage</code> for custom text
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              With Retry Action
            </h3>
            <Card
              elevationLevel={1}
              error
              errorTitle="Connection failed"
              errorMessage="Could not reach the server"
              onErrorRetry={() => alert('Retry clicked!')}
              style={{ minHeight: '280px' }}
            >
              <p>This content won't show when error state is active</p>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Use <code>onErrorRetry</code> to show a retry button
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--color-text-primary)',
              }}
            >
              Custom Error Content
            </h3>
            <Card
              elevationLevel={1}
              error
              errorContent={
                <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
                  <h3 style={{ margin: '0 0 8px 0' }}>Access Denied</h3>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                    You don't have permission to view this content.
                  </p>
                </div>
              }
              style={{ minHeight: '280px' }}
            >
              <p>This content won't show when error state is active</p>
            </Card>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                marginTop: '8px',
              }}
            >
              Use <code>errorContent</code> for fully custom error UI
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Real-World Examples</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complete card implementations for common use cases
          </p>
        </header>

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
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Card.Title>Premium Headphones</Card.Title>
                <Card.Chip variant="soft" size="sm">
                  New
                </Card.Chip>
              </div>
            </Card.Header>
            <Card.Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
              alt="Premium headphones"
            />
            <Card.Body>
              <Card.Description>
                High-quality wireless headphones with active noise cancellation and 30-hour battery
                life.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton variant="outline">Details</Card.ActionButton>
                <Card.ActionButton variant="solid">Add to Cart</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          {/* Article Card - Documentation Example */}
          <Card elevationLevel={1} interactive>
            <Card.Header>
              <Card.ChipGroup>
                <Card.Chip variant="soft" size="sm">
                  ChatGPT Apps
                </Card.Chip>
                <Card.Chip variant="soft" size="sm">
                  AI-Native
                </Card.Chip>
                <Card.Chip variant="soft" size="sm">
                  UI Components
                </Card.Chip>
              </Card.ChipGroup>
            </Card.Header>
            <Card.Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
              alt="AINativeKit UI library documentation"
            />
            <Card.Body>
              <Card.Title as="h3">Building AI-Native UIs</Card.Title>
              <Card.Description>
                Build modern, accessible UI with AINativeKit. Master reusable component patterns
                that scale.
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

          {/* User Profile Card */}
          <Card elevationLevel={2}>
            <Card.Header>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img
                  src="https://i.pravatar.cc/80"
                  alt="User avatar"
                  style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Card.Title as="h3">Sarah Johnson</Card.Title>
                    <Card.Chip variant="solid" size="sm">
                      Pro
                    </Card.Chip>
                  </div>
                  <Card.Description>Senior Product Designer</Card.Description>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                <p style={{ margin: '0 0 8px 0' }}>📍 San Francisco, CA</p>
                <p style={{ margin: '0 0 8px 0' }}>🏢 Design Systems at Tech Corp</p>
                <p style={{ margin: 0 }}>🎨 Passionate about accessible design</p>
              </div>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton variant="outline">Follow</Card.ActionButton>
                <Card.ActionButton variant="solid">Message</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          {/* Venue/Restaurant Card with Features Meta */}
          <Card elevationLevel={1} interactive>
            <Card.Image
              src="https://images.unsplash.com/photo-1686836715835-65af22ea5cd4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=400&h=200"
              alt="Artisan Bistro"
            />
            <Card.Body>
              <Card.Title as="h3">Artisan Bistro</Card.Title>
              <Card.Description>
                Cozy French bistro with locally-sourced ingredients and an extensive wine selection.
              </Card.Description>
              <Card.Meta>
                <Features
                  items={[{ icon: <Chat />, label: '4.8★' }, '128 reviews', '$$', 'Open now']}
                />
              </Card.Meta>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton variant="outline">Details</Card.ActionButton>
                <Card.ActionButton variant="solid">Book Table</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          {/* Project/Case Study Card */}
          <Card elevationLevel={1} interactive>
            <Card.Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
              alt="Project showcase"
            />
            <Card.Header>
              <Card.ChipGroup>
                <Card.Chip variant="soft" size="sm">
                  Completed
                </Card.Chip>
                <Card.Chip variant="solid" size="sm">
                  2024
                </Card.Chip>
              </Card.ChipGroup>
            </Card.Header>
            <Card.Body>
              <Card.Title as="h3">Design System Overhaul</Card.Title>
              <Card.Description>
                Modernized component library and documentation, improving developer experience by
                40%.
              </Card.Description>
              <Card.Meta>
                <Features
                  items={[{ icon: <CalendarToday />, label: '6 months' }, '8 people']}
                />
              </Card.Meta>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="start">
                <Card.ActionButton variant="solid">View Case Study</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          {/* Team Member Card */}
          <Card elevationLevel={1} interactive>
            <Card.Header>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <img
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Team member avatar"
                  style={{ width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <Card.Title as="h3">Alex Martinez</Card.Title>
                  <Card.Description>Frontend Engineer</Card.Description>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{ marginBottom: '12px' }}>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  Specialized in React and design systems with 5+ years experience.
                </p>
              </div>
              <Card.ChipGroup>
                <Card.Chip variant="solid" size="sm">
                  React
                </Card.Chip>
                <Card.Chip variant="solid" size="sm">
                  TypeScript
                </Card.Chip>
                <Card.Chip variant="solid" size="sm">
                  Design Systems
                </Card.Chip>
              </Card.ChipGroup>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton variant="outline">View Profile</Card.ActionButton>
                <Card.ActionButton variant="solid">Contact</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>
        </div>
      </section>

      {/* Advanced Examples */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Advanced Patterns</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Complex layouts with multiple chips, custom headers, and flexible compositions
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* E-commerce Product */}
          <Card elevationLevel={2} interactive>
            <Card.Header>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
              >
                <div>
                  <Card.Title as="h3">Advanced Product Card</Card.Title>
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    SKU: PROD-12345
                  </div>
                </div>
                <Card.Chip variant="soft">In Stock</Card.Chip>
              </div>
            </Card.Header>
            <Card.Image
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
              alt="Product"
            />
            <Card.Body>
              <Card.Description>
                Premium quality product with exceptional features. Includes warranty and free
                shipping.
              </Card.Description>
              <div
                style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}
              >
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$299.99</div>
                <div
                  style={{
                    fontSize: '16px',
                    textDecoration: 'line-through',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  $399.99
                </div>
                <Card.Chip variant="soft" size="sm">
                  25% OFF
                </Card.Chip>
              </div>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton color="secondary" variant="outline">
                  Wishlist
                </Card.ActionButton>
                <Card.ActionButton variant="solid">Add to Cart</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          {/* Zero Padding */}
          <Card padding={0}>
            <Card.Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
              alt="Tech background"
              style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0', margin: 0 }}
            />
            <div style={{ padding: 'var(--spacing-4)' }}>
              <Card.Title as="h3">Edge-to-Edge Content</Card.Title>
              <Card.Description>
                Set padding to 0 and add it back selectively for edge-to-edge images.
              </Card.Description>
            </div>
          </Card>

          {/* Event Card with Features Meta */}
          <Card interactive>
            <Card.Header>
              <Card.Title as="h4">Design Systems Workshop</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Description>
                Learn best practices for building scalable design systems. Hands-on workshop with
                live demos.
              </Card.Description>
              <Card.Meta>
                <Features
                  items={[
                    { icon: <CalendarToday />, label: 'Oct 30, 2025' },
                    { icon: <Clock />, label: '2:00 PM' },
                    { icon: <Maps />, label: 'Virtual' },
                  ]}
                />
              </Card.Meta>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton variant="outline">Details</Card.ActionButton>
                <Card.ActionButton variant="solid">Register</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>
        </div>
      </section>

      {/* Button Variations */}
      <section style={{ marginBottom: '128px' }}>
        <header style={{ marginBottom: '24px', alignItems: 'start' }}>
          <h2 style={{ marginBottom: '8px' }}>Action Button Variations</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '14px' }}>
            Different button alignments and icon positions
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <Card>
            <Card.Header>
              <Card.Title as="h4">Actions Start</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Description>Left-aligned buttons</Card.Description>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="start">
                <Card.ActionButton variant="solid">Action</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h4">Actions Stretched</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Description>Full-width buttons</Card.Description>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton variant="outline">Cancel</Card.ActionButton>
                <Card.ActionButton variant="solid">Confirm</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h4">With Icons</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Description>Buttons with left and right icons</Card.Description>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="stretch">
                <Card.ActionButton color="secondary" variant="outline">
                  Back
                </Card.ActionButton>
                <Card.ActionButton variant="solid">Next</Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>
        </div>
      </section>

      {/* Usage Section */}
      <section style={{ marginBottom: '128px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Usage</h2>

        <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Two Patterns</h3>
        <p style={{ marginBottom: '16px', color: 'var(--color-text-secondary)' }}>
          Card supports two usage patterns depending on your needs:
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '32px',
            alignItems: 'start',
          }}
        >
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>
              Pattern 1: Simple Card (Direct Children)
            </h4>
            <p
              style={{
                marginBottom: '12px',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
              }}
            >
              For basic content, use Card as a simple container. Best for custom layouts or simple
              content.
            </p>
            <pre style={codeBlockStyles.primary}>
              <code>{`<Card elevationLevel={1}>
  <h3>Title</h3>
  <p>Content goes here</p>
</Card>`}</code>
            </pre>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>
              Pattern 2: Compound Components (Dot Notation)
            </h4>
            <p
              style={{
                marginBottom: '12px',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
              }}
            >
              For structured layouts, use compound components. Provides semantic HTML and consistent
              styling.
            </p>
            <pre style={codeBlockStyles.primary}>
              <code>{`<Card elevationLevel={1} interactive>
  <Card.Header>
    <Card.Title>Product Name</Card.Title>
    <Card.Chip variant="soft">New</Card.Chip>
  </Card.Header>
  <Card.Image src="..." alt="..." />
  <Card.Body>
    <Card.Description>Product details</Card.Description>
  </Card.Body>
  <Card.Footer>
    <Card.Actions align="stretch">
      <Card.ActionButton variant="solid">Buy Now</Card.ActionButton>
    </Card.Actions>
  </Card.Footer>
</Card>`}</code>
            </pre>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '24px' }}>
          Available Compound Components
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Header</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Container for title, chips, metadata
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Body</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Main content area with spacing
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Footer</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Bottom section for actions
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Image</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Optimized image display
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Title</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Semantic heading (default h2)
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Description</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Text content with styling
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Meta</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Metadata with tertiary styling. Works great with Features component for consistent
              metadata lists
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Actions</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Button group with alignment
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.ActionButton</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Pre-styled action button
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.ChipGroup</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Container for grouping chips with automatic spacing and wrapping
            </p>
          </div>
          <div
            style={{
              padding: '12px',
              background: 'var(--color-bg-secondary)',
              borderRadius: '8px',
            }}
          >
            <strong style={{ fontSize: '14px' }}>Card.Chip</strong>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Chip for tags and status (use inside Card.ChipGroup)
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '24px' }}>When to Use</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '24px',
            alignItems: 'start',
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '14px',
                marginBottom: '8px',
                color: 'var(--color-accent-green)',
              }}
            >
              ✅ Good Use Cases
            </h4>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.8',
              }}
            >
              <li>Product/service listings</li>
              <li>User profiles and contact cards</li>
              <li>Article/blog post previews</li>
              <li>Dashboard widgets</li>
              <li>Feature highlights</li>
              <li>Settings panels</li>
              <li>Notification cards</li>
            </ul>
          </div>
          <div>
            <h4
              style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--color-accent-red)' }}
            >
              ❌ Don't Use For
            </h4>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.8',
              }}
            >
              <li>Page-level containers (use layout components)</li>
              <li>Form containers (use Form component)</li>
              <li>Modal/dialog content (use Dialog)</li>
              <li>Primary navigation</li>
              <li>Data tables</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section style={{ marginBottom: '128px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Accessibility</h2>

        <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Best Practices</h3>
        <ul
          style={{
            margin: '0 0 24px 0',
            paddingLeft: '20px',
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
            lineHeight: '1.8',
          }}
        >
          <li>Use semantic headings (Card.Title) to create proper document structure</li>
          <li>Provide alt text for Card.Image components</li>
          <li>Ensure sufficient color contrast for text content</li>
          <li>
            Make interactive cards keyboard accessible (they automatically become buttons when
            onClick is provided)
          </li>
          <li>Use aria-label on Card.ActionButton when using iconOnly prop</li>
        </ul>

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '24px' }}>
          Interactive Cards
        </h3>
        <p style={{ marginBottom: '12px', color: 'var(--color-text-secondary)' }}>
          When Card has <code>interactive</code> prop, it becomes keyboard accessible:
        </p>
        <pre style={{ ...codeBlockStyles.primary, marginBottom: '24px', alignItems: 'start' }}>
          <code>{`// Interactive cards get hover effects
<Card interactive onClick={() => navigate('/product')}>
  <Card.Title>Product Name</Card.Title>
  <Card.Description>Click to view details</Card.Description>
</Card>

// Keyboard: Tab to focus, Enter/Space to activate`}</code>
        </pre>
      </section>

      {/* Props Section */}
      <section style={{ marginBottom: '128px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Props</h2>

        <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Card (Base Component)</h3>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'elevationLevel',
              description:
                'Elevation level for shadow and overlay. Options: 0 | 1 | 2 | 3 | 4 | 5. Default: 1',
            },
            {
              name: 'border',
              description:
                'Border weight. Options: "light" | "default" | "heavy". Default: "heavy"',
            },
            {
              name: 'interactive',
              description:
                'Enable hover effects with elevation increase. Makes card clickable when onClick provided. Default: false',
            },
            {
              name: 'hoverElevationLevel',
              description:
                'Custom elevation level on hover. Auto-increments by 1 if not specified.',
            },
            {
              name: 'padding',
              description:
                'Card padding. CSS value string or number (in px). Default: "var(--spacing-4)"',
            },
            {
              name: 'onClick',
              description:
                'Click handler. When provided, card becomes interactive and keyboard accessible.',
            },
            {
              name: 'data-testid',
              description: 'Test ID for testing purposes.',
            },
          ]}
        />

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '32px' }}>Card.Actions</h3>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'align',
              description:
                'Button alignment. Options: "start" | "center" | "end" | "stretch". Default: "end"',
            },
          ]}
        />

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '32px' }}>
          Card.ActionButton
        </h3>
        <p
          style={{
            marginBottom: '12px',
            color: 'var(--color-text-secondary)',
            fontSize: '14px',
          }}
        >
          Inherits all Button props. See{' '}
          <a
            href="?path=/story/primitive-components-buttons--buttons"
            style={{ color: 'var(--color-accent-blue)', textDecoration: 'none' }}
          >
            Button component
          </a>{' '}
          for full props list.
        </p>

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '32px' }}>Card.Title</h3>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'as',
              description:
                'HTML heading element. Options: "h1" | "h2" | "h3" | "h4" | "h5" | "h6". Default: "h2"',
            },
          ]}
        />

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '32px' }}>Card.Image</h3>
        <PropsTable
          hideThemeColumn
          rows={[
            {
              name: 'src',
              description: 'Image source URL (required)',
            },
            {
              name: 'alt',
              description: 'Alt text for accessibility (required)',
            },
            {
              name: 'aspectRatio',
              description:
                'Optional aspect ratio for the image (e.g., "16/9", "3/2", "1/1"). Controls the display ratio using CSS aspect-ratio.',
            },
          ]}
        />

        <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '32px' }}>
          Other Compound Components
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Card.Header, Card.Body, Card.Footer, Card.Description, Card.Meta, Card.ChipGroup accept
          standard HTML props for their respective elements. Card.Chip inherits all{' '}
          <a
            href="?path=/story/primitive-components-chips--chips"
            style={{ color: 'var(--color-accent-blue)', textDecoration: 'none' }}
          >
            Chip props
          </a>
          .
        </p>
      </section>
    </div>
  );
};

// Single unified story
export const Cards: StoryObj = {
  render: () => <CardsComponent />,
};
