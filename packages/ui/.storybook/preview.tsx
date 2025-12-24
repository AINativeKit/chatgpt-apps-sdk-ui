import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
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

  // Apply theme to document
  React.useLayoutEffect(() => {
    applyDocumentTheme(theme);
  }, [theme]);

  // Apply background color to Storybook canvas for dark mode
  React.useEffect(() => {
    const docsRoot = document.querySelector('.sb-show-main') as HTMLElement;
    if (docsRoot) {
      docsRoot.style.backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';
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

const preview: Preview = {
  parameters: {
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
          'Introduction',
          'Gallery',
          ['Albums', 'Carousel', 'Pizza List', 'Maps', 'Cards'],
          'Design Tokens',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Elevation'],
          'Composed Components',
          ['Cards', 'Album', 'Carousel', 'List', 'Maps'],
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
