import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../projects/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ["@storybook/addon-docs"],
  "framework": {
    "name": "@storybook/angular",
    "options": {
      "angularBrowserTarget": "angular-weui:build:development"
    }
  }
};
export default config;
