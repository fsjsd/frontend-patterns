import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DemoUniversitySearch from './DemoUniversitySearch';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Typeahead',
  component: DemoUniversitySearch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DemoUniversitySearch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DemoUniversitySearch> = (args) => <DemoUniversitySearch {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {

};