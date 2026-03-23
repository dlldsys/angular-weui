import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIProgressComponent } from './progress.component';

const meta: Meta<WeUIProgressComponent> = {
  title: 'Components/Progress',
  component: WeUIProgressComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      component: story,
      template: `<div style="width: 300px; padding: 20px;">{{story()}}</div>`,
    }),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    max: {
      control: { type: 'range', min: 1, max: 200, step: 1 }
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large']
    },
    color: {
      control: 'color'
    },
    showText: {
      control: 'boolean'
    },
    status: {
      control: 'select',
      options: ['normal', 'success', 'warning', 'error']
    },
    indeterminate: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIProgressComponent>;

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: 'normal'
  }
};

export const Sizes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px; padding: 20px;">
        <weui-progress value="60" size="small"></weui-progress>
        <weui-progress value="60" size="normal"></weui-progress>
        <weui-progress value="60" size="large"></weui-progress>
      </div>
    `
  })
};

export const Status: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px; padding: 20px;">
        <weui-progress value="60" status="normal"></weui-progress>
        <weui-progress value="100" status="success"></weui-progress>
        <weui-progress value="75" status="warning"></weui-progress>
        <weui-progress value="30" status="error"></weui-progress>
      </div>
    `
  })
};

export const CustomColors: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px; padding: 20px;">
        <weui-progress value="70" color="#ff6b6b"></weui-progress>
        <weui-progress value="50" color="#4ecdc4"></weui-progress>
        <weui-progress value="85" color="#45b7d1"></weui-progress>
      </div>
    `
  })
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    showText: false
  }
};

export const WithoutText: Story = {
  args: {
    value: 80,
    showText: false
  }
};

export const DifferentValues: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px; padding: 20px;">
        <weui-progress value="0"></weui-progress>
        <weui-progress value="25"></weui-progress>
        <weui-progress value="50"></weui-progress>
        <weui-progress value="75"></weui-progress>
        <weui-progress value="100"></weui-progress>
      </div>
    `
  })
};

export const CustomMax: Story = {
  args: {
    value: 150,
    max: 200
  }
};
