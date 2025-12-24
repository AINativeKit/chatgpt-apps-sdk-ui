import { useState } from 'react';
import type { CSSProperties, ReactNode, MouseEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Album } from './components/Album';
import type { Album as AlbumType } from './components/Album/types';
import { Carousel as CarouselComponent } from './components/Carousel';
import { Card, SummaryCard } from './components/Card';
import { List, ListItem } from './components/List';
import { Button } from '@openai/apps-sdk-ui/components/Button';
import { Map, FullscreenMap } from './components/Map';
import { Features } from './components/Feature/Features';
import { codeBlockStyles } from './components/storybook/codeBlockStyles';
import type { LocationData } from './components/Map/types';

type PizzaRestaurant = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  badge: string;
  features: string[];
};

type PizzaPlace = {
  id: string;
  name: string;
  city: string;
  rating: number;
  thumbnail: string;
};

const sampleAlbums: AlbumType[] = [
  {
    id: 'responsive-showcase',
    title: 'Responsive Design Showcase',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'landscape',
        title: 'Mountain Majesty (16:9)',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop',
        alt: 'Majestic mountain landscape in full resolution',
      },
      {
        id: 'portrait',
        title: 'Winter Portrait (2:3)',
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&h=1200&fit=crop',
        alt: 'Winter portrait in full resolution',
      },
      {
        id: 'square',
        title: 'Coffee Culture (1:1)',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1000&h=1000&fit=crop',
        alt: 'Coffee cup on wooden table in full resolution',
      },
    ],
  },
  {
    id: 'nature-wonders',
    title: 'Nature Wonders',
    cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'n1',
        title: 'Forest Serenity',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
        alt: 'Peaceful forest with natural light filtering through trees',
      },
      {
        id: 'n2',
        title: 'Alpine Peaks',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        alt: 'Snow-covered mountain peaks reaching towards the sky',
      },
    ],
  },
  {
    id: 'urban-exploration',
    title: 'Urban Exploration',
    cover: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
    photos: [
      {
        id: 'u1',
        title: 'City Lights (16:9)',
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&h=900&fit=crop',
        alt: 'City skyline at night with beautiful lights and reflections',
      },
      {
        id: 'u2',
        title: 'Urban Architecture (2:3)',
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1200&fit=crop',
        alt: 'Modern urban building architecture with geometric patterns',
      },
      {
        id: 'u3',
        title: 'Street Photography (1:1)',
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=1000&fit=crop',
        alt: 'Dynamic street scene with people and urban elements',
      },
    ],
  },
];

