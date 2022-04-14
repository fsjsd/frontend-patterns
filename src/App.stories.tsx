import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from './App';

export default {
  title: 'Misc/App',
  component: App,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const LoggedIn = Template.bind({});
