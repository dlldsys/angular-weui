import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIBadgeComponent } from './badge.component';

const meta: Meta<WeUIBadgeComponent> = {
  title: 'Components/Badge',
  component: WeUIBadgeComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' }
    },
    shape: {
      control: 'select',
      options: ['dot', 'round', 'rect', 'square']
    },
    status: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error']
    },
    size: {
      control: 'select',
      options: ['small', 'normal']
    },
    max: {
      control: { type: 'number', min: 1 }
    }
  }
};

export default meta;
type Story = StoryObj<WeUIBadgeComponent>;

export const Default: Story = {
  args: {
    value: 8,
    shape: 'round',
    status: 'default'
  }
};

export const Dot: Story = {
  args: {
    shape: 'dot',
    value: ''
  }
};

export const Number: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-badge value="1"></weui-badge>
        <weui-badge value="99"></weui-badge>
        <weui-badge value="100"></weui-badge>
        <weui-badge value="999" max="99"></weui-badge>
      </div>
    `
  })
};

export const Shapes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-badge value="dot" shape="dot"></weui-badge>
        <weui-badge value="round" shape="round"></weui-badge>
        <weui-badge value="rect" shape="rect"></weui-badge>
        <weui-badge value="square" shape="square"></weui-badge>
      </div>
    `
  })
};

export const Colors: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-badge value="default" status="default"></weui-badge>
        <weui-badge value="primary" status="primary"></weui-badge>
        <weui-badge value="success" status="success"></weui-badge>
        <weui-badge value="warning" status="warning"></weui-badge>
        <weui-badge value="error" status="error"></weui-badge>
      </div>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-badge value="normal" size="normal"></weui-badge>
        <weui-badge value="small" size="small"></weui-badge>
      </div>
    `
  })
};

export const InCell: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: #f7f7f7; border-radius: 8px;">
        <span>新消息</span>
        <weui-badge value="99+" status="primary"></weui-badge>
      </div>
    `
  })
};
