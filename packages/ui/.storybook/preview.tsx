import type { Decorator, Preview } from '@storybook/react';
import { DocsContainer, type DocsContainerProps } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import React, { type PropsWithChildren } from 'react';
import { AppsSDKUIProvider } from '@openai/apps-sdk-ui/components/AppsSDKUIProvider';
import './storybook.css';

const reactWithUse = React as unknown as { use?: typeof React.useContext };
if (typeof reactWithUse.use !== 'function') {
  reactWithUse.use = React.useContext;
}

/**
 * Apply theme to document (following apps-sdk-ui pattern)
 */
function applyDocumentTheme(theme: 'light' | 'dark') {
  const htmlTag = document.documentElement;
  htmlTag.setAttribute('data-theme', theme);
  htmlTag.style.colorScheme = theme;
}

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as 'light' | 'dark') ?? 'light';

  // Apply theme to document and persist to localStorage
  React.useLayoutEffect(() => {
    applyDocumentTheme(theme);
    // Persist theme for manager.ts to read on next reload
    localStorage.setItem('storybook-theme', theme);
  }, [theme]);

  // Apply background color to Storybook canvas using CSS tokens
  React.useEffect(() => {
    const docsRoot = document.querySelector('.sb-show-main') as HTMLElement;
    if (docsRoot) {
      docsRoot.style.backgroundColor = 'var(--color-surface)';
      docsRoot.style.transition = 'background-color 0.3s ease';
    }
  }, [theme]);

  return <Story />;
};

const withAppsSDKUIContext: Decorator = (Story, { parameters }) => {
  return (
    <AppsSDKUIProvider linkComponent={parameters.linkComponent ?? 'a'}>
      <Story />
    </AppsSDKUIProvider>
  );
};

/**
 * Custom DocsContainer that applies theme to docs pages
 */
const CustomDocsContainer = ({
  children,
  context,
}: PropsWithChildren<DocsContainerProps>) => {
  const themeValue = (context as DocsContainerProps['context'] & { store?: { userGlobals?: { globals?: { theme?: string } } } })
    ?.store?.userGlobals?.globals?.theme ?? 'light';
  const isDark = themeValue === 'dark';

  React.useLayoutEffect(() => {
    applyDocumentTheme(themeValue as 'light' | 'dark');
  }, [themeValue]);

  return (
    <DocsContainer context={context} theme={isDark ? themes.dark : themes.light}>
      <AppsSDKUIProvider linkComponent="a">
        {children}
      </AppsSDKUIProvider>
    </DocsContainer>
  );
};

// Get persisted theme from localStorage
const getPersistedTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('storybook-theme');
    if (stored === 'dark') return 'dark';
  }
  return 'light';
};

const preview: Preview = {
  initialGlobals: {
    theme: getPersistedTheme(),
  },
  parameters: {
    docs: {
      container: CustomDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // We use data-theme instead
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
    },
    options: {
      storySort: {
        method: 'configure',
        order: [
          // Overview
          'Introduction',
          'Getting Started',
          // Gallery examples
          'Gallery',
          ['Albums', 'Carousel', 'Pizza List', 'Maps', 'Cards'],
          // Design foundations
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Elevation'],
          // Components by category
          'Cards',
          ['Card', 'SummaryCard', 'ImageCard', 'ListCard'],
          'Lists',
          ['List', 'ListItem', 'AvatarList'],
          'Media',
          ['Album', 'AlbumCard', 'Carousel', 'PhotoCarousel'],
          'Maps',
          ['Maps', 'CompactMap', 'FullscreenMap', 'MapPlaceCard', 'CustomMarkers', 'TileProviders'],
          'Feedback',
          ['Modal', 'Sidebar', 'Skeleton'],
          'Utilities',
          ['ExpandableText', 'Features', 'Overlay'],
          // Legacy/other
          'Composed Components',
          'Integrations',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme, withAppsSDKUIContext],
};

export default preview;