const pizzaRestaurants: PizzaRestaurant[] = [
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
    description:
      'Focaccia-style squares with fluffy, airy texture and perfectly crispy edges. A late-night favorite among locals who crave authentic Italian-style pizza.',
    badge: '4.6',
    features: ['$$', 'Focaccia', 'Late-night'],
  },
  {
    id: 'slice-society',
    title: 'Slice Society',
    subtitle: '839 Valencia Street',
    image: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    description: 'Lively slice shop with a cult following. Best slices in the Mission.',
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

const pizzaPlaces: PizzaPlace[] = [
  {
    id: '1',
    name: "Tony's Pizza Napoletana",
    city: 'North Beach',
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Golden Boy Pizza',
    city: 'North Beach',
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Pizzeria Delfina (Mission)',
    city: 'Mission',
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Little Star Pizza',
    city: 'Alamo Square',
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&h=200&fit=crop',
  },
];

const sampleLocations: LocationData[] = [
  {
    id: 'tonys-pizza',
    name: "Tony's Pizza Napoletana",
    subtitle: 'Neapolitan Pizzeria · North Beach',
    coords: [37.8001, -122.4098],
    description:
      'Award-winning Neapolitan pies in North Beach. A San Francisco institution serving authentic Italian pizza with locally-sourced ingredients.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
    features: [{ icon: 'star', label: '4.8' }, { label: '$$$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Contact', variant: 'secondary' },
    ],
    lists: [
      {
        title: 'Reviews',
        items: [
          {
            id: 'review-1',
            title: 'Sarah M.',
            metadata: '2 weeks ago',
            description:
              'Great location! The service was excellent and the atmosphere was perfect.',
          },
          {
            id: 'review-2',
            title: 'John D.',
            metadata: '1 month ago',
            description: 'Highly recommend! Will definitely come back with friends.',
          },
        ],
      },
    ],
  },
  {
    id: 'golden-boy',
    name: 'Golden Boy Pizza',
    subtitle: 'Focaccia Pizza · North Beach',
    coords: [37.799, -122.4093],
    description:
      'Focaccia-style squares, late-night favorite. Classic North Beach spot known for thick, fluffy focaccia pizza by the slice.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png',
    features: [{ icon: 'star', label: '4.6' }, { label: '$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Call', variant: 'secondary' },
    ],
    lists: [
      {
        title: 'Reviews',
        items: [
          {
            id: 'review-1',
            title: 'Maria L.',
            metadata: '3 weeks ago',
            description: 'Late-night gem! Best focaccia pizza in the city.',
          },
        ],
      },
    ],
  },
  {
    id: 'delfina',
    name: 'Pizzeria Delfina',
    subtitle: 'Thin-Crust Pizza · Mission District',
    coords: [37.7613, -122.4255],
    description:
      'Thin-crust classics on 18th Street. Celebrated for perfectly charred, thin-crust pizzas made in a wood-burning oven.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png',
    features: [{ icon: 'star', label: '4.5' }, { label: '$$' }],
    actions: [
      { label: 'Add to favorites', variant: 'primary' },
      { label: 'Reservations', variant: 'secondary' },
    ],
  },
  {
    id: 'flour-water',
    name: 'Flour + Water Pizzeria',
    subtitle: 'Artisan Pizza · Mission District',
    coords: [37.7775, -122.4388],
    description:
      'Deep-dish and cornmeal crust favorites. Innovative pizzeria from the Flour + Water team with seasonal rotating menu.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    features: [{ icon: 'star', label: '4.5' }, { label: '$$' }],
  },
  {
    id: 'beretta',
    name: 'Beretta',
    subtitle: 'Wood-Fired Pizzeria · North Beach',
    coords: [37.799, -122.4077],
    description:
      'Wood-fired pies and burrata in North Beach. Stylish spot combining pizza excellence with a full cocktail program.',
    thumbnail: 'https://persistent.oaistatic.com/pizzaz/pizzaz-4.png',
    features: [{ icon: 'star', label: '4.6' }, { label: '$$' }],
  },
];

const pageContainerStyle: CSSProperties = {
  maxWidth: '768px',
  margin: '0 auto',
  padding: '40px 20px',
  fontFamily:
    'var(--font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
  color: 'var(--color-text)',
};

const userMessageWrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '16px',
};

const userMessageBubbleStyle: CSSProperties = {
  background: 'var(--color-surface-secondary)',
  padding: '12px 16px',
  borderRadius: '18px',
  maxWidth: '80%',
  color: 'var(--color-text)',
  fontSize: '15px',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
};

const assistantMessageWrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '24px',
  color: 'var(--color-text)',
  fontSize: '15px',
  lineHeight: '1.5',
  width: '100%',
};

const assistantMessageInnerStyle: CSSProperties = { width: '100%' };

const contentSectionStyle: CSSProperties = {
  marginBottom: '12px',
  marginTop: '12px',
  marginLeft: '0',
  marginRight: '0',
};

const actionButtonsStyle: CSSProperties = {
  display: 'flex',
  gap: '12px',
  marginTop: '12px',
  color: 'var(--color-text-secondary)',
};

const assistantIntroStyle: CSSProperties = { marginBottom: '16px' };

const assistantParagraphStyle: CSSProperties = { marginBottom: '12px' };

const mapContainerStyle: CSSProperties = {
  width: '100%',
  height: '478px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: 'var(--elevation-2-shadow)',
};

// Use unified code block styles (primary for main examples, terminal for CLI commands)
const codeBlockStyle = codeBlockStyles.primary;

const assistantFooterStyle: CSSProperties = {
  marginTop: '16px',
  color: 'var(--color-text-secondary)',
};

const fullscreenOverlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  backgroundColor: 'var(--color-surface)',
  display: 'flex',
  flexDirection: 'column',
  fontFamily:
    'var(--font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
};

const fullscreenContentStyle: CSSProperties = {
  flex: 1,
  overflow: 'auto',
};

const UserMessage = ({ children }: { children: ReactNode }) => (
  <div style={userMessageWrapperStyle}>
    <div style={userMessageBubbleStyle}>{children}</div>
  </div>
);

const AssistantMessage = ({ children }: { children: ReactNode }) => (
  <div style={assistantMessageWrapperStyle}>
    <div style={assistantMessageInnerStyle}>{children}</div>
  </div>
);

