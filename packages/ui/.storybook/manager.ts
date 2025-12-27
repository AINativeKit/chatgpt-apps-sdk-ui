import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Get persisted theme from localStorage or default to light
const getPersistedTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('storybook-theme');
    if (stored === 'dark') return 'dark';
  }
  return 'light';
};

const theme = getPersistedTheme();

addons.setConfig({
  theme: theme === 'dark' ? themes.dark : themes.light,
  sidebar: {
    showRoots: true,
  },
});
