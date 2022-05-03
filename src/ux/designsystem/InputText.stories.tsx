import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputText from './InputText';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Design System/InputText',
  component: InputText,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'InputText',
};

export const Error = Template.bind({});
Error.args = {
  error: 'Something is wrong',
};