const ActionButtons = () => (
  <div style={actionButtonsStyle}>
    <span style={{ fontSize: '16px', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
      👍
    </span>
    <span style={{ fontSize: '16px', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
      👎
    </span>
    <span style={{ fontSize: '16px', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
      📋
    </span>
    <span style={{ fontSize: '16px', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
      ⋯
    </span>
  </div>
);

const IntroductionPage = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>(undefined);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const scrollPositionRef = useState({ current: 0 })[0];

  const handleExitFullscreen = () => {
    setIsMapFullscreen(false);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
    });
  };

  const handleEnterFullscreen = () => {
    scrollPositionRef.current = window.scrollY;
    setIsMapFullscreen(true);
  };

  if (isMapFullscreen) {
    return (
      <div style={fullscreenOverlayStyle}>
        <div style={fullscreenContentStyle}>
          <FullscreenMap
            locations={sampleLocations}
            selectedId={selectedLocationId}
            onLocationSelect={(id) => setSelectedLocationId(id)}
            onCollapse={handleExitFullscreen}
            defaultCenter={[37.7949, -122.4094]}
            defaultZoom={13}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={pageContainerStyle}>
      <UserMessage>What is AI Native Kit?</UserMessage>

      <AssistantMessage>
        <div style={assistantParagraphStyle}>
          <strong>AI Native Kit</strong> is your fast lane to building beautiful ChatGPT apps 🎨
        </div>
        <div style={assistantParagraphStyle}>
          We've analyzed every OpenAI Apps SDK example and their Figma design system, then turned
          them into production-ready React components. No more building from scratch!
        </div>
        <div style={assistantParagraphStyle}>
          <strong>What you get:</strong>
        </div>
        <div style={assistantParagraphStyle}>
          ✓ Full TypeScript support with IntelliSense
          <br />
          ✓ Responsive design out of the box
          <br />
          ✓ Dark & light mode automatically
          <br />
          ✓ Built on OpenAI's official design system
          <br />
          ✓ 417 ready-to-use icons
          <br />✓ WCAG 2.1 AA accessible
        </div>
        <div style={assistantParagraphStyle}>
          <strong>Bottom line:</strong> Stop rebuilding the same components. Start shipping features
          faster 🚀
        </div>
        <ActionButtons />
      </AssistantMessage>

      <UserMessage>Show me a quick example 👀</UserMessage>

      <AssistantMessage>
        <div style={assistantIntroStyle}>
          Let's start simple! Here's how you transform JSON data into beautiful{' '}
          <strong>Cards</strong> 🎴
        </div>
        <div style={assistantParagraphStyle}>
          Just pass your data (products, articles, restaurants) and we'll render beautiful Cards
          automatically. No layout work needed! Here are examples with different data types:
        </div>
        <div
          style={{
            ...contentSectionStyle,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Restaurant from JSON - Real-World Example */}
          <SummaryCard
            elevationLevel={1}
            interactive
            images={[
              {
                src: 'https://persistent.oaistatic.com/pizzaz/pizzaz-1.png',
                alt: 'Signature Pizza',
              },
              { src: 'https://persistent.oaistatic.com/pizzaz/pizzaz-2.png', alt: 'Fresh Pasta' },
              { src: 'https://persistent.oaistatic.com/pizzaz/pizzaz-3.png', alt: 'Garden Salad' },
            ]}
            title="Little Nona's"
            subtitle="1427 Via Campania, North Beach"
            badge="9.2"
            badgeVariant="soft"
            description="A tiny, brick-walled trattoria tucked down a side street near Washington Square Park. The windows glow warm gold at night."
            metadata={[
              { icon: 'star', label: '9.2 rating' },
              { icon: 'map-pin', label: 'North Beach' },
              { icon: 'clock', label: 'Open now' },
            ]}
            buttonText="Reserve"
            onButtonClick={() => {}}
          />

          {/* Article from JSON */}
          <SummaryCard
            elevationLevel={1}
            interactive
            images="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
            title="Building AI-Native UIs"
            description="Build modern, accessible UI with AINativeKit. Master reusable component patterns that scale."
            metadata={[
              { icon: 'clock', label: '10 min read' },
              { icon: 'calendar-today', label: 'October 30, 2025' },
            ]}
            buttonText="Explore"
            onButtonClick={() => {}}
          />
        </div>
        <div style={assistantParagraphStyle}>
          Cards are just the beginning! We have specialized components for every use case -
          galleries, carousels, lists, maps, and more:
        </div>
        <ActionButtons />
      </AssistantMessage>

      <UserMessage>What about photo galleries?</UserMessage>

      <AssistantMessage>
        <div style={assistantIntroStyle}>
          Great question! The <strong>Album</strong> component is perfect for that 📸
        </div>
        <div style={assistantParagraphStyle}>
          Features fullscreen viewing, responsive layouts, and smooth carousel navigation. Try
          clicking on an album:
        </div>
        <div style={contentSectionStyle}>
          <Album
            albums={sampleAlbums}
            selectedAlbum={selectedAlbum}
            onAlbumSelect={setSelectedAlbum}
            align="center"
            showNavigation
            flushStart
          />
        </div>
        <ActionButtons />
      </AssistantMessage>

      <UserMessage>Nice! What about browsing multiple items horizontally?</UserMessage>

      <AssistantMessage>
        <div style={assistantIntroStyle}>
          The <strong>Carousel</strong> component has you covered 🎠
        </div>
        <div style={assistantParagraphStyle}>
          Smooth horizontal scrolling with touch/mouse support and responsive behavior. Perfect for
          product showcases or recommendations. Try scrolling:
        </div>
        <div style={{ ...contentSectionStyle, maxWidth: '100%' }}>
          <CarouselComponent flushStart>
            {pizzaRestaurants.map((restaurant) => (
              <div key={restaurant.id} style={{ minWidth: '280px' }}>
                <SummaryCard
                  style={{ width: '280px' }}
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
              </div>
            ))}
          </CarouselComponent>
        </div>
        <ActionButtons />
      </AssistantMessage>

      <UserMessage>How about rankings or search results in vertical lists?</UserMessage>

      <AssistantMessage>
        <div style={assistantIntroStyle}>
          The <strong>List</strong> component handles that beautifully 📋
        </div>
        <div style={assistantParagraphStyle}>
          Perfect for vertical rankings, search results, or any structured data. Features headers,
          media, metadata, and actions. Try clicking the + buttons:
        </div>
        <div style={{ ...contentSectionStyle, maxWidth: '100%' }}>
          <List
            header={{
              title: 'National Best Pizza List',
              subtitle: 'A ranking of the best pizzerias',
              thumbnail:
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
              action: (
                <Button color="primary" variant="solid">
                  Save List
                </Button>
              ),
            }}
            items={pizzaPlaces}
            renderItem={(place: PizzaPlace, index: number) => (
              <ListItem
                key={place.id}
                rank={index + 1}
                title={place.name}
                features={[{ icon: 'star', label: `${place.rating}` }]}
                media={place.thumbnail}
                mediaAlt={place.name}
                metadata={place.city}
                onClick={() =>
                  setSelectedPlaces((prev) =>
                    prev.includes(place.id)
                      ? prev.filter((id) => id !== place.id)
                      : [...prev, place.id]
                  )
                }
                interactive
                action={
                  <Button
                    uniform
                    color="secondary"
                    aria-label={`${selectedPlaces.includes(place.id) ? 'Remove from' : 'Add to'} favorites`}
                    variant="ghost"
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation();
                      setSelectedPlaces((prev) =>
                        prev.includes(place.id)
                          ? prev.filter((id) => id !== place.id)
                          : [...prev, place.id]
                      );
                    }}
                  >
                    {selectedPlaces.includes(place.id) ? '✓' : '+'}
                  </Button>
                }
              />
            )}
          />
        </div>
        <ActionButtons />
      </AssistantMessage>

      <UserMessage>Impressive! What about maps and locations?</UserMessage>

      <AssistantMessage>
        <div style={assistantIntroStyle}>
          The <strong>Map</strong> component has you covered 🗺️
        </div>
        <div style={assistantParagraphStyle}>
          Built on Leaflet with custom markers, location details, and an inspector panel. Click
          markers to see details, or hit expand (top-right) for fullscreen:
        </div>
        <div style={contentSectionStyle}>
          <div style={mapContainerStyle}>
            <Map
              locations={sampleLocations}
              selectedId={selectedLocationId}
              onLocationSelect={setSelectedLocationId}
              isFullscreen={isMapFullscreen}
              onToggleFullscreen={(fullscreen) => {
                if (fullscreen) {
                  handleEnterFullscreen();
                } else {
                  handleExitFullscreen();
                }
              }}
              defaultCenter={[37.7949, -122.4094]}
              defaultZoom={13}
            />
          </div>
        </div>
        <ActionButtons />
      </AssistantMessage>

      <UserMessage>This is amazing! How do I start using it? 🚀</UserMessage>

      <AssistantMessage>
        <div style={assistantParagraphStyle}>
          <strong>You're minutes away from shipping production-ready UIs!</strong> Here are two
          powerful patterns:
        </div>

        <div style={assistantParagraphStyle}>
          <strong>Pattern 1: Map MCP JSON to UI (Simple & Data-Driven)</strong>
        </div>
        <div style={assistantParagraphStyle}>
          Perfect when you have structured data from your backend. The SummaryCard automatically
          handles layouts, images, and actions. Here's the library docs rendered as data:
        </div>
        <div style={codeBlockStyle}>
          import {'{'}SummaryCard{'}'} from '@ainativekit/ui';
          <br />
          <br />
          {'const articleData = {'}
          <br />
          &nbsp;&nbsp;title: "Building AI-Native UIs",
          <br />
          &nbsp;&nbsp;image: "https://images.unsplash.com/...",
          <br />
          &nbsp;&nbsp;description: "Build modern, accessible UI with AINativeKit...",
          <br />
          &nbsp;&nbsp;metadata: [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'{'}icon: 'clock', label: '10 min read{'}'},<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'{'}icon: 'calendar-today', label: 'October 30, 2025{'}'}
          <br />
          &nbsp;&nbsp;]
          <br />
          {'}'};<br />
          <br />
          {'<SummaryCard'}
          <br />
          &nbsp;&nbsp;images={'{articleData.image}'}
          <br />
          &nbsp;&nbsp;title={'{articleData.title}'}
          <br />
          &nbsp;&nbsp;description={'{articleData.description}'}
          <br />
          &nbsp;&nbsp;metadata={'{articleData.metadata}'}
          <br />
          &nbsp;&nbsp;buttonText="Explore Docs"
          <br />
          {'/>'}
          <br />
        </div>
        <div
          style={{
            ...contentSectionStyle,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '360px',
          }}
        >
          {/* Article Card using SummaryCard - shows what it looks like */}
          <SummaryCard
            elevationLevel={1}
            interactive
            images="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
            title="Building AI-Native UIs"
            description="Build modern, accessible UI with AINativeKit. Master reusable component patterns that scale."
            metadata={[
              { icon: 'clock', label: '10 min read' },
              { icon: 'calendar-today', label: 'October 30, 2025' },
            ]}
            buttonText="Explore Docs"
            onButtonClick={() => {}}
          />
        </div>

        <div
          style={{
            ...assistantParagraphStyle,
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <strong>See how the same data adapts to different layouts?</strong> Pattern 1 is fast,
          Pattern 2 is flexible. Pick what works for your use case.
        </div>

        <div style={{ ...assistantParagraphStyle, marginTop: '24px' }}>
          <strong>Pattern 2: Build Custom Layouts (Advanced & Flexible)</strong>
        </div>
        <div style={assistantParagraphStyle}>
          Need more control? Use compound Card components for rich customization. Same data, but
          with custom tags, advanced metadata, and full styling control:
        </div>
        <div style={codeBlockStyle}>
          {'<Card elevationLevel={1} interactive>'}
          <br />
          &nbsp;&nbsp;{'<Card.Header>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'<Card.ChipGroup>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {'<Card.Chip variant="neutral" size="sm">ChatGPT Apps SDK</Card.Chip>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {'<Card.Chip variant="neutral" size="sm">UI Components</Card.Chip>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'</Card.ChipGroup>'}
          <br />
          &nbsp;&nbsp;{'</Card.Header>'}
          <br />
          &nbsp;&nbsp;{'<Card.Image src="..." />'}
          <br />
          &nbsp;&nbsp;{'<Card.Body>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'<Card.Title as="h3">Building AI-Native UIs</Card.Title>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'<Card.Description>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Build modern, accessible UI with AINativeKit...
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'</Card.Description>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'<Card.Meta>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<Features items={['}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}icon: 'clock', label: '10 min read
          {'}'},<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{'}icon: 'calendar-today', label: 'Oct
          30, 2025{'}'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{']} />'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'</Card.Meta>'}
          <br />
          &nbsp;&nbsp;{'</Card.Body>'}
          <br />
          &nbsp;&nbsp;{'<Card.Footer>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'<Card.Actions align="start">'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {'<Card.ActionButton color="primary" variant="solid">Explore Docs</Card.ActionButton>'}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'</Card.Actions>'}
          <br />
          &nbsp;&nbsp;{'</Card.Footer>'}
          <br />
          {'</Card>'}
        </div>
        <div
          style={{
            ...contentSectionStyle,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '360px',
          }}
        >
          {/* Documentation Card Example - shows what it looks like */}
          <Card elevationLevel={1} interactive>
            <Card.Header>
              <Card.ChipGroup>
                <Card.Chip variant="soft" size="sm">
                  ChatGPT Apps SDK
                </Card.Chip>
                <Card.Chip variant="soft" size="sm">
                  UI Components
                </Card.Chip>
              </Card.ChipGroup>
            </Card.Header>
            <Card.Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
              alt="Building AI-Native UIs"
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
                    { icon: 'clock', label: '10 min read' },
                    { icon: 'calendar-today', label: 'October 30, 2025' },
                  ]}
                  iconSize={12}
                />
              </Card.Meta>
            </Card.Body>
            <Card.Footer>
              <Card.Actions align="start">
                <Card.ActionButton color="primary" variant="solid">
                  Explore Docs
                </Card.ActionButton>
              </Card.Actions>
            </Card.Footer>
          </Card>
        </div>

        <div
          style={{
            ...assistantParagraphStyle,
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <strong>That's the power of AINativeKit UI:</strong> simplicity when you need it,
          flexibility when you want it.
        </div>

        <div style={{ ...assistantParagraphStyle, marginTop: '32px' }}>
          <strong>Ready? Three simple steps:</strong>
        </div>
        <div style={assistantParagraphStyle}>
          <strong>1. Install:</strong>
          <div style={codeBlockStyles.terminal}>npm install @ainativekit/ui</div>
        </div>
        <div style={assistantParagraphStyle}>
          <strong>2. Import:</strong>
          <div style={codeBlockStyles.terminal}>
            import '@ainativekit/ui/styles';
            <br />
            import {'{'}SummaryCard, Card{'}'} from '@ainativekit/ui';
          </div>
        </div>
        <div style={assistantParagraphStyle}>
          <strong>3. Use one of the patterns above and ship! 🚀</strong>
        </div>

        <div style={assistantParagraphStyle}>
          <strong>Everything included:</strong>
          <br />
          ✓ Full TypeScript with IntelliSense
          <br />
          ✓ Dark & light mode (automatic)
          <br />
          ✓ WCAG 2.1 AA accessible
          <br />
          ✓ Mobile-responsive
          <br />✓ Zero configuration needed
        </div>

        <div style={assistantFooterStyle}>
          <strong>Dive deeper:</strong> Check the Storybook menu for:
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>
              <strong>Gallery</strong>: Real-world examples for restaurants, products, articles, and
              more
            </li>
            <li>
              <strong>Cards</strong>: SummaryCard (with compact variant), ImageCard, ListCard with
              all features
            </li>
            <li>
              <strong>Patterns</strong>: Carousel, List, Album, Map with complete examples
            </li>
            <li>
              <strong>Design Tokens</strong>: Colors, typography, spacing, elevation - all
              customizable
            </li>
          </ul>
        </div>

        <div style={assistantParagraphStyle}>
          <strong>We're open source! 🌟</strong> Join us on{' '}
          <a
            href="https://github.com/AINativeKit/chatgpt-apps-sdk-ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text)', textDecoration: 'underline' }}
          >
            GitHub
          </a>{' '}
          and{' '}
          <a
            href="https://www.npmjs.com/package/@ainativekit/ui"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text)', textDecoration: 'underline' }}
          >
            npm
          </a>
          . Star ⭐ us, contribute, or report issues - we'd love your feedback!
        </div>

        <div style={{ ...assistantFooterStyle, marginTop: '12px' }}>
          <strong>
            Stop rebuilding the same components. Start shipping AI-Native experiences today! 🚀
          </strong>
        </div>
        <ActionButtons />
      </AssistantMessage>
    </div>
  );
};

const meta: Meta<typeof IntroductionPage> = {
  title: 'Introduction',
  component: IntroductionPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof IntroductionPage>;

export const Introduction: Story = {
  render: () => <IntroductionPage />,
};
