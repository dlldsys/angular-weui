import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        white: { name: 'white', value: '#ffffff' },
        light: { name: 'light', value: '#f7f7f7' },
        dark: { name: 'dark', value: '#1F1F1F' }
      }
    },
    layout: 'padded',
  },

  initialGlobals: {
    backgrounds: {
      value: 'white'
    }
  }
};

export default preview;
